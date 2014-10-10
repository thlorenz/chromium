<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Extracting Remote Debugging Library](#extracting-remote-debugging-library)
  - [Entry Point](#entry-point)
- [DevTools](#devtools)
  - [IPC](#ipc)
    - [[chromium: Inter-process Communication (IPC) Design Docs](http://www.chromium.org/developers/design-documents/inter-process-communication)](#chromium-inter-process-communication-ipc-design-docshttpwwwchromiumorgdevelopersdesign-documentsinter-process-communication)
  - [Protocol](#protocol)
  - [Flow](#flow)
- [Toggling Breakpoint](#toggling-breakpoint)
  - [Front End](#front-end)
  - [Backend](#backend)
- [Opening DevTools](#opening-devtools)
- [Hitting BreakPoint](#hitting-breakpoint)
  - [Backend](#backend-1)
- [HTTP Handler](#http-handler)
  - [Sniffing Remote Debug Messages](#sniffing-remote-debug-messages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Extracting Remote Debugging Library 

One way to extract this functionality from Chromium in order to use it else where is to use the remote-debugging
interface - see: [HTTP Handler](#http-handler). That way all the details like IPC are handled by the existing code.

### Entry Point

The actual http server implementation lives inside [`src/net/server`](https://code.google.com/p/chromium/codesearch#chromium/src/net/server/).
The actual server is
[`src/net/server/http_server.cc`](https://code.google.com/p/chromium/codesearch#chromium/src/net/server/http_server.cc)
with web socket messages being handled by
[`src/net/server/web_socket.cc`](https://code.google.com/p/chromium/codesearch#chromium/src/net/server/web_socket.cc).

Assuming the server/websocket part would be implemented in JavaScript, anything directly called by that server
implementation would be the entry point of the extracted library.

It seems like
[`src/content/browser/devtools/devtools_http_handler_impl.h`](https://code.google.com/p/chromium/codesearch#chromium/src/content/browser/devtools/devtools_http_handler_impl.h)
would be that point since its methods are called (some indirectly via delegates) by the server and websocket handlers.

Mainly the methods in the top half of the file, i.e. `On*` but not `DevToolsHttpHandlerImpl::SendJson` since that'd be
part of the JavaScript server.


## DevTools 

- [`src/third_party/WebKit/Source/devtools`](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/devtools/)

### IPC

DevTools IPC description found inside [`devtools_messages.h`](https://code.google.com/p/chromium/codesearch#chromium/src/content/common/devtools_messages.h&q=devtools_messages.h&sq=package:chromium&type=cs&l=5)

```
Developer tools consist of the following parts:

DevToolsAgent lives in the renderer of an inspected page and provides access
to the pages resources, DOM, v8 etc. by means of IPC messages.

DevToolsClient is a thin delegate that lives in the tools front-end
renderer and converts IPC messages to frontend method calls and allows the
frontend to send messages to the DevToolsAgent.

All the messages are routed through browser process. There is a
DevToolsManager living in the browser process that is responsible for
routing logistics. It is also capable of sending direct messages to the
agent rather than forwarding messages between agents and clients only.

Chain of communication between the components may be described by the
following diagram:
 ----------------------------
| (tools frontend            |
| renderer process)          |
|                            |            --------------------
|tools    <--> DevToolsClient+<-- IPC -->+ (browser process)  |
|frontend                    |           |                    |
 ----------------------------             ---------+----------
                                                   ^
                                                   |
                                                  IPC
                                                   |
                                                   v
                         --------------------------+--------
                        | inspected page <--> DevToolsAgent |
                        |                                   |
                        | (inspected page renderer process) |
                         -----------------------------------
```

#### [chromium: Inter-process Communication (IPC) Design Docs](http://www.chromium.org/developers/design-documents/inter-process-communication)

[Types of Messages](http://www.chromium.org/developers/design-documents/inter-process-communication#Types_of_messages)

- [`src/content/common/view_messages.h`](https://code.google.com/p/chromium/codesearch#chromium/src/content/common/view_messages.h) contain different IPC message types

[Handling Messages](http://www.chromium.org/developers/design-documents/inter-process-communication#Handling_messages)

- implement `OnMessageReceived` [`src/ipc/ipc_listener.h`](https://code.google.com/p/chromium/codesearch#chromium/src/ipc/ipc_listener.h&l=21)
- [`src/ipc/ipc_channel_proxy.cc`](https://code.google.com/p/chromium/codesearch#chromium/src/ipc/ipc_channel_proxy.cc&rcl=1411534708&l=82)
  implementation

### Protocol

- [src/third_party/WebKit/Source/devtools/protocol.json](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/devtools/protocol.json)
- [src/third_party/WebKit/Source/core/inspector/InspectorFrontendHost.idl](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InspectorFrontendHost.idl)

### Flow

- [src/third_party/WebKit/Source/devtools/front_end/host/InspectorFrontendHost.js](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/devtools/front_end/host/InspectorFrontendHost.js&l=224)
- [src/third_party/WebKit/Source/core/inspector/InspectorFrontendHost.cpp](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InspectorFrontendHost.cpp&l=200) implements above referenced method
- calls into [src/third_party/WebKit/Source/core/inspector/InspectorFrontendClient.h](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InspectorFrontendClient.h&rcl=1411534708&l=44)
- implemented by [src/third_party/WebKit/Source/web/WebDevToolsFrontendImpl.cpp](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/web/WebDevToolsFrontendImpl.cpp&rcl=1411534708&l=167)
- calls into [src/third_party/WebKit/public/web/WebDevToolsFrontendClient.h](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/public/web/WebDevToolsFrontendClient.h&rcl=1411534708&l=44)
- implemented by [src/content/renderer/devtools/devtools_client.cc](https://code.google.com/p/chromium/codesearch#chromium/src/content/renderer/devtools/devtools_client.cc&rcl=1411534708&l=39)
- calls [src/content/public/renderer/render_view_observer.h](https://code.google.com/p/chromium/codesearch#chromium/src/content/public/renderer/render_view_observer.h&l=104)
- implemented by [src/content/public/renderer/render_view_observer.cc](https://code.google.com/p/chromium/codesearch#chromium/src/content/public/renderer/render_view_observer.cc&rcl=1411534708&l=40)
- calls [src/ipc/ipc_sender.h](https://code.google.com/p/chromium/codesearch#chromium/src/ipc/ipc_sender.h&l=20)
- implemented in multiple places, [src/ipc/ipc_channel_posix.cc](https://code.google.com/p/chromium/codesearch#chromium/src/ipc/ipc_channel_posix.cc&rcl=1411534708&l=529), [src/ipc/ipc_channel_proxy.cc](https://code.google.com/p/chromium/codesearch#chromium/src/ipc/ipc_channel_proxy.cc&rcl=1411534708&l=400), [src/ipc/ipc_sync_channel.cc](https://code.google.com/p/chromium/codesearch#chromium/src/ipc/ipc_sync_channel.cc&rcl=1411534708&l=462)

## Toggling Breakpoint

### Front End

Log messages with stacktrace

```
[7096:98051:0926/123759:INFO:devtools_client.cc(46)] sending message @{"id":36,"method":"Debugger.setBreakpointByUrl","params":{"lineNumber":37196,"url":"http://thlorenz.github.io/browserify-markdown-editor/bundle.js","columnNumber":0,"condition":""}} on channel @0x7af29670(len: 181)
[7096:98051:0926/123759:INFO:devtools_client.cc(48)] 0   Chromium Framework                  0x019f813f base::debug::StackTrace::StackTrace() + 63
1   Chromium Framework                  0x019f819b base::debug::StackTrace::StackTrace() + 43
2   Chromium Framework                  0x0cb6b74b content::DevToolsClient::sendMessageToBackend(blink::WebString const&) + 1211
3   Chromium Framework                  0x0cb6b92f non-virtual thunk to content::DevToolsClient::sendMessageToBackend(blink::WebString const&) + 63
4   Chromium Framework                  0x05ed7e1f blink::WebDevToolsFrontendImpl::sendMessageToBackend(WTF::String const&) + 111
5   Chromium Framework                  0x05ed7e8f non-virtual thunk to blink::WebDevToolsFrontendImpl::sendMessageToBackend(WTF::String const&) + 63
6   Chromium Framework                  0x06d9f013 blink::InspectorFrontendHost::sendMessageToBackend(WTF::String const&) + 115
7   Chromium Framework                  0x07d91c23 blink::InspectorFrontendHostV8Internal::sendMessageToBackendMethod(v8::FunctionCallbackInfo<v8::Value> const&) + 947
8   Chromium Framework                  0x07d90dca blink::InspectorFrontendHostV8Internal::sendMessageToBackendMethodCallback(v8::FunctionCallbackInfo<v8::Value> const&) + 58
9   Chromium Framework                  0x055b82fe v8::internal::FunctionCallbackArguments::Call(void (*)(v8::FunctionCallbackInfo<v8::Value> const&)) + 238
10  Chromium Framework                  0x0560ee16 v8::internal::Builtin_HandleApiCall(int, v8::internal::Object**, v8::internal::Isolate*) + 4054
11  ???                                 0x5740a556 0x0 + 1463854422
```

### Backend

Backtrace when hit
[src/v8/src/debug.cc](https://code.google.com/p/chromium/codesearch#chromium/src/v8/src/debug.cc&rcl=1411534708&l=323)

```
* thread #27: tid = 0x3ec36, 0x056edbf2 Chromium Framework`v8::internal::BreakLocationIterator::SetDebugBreak(this=0xbb446758) + 18 at debug.cc:0, name = 'Chrome_InProcRendererThread', stop reason = breakpoint 1.1
    frame #0: 0x056edbf2 Chromium Framework`v8::internal::BreakLocationIterator::SetDebugBreak(this=0xbb446758) + 18 at debug.cc:0
    frame #1: 0x056ed8b4 Chromium Framework`v8::internal::BreakLocationIterator::SetBreakPoint(this=0xbb446758, break_point_object=Handle<v8::internal::Object> at 0xbb446714) + 52 at debug.cc:272
    frame #2: 0x056f9008 Chromium Framework`v8::internal::Debug::SetBreakPointForScript(this=<unavailable>, script=Handle<v8::internal::Script> at 0xbb4467c4, break_point_object=Handle<v8::internal::Object> at 0xbb4467c8, source_position=<unavailable>, alignment=<unavailable>) + 920 at debug.cc:1145
    frame #3: 0x05c03a68 Chromium Framework`v8::internal::Runtime_SetScriptBreakPoint(int, v8::internal::Object**, v8::internal::Isolate*) + 1519 at runtime.cc:12822
    frame #4: 0x05c03479 Chromium Framework`v8::internal::Runtime_SetScriptBreakPoint(args_length=<unavailable>, args_object=<unavailable>, isolate=0x7d287400) + 105 at runtime.cc:12802
```

## Opening DevTools

When devtools are opened, the the current tab finds or creates an agent host `DevToolsAgentHostImpl` 
[`src/content/browser/devtools/render_view_devtools_agent_host.cc`](https://code.google.com/p/chromium/codesearch#chromium/src/content/browser/devtools/render_view_devtools_agent_host.cc&l=58)
and attaches its window's `DevToolsUIBindings` to it as a `DevToolsAgentHostClient`
[`src/chrome/browser/devtools/devtools_window.cc`](https://code.google.com/p/chromium/codesearch#chromium/src/chrome/browser/devtools/devtools_window.cc&l=487)
->
[`src/content/browser/devtools/devtools_agent_host_impl.cc`](https://code.google.com/p/chromium/codesearch#chromium/src/content/browser/devtools/devtools_agent_host_impl.cc&rcl=1411534708&l=73)

```
frame #0: 0x0a11810d Chromium Framework`content::DevToolsAgentHostImpl::AttachClient(this=0x7c76c6d0, client=0x819d0e14) + 61 at devtools_agent_host_impl.cc:75
frame #1: 0x01602674 Chromium Framework`DevToolsUIBindings::AttachTo(this=0x819d0e04, agent_host=0xbffe2860) + 148 at devtools_ui_bindings.cc:801
frame #2: 0x01613864 Chromium Framework`DevToolsWindow::ToggleDevToolsWindow(inspected_web_contents=0x7aaf7400, force_open=false, action=0xbffe2ab0, settings=0xbffe2918) + 388 at devtools_window.cc:487
frame #3: 0x01613ae5 Chromium Framework`DevToolsWindow::ToggleDevToolsWindow(browser=0x799577e0, action=0xbffe2ab0) + 245 at devtools_window.cc:449
frame #4: 0x09341af7 Chromium Framework`chrome::ToggleDevToolsWindow(browser=0x799577e0, action=DevToolsToggleAction at 0xbffe2ab0) + 151 at browser_commands.cc:1026
frame #5: 0x098449d8 Chromium Framework`chrome::BrowserCommandController::ExecuteCommandWithDisposition(this=0x79957970, id=40005, disposition=CURRENT_TAB) + 3560 at browser_command_controller.cc:680
```

## Hitting BreakPoint

### Backend

```
* thread #28: tid = 0xa4761, 0x056a8e40 Chromium Framework`v8::internal::BreakLocationIterator::ClearDebugBreak(this=0xbbc495c8) + 144 at debug.cc:356, name = 'Chrome_InProcRendererThread', stop reason = breakpoint 17.1
* frame #0: 0x056a8e40 Chromium Framework`v8::internal::BreakLocationIterator::ClearDebugBreak(this=0xbbc495c8) + 144 at debug.cc:356
  frame #1: 0x056a9060 Chromium Framework`v8::internal::BreakLocationIterator::ClearOneShot(this=0xbbc495c8) + 160 at debug.cc:321
  frame #2: 0x056b6f48 Chromium Framework`v8::internal::Debug::ClearOneShot(this=0x7953d9a0) + 168 at debug.cc:1672
  frame #3: 0x056ade22 Chromium Framework`v8::internal::Debug::Break(v8::internal::Arguments, v8::internal::JavaScriptFrame*) [inlined] v8::internal::Debug::ClearStepping(this=0x7953d9a0) + 8 at debug.cc:1650
  frame #4: 0x056ade1a Chromium Framework`v8::internal::Debug::Break(this=0x7953d9a0, args=Arguments at 0xbbc49814, frame=<unavailable>) + 1962 at debug.cc:932
  frame #5: 0x056b0ae4 Chromium Framework`v8::internal::Debug_Break(int, v8::internal::Object**, v8::internal::Isolate*) [inlined] v8::internal::__RT_impl_Debug_Break(v8::internal::Arguments, v8::internal::Isolate*) + 216 at debug.cc:987
  frame #6: 0x056b0a0c Chromium Framework`v8::internal::Debug_Break(args_length=<unavailable>, args_object=<unavailable>, isolate=<unavailable>) + 108 at debug.cc:984
```

### Backend 2

```
#0  0x05632d00 in v8::internal::BreakLocationIterator::SetDebugBreak() at v8/src/debug.cc:327
#1  0x056329b4 in v8::internal::BreakLocationIterator::SetBreakPoint(v8::internal::Handle<v8::internal::Object>) at v8/src/debug.cc:272
#2  0x0563e108 in v8::internal::Debug::SetBreakPointForScript(v8::internal::Handle<v8::internal::Script>, v8::internal::Handle<v8::internal::Object>, int*, v8::internal::BreakPositionAlignment) at v8/src/debug.cc:1145
#3  0x05b48b68 in v8::internal::__RT_impl_Runtime_SetScriptBreakPoint(v8::internal::Arguments, v8::internal::Isolate*) [inlined] at v8/src/runtime.cc:12822
#4  0x05b48579 in v8::internal::Runtime_SetScriptBreakPoint(int, v8::internal::Object**, v8::internal::Isolate*) at v8/src/runtime.cc:12802
#5  0x5c10a556 in 0x5c10a556 ()
#6  0x327a3b12 in 0x327a3b12 ()
#7  0x327a321a in 0x327a321a ()
#8  0x327a2fcc in 0x327a2fcc ()
#9  0x327a2de6 in 0x327a2de6 ()
#10 0x5c14a755 in 0x5c14a755 ()
#11 0x5c118a4a in 0x5c118a4a ()
#12 0x056b4b6d in v8::internal::Invoke(bool, v8::internal::Handle<v8::internal::JSFunction>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) at v8/src/execution.cc:91
#13 0x056b3f0c in v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, bool) at v8/src/execution.cc:141
#14 0x05648f00 in v8::internal::Debug::Call(v8::internal::Handle<v8::internal::JSFunction>, v8::internal::Handle<v8::internal::Object>) at v8/src/debug.cc:3020
#15 0x054ccd5a in v8::Debug::Call(v8::Handle<v8::Function>, v8::Handle<v8::Value>) at v8/src/api.cc:7047
#16 0x077281e8 in blink::ScriptDebugServer::setBreakpoint(WTF::String const&, blink::ScriptBreakpoint const&, int*, int*, bool) at third_party/WebKit/Source/bindings/core/v8/ScriptDebugServer.cpp:103
#17 0x06cc61a0 in blink::InspectorDebuggerAgent::resolveBreakpoint(WTF::String const&, WTF::String const&, blink::ScriptBreakpoint const&, blink::InspectorDebuggerAgent::BreakpointSource) at third_party/WebKit/Source/core/inspector/InspectorDebuggerAgent.cpp:617
#18 0x06cc59c8 in blink::InspectorDebuggerAgent::setBreakpointByUrl(WTF::String*, int, WTF::String const*, WTF::String const*, int const*, WTF::String const*, bool const*, WTF::String*, WTF::RefPtr<blink::TypeBuilder::Array<blink::TypeBuilder::Debugger::Location> >&) at third_party/WebKit/Source/core/inspector/InspectorDebuggerAgent.cpp:372
#19 0x06cc6582 in non-virtual thunk to blink::InspectorDebuggerAgent::setBreakpointByUrl(WTF::String*, int, WTF::String const*, WTF::String const*, int const*, WTF::String const*, bool const*, WTF::String*, WTF::RefPtr<blink::TypeBuilder::Array<blink::TypeBuilder::Debugger::Location> >&) at third_party/WebKit/Source/core/inspector/InspectorDebuggerAgent.cpp:378
#20 0x07fed838 in blink::InspectorBackendDispatcherImpl::Debugger_setBreakpointByUrl(long, blink::JSONObject*, blink::JSONArray*) at /Users/thlorenz/dev/js/chromium/src/out/Debug/gen/blink/core/InspectorBackendDispatcher.cpp:4110
#21 0x08001498 in blink::InspectorBackendDispatcherImpl::dispatch(WTF::String const&) at /Users/thlorenz/dev/js/chromium/src/out/Debug/gen/blink/core/InspectorBackendDispatcher.cpp:6233
#22 0x06c7eee9 in blink::InspectorController::dispatchMessageFromFrontend(WTF::String const&) at third_party/WebKit/Source/core/inspector/InspectorController.cpp:374
#23 0x05e12dec in blink::WebDevToolsAgentImpl::dispatchOnInspectorBackend(blink::WebString const&) at third_party/WebKit/Source/web/WebDevToolsAgentImpl.cpp:526
#24 0x05e169d1 in blink::DebuggerTask::run() at third_party/WebKit/Source/web/WebDevToolsAgentImpl.cpp:194
#25 0x0772d04e in blink::ScriptDebugServer::handleV8DebugEvent(v8::Debug::EventDetails const&) at third_party/WebKit/Source/bindings/core/v8/ScriptDebugServer.cpp:486
#26 0x0772cfa0 in blink::ScriptDebugServer::v8DebugEventCallback(v8::Debug::EventDetails const&) at third_party/WebKit/Source/bindings/core/v8/ScriptDebugServer.cpp:470
#27 0x05647b40 in v8::internal::Debug::CallEventCallback(v8::DebugEvent, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, v8::Debug::ClientData*) at v8/src/debug.cc:2767
#28 0x05645a59 in v8::internal::Debug::ProcessDebugEvent(v8::DebugEvent, v8::internal::Handle<v8::internal::JSObject>, bool) at v8/src/debug.cc:2742
#29 0x0563ad0b in v8::internal::Debug::OnDebugBreak(v8::internal::Handle<v8::internal::Object>, bool) at v8/src/debug.cc:2599
#30 0x0564942c in v8::internal::Debug::ProcessDebugMessages(bool) at v8/src/debug.cc:3074
#31 0x054cd32d in v8::Debug::ProcessDebugMessages() at v8/src/api.cc:7087
#32 0x0772c855 in blink::ScriptDebugServer::runPendingTasks() at third_party/WebKit/Source/bindings/core/v8/ScriptDebugServer.cpp:408
#33 0x05e13db7 in blink::WebDevToolsAgent::processPendingMessages() at third_party/WebKit/Source/web/WebDevToolsAgentImpl.cpp:656
#34 0x001d0a25 in base::internal::RunnableAdapter<void (*)()>::Run() at base/bind_internal.h:115
```

## HTTP Handler

Used via `--remote-debugging-port=????` flag. When launched with it DevTools can be used to remotely debug tabs in this
chromium process (even debugging chromium from chrome works).

```
#0  0x0a22839e in content::RenderViewDevToolsAgentHost::DispatchProtocolMessage(std::string const&) at content/browser/devtools/render_view_devtools_agent_host.cc:134
#1  0x0a1f2ff9 in content::(anonymous namespace)::DevToolsAgentHostClientImpl::OnMessage(std::string const&) at content/browser/devtools/devtools_http_handler_impl.cc:135
#2  0x0a1f11b9 in content::DevToolsHttpHandlerImpl::OnWebSocketMessageUI(int, std::string const&) at content/browser/devtools/devtools_http_handler_impl.cc:693
#3  0x0a202282 in base::internal::RunnableAdapter<void (content::DevToolsHttpHandlerImpl::*)(int, std::string const&)>::Run(content::DevToolsHttpHandlerImpl*, int const&, std::string const&) at base/bind_internal.h:248
```

This allows to do everything DevTools normally can, like Profiling, Debugging, looking at Network Traffic, etc.

In order to fix problems that cause it to crash or disconnect, i.e. loading a large bundle into remotely attached
devtools, apply [this patch](https://github.com/thlorenz/chromium/blob/master/0002-increasing-http-message-buffer-size.patch).

### Sniffing Remote Debug Messages

In order to see messages sent both ways use the [`crdp` command](https://github.com/thlorenz/chromium-remote-debugging-proxy#usage).
