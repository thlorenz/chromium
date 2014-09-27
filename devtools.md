<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [DevTools](#devtools)
  - [IPC](#ipc)
    - [[chromium: Inter-process Communication (IPC) Design Docs](http://www.chromium.org/developers/design-documents/inter-process-communication)](#chromium-inter-process-communication-ipc-design-docshttpwwwchromiumorgdevelopersdesign-documentsinter-process-communication)
    - [Sending IPC Messages](#sending-ipc-messages)
  - [Protocol](#protocol)
  - [Flow](#flow)
- [Toggling Breakpoint](#toggling-breakpoint)
  - [Front End](#front-end)
  - [Backend 1](#backend-1)
  - [Backend 2](#backend-2)
  - [Backend 3](#backend-3)
- [Opening DevTools](#opening-devtools)
- [Hitting BreakPoint](#hitting-breakpoint)
  - [Backend 1](#backend-1-1)
- [Frontend 1](#frontend-1)
  - [Backend 2](#backend-2-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## DevTools

- [src/third_party/WebKit/Source/devtools](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/devtools/)

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

#### Sending IPC Messages

Scheduling `OnSendMessage` task due to attaching devtools

```
* thread #1: tid = 0xa4706, 0x0295ff81 Chromium Framework`IPC::ChannelProxy::Send(this=0x791a1560, message=0x79532fa0) + 385 at ipc_channel_proxy.cc:410, name = 'CrBrowserMain', queue = 'com.apple.main-thread', stop reason = breakpoint 10.1
* frame #0: 0x0295ff81 Chromium Framework`IPC::ChannelProxy::Send(this=0x791a1560, message=0x79532fa0) + 385 at ipc_channel_proxy.cc:410
  frame #1: 0x0a866970 Chromium Framework`content::RenderProcessHostImpl::Send(this=0x7963ab00, msg=0x79532fa0) + 592 at render_process_host_impl.cc:1349
  frame #2: 0x0a8bff62 Chromium Framework`content::RenderWidgetHostImpl::Send(this=0x787bf8b4, msg=0x79532fa0) + 226 at render_widget_host_impl.cc:493
  frame #3: 0x0a1e587e Chromium Framework`content::RenderViewDevToolsAgentHost::SendMessageToAgent(this=0x7e520c40, msg=0x79532fa0) + 142 at render_view_devtools_agent_host.cc:173
  frame #4: 0x0a1db67e Chromium Framework`content::IPCDevToolsAgentHost::DispatchProtocolMessage(this=0x7e520c40, message=0xbff65790) + 126 at ipc_devtools_agent_host.cc:23
  frame #5: 0x0a1e5780 Chromium Framework`content::RenderViewDevToolsAgentHost::DispatchProtocolMessage(this=0x7e520c40, message=0xbff65790) + 1040 at render_view_devtools_agent_host.cc:166
  frame #6: 0x01679849 Chromium Framework`DevToolsUIBindings::HandleMessageFromDevToolsFrontendToBackend(this=0x7e515994, message=0xbff65790) + 105 at devtools_ui_bindings.cc:418
  frame #7: 0x016798af Chromium Framework`non-virtual thunk to DevToolsUIBindings::HandleMessageFromDevToolsFrontendToBackend(this=0x7e515998, message=0xbff65790) + 63 at devtools_ui_bindings.cc:419
  frame #8: 0x0a1a8f9e Chromium Framework`content::DevToolsFrontendHostImpl::OnDispatchOnInspectorBackend(this=0x7e1816d0, message=0xbff65790) + 62 at devtools_frontend_host_impl.cc:48
  frame #9: 0x0a1a941a Chromium Framework`void DispatchToMethod<content::DevToolsFrontendHostImpl, void (obj=0x7e1816d0, method=0x0a1a8f60, arg=0xbff65790)(std::string const&), std::string>(content::DevToolsFrontendHostImpl*, void (content::DevToolsFrontendHostImpl::*)(std::string const&), Tuple1<std::string> const&) + 154 at tuple.h:548
  frame #10: 0x0a1a9224 Chromium Framework`bool DevToolsAgentMsg_DispatchOnInspectorBackend::Dispatch<content::DevToolsFrontendHostImpl, content::DevToolsFrontendHostImpl, void, void (msg=0x7e6f4248, obj=0x7e1816d0, sender=0x7e1816d0, parameter=0x00000000, func=0x0a1a8f60)(std::string const&)>(IPC::Message const*, content::DevToolsFrontendHostImpl*, content::DevToolsFrontendHostImpl*, void*, void (content::DevToolsFrontendHostImpl::*)(std::string const&)) + 164 at devtools_messages.h:78
  frame #11: 0x0a1a8e29 Chromium Framework`content::DevToolsFrontendHostImpl::OnMessageReceived(this=0x7e1816d0, message=0x7e6f4248) + 313 at devtools_frontend_host_impl.cc:37
  frame #12: 0x0a1a905f Chromium Framework`non-virtual thunk to content::DevToolsFrontendHostImpl::OnMessageReceived(this=0x7e1816d4, message=0x7e6f4248) + 63 at devtools_frontend_host_impl.cc:44
  frame #13: 0x0ab89eab Chromium Framework`content::WebContentsImpl::OnMessageReceived(this=0x7ac66800, render_view_host=0x7e1d7f00, render_frame_host=0x00000000, message=0x7e6f4248) + 619 at web_contents_impl.cc:530
  frame #14: 0x0ab89c05 Chromium Framework`content::WebContentsImpl::OnMessageReceived(this=0x7ac66800, render_view_host=0x7e1d7f00, message=0x7e6f4248) + 85 at web_contents_impl.cc:510
  frame #15: 0x0ab8c25d Chromium Framework`non-virtual thunk to content::WebContentsImpl::OnMessageReceived(this=0x7ac6685c, render_view_host=0x7e1d7f00, message=0x7e6f4248) + 77 at web_contents_impl.cc:511
  frame #16: 0x0a89d841 Chromium Framework`content::RenderViewHostImpl::OnMessageReceived(this=0x7e1d7f00, msg=0x7e6f4248) + 321 at render_view_host_impl.cc:900
  frame #17: 0x0a8a0aff Chromium Framework`non-virtual thunk to content::RenderViewHostImpl::OnMessageReceived(this=0x7e1d7f10, msg=0x7e6f4248) + 63 at render_view_host_impl.cc:939
  frame #18: 0x0a867438 Chromium Framework`content::RenderProcessHostImpl::OnMessageReceived(this=0x7963ab00, msg=0x7e6f4248) + 2456 at render_process_host_impl.cc:1399
  frame #19: 0x0a867a9f Chromium Framework`non-virtual thunk to content::RenderProcessHostImpl::OnMessageReceived(this=0x7963ab04, msg=0x7e6f4248) + 63 at render_process_host_impl.cc:1400
  frame #20: 0x0295dbd0 Chromium Framework`IPC::ChannelProxy::Context::OnDispatchMessage(this=0x791a15a0, message=0x7e6f4248) + 576 at ipc_channel_proxy.cc:274
  frame #21: 0x02967c44 Chromium Framework`base::internal::RunnableAdapter<void (this=0xbff66ea0, object=0x791a15a0, a1=0x7e6f4248)(IPC::Message const&)>::Run(IPC::ChannelProxy::Context*, IPC::Message const&) + 148 at bind_internal.h:190
  frame #22: 0x02967b4f Chromium Framework`base::internal::InvokeHelper<false, void, base::internal::RunnableAdapter<void (runnable=(method_ = 0x0295d990), a1=0x7e6f4244, a2=0x7e6f4248)(IPC::Message const&)>, void (IPC::ChannelProxy::Context* const&, IPC::Message const&)>::MakeItSo(base::internal::RunnableAdapter<void (IPC::ChannelProxy::Context::*)(IPC::Message const&)>, IPC::ChannelProxy::Context* const&, IPC::Message const&) + 95 at bind_internal.h:898
  frame #23: 0x02967a84 Chromium Framework`base::internal::Invoker<2, base::internal::BindState<base::internal::RunnableAdapter<void (base=0x7e6f4230)(IPC::Message const&)>, void (IPC::ChannelProxy::Context*, IPC::Message const&), void (IPC::ChannelProxy::Context*, IPC::Message)>, void (IPC::ChannelProxy::Context*, IPC::Message const&)>::Run(base::internal::BindStateBase*) + 148 at bind_internal.h:1248
```



Handling scheduled `OnSendMessage` task on IPC::Channel thread
[`src/ipc/ipc_channel_proxy.cc`](https://code.google.com/p/chromium/codesearch#chromium/src/ipc/ipc_channel_proxy.cc&l=170)

```
* thread #14: tid = 0xa4736, 0x02955a12 Chromium Framework`IPC::ChannelPosix::ProcessOutgoingMessages(this=0x7a373e00) + 338 at ipc_channel_posix.cc:394, name = 'Chrome_IOThread', stop reason = breakpoint 13.1
* frame #0: 0x02955a12 Chromium Framework`IPC::ChannelPosix::ProcessOutgoingMessages(this=0x7a373e00) + 338 at ipc_channel_posix.cc:394
  frame #1: 0x029567fa Chromium Framework`IPC::ChannelPosix::Send(this=0x7a373e00, message=0x7c9a55c0) + 762 at ipc_channel_posix.cc:540
  frame #2: 0x0295e66c Chromium Framework`IPC::ChannelProxy::Context::OnSendMessage(this=0x791a15a0, message=scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> > at 0xb4a2a428) + 140 at ipc_channel_proxy.cc:176
  frame #3: 0x02963c63 Chromium Framework`base::internal::RunnableAdapter<void (this=0xb4a2a490, object=0x791a15a0, a1=base::internal::CallbackParamTraits<scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> >, true>::ForwardType at 0xb4a2a470)(scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> >)>::Run(IPC::ChannelProxy::Context*, scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> >) + 195 at bind_internal.h:190
  frame #4: 0x0296393f Chromium Framework`base::internal::InvokeHelper<false, void, base::internal::RunnableAdapter<void (runnable=(method_ = 0x0295e5e0), a1=0x791a15a0, a2=scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> > at 0xb4a2a4c8)(scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> >)>, void (IPC::ChannelProxy::Context*, scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> >)>::MakeItSo(base::internal::RunnableAdapter<void (IPC::ChannelProxy::Context::*)(scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> >)>, IPC::ChannelProxy::Context*, scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> >) + 143 at bind_internal.h:898
  frame #5: 0x02963789 Chromium Framework`base::internal::Invoker<2, base::internal::BindState<base::internal::RunnableAdapter<void (base=0x79592a40)(scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> >)>, void (IPC::ChannelProxy::Context*, scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> >), void (scoped_refptr<IPC::ChannelProxy::Context>, base::internal::PassedWrapper<scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> > >)>, void (IPC::ChannelProxy::Context*, scoped_ptr<IPC::Message, base::DefaultDeleter<IPC::Message> >)>::Run(base::internal::BindStateBase*) + 249 at bind_internal.h:1248
```

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

### Backend 1

Backtrace when hit
[src/v8/src/debug.cc](https://code.google.com/p/chromium/codesearch#chromium/src/v8/src/debug.cc&rcl=1411534708&l=323)

```
* thread #27: tid = 0x3ec36, 0x056edbf2 Chromium Framework`v8::internal::BreakLocationIterator::SetDebugBreak(this=0xbb446758) + 18 at debug.cc:0, name = 'Chrome_InProcRendererThread', stop reason = breakpoint 1.1
    frame #0: 0x056edbf2 Chromium Framework`v8::internal::BreakLocationIterator::SetDebugBreak(this=0xbb446758) + 18 at debug.cc:0
    frame #1: 0x056ed8b4 Chromium Framework`v8::internal::BreakLocationIterator::SetBreakPoint(this=0xbb446758, break_point_object=Handle<v8::internal::Object> at 0xbb446714) + 52 at debug.cc:272
    frame #2: 0x056f9008 Chromium Framework`v8::internal::Debug::SetBreakPointForScript(this=<unavailable>, script=Handle<v8::internal::Script> at 0xbb4467c4, break_point_object=Handle<v8::internal::Object> at 0xbb4467c8, source_position=<unavailable>, alignment=<unavailable>) + 920 at debug.cc:1145
    frame #3: 0x05c03a68 Chromium Framework`v8::internal::Runtime_SetScriptBreakPoint(int, v8::internal::Object**, v8::internal::Isolate*) + 1519 at runtime.cc:12822
    frame #4: 0x05c03479 Chromium Framework`v8::internal::Runtime_SetScriptBreakPoint(args_length=<unavailable>, args_object=<unavailable>, isolate=0x7d287400) + 105 at runtime.cc:12802
    frame #5: 0x5740a556
    frame #6: 0x57473412
    frame #7: 0x3deb9bba
    frame #8: 0x3deb996c
    frame #9: 0x3deb9786
    frame #10: 0x5744a755
    frame #11: 0x57418a4a
    frame #12: 0x0576fa6d Chromium Framework`v8::internal::Invoke(is_construct=<unavailable>, function=<unavailable>, receiver=<unavailable>, argc=<unavailable>, args=<unavailable>) + 1581 at execution.cc:91
    frame #13: 0x0576ee0c Chromium Framework`v8::internal::Execution::Call(isolate=<unavailable>, callable=Handle<v8::internal::Object> at 0xbb446a74, receiver=Handle<v8::internal::Object> at 0xbb446a78, argc=<unavailable>, argv=<unavailable>, convert_receiver=<unavailable>) + 1900 at execution.cc:141
    frame #14: 0x05703e00 Chromium Framework`v8::internal::Debug::Call(this=<unavailable>, fun=Handle<v8::internal::JSFunction> at 0xbb446b14, data=Handle<v8::internal::Object> at 0xbb446b18) + 512 at debug.cc:3020
    frame #15: 0x05587c5a Chromium Framework`v8::Debug::Call(fun=(val_ = v8::Function * = 0x7d2936fc), data=(val_ = v8::Value * = 0x7d2936cc)) + 586 at api.cc:7047
    frame #16: 0x077e30e8 Chromium Framework`blink::ScriptDebugServer::setBreakpoint(this=0x808e5110, sourceID=0x271083e8, scriptBreakpoint=0xbb447290, actualLineNumber=0xbb447114, actualColumnNumber=0xbb447110, interstatementLocation=false) + 2280 at ScriptDebugServer.cpp:103
    frame #17: 0x06d810a0 Chromium Framework`blink::InspectorDebuggerAgent::resolveBreakpoint(this=0x26f88690, breakpointId=0xbb447378, scriptId=0x271083e8, breakpoint=0xbb447290, source=UserBreakpointSource) + 448 at InspectorDebuggerAgent.cpp:617
    frame #18: 0x06d808c8 Chromium Framework`blink::InspectorDebuggerAgent::setBreakpointByUrl(this=0x26f88690, errorString=0xbb447540, lineNumber=37196, optionalURL=0xbb447580, optionalURLRegex=0x00000000, optionalColumnNumber=0xbb447570, optionalCondition=0xbb447568, isAntiBreakpoint=0x00000000, outBreakpointId=0xbb447560, locations=0xbb447558) + 2344 at InspectorDebuggerAgent.cpp:372
    frame #19: 0x06d81482 Chromium Framework`non-virtual thunk to blink::InspectorDebuggerAgent::setBreakpointByUrl(this=0x26f886a4, errorString=0xbb447540, lineNumber=37196, optionalURL=0xbb447580, optionalURLRegex=0x00000000, optionalColumnNumber=0xbb447570, optionalCondition=0xbb447568, isAntiBreakpoint=0x00000000, outBreakpointId=0xbb447560, locations=0xbb447558) + 226 at InspectorDebuggerAgent.cpp:378
    frame #20: 0x080a8738 Chromium Framework`blink::InspectorBackendDispatcherImpl::Debugger_setBreakpointByUrl(this=0x26e7c2f0, callId=38, requestMessageObject=0x34ef5718, protocolErrors=0x299f6ca0) + 1352 at InspectorBackendDispatcher.cpp:4110
    frame #21: 0x080bc398 Chromium Framework`blink::InspectorBackendDispatcherImpl::dispatch(this=0x26e7c2f0, message=0xbb4477d8) + 2344 at InspectorBackendDispatcher.cpp:6233
    frame #22: 0x06d39de9 Chromium Framework`blink::InspectorController::dispatchMessageFromFrontend(this=0x26e88010, message=0xbb4477d8) + 105 at InspectorController.cpp:374
    frame #23: 0x05ecdcec Chromium Framework`blink::WebDevToolsAgentImpl::dispatchOnInspectorBackend(this=0x808fa380, message=0xbb447810) + 92 at WebDevToolsAgentImpl.cpp:526
    frame #24: 0x05ed18d1 Chromium Framework`blink::DebuggerTask::run(this=0x80aa8040) + 145 at WebDevToolsAgentImpl.cpp:194
    frame #25: 0x077e7f4e Chromium Framework`blink::ScriptDebugServer::handleV8DebugEvent(this=0x808e5110, eventDetails=0xbb447cb8) + 142 at ScriptDebugServer.cpp:486
    frame #26: 0x077e7ea0 Chromium Framework`blink::ScriptDebugServer::v8DebugEventCallback(eventDetails=0xbb447cb8) + 80 at ScriptDebugServer.cpp:470
    frame #27: 0x05702a40 Chromium Framework`v8::internal::Debug::CallEventCallback(this=0x808bfed0, event=<unavailable>, exec_state=Handle<v8::internal::Object> at 0xbb447d08, event_data=Handle<v8::internal::Object> at 0xbb447d0c, client_data=<unavailable>) + 1392 at debug.cc:2767
    frame #28: 0x05700959 Chromium Framework`v8::internal::Debug::ProcessDebugEvent(this=0x808bfed0, event=<unavailable>, event_data=Handle<v8::internal::JSObject> at 0xbb447da8, auto_continue=<unavailable>) + 665 at debug.cc:2742
    frame #29: 0x056f5c0b Chromium Framework`v8::internal::Debug::OnDebugBreak(this=<unavailable>, break_points_hit=Handle<v8::internal::Object> at 0xbb447df4, auto_continue=<unavailable>) + 491 at debug.cc:2599
    frame #30: 0x0570432c Chromium Framework`v8::internal::Debug::ProcessDebugMessages(this=<unavailable>, debug_command_only=<unavailable>) + 156 at debug.cc:3074
    frame #31: 0x05704278 Chromium Framework`v8::internal::Debug::HandleDebugBreak(this=<unavailable>) + 1000 at debug.cc:3058
    frame #32: 0x05773135 Chromium Framework`v8::internal::StackGuard::HandleInterrupts(this=0x7d28a8a4) + 277 at execution.cc:681
    frame #33: 0x05bea47a Chromium Framework`v8::internal::Runtime_StackGuard(int, v8::internal::Object**, v8::internal::Isolate*) [inlined] v8::internal::__RT_impl_Runtime_StackGuard(v8::internal::Arguments, v8::internal::Isolate*) + 199 at runtime.cc:9544
    frame #34: 0x05bea3b3 Chromium Framework`v8::internal::Runtime_StackGuard(args_length=<unavailable>, args_object=0xbb448070, isolate=<unavailable>) + 99 at runtime.cc:9534
    frame #35: 0x5740a556
    frame #36: 0x3de29852
    frame #37: 0x3de2934b
    frame #38: 0x3de290b0
    frame #39: 0x5742cca0
    frame #40: 0x3de28fb6
    frame #41: 0x3de28806
    frame #42: 0x3de2813d
    frame #43: 0x3de35e5e
    frame #44: 0x5740bc3b
    frame #45: 0x5744a750
    frame #46: 0x57418a4a
    frame #47: 0x0576fa6d Chromium Framework`v8::internal::Invoke(is_construct=<unavailable>, function=<unavailable>, receiver=<unavailable>, argc=<unavailable>, args=<unavailable>) + 1581 at execution.cc:91
    frame #48: 0x0576ee0c Chromium Framework`v8::internal::Execution::Call(isolate=<unavailable>, callable=Handle<v8::internal::Object> at 0xbb448334, receiver=Handle<v8::internal::Object> at 0xbb448338, argc=<unavailable>, argv=<unavailable>, convert_receiver=<unavailable>) + 1900 at execution.cc:141
    frame #49: 0x0556fe55 Chromium Framework`v8::Function::Call(this=<unavailable>, recv=(val_ = v8::Value * = 0x7d293660), argc=<unavailable>, argv=<unavailable>) + 821 at api.cc:4141
    frame #50: 0x07892d85 Chromium Framework`blink::V8ScriptRunner::callFunction(function=(val_ = v8::Function * = 0x7d293644), context=0x47a05888, receiver=(val_ = v8::Value * = 0x7d293660), argc=1, args=0xbb4486d0, isolate=0x7d287400) + 645 at V8ScriptRunner.cpp:224
    frame #51: 0x077d3db2 Chromium Framework`blink::ScriptController::callFunction(context=0x47a05888, function=(val_ = v8::Function * = 0x7d293644), receiver=(val_ = v8::Value * = 0x7d293660), argc=1, info=0xbb4486d0, isolate=0x7d287400) + 1154 at ScriptController.cpp:163
    frame #52: 0x077d38eb Chromium Framework`blink::ScriptController::callFunction(this=0x84290f20, function=(val_ = v8::Function * = 0x7d293644), receiver=(val_ = v8::Value * = 0x7d293660), argc=1, info=0xbb4486d0) + 203 at ScriptController.cpp:146
    frame #53: 0x07856a66 Chromium Framework`blink::V8EventListener::callListenerFunction(this=0x34ff0e68, jsEvent=(val_ = v8::Value * = 0x7d293618), event=0x26fa35d0) + 646 at V8EventListener.cpp:88
    frame #54: 0x0783a0d5 Chromium Framework`blink::V8AbstractEventListener::invokeEventHandler(this=0x34ff0e68, event=0x26fa35d0, jsEvent=Local<v8::Value> at 0xbb4489b8) + 741 at V8AbstractEventListener.cpp:128
    frame #55: 0x07839d83 Chromium Framework`blink::V8AbstractEventListener::handleEvent(this=0x34ff0e68, (null)=0x47a05888, event=0x26fa35d0) + 787 at V8AbstractEventListener.cpp:98
    frame #56: 0x06270a4f Chromium Framework`blink::EventTarget::fireEventListeners(this=0x47ad33e8, event=0x26fa35d0, d=0x34ff2530, entry=0x3501a1a0) + 1455 at EventTarget.cpp:351
    frame #57: 0x0626ff2a Chromium Framework`blink::EventTarget::fireEventListeners(this=0x47ad33e8, event=0x26fa35d0) + 698 at EventTarget.cpp:287
    frame #58: 0x0612c459 Chromium Framework`blink::Node::handleLocalEvents(this=0x47ad33e8, event=0x26fa35d0) + 137 at Node.cpp:2098
    frame #59: 0x062878a8 Chromium Framework`blink::NodeEventContext::handleLocalEvents(this=0x7b43b86c, event=0x26fa35d0) const + 424 at NodeEventContext.cpp:67
    frame #60: 0x06253bf4 Chromium Framework`blink::EventDispatcher::dispatchEventAtBubbling(this=0xbb448f70, windowContext=0xbb448dc0) + 372 at EventDispatcher.cpp:187
    frame #61: 0x062528a5 Chromium Framework`blink::EventDispatcher::dispatch(this=0xbb448f70) + 1653 at EventDispatcher.cpp:128
    frame #62: 0x06282582 Chromium Framework`blink::MouseEventDispatchMediator::dispatchEvent(this=0x34ff8ed0, dispatcher=0xbb448f70) const + 530 at MouseEvent.cpp:264
    frame #63: 0x0625167f Chromium Framework`blink::EventDispatcher::dispatchEvent(node=0x47a1ac00, mediator=PassRefPtr<blink::EventDispatchMediator> at 0xbb449020) + 575 at EventDispatcher.cpp:50
    frame #64: 0x0612ce7e Chromium Framework`blink::Node::dispatchMouseEvent(this=0x47a1ac00, event=0xbb449440, eventType=0x0ed7fe40, detail=1, relatedTarget=0x00000000) + 270 at Node.cpp:2150
    frame #65: 0x06f4a6fd Chromium Framework`blink::EventHandler::dispatchMouseEvent(this=0x7b4dfc00, eventType=0x0ed7fe40, targetNode=0x47af2f18, clickCount=1, mouseEvent=0xbb449440, setUnder=true) + 205 at EventHandler.cpp:1872
    frame #66: 0x06f49dc5 Chromium Framework`blink::EventHandler::handleMousePressEvent(this=0x7b4dfc00, mouseEvent=0xbb449440) + 2165 at EventHandler.cpp:1285
    frame #67: 0x05e8bf9f Chromium Framework`blink::PageWidgetEventHandler::handleMouseDown(this=0x26e63e2c, mainFrame=0x26ec94b0, event=0x7af18e28) + 111 at PageWidgetDelegate.cpp:202
    frame #68: 0x05f89142 Chromium Framework`blink::WebViewImpl::handleMouseDown(this=0x26e63e10, mainFrame=0x26ec94b0, event=0x7af18e28) + 1394 at WebViewImpl.cpp:522
    frame #69: 0x05f899bd Chromium Framework`non-virtual thunk to blink::WebViewImpl::handleMouseDown(this=0x26e63e2c, mainFrame=0x26ec94b0, event=0x7af18e28) + 77 at WebViewImpl.cpp:553
    frame #70: 0x05e8bbcd Chromium Framework`blink::PageWidgetDelegate::handleInputEvent(page=0x7b920a70, handler=0x26e63e2c, event=0x7af18e28, rootFrame=0x00000000) + 429 at PageWidgetDelegate.cpp:129
    frame #71: 0x05f93913 Chromium Framework`blink::WebViewImpl::handleInputEvent(this=0x26e63e10, inputEvent=0x7af18e28) + 2387 at WebViewImpl.cpp:2037
    frame #72: 0x0cd72844 Chromium Framework`content::RenderWidget::OnHandleInputEvent(this=0x7cd19600, input_event=0x7af18e28, latency_info=0xbb449d0c, is_keyboard_shortcut=false) + 2964 at render_widget.cc:1044
    frame #73: 0x0cd87fba Chromium Framework`void DispatchToMethod<content::RenderWidget, void (obj=0x7cd19600, method=0x0cd71cb0, arg=0xbb449d08)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool), blink::WebInputEvent const*, ui::LatencyInfo, bool>(content::RenderWidget*, void (content::RenderWidget::*)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool), Tuple3<blink::WebInputEvent const*, ui::LatencyInfo, bool> const&) + 218 at tuple.h:562
    frame #74: 0x0cd7d2a3 Chromium Framework`bool InputMsg_HandleInputEvent::Dispatch<content::RenderWidget, content::RenderWidget, void, void (msg=0x8445e288, obj=0x7cd19600, sender=0x7cd19600, parameter=0x00000000, func=0x0cd71cb0)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool)>(IPC::Message const*, content::RenderWidget*, content::RenderWidget*, void*, void (content::RenderWidget::*)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool)) + 227 at input_messages.h:110
    frame #75: 0x0cd70b1e Chromium Framework`content::RenderWidget::OnMessageReceived(this=0x7cd19600, message=0x8445e288) + 1166 at render_widget.cc:598
    frame #76: 0x0cd2ac3b Chromium Framework`content::RenderViewImpl::OnMessageReceived(this=0x7cd19600, message=0x8445e288) + 15243 at render_view_impl.cc:1388
    frame #77: 0x03cda1e9 Chromium Framework`content::MessageRouter::RouteMessage(this=0x7ca79220, msg=0x8445e288) + 121 at message_router.cc:54
    frame #78: 0x03cda135 Chromium Framework`content::MessageRouter::OnMessageReceived(this=0x7ca79220, msg=0x8445e288) + 117 at message_router.cc:46
    frame #79: 0x0c90d36f Chromium Framework`content::ChildThread::OnMessageReceived(this=0x7ca79204, msg=0x8445e288) + 2095 at child_thread.cc:494
  * frame #80: 0x029a2ed0 Chromium Framework`IPC::ChannelProxy::Context::OnDispatchMessage(this=0x7af9f670, message=0x8445e288) + 576 at ipc_channel_proxy.cc:274
    frame #81: 0x029acf44 Chromium Framework`base::internal::RunnableAdapter<void (this=0xbb44b7d0, object=0x7af9f670, a1=0x8445e288)(IPC::Message const&)>::Run(IPC::ChannelProxy::Context*, IPC::Message const&) + 148 at bind_internal.h:190
    frame #82: 0x029ace4f Chromium Framework`base::internal::InvokeHelper<false, void, base::internal::RunnableAdapter<void (runnable=(method_ = 0x029a2c90), a1=0x8445e284, a2=0x8445e288)(IPC::Message const&)>, void (IPC::ChannelProxy::Context* const&, IPC::Message const&)>::MakeItSo(base::internal::RunnableAdapter<void (IPC::ChannelProxy::Context::*)(IPC::Message const&)>, IPC::ChannelProxy::Context* const&, IPC::Message const&) + 95 at bind_internal.h:898
    frame #83: 0x029acd84 Chromium Framework`base::internal::Invoker<2, base::internal::BindState<base::internal::RunnableAdapter<void (base=0x8445e270)(IPC::Message const&)>, void (IPC::ChannelProxy::Context*, IPC::Message const&), void (IPC::ChannelProxy::Context*, IPC::Message)>, void (IPC::ChannelProxy::Context*, IPC::Message const&)>::Run(base::internal::BindStateBase*) + 148 at bind_internal.h:1248
    frame #84: 0x090dc62f Chromium Framework`base::Callback<void (this=0xbb44bbe4)>::Run() const + 63 at callback.h:401
    frame #85: 0x019fa04c Chromium Framework`base::debug::TaskAnnotator::RunTask(this=0x7b93797c, queue_function=0x0da03cfc, run_function=0x0da03d12, pending_task=0xbb44bbd0) + 1084 at task_annotator.cc:62
    frame #86: 0x01ac31be Chromium Framework`base::MessageLoop::RunTask(this=0x7b9378c0, pending_task=0xbb44bbd0) + 750 at message_loop.cc:446
    frame #87: 0x01ac3372 Chromium Framework`base::MessageLoop::DeferOrRunPendingTask(this=0x7b9378c0, pending_task=0xbb44bbd0) + 98 at message_loop.cc:456
    frame #88: 0x01ac3641 Chromium Framework`base::MessageLoop::DoWork(this=0x7b9378c0) + 321 at message_loop.cc:565
    frame #89: 0x019c4c35 Chromium Framework`base::MessagePumpCFRunLoopBase::RunWork(this=0x7b937a30) + 101 at message_pump_mac.mm:325
    frame #90: 0x019c4051 Chromium Framework`base::MessagePumpCFRunLoopBase::RunWorkSource(info=0x7b937a30) + 49 at message_pump_mac.mm:303
    frame #91: 0x9b629b5f CoreFoundation`__CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__ + 15
    frame #92: 0x9b61a95b CoreFoundation`__CFRunLoopDoSources0 + 235
    frame #93: 0x9b61a05e CoreFoundation`__CFRunLoopRun + 1022
    frame #94: 0x9b6199ea CoreFoundation`CFRunLoopRunSpecific + 394
    frame #95: 0x9b61984b CoreFoundation`CFRunLoopRunInMode + 123
    frame #96: 0x019c525d Chromium Framework`base::MessagePumpCFRunLoop::DoRun(this=0x7b937a30, delegate=0x7b9378c0) + 109 at message_pump_mac.mm:538
    frame #97: 0x019c4848 Chromium Framework`base::MessagePumpCFRunLoopBase::Run(this=0x7b937a30, delegate=0x7b9378c0) + 104 at message_pump_mac.mm:235
    frame #98: 0x01ac2b7c Chromium Framework`base::MessageLoop::RunHandler(this=0x7b9378c0) + 300 at message_loop.cc:415
    frame #99: 0x01b253e3 Chromium Framework`base::RunLoop::Run(this=0xbb44cd88) + 83 at run_loop.cc:54
    frame #100: 0x01ac1e87 Chromium Framework`base::MessageLoop::Run(this=0x7b9378c0) + 55 at message_loop.cc:308
    frame #101: 0x01b96452 Chromium Framework`base::Thread::Run(this=0x7af9e580, message_loop=0x7b9378c0) + 50 at thread.cc:174
    frame #102: 0x01b96767 Chromium Framework`base::Thread::ThreadMain(this=0x7af9e580) + 631 at thread.cc:228
    frame #103: 0x01b7ff98 Chromium Framework`base::(anonymous namespace)::ThreadFunc(params=0xbff1fe88) + 296 at platform_thread_posix.cc:80
    frame #104: 0x940e45fb libsystem_pthread.dylib`_pthread_body + 144
    frame #105: 0x940e4485 libsystem_pthread.dylib`_pthread_start + 130
    frame #106: 0x940e9cf2 libsystem_pthread.dylib`thread_start + 34
```

- entry point is
  [`IPC::ChannelProxy::Context::OnDispatchMessage`](https://code.google.com/p/chromium/codesearch#chromium/src/ipc/ipc_channel_proxy.cc&l=246)(frame: #80)
- message: id: `0x8445e288`, message.type(): `196721`, message.routing_id(): `13`
- it seems that MouseDown messages were sent concurrently (due to clicking the breakpoint) but have nothing to do with
  the `setBreakpoint` message

### Backend 2

This is the backtrace when same location was hit when opening the url with devtools open - a breakpoint was set for the page previously.

```
* thread #27: tid = 0x3ec36, 0x056edbf2 Chromium Framework`v8::internal::BreakLocationIterator::SetDebugBreak(this=0xbb447b08) + 18 at debug.cc:0, name = 'Chrome_InProcRendererThread', stop reason = breakpoint 1.1
  * frame #0: 0x056edbf2 Chromium Framework`v8::internal::BreakLocationIterator::SetDebugBreak(this=0xbb447b08) + 18 at debug.cc:0
    frame #1: 0x056ed8b4 Chromium Framework`v8::internal::BreakLocationIterator::SetBreakPoint(this=0xbb447b08, break_point_object=Handle<v8::internal::Object> at 0xbb447ac4) + 52 at debug.cc:272
    frame #2: 0x056f9008 Chromium Framework`v8::internal::Debug::SetBreakPointForScript(this=<unavailable>, script=Handle<v8::internal::Script> at 0xbb447b74, break_point_object=Handle<v8::internal::Object> at 0xbb447b78, source_position=<unavailable>, alignment=<unavailable>) + 920 at debug.cc:1145
    frame #3: 0x05c03a68 Chromium Framework`v8::internal::Runtime_SetScriptBreakPoint(int, v8::internal::Object**, v8::internal::Isolate*) + 1519 at runtime.cc:12822
    frame #4: 0x05c03479 Chromium Framework`v8::internal::Runtime_SetScriptBreakPoint(args_length=<unavailable>, args_object=<unavailable>, isolate=0x7d287400) + 105 at runtime.cc:12802
    frame #5: 0x5740a556
    frame #6: 0x57473412
    frame #7: 0x49af14fa
    frame #8: 0x49af12ac
    frame #9: 0x49af10c6
    frame #10: 0x5744a755
    frame #11: 0x57418a4a
    frame #12: 0x0576fa6d Chromium Framework`v8::internal::Invoke(is_construct=<unavailable>, function=<unavailable>, receiver=<unavailable>, argc=<unavailable>, args=<unavailable>) + 1581 at execution.cc:91
    frame #13: 0x0576ee0c Chromium Framework`v8::internal::Execution::Call(isolate=<unavailable>, callable=Handle<v8::internal::Object> at 0xbb447e24, receiver=Handle<v8::internal::Object> at 0xbb447e28, argc=<unavailable>, argv=<unavailable>, convert_receiver=<unavailable>) + 1900 at execution.cc:141
    frame #14: 0x05703e00 Chromium Framework`v8::internal::Debug::Call(this=<unavailable>, fun=Handle<v8::internal::JSFunction> at 0xbb447ec4, data=Handle<v8::internal::Object> at 0xbb447ec8) + 512 at debug.cc:3020
    frame #15: 0x05587c5a Chromium Framework`v8::Debug::Call(fun=(val_ = v8::Function * = 0x7ce0eb30), data=(val_ = v8::Value * = 0x7ce0eafc)) + 586 at api.cc:7047
    frame #16: 0x077e30e8 Chromium Framework`blink::ScriptDebugServer::setBreakpoint(this=0x808e5110, sourceID=0xbb448a60, scriptBreakpoint=0xbb448640, actualLineNumber=0xbb4484c4, actualColumnNumber=0xbb4484c0, interstatementLocation=false) + 2280 at ScriptDebugServer.cpp:103
    frame #17: 0x06d810a0 Chromium Framework`blink::InspectorDebuggerAgent::resolveBreakpoint(this=0x26f88690, breakpointId=0x270279b0, scriptId=0xbb448a60, breakpoint=0xbb448640, source=UserBreakpointSource) + 448 at InspectorDebuggerAgent.cpp:617
    frame #18: 0x06d8a456 Chromium Framework`blink::InspectorDebuggerAgent::didParseSource(this=0x26f88690, scriptId=0xbb448a60, parsedScript=0xbb448a38, compileResult=CompileSuccess) + 2214 at InspectorDebuggerAgent.cpp:1363
    frame #19: 0x06d8a69b Chromium Framework`non-virtual thunk to blink::InspectorDebuggerAgent::didParseSource(this=0x26f886a0, scriptId=0xbb448a60, parsedScript=0xbb448a38, compileResult=CompileSuccess) + 91 at InspectorDebuggerAgent.cpp:1367
    frame #20: 0x077e9733 Chromium Framework`blink::ScriptDebugServer::dispatchDidParseSource(this=0x808e5110, listener=0x26f886a0, object=(val_ = v8::Object * = 0x7ce0ea70), compileResult=CompileSuccess) + 2531 at ScriptDebugServer.cpp:575
    frame #21: 0x077e859c Chromium Framework`blink::ScriptDebugServer::handleV8DebugEvent(this=0x808e5110, eventDetails=0xbb448fd8) + 1756 at ScriptDebugServer.cpp:509
    frame #22: 0x077e7ea0 Chromium Framework`blink::ScriptDebugServer::v8DebugEventCallback(eventDetails=0xbb448fd8) + 80 at ScriptDebugServer.cpp:470
    frame #23: 0x05702a40 Chromium Framework`v8::internal::Debug::CallEventCallback(this=0x808bfed0, event=<unavailable>, exec_state=Handle<v8::internal::Object> at 0xbb449028, event_data=Handle<v8::internal::Object> at 0xbb44902c, client_data=<unavailable>) + 1392 at debug.cc:2767
    frame #24: 0x05700834 Chromium Framework`v8::internal::Debug::ProcessDebugEvent(this=0x808bfed0, event=AfterCompile, event_data=Handle<v8::internal::JSObject> at 0xbb4490c8, auto_continue=<unavailable>) + 372 at debug.cc:2735
    frame #25: 0x05701243 Chromium Framework`v8::internal::Debug::OnAfterCompile(this=<unavailable>, script=Handle<v8::internal::Script> at 0xbb4491d4) + 1219 at debug.cc:2672
    frame #26: 0x056cb02d Chromium Framework`v8::internal::CompileToplevel(info=<unavailable>) + 3325 at compiler.cc:922
    frame #27: 0x056cbab4 Chromium Framework`v8::internal::Compiler::CompileScript(source=Handle<v8::internal::String> at 0xbb449470, script_name=Handle<v8::internal::Object> at 0xbb449474, line_offset=<unavailable>, column_offset=<unavailable>, is_shared_cross_origin=<unavailable>, context=Handle<v8::internal::Context> at 0xbb449484, extension=<unavailable>, cached_data=<unavailable>, compile_options=<unavailable>, natives=<unavailable>) + 2644 at compiler.cc:1053
    frame #28: 0x0554f831 Chromium Framework`v8::ScriptCompiler::CompileUnbound(v8_isolate=<unavailable>, source=<unavailable>, options=<unavailable>) + 849 at api.cc:1788
    frame #29: 0x0554fdf2 Chromium Framework`v8::ScriptCompiler::Compile(v8_isolate=0x7d287400, source=<unavailable>, options=<unavailable>) + 226 at api.cc:1826
    frame #30: 0x07891899 Chromium Framework`blink::(anonymous namespace)::compileAndConsumeCache(isolate=0x7d287400, code=(val_ = v8::String * = 0x7d29361c), origin=ScriptOrigin at 0xbb449658, resource=0x26f5d610, options=kConsumeParserCache, cacheTag=21236694) + 585 at V8ScriptRunner.cpp:91
    frame #31: 0x07891307 Chromium Framework`blink::V8ScriptRunner::compileScript(code=(val_ = v8::String * = 0x7d29361c), fileName=0xbb44a114, scriptStartPosition=0xbb44a11c, resource=0x26f5d610, streamer=0x00000000, isolate=0x7d287400, corsStatus=NotSharableCrossOrigin, cacheOptions=V8CacheOptionsOff) + 3975 at V8ScriptRunner.cpp:155
    frame #32: 0x07890350 Chromium Framework`blink::V8ScriptRunner::compileScript(source=0xbb44a0c0, isolate=0x7d287400, corsStatus=NotSharableCrossOrigin, cacheOptions=V8CacheOptionsOff) + 208 at V8ScriptRunner.cpp:98
    frame #33: 0x077d4461 Chromium Framework`blink::ScriptController::executeScriptAndReturnValue(this=0x7afc76f0, context=(val_ = v8::Context * = 0x7d293618), source=0xbb44a0c0, corsStatus=NotSharableCrossOrigin, compilationFinishTime=0xbb44a058) + 1185 at ScriptController.cpp:189
    frame #34: 0x077d71c0 Chromium Framework`blink::ScriptController::evaluateScriptInMainWorld(this=0x7afc76f0, sourceCode=0xbb44a0c0, corsStatus=NotSharableCrossOrigin, policy=DoNotExecuteScriptWhenScriptsDisabled, compilationFinishTime=0xbb44a058) + 752 at ScriptController.cpp:610
    frame #35: 0x077d754d Chromium Framework`blink::ScriptController::executeScriptInMainWorld(this=0x7afc76f0, sourceCode=0xbb44a0c0, corsStatus=NotSharableCrossOrigin, compilationFinishTime=0xbb44a058) + 125 at ScriptController.cpp:578
    frame #36: 0x0618d9ad Chromium Framework`blink::ScriptLoader::executeScript(this=0x7bf71500, sourceCode=0xbb44a0c0, compilationFinishTime=0xbb44a058) + 1933 at ScriptLoader.cpp:347
    frame #37: 0x065c0acb Chromium Framework`blink::HTMLScriptRunner::executePendingScriptAndDispatchEvent(this=0x4b930da8, pendingScript=0x4b930db4, pendingScriptType=PendingScriptBlockingParser) + 875 at HTMLScriptRunner.cpp:157
    frame #38: 0x065c0731 Chromium Framework`blink::HTMLScriptRunner::executeParsingBlockingScript(this=0x4b930da8) + 657 at HTMLScriptRunner.cpp:125
    frame #39: 0x065c170a Chromium Framework`blink::HTMLScriptRunner::executeParsingBlockingScripts(this=0x4b930da8) + 122 at HTMLScriptRunner.cpp:210
    frame #40: 0x065c195e Chromium Framework`blink::HTMLScriptRunner::executeScriptsWaitingForLoad(this=0x4b930da8, resource=0x26f5d610) + 558 at HTMLScriptRunner.cpp:219
    frame #41: 0x06588a3a Chromium Framework`blink::HTMLDocumentParser::notifyScriptLoaded(this=0x26f18c90, cachedResource=0x26f5d610) + 394 at HTMLDocumentParser.cpp:997
    frame #42: 0x06588adf Chromium Framework`non-virtual thunk to blink::HTMLDocumentParser::notifyScriptLoaded(this=0x26f18cd4, cachedResource=0x26f5d610) + 63 at HTMLDocumentParser.cpp:1000
    frame #43: 0x065c0f1a Chromium Framework`blink::HTMLScriptRunner::notifyFinished(this=0x4b930da8, cachedResource=0x26f5d610) + 234 at HTMLScriptRunner.cpp:176
    frame #44: 0x06b7c442 Chromium Framework`blink::Resource::didAddClient(this=0x26f5d610, c=0x4b930da8) + 98 at Resource.cpp:468
    frame #45: 0x06bbefc3 Chromium Framework`blink::ScriptResource::didAddClient(this=0x26f5d610, client=0x4b930da8) + 195 at ScriptResource.cpp:55
    frame #46: 0x06b7ddb1 Chromium Framework`blink::Resource::switchClientsToRevalidatedResource(this=0x26f58390) + 1921 at Resource.cpp:732
    frame #47: 0x06b7bab5 Chromium Framework`blink::Resource::revalidationSucceeded(this=0x26f58390, response=0x84593438) + 677 at Resource.cpp:771
    frame #48: 0x06b7b7ac Chromium Framework`blink::Resource::responseReceived(this=0x26f58390, response=0x84593438) + 236 at Resource.cpp:400
    frame #49: 0x06bbaea1 Chromium Framework`blink::ResourceLoader::didReceiveResponse(this=0x26f64390, (null)=0x7bf6b100, response=0xbb44a950) + 1185 at ResourceLoader.cpp:379
    frame #50: 0x0ca76cdc Chromium Framework`content::WebURLLoaderImpl::Context::OnReceivedResponse(this=0x7bf5b130, info=0xbb44ab80) + 812 at web_url_loader_impl.cc:551
    frame #51: 0x0ca14909 Chromium Framework`content::ResourceDispatcher::OnReceivedResponse(this=0x7af9f960, request_id=127, response_head=0xbb44ae44) + 1065 at resource_dispatcher.cc:376
    frame #52: 0x0ca19d17 Chromium Framework`void DispatchToMethod<content::ResourceDispatcher, void (obj=0x7af9f960, method=0x0ca144e0, arg=0xbb44ae40)(int, content::ResourceResponseHead const&), int, content::ResourceResponseHead>(content::ResourceDispatcher*, void (content::ResourceDispatcher::*)(int, content::ResourceResponseHead const&), Tuple2<int, content::ResourceResponseHead> const&) + 183 at tuple.h:555
    frame #53: 0x0ca18d43 Chromium Framework`bool ResourceMsg_ReceivedResponse::Dispatch<content::ResourceDispatcher, content::ResourceDispatcher, void, void (msg=0x7b914e98, obj=0x7af9f960, sender=0x7af9f960, parameter=0x00000000, func=0x0ca144e0)(int, content::ResourceResponseHead const&)>(IPC::Message const*, content::ResourceDispatcher*, content::ResourceDispatcher*, void*, void (content::ResourceDispatcher::*)(int, content::ResourceResponseHead const&)) + 227 at resource_messages.h:260
    frame #54: 0x0ca13e4e Chromium Framework`content::ResourceDispatcher::DispatchMessage(this=0x7af9f960, message=0x7b914e98) + 830 at resource_dispatcher.cc:708
    frame #55: 0x0ca1343c Chromium Framework`content::ResourceDispatcher::OnMessageReceived(this=0x7af9f960, message=0x7b914e98) + 1084 at resource_dispatcher.cc:319
    frame #56: 0x0c90cbe0 Chromium Framework`content::ChildThread::OnMessageReceived(this=0x7ca79204, msg=0x7b914e98) + 160 at child_thread.cc:459
    frame #57: 0x029a2ed0 Chromium Framework`IPC::ChannelProxy::Context::OnDispatchMessage(this=0x7af9f670, message=0x7b914e98) + 576 at ipc_channel_proxy.cc:274
    frame #58: 0x029acf44 Chromium Framework`base::internal::RunnableAdapter<void (this=0xbb44b7d0, object=0x7af9f670, a1=0x7b914e98)(IPC::Message const&)>::Run(IPC::ChannelProxy::Context*, IPC::Message const&) + 148 at bind_internal.h:190
    frame #59: 0x029ace4f Chromium Framework`base::internal::InvokeHelper<false, void, base::internal::RunnableAdapter<void (runnable=(method_ = 0x029a2c90), a1=0x7b914e94, a2=0x7b914e98)(IPC::Message const&)>, void (IPC::ChannelProxy::Context* const&, IPC::Message const&)>::MakeItSo(base::internal::RunnableAdapter<void (IPC::ChannelProxy::Context::*)(IPC::Message const&)>, IPC::ChannelProxy::Context* const&, IPC::Message const&) + 95 at bind_internal.h:898
    frame #60: 0x029acd84 Chromium Framework`base::internal::Invoker<2, base::internal::BindState<base::internal::RunnableAdapter<void (base=0x7b914e80)(IPC::Message const&)>, void (IPC::ChannelProxy::Context*, IPC::Message const&), void (IPC::ChannelProxy::Context*, IPC::Message)>, void (IPC::ChannelProxy::Context*, IPC::Message const&)>::Run(base::internal::BindStateBase*) + 148 at bind_internal.h:1248
    frame #61: 0x090dc62f Chromium Framework`base::Callback<void (this=0xbb44bbe4)>::Run() const + 63 at callback.h:401
    frame #62: 0x019fa04c Chromium Framework`base::debug::TaskAnnotator::RunTask(this=0x7b93797c, queue_function=0x0da03cfc, run_function=0x0da03d12, pending_task=0xbb44bbd0) + 1084 at task_annotator.cc:62
    frame #63: 0x01ac31be Chromium Framework`base::MessageLoop::RunTask(this=0x7b9378c0, pending_task=0xbb44bbd0) + 750 at message_loop.cc:446
    frame #64: 0x01ac3372 Chromium Framework`base::MessageLoop::DeferOrRunPendingTask(this=0x7b9378c0, pending_task=0xbb44bbd0) + 98 at message_loop.cc:456
    frame #65: 0x01ac3641 Chromium Framework`base::MessageLoop::DoWork(this=0x7b9378c0) + 321 at message_loop.cc:565
    frame #66: 0x019c4c35 Chromium Framework`base::MessagePumpCFRunLoopBase::RunWork(this=0x7b937a30) + 101 at message_pump_mac.mm:325
    frame #67: 0x019c4051 Chromium Framework`base::MessagePumpCFRunLoopBase::RunWorkSource(info=0x7b937a30) + 49 at message_pump_mac.mm:303
    frame #68: 0x9b629b5f CoreFoundation`__CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__ + 15
    frame #69: 0x9b61a95b CoreFoundation`__CFRunLoopDoSources0 + 235
    frame #70: 0x9b61a05e CoreFoundation`__CFRunLoopRun + 1022
    frame #71: 0x9b6199ea CoreFoundation`CFRunLoopRunSpecific + 394
    frame #72: 0x9b61984b CoreFoundation`CFRunLoopRunInMode + 123
    frame #73: 0x019c525d Chromium Framework`base::MessagePumpCFRunLoop::DoRun(this=0x7b937a30, delegate=0x7b9378c0) + 109 at message_pump_mac.mm:538
    frame #74: 0x019c4848 Chromium Framework`base::MessagePumpCFRunLoopBase::Run(this=0x7b937a30, delegate=0x7b9378c0) + 104 at message_pump_mac.mm:235
    frame #75: 0x01ac2b7c Chromium Framework`base::MessageLoop::RunHandler(this=0x7b9378c0) + 300 at message_loop.cc:415
    frame #76: 0x01b253e3 Chromium Framework`base::RunLoop::Run(this=0xbb44cd88) + 83 at run_loop.cc:54
    frame #77: 0x01ac1e87 Chromium Framework`base::MessageLoop::Run(this=0x7b9378c0) + 55 at message_loop.cc:308
    frame #78: 0x01b96452 Chromium Framework`base::Thread::Run(this=0x7af9e580, message_loop=0x7b9378c0) + 50 at thread.cc:174
    frame #79: 0x01b96767 Chromium Framework`base::Thread::ThreadMain(this=0x7af9e580) + 631 at thread.cc:228
    frame #80: 0x01b7ff98 Chromium Framework`base::(anonymous namespace)::ThreadFunc(params=0xbff1fe88) + 296 at platform_thread_posix.cc:80
    frame #81: 0x940e45fb libsystem_pthread.dylib`_pthread_body + 144
    frame #82: 0x940e4485 libsystem_pthread.dylib`_pthread_start + 130
    frame #83: 0x940e9cf2 libsystem_pthread.dylib`thread_start + 34
```

- doesn't contain any of the MouseDown frames, but extra frames due to loading the page and initializing devtools

### Backend 3

```
* thread #28: tid = 0xa4761, 0x056a8967 Chromium Framework`v8::internal::BreakLocationIterator::SetDebugBreak(this=0xbbc493d8) + 135 at debug.cc:336, name = 'Chrome_InProcRendererThread', stop reason = step over
  * frame #0: 0x056a8967 Chromium Framework`v8::internal::BreakLocationIterator::SetDebugBreak(this=0xbbc493d8) + 135 at debug.cc:336
    frame #1: 0x056a85b4 Chromium Framework`v8::internal::BreakLocationIterator::SetBreakPoint(this=0xbbc493d8, break_point_object=Handle<v8::internal::Object> at 0xbbc49394) + 52 at debug.cc:272
    frame #2: 0x056b3d08 Chromium Framework`v8::internal::Debug::SetBreakPointForScript(this=<unavailable>, script=Handle<v8::internal::Script> at 0xbbc49444, break_point_object=Handle<v8::internal::Object> at 0xbbc49448, source_position=<unavailable>, alignment=<unavailable>) + 920 at debug.cc:1145
    frame #3: 0x05bbe768 Chromium Framework`v8::internal::Runtime_SetScriptBreakPoint(int, v8::internal::Object**, v8::internal::Isolate*) + 1519 at runtime.cc:12822
    frame #4: 0x05bbe179 Chromium Framework`v8::internal::Runtime_SetScriptBreakPoint(args_length=<unavailable>, args_object=<unavailable>, isolate=0x7a378a00) + 105 at runtime.cc:12802
    frame #5: 0x3300a556
    frame #6: 0x5e41a7d2
    frame #7: 0x57b36ffa
    frame #8: 0x57b36dac
    frame #9: 0x57b36bc6
    frame #10: 0x3304a755
    frame #11: 0x33018a4a
    frame #12: 0x0572a76d Chromium Framework`v8::internal::Invoke(is_construct=<unavailable>, function=<unavailable>, receiver=<unavailable>, argc=<unavailable>, args=<unavailable>) + 1581 at execution.cc:91
    frame #13: 0x05729b0c Chromium Framework`v8::internal::Execution::Call(isolate=<unavailable>, callable=Handle<v8::internal::Object> at 0xbbc496f4, receiver=Handle<v8::internal::Object> at 0xbbc496f8, argc=<unavailable>, argv=<unavailable>, convert_receiver=<unavailable>) + 1900 at execution.cc:141
    frame #14: 0x056beb00 Chromium Framework`v8::internal::Debug::Call(this=<unavailable>, fun=Handle<v8::internal::JSFunction> at 0xbbc49794, data=Handle<v8::internal::Object> at 0xbbc49798) + 512 at debug.cc:3020
    frame #15: 0x0554295a Chromium Framework`v8::Debug::Call(fun=(val_ = v8::Function * = 0x7bb5291c), data=(val_ = v8::Value * = 0x7bb528ec)) + 586 at api.cc:7047
    frame #16: 0x0779dde8 Chromium Framework`blink::ScriptDebugServer::setBreakpoint(this=0x7953f070, sourceID=0x58308940, scriptBreakpoint=0xbbc49f10, actualLineNumber=0xbbc49d94, actualColumnNumber=0xbbc49d90, interstatementLocation=false) + 2280 at ScriptDebugServer.cpp:103
    frame #17: 0x06d3bda0 Chromium Framework`blink::InspectorDebuggerAgent::resolveBreakpoint(this=0x26f88de0, breakpointId=0xbbc49ff8, scriptId=0x58308940, breakpoint=0xbbc49f10, source=UserBreakpointSource) + 448 at InspectorDebuggerAgent.cpp:617
    frame #18: 0x06d3b5c8 Chromium Framework`blink::InspectorDebuggerAgent::setBreakpointByUrl(this=0x26f88de0, errorString=0xbbc4a1c0, lineNumber=37196, optionalURL=0xbbc4a200, optionalURLRegex=0x00000000, optionalColumnNumber=0xbbc4a1f0, optionalCondition=0xbbc4a1e8, isAntiBreakpoint=0x00000000, outBreakpointId=0xbbc4a1e0, locations=0xbbc4a1d8) + 2344 at InspectorDebuggerAgent.cpp:372
    frame #19: 0x06d3c182 Chromium Framework`non-virtual thunk to blink::InspectorDebuggerAgent::setBreakpointByUrl(this=0x26f88df4, errorString=0xbbc4a1c0, lineNumber=37196, optionalURL=0xbbc4a200, optionalURLRegex=0x00000000, optionalColumnNumber=0xbbc4a1f0, optionalCondition=0xbbc4a1e8, isAntiBreakpoint=0x00000000, outBreakpointId=0xbbc4a1e0, locations=0xbbc4a1d8) + 226 at InspectorDebuggerAgent.cpp:378
    frame #20: 0x08063438 Chromium Framework`blink::InspectorBackendDispatcherImpl::Debugger_setBreakpointByUrl(this=0x26e7c110, callId=36, requestMessageObject=0x478b0888, protocolErrors=0x478bd2a0) + 1352 at InspectorBackendDispatcher.cpp:4110
    frame #21: 0x08077098 Chromium Framework`blink::InspectorBackendDispatcherImpl::dispatch(this=0x26e7c110, message=0xbbc4a458) + 2344 at InspectorBackendDispatcher.cpp:6233
    frame #22: 0x06cf4ae9 Chromium Framework`blink::InspectorController::dispatchMessageFromFrontend(this=0x26e88010, message=0xbbc4a458) + 105 at InspectorController.cpp:374
    frame #23: 0x05e889ec Chromium Framework`blink::WebDevToolsAgentImpl::dispatchOnInspectorBackend(this=0x7c842020, message=0xbbc4a490) + 92 at WebDevToolsAgentImpl.cpp:526
    frame #24: 0x05e8c5d1 Chromium Framework`blink::DebuggerTask::run(this=0x78668b30) + 145 at WebDevToolsAgentImpl.cpp:194
    frame #25: 0x077a2c4e Chromium Framework`blink::ScriptDebugServer::handleV8DebugEvent(this=0x7953f070, eventDetails=0xbbc4a938) + 142 at ScriptDebugServer.cpp:486
    frame #26: 0x077a2ba0 Chromium Framework`blink::ScriptDebugServer::v8DebugEventCallback(eventDetails=0xbbc4a938) + 80 at ScriptDebugServer.cpp:470
    frame #27: 0x056bd740 Chromium Framework`v8::internal::Debug::CallEventCallback(this=0x7953d9a0, event=<unavailable>, exec_state=Handle<v8::internal::Object> at 0xbbc4a988, event_data=Handle<v8::internal::Object> at 0xbbc4a98c, client_data=<unavailable>) + 1392 at debug.cc:2767
    frame #28: 0x056bb659 Chromium Framework`v8::internal::Debug::ProcessDebugEvent(this=0x7953d9a0, event=<unavailable>, event_data=Handle<v8::internal::JSObject> at 0xbbc4aa28, auto_continue=<unavailable>) + 665 at debug.cc:2742
    frame #29: 0x056b090b Chromium Framework`v8::internal::Debug::OnDebugBreak(this=<unavailable>, break_points_hit=Handle<v8::internal::Object> at 0xbbc4aa74, auto_continue=<unavailable>) + 491 at debug.cc:2599
    frame #30: 0x056bf02c Chromium Framework`v8::internal::Debug::ProcessDebugMessages(this=<unavailable>, debug_command_only=<unavailable>) + 156 at debug.cc:3074
    frame #31: 0x056bef78 Chromium Framework`v8::internal::Debug::HandleDebugBreak(this=<unavailable>) + 1000 at debug.cc:3058
    frame #32: 0x0572de35 Chromium Framework`v8::internal::StackGuard::HandleInterrupts(this=0x7a37bea4) + 277 at execution.cc:681
    frame #33: 0x05ba517a Chromium Framework`v8::internal::Runtime_StackGuard(int, v8::internal::Object**, v8::internal::Isolate*) [inlined] v8::internal::__RT_impl_Runtime_StackGuard(v8::internal::Arguments, v8::internal::Isolate*) + 199 at runtime.cc:9544
    frame #34: 0x05ba50b3 Chromium Framework`v8::internal::Runtime_StackGuard(args_length=<unavailable>, args_object=0xbbc4acf0, isolate=<unavailable>) + 99 at runtime.cc:9534
    frame #35: 0x3300a556
    frame #36: 0x57b5d248
    frame #37: 0x3304a755
    frame #38: 0x33018a4a
    frame #39: 0x0572a76d Chromium Framework`v8::internal::Invoke(is_construct=<unavailable>, function=<unavailable>, receiver=<unavailable>, argc=<unavailable>, args=<unavailable>) + 1581 at execution.cc:91
    frame #40: 0x05729b0c Chromium Framework`v8::internal::Execution::Call(isolate=<unavailable>, callable=Handle<v8::internal::Object> at 0xbbc4ae44, receiver=Handle<v8::internal::Object> at 0xbbc4ae48, argc=<unavailable>, argv=<unavailable>, convert_receiver=<unavailable>) + 1900 at execution.cc:141
    frame #41: 0x0552ab55 Chromium Framework`v8::Function::Call(this=<unavailable>, recv=(val_ = v8::Value * = 0x7bb52880), argc=<unavailable>, argv=<unavailable>) + 821 at api.cc:4141
    frame #42: 0x0784da85 Chromium Framework`blink::V8ScriptRunner::callFunction(function=(val_ = v8::Function * = 0x7bb52864), context=0x39005888, receiver=(val_ = v8::Value * = 0x7bb52880), argc=1, args=0xbbc4b1e0, isolate=0x7a378a00) + 645 at V8ScriptRunner.cpp:224
    frame #43: 0x0778eab2 Chromium Framework`blink::ScriptController::callFunction(context=0x39005888, function=(val_ = v8::Function * = 0x7bb52864), receiver=(val_ = v8::Value * = 0x7bb52880), argc=1, info=0xbbc4b1e0, isolate=0x7a378a00) + 1154 at ScriptController.cpp:163
    frame #44: 0x0778e5eb Chromium Framework`blink::ScriptController::callFunction(this=0x7e53bae0, function=(val_ = v8::Function * = 0x7bb52864), receiver=(val_ = v8::Value * = 0x7bb52880), argc=1, info=0xbbc4b1e0) + 203 at ScriptController.cpp:146
    frame #45: 0x07811766 Chromium Framework`blink::V8EventListener::callListenerFunction(this=0x2ab6ff78, jsEvent=(val_ = v8::Value * = 0x7bb52838), event=0x4799bb20) + 646 at V8EventListener.cpp:88
    frame #46: 0x077f4dd5 Chromium Framework`blink::V8AbstractEventListener::invokeEventHandler(this=0x2ab6ff78, event=0x4799bb20, jsEvent=Local<v8::Value> at 0xbbc4b4c8) + 741 at V8AbstractEventListener.cpp:128
    frame #47: 0x077f4a83 Chromium Framework`blink::V8AbstractEventListener::handleEvent(this=0x2ab6ff78, (null)=0x39005888, event=0x4799bb20) + 787 at V8AbstractEventListener.cpp:98
    frame #48: 0x0622b74f Chromium Framework`blink::EventTarget::fireEventListeners(this=0x3900581c, event=0x4799bb20, d=0x2ab2d8f0, entry=0x478b4198) + 1455 at EventTarget.cpp:351
    frame #49: 0x0622ac2a Chromium Framework`blink::EventTarget::fireEventListeners(this=0x3900581c, event=0x4799bb20) + 698 at EventTarget.cpp:287
    frame #50: 0x060e7159 Chromium Framework`blink::Node::handleLocalEvents(this=0x3900581c, event=0x4799bb20) + 137 at Node.cpp:2098
    frame #51: 0x062425a8 Chromium Framework`blink::NodeEventContext::handleLocalEvents(this=0x79d8332c, event=0x4799bb20) const + 424 at NodeEventContext.cpp:67
    frame #52: 0x0620e61b Chromium Framework`blink::EventDispatcher::dispatchEventAtCapturing(this=0xbbc4b9f0, windowEventContext=0xbbc4b8d0) + 347 at EventDispatcher.cpp:160
    frame #53: 0x0620d56c Chromium Framework`blink::EventDispatcher::dispatch(this=0xbbc4b9f0) + 1596 at EventDispatcher.cpp:126
    frame #54: 0x0620bdb2 Chromium Framework`blink::EventDispatchMediator::dispatchEvent(this=0x4794ce60, dispatcher=0xbbc4b9f0) const + 194 at EventDispatchMediator.cpp:57
    frame #55: 0x06230569 Chromium Framework`blink::BlurEventDispatchMediator::dispatchEvent(this=0x4794ce60, dispatcher=0xbbc4b9f0) const + 137 at FocusEvent.cpp:100
    frame #56: 0x0620c37f Chromium Framework`blink::EventDispatcher::dispatchEvent(node=0x3906c400, mediator=PassRefPtr<blink::EventDispatchMediator> at 0xbbc4ba90) + 575 at EventDispatcher.cpp:50
    frame #57: 0x06071ec9 Chromium Framework`blink::Element::dispatchBlurEvent(this=0x3906c400, newFocusedElement=0x00000000) + 313 at Element.cpp:2147
    frame #58: 0x062e7b1e Chromium Framework`blink::HTMLFormControlElement::dispatchBlurEvent(this=0x3906c400, newFocusedElement=0x00000000) + 62 at HTMLFormControlElement.cpp:515
    frame #59: 0x063b308d Chromium Framework`blink::HTMLTextFormControlElement::dispatchBlurEvent(this=0x3906c400, newFocusedElement=0x00000000) + 125 at HTMLTextFormControlElement.cpp:95
    frame #60: 0x06f354fb Chromium Framework`blink::dispatchEventsOnWindowAndFocusedNode(document=0x3900581c, focused=false) + 235 at FocusController.cpp:150
    frame #61: 0x06f353e9 Chromium Framework`blink::FocusController::setFocused(this=0x26e05120, focused=false) + 473 at FocusController.cpp:336
    frame #62: 0x05f4f537 Chromium Framework`blink::WebViewImpl::setFocus(this=0x26e5c250, enable=false) + 103 at WebViewImpl.cpp:2054
    frame #63: 0x0cd31397 Chromium Framework`content::RenderWidget::OnSetFocus(this=0x7ac60a00, enable=false) + 103 at render_widget.cc:1165
    frame #64: 0x0ccf4c87 Chromium Framework`content::RenderViewImpl::OnSetFocus(this=0x7ac60a00, enable=false) + 71 at render_view_impl.cc:3557
    frame #65: 0x0cd42962 Chromium Framework`void DispatchToMethod<content::RenderWidget, void (obj=0x7ac60a00, method=0x000000a9, arg=0xbbc4bde0)(bool), bool>(content::RenderWidget*, void (content::RenderWidget::*)(bool), Tuple1<bool> const&) + 162 at tuple.h:548
    frame #66: 0x0cd38704 Chromium Framework`bool InputMsg_SetFocus::Dispatch<content::RenderWidget, content::RenderWidget, void, void (msg=0x786696a8, obj=0x7ac60a00, sender=0x7ac60a00, parameter=0x00000000, func=0x000000a9)(bool)>(IPC::Message const*, content::RenderWidget*, content::RenderWidget*, void*, void (content::RenderWidget::*)(bool)) + 164 at input_messages.h:168
    frame #67: 0x0cd2bee7 Chromium Framework`content::RenderWidget::OnMessageReceived(this=0x7ac60a00, message=0x786696a8) + 2231 at render_widget.cc:604
    frame #68: 0x0cce5bdb Chromium Framework`content::RenderViewImpl::OnMessageReceived(this=0x7ac60a00, message=0x786696a8) + 15243 at render_view_impl.cc:1388
    frame #69: 0x03c94ee9 Chromium Framework`content::MessageRouter::RouteMessage(this=0x79b90620, msg=0x786696a8) + 121 at message_router.cc:54
    frame #70: 0x03c94e35 Chromium Framework`content::MessageRouter::OnMessageReceived(this=0x79b90620, msg=0x786696a8) + 117 at message_router.cc:46
    frame #71: 0x0c8c846f Chromium Framework`content::ChildThread::OnMessageReceived(this=0x79b90604, msg=0x786696a8) + 2095 at child_thread.cc:494
    frame #72: 0x0295dbd0 Chromium Framework`IPC::ChannelProxy::Context::OnDispatchMessage(this=0x7e1155f0, message=0x786696a8) + 576 at ipc_channel_proxy.cc:274
    frame #73: 0x02967c44 Chromium Framework`base::internal::RunnableAdapter<void (this=0xbbc4d7d0, object=0x7e1155f0, a1=0x786696a8)(IPC::Message const&)>::Run(IPC::ChannelProxy::Context*, IPC::Message const&) + 148 at bind_internal.h:190
    frame #74: 0x02967b4f Chromium Framework`base::internal::InvokeHelper<false, void, base::internal::RunnableAdapter<void (runnable=(method_ = 0x0295d990), a1=0x786696a4, a2=0x786696a8)(IPC::Message const&)>, void (IPC::ChannelProxy::Context* const&, IPC::Message const&)>::MakeItSo(base::internal::RunnableAdapter<void (IPC::ChannelProxy::Context::*)(IPC::Message const&)>, IPC::ChannelProxy::Context* const&, IPC::Message const&) + 95 at bind_internal.h:898
    frame #75: 0x02967a84 Chromium Framework`base::internal::Invoker<2, base::internal::BindState<base::internal::RunnableAdapter<void (base=0x78669690)(IPC::Message const&)>, void (IPC::ChannelProxy::Context*, IPC::Message const&), void (IPC::ChannelProxy::Context*, IPC::Message)>, void (IPC::ChannelProxy::Context*, IPC::Message const&)>::Run(base::internal::BindStateBase*) + 148 at bind_internal.h:1248
    frame #76: 0x0909732f Chromium Framework`base::Callback<void (this=0xbbc4dbe4)>::Run() const + 63 at callback.h:401
    frame #77: 0x019b4d4c Chromium Framework`base::debug::TaskAnnotator::RunTask(this=0x791a482c, queue_function=0x0d9bec9c, run_function=0x0d9becb2, pending_task=0xbbc4dbd0) + 1084 at task_annotator.cc:62
    frame #78: 0x01a7debe Chromium Framework`base::MessageLoop::RunTask(this=0x791a4770, pending_task=0xbbc4dbd0) + 750 at message_loop.cc:446
    frame #79: 0x01a7e072 Chromium Framework`base::MessageLoop::DeferOrRunPendingTask(this=0x791a4770, pending_task=0xbbc4dbd0) + 98 at message_loop.cc:456
    frame #80: 0x01a7e341 Chromium Framework`base::MessageLoop::DoWork(this=0x791a4770) + 321 at message_loop.cc:565
    frame #81: 0x0197f935 Chromium Framework`base::MessagePumpCFRunLoopBase::RunWork(this=0x791a48e0) + 101 at message_pump_mac.mm:325
    frame #82: 0x0197ed51 Chromium Framework`base::MessagePumpCFRunLoopBase::RunWorkSource(info=0x791a48e0) + 49 at message_pump_mac.mm:303
    frame #83: 0x9b629b5f CoreFoundation`__CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__ + 15
    frame #84: 0x9b61a95b CoreFoundation`__CFRunLoopDoSources0 + 235
    frame #85: 0x9b61a05e CoreFoundation`__CFRunLoopRun + 1022
    frame #86: 0x9b6199ea CoreFoundation`CFRunLoopRunSpecific + 394
    frame #87: 0x9b61984b CoreFoundation`CFRunLoopRunInMode + 123
    frame #88: 0x0197ff5d Chromium Framework`base::MessagePumpCFRunLoop::DoRun(this=0x791a48e0, delegate=0x791a4770) + 109 at message_pump_mac.mm:538
    frame #89: 0x0197f548 Chromium Framework`base::MessagePumpCFRunLoopBase::Run(this=0x791a48e0, delegate=0x791a4770) + 104 at message_pump_mac.mm:235
    frame #90: 0x01a7d87c Chromium Framework`base::MessageLoop::RunHandler(this=0x791a4770) + 300 at message_loop.cc:415
    frame #91: 0x01ae00e3 Chromium Framework`base::RunLoop::Run(this=0xbbc4ed88) + 83 at run_loop.cc:54
    frame #92: 0x01a7cb87 Chromium Framework`base::MessageLoop::Run(this=0x791a4770) + 55 at message_loop.cc:308
    frame #93: 0x01b51152 Chromium Framework`base::Thread::Run(this=0x7e115410, message_loop=0x791a4770) + 50 at thread.cc:174
    frame #94: 0x01b51467 Chromium Framework`base::Thread::ThreadMain(this=0x7e115410) + 631 at thread.cc:228
    frame #95: 0x01b3ac98 Chromium Framework`base::(anonymous namespace)::ThreadFunc(params=0xbff63eb8) + 296 at platform_thread_posix.cc:80
    frame #96: 0x940e45fb libsystem_pthread.dylib`_pthread_body + 144
    frame #97: 0x940e4485 libsystem_pthread.dylib`_pthread_start + 130
    frame #98: 0x940e9cf2 libsystem_pthread.dylib`thread_start + 34
```

- this was produced by right clicking and choosing "Set BreakPoint", which is why we can see a Blur Event being
  processed as well

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

### Backend 1

```
* thread #28: tid = 0xa4761, 0x056a8e40 Chromium Framework`v8::internal::BreakLocationIterator::ClearDebugBreak(this=0xbbc495c8) + 144 at debug.cc:356, name = 'Chrome_InProcRendererThread', stop reason = breakpoint 17.1
* frame #0: 0x056a8e40 Chromium Framework`v8::internal::BreakLocationIterator::ClearDebugBreak(this=0xbbc495c8) + 144 at debug.cc:356
  frame #1: 0x056a9060 Chromium Framework`v8::internal::BreakLocationIterator::ClearOneShot(this=0xbbc495c8) + 160 at debug.cc:321
  frame #2: 0x056b6f48 Chromium Framework`v8::internal::Debug::ClearOneShot(this=0x7953d9a0) + 168 at debug.cc:1672
  frame #3: 0x056ade22 Chromium Framework`v8::internal::Debug::Break(v8::internal::Arguments, v8::internal::JavaScriptFrame*) [inlined] v8::internal::Debug::ClearStepping(this=0x7953d9a0) + 8 at debug.cc:1650
  frame #4: 0x056ade1a Chromium Framework`v8::internal::Debug::Break(this=0x7953d9a0, args=Arguments at 0xbbc49814, frame=<unavailable>) + 1962 at debug.cc:932
  frame #5: 0x056b0ae4 Chromium Framework`v8::internal::Debug_Break(int, v8::internal::Object**, v8::internal::Isolate*) [inlined] v8::internal::__RT_impl_Debug_Break(v8::internal::Arguments, v8::internal::Isolate*) + 216 at debug.cc:987
  frame #6: 0x056b0a0c Chromium Framework`v8::internal::Debug_Break(args_length=<unavailable>, args_object=<unavailable>, isolate=<unavailable>) + 108 at debug.cc:984
  frame #7: 0x3300a556
  frame #8: 0x3304dabd
  frame #9: 0x5e41afaa
  frame #10: 0x3c2c524c
  frame #11: 0x3300bc3b
  frame #12: 0x3c273566
  frame #13: 0x3c2c4e40
  frame #14: 0x3300bc3b
  frame #15: 0x3304a750
  frame #16: 0x33018a4a
  frame #17: 0x0572a76d Chromium Framework`v8::internal::Invoke(is_construct=<unavailable>, function=<unavailable>, receiver=<unavailable>, argc=<unavailable>, args=<unavailable>) + 1581 at execution.cc:91
  frame #18: 0x05729b0c Chromium Framework`v8::internal::Execution::Call(isolate=<unavailable>, callable=Handle<v8::internal::Object> at 0xbbc49be4, receiver=Handle<v8::internal::Object> at 0xbbc49be8, argc=<unavailable>, argv=<unavailable>, convert_receiver=<unavailable>) + 1900 at execution.cc:141
  frame #19: 0x05b9f2ad Chromium Framework`v8::internal::Runtime_Apply(int, v8::internal::Object**, v8::internal::Isolate*) + 266 at runtime.cc:8979
  frame #20: 0x05b9f1a3 Chromium Framework`v8::internal::Runtime_Apply(args_length=0, args_object=<unavailable>, isolate=0x7a378a00) + 1379 at runtime.cc:8947
  frame #21: 0x3300a556
  frame #22: 0x5e4eec03
  frame #23: 0x3300bc3b
  frame #24: 0x3c273566
  frame #25: 0x3c2c275d
  frame #26: 0x3300bc3b
  frame #27: 0x3304a750
  frame #28: 0x33018a4a
  frame #29: 0x0572a76d Chromium Framework`v8::internal::Invoke(is_construct=<unavailable>, function=<unavailable>, receiver=<unavailable>, argc=<unavailable>, args=<unavailable>) + 1581 at execution.cc:91
  frame #30: 0x05729b0c Chromium Framework`v8::internal::Execution::Call(isolate=<unavailable>, callable=Handle<v8::internal::Object> at 0xbbc49ee4, receiver=Handle<v8::internal::Object> at 0xbbc49ee8, argc=<unavailable>, argv=<unavailable>, convert_receiver=<unavailable>) + 1900 at execution.cc:141
  frame #31: 0x05b9f2ad Chromium Framework`v8::internal::Runtime_Apply(int, v8::internal::Object**, v8::internal::Isolate*) + 266 at runtime.cc:8979
  frame #32: 0x05b9f1a3 Chromium Framework`v8::internal::Runtime_Apply(args_length=0, args_object=<unavailable>, isolate=0x7a378a00) + 1379 at runtime.cc:8947
  frame #33: 0x3300a556
  frame #34: 0x5e4eec03
  frame #35: 0x3300bc3b
  frame #36: 0x3c273566
  frame #37: 0x3c2c1cd0
  frame #38: 0x3c2c1242
  frame #39: 0x3c2c0dba
  frame #40: 0x3c2b5688
  frame #41: 0x3c2b534f
  frame #42: 0x3300bc3b
  frame #43: 0x3c2b5282
  frame #44: 0x3300bc3b
  frame #45: 0x3c27366e
  frame #46: 0x3c2b4b89
  frame #47: 0x3300bc3b
  frame #48: 0x3c2b3e56
  frame #49: 0x3c2b3a13
  frame #50: 0x3c2b3900
  frame #51: 0x3304a755
  frame #52: 0x33018a4a
  frame #53: 0x0572a76d Chromium Framework`v8::internal::Invoke(is_construct=<unavailable>, function=<unavailable>, receiver=<unavailable>, argc=<unavailable>, args=<unavailable>) + 1581 at execution.cc:91
  frame #54: 0x05729b0c Chromium Framework`v8::internal::Execution::Call(isolate=<unavailable>, callable=Handle<v8::internal::Object> at 0xbbc4a3b4, receiver=Handle<v8::internal::Object> at 0xbbc4a3b8, argc=<unavailable>, argv=<unavailable>, convert_receiver=<unavailable>) + 1900 at execution.cc:141
  frame #55: 0x05b9f2ad Chromium Framework`v8::internal::Runtime_Apply(int, v8::internal::Object**, v8::internal::Isolate*) + 266 at runtime.cc:8979
  frame #56: 0x05b9f1a3 Chromium Framework`v8::internal::Runtime_Apply(args_length=0, args_object=<unavailable>, isolate=0x7a378a00) + 1379 at runtime.cc:8947
  frame #57: 0x3300a556
  frame #58: 0x5e4eec03
  frame #59: 0x3300bc3b
  frame #60: 0x3c2b3831
  frame #61: 0x3c2b3298
  frame #62: 0x3304a755
  frame #63: 0x33018a4a
  frame #64: 0x0572a76d Chromium Framework`v8::internal::Invoke(is_construct=<unavailable>, function=<unavailable>, receiver=<unavailable>, argc=<unavailable>, args=<unavailable>) + 1581 at execution.cc:91
  frame #65: 0x05729b0c Chromium Framework`v8::internal::Execution::Call(isolate=<unavailable>, callable=Handle<v8::internal::Object> at 0xbbc4a684, receiver=Handle<v8::internal::Object> at 0xbbc4a688, argc=<unavailable>, argv=<unavailable>, convert_receiver=<unavailable>) + 1900 at execution.cc:141
  frame #66: 0x0552ab55 Chromium Framework`v8::Function::Call(this=<unavailable>, recv=(val_ = v8::Value * = 0x7bb52880), argc=<unavailable>, argv=<unavailable>) + 821 at api.cc:4141
  frame #67: 0x0784da85 Chromium Framework`blink::V8ScriptRunner::callFunction(function=(val_ = v8::Function * = 0x7bb52864), context=0x3900407c, receiver=(val_ = v8::Value * = 0x7bb52880), argc=1, args=0xbbc4aa20, isolate=0x7a378a00) + 645 at V8ScriptRunner.cpp:224
  frame #68: 0x0778eab2 Chromium Framework`blink::ScriptController::callFunction(context=0x3900407c, function=(val_ = v8::Function * = 0x7bb52864), receiver=(val_ = v8::Value * = 0x7bb52880), argc=1, info=0xbbc4aa20, isolate=0x7a378a00) + 1154 at ScriptController.cpp:163
  frame #69: 0x0778e5eb Chromium Framework`blink::ScriptController::callFunction(this=0x7c842160, function=(val_ = v8::Function * = 0x7bb52864), receiver=(val_ = v8::Value * = 0x7bb52880), argc=1, info=0xbbc4aa20) + 203 at ScriptController.cpp:146
  frame #70: 0x07811766 Chromium Framework`blink::V8EventListener::callListenerFunction(this=0x2ab4a3e8, jsEvent=(val_ = v8::Value * = 0x7bb52838), event=0x26e89d90) + 646 at V8EventListener.cpp:88
  frame #71: 0x077f4dd5 Chromium Framework`blink::V8AbstractEventListener::invokeEventHandler(this=0x2ab4a3e8, event=0x26e89d90, jsEvent=Local<v8::Value> at 0xbbc4ad08) + 741 at V8AbstractEventListener.cpp:128
  frame #72: 0x077f4a83 Chromium Framework`blink::V8AbstractEventListener::handleEvent(this=0x2ab4a3e8, (null)=0x3900407c, event=0x26e89d90) + 787 at V8AbstractEventListener.cpp:98
  frame #73: 0x0622b74f Chromium Framework`blink::EventTarget::fireEventListeners(this=0x3906c010, event=0x26e89d90, d=0x2ab4bdc8, entry=0x2aab2508) + 1455 at EventTarget.cpp:351
  frame #74: 0x0622ac2a Chromium Framework`blink::EventTarget::fireEventListeners(this=0x3906c010, event=0x26e89d90) + 698 at EventTarget.cpp:287
  frame #75: 0x060e7159 Chromium Framework`blink::Node::handleLocalEvents(this=0x3906c010, event=0x26e89d90) + 137 at Node.cpp:2098
  frame #76: 0x062425a8 Chromium Framework`blink::NodeEventContext::handleLocalEvents(this=0x7bd1c80c, event=0x26e89d90) const + 424 at NodeEventContext.cpp:67
  frame #77: 0x0620e730 Chromium Framework`blink::EventDispatcher::dispatchEventAtTarget(this=0xbbc4b1e0) + 160 at EventDispatcher.cpp:171
  frame #78: 0x0620d585 Chromium Framework`blink::EventDispatcher::dispatch(this=0xbbc4b1e0) + 1621 at EventDispatcher.cpp:127
  frame #79: 0x0620bdb2 Chromium Framework`blink::EventDispatchMediator::dispatchEvent(this=0x47a0c908, dispatcher=0xbbc4b1e0) const + 194 at EventDispatchMediator.cpp:57
  frame #80: 0x0620c37f Chromium Framework`blink::EventDispatcher::dispatchEvent(node=0x3906c010, mediator=PassRefPtr<blink::EventDispatchMediator> at 0xbbc4b258) + 575 at EventDispatcher.cpp:50
  frame #81: 0x060e7415 Chromium Framework`blink::Node::dispatchEvent(this=0x3906c010, event=PassRefPtr<blink::Event> at 0xbbc4b2d8) + 373 at Node.cpp:2117
  frame #82: 0x0622a80a Chromium Framework`blink::EventTarget::dispatchEvent(this=0x3906c010, event=PassRefPtr<blink::Event> at 0xbbc4b488, exceptionState=0xbbc4b460) + 490 at EventTarget.cpp:189
  frame #83: 0x06f10283 Chromium Framework`blink::EventHandler::keyEvent(this=0x7c36a000, initialKeyEvent=0xbbc4b558) + 1171 at EventHandler.cpp:3041
  frame #84: 0x05f4819e Chromium Framework`blink::WebViewImpl::handleKeyEvent(this=0x26e5c010, event=0x791fb3d8) + 862 at WebViewImpl.cpp:980
  frame #85: 0x05f4859f Chromium Framework`non-virtual thunk to blink::WebViewImpl::handleKeyEvent(this=0x26e5c02c, event=0x791fb3d8) + 63 at WebViewImpl.cpp:1008
  frame #86: 0x05e4698b Chromium Framework`blink::PageWidgetDelegate::handleInputEvent(page=0x7965c400, handler=0x26e5c02c, event=0x791fb3d8, rootFrame=0x00000000) + 619 at PageWidgetDelegate.cpp:145
  frame #87: 0x05f4e613 Chromium Framework`blink::WebViewImpl::handleInputEvent(this=0x26e5c010, inputEvent=0x791fb3d8) + 2387 at WebViewImpl.cpp:2037
  frame #88: 0x0cd2d7e4 Chromium Framework`content::RenderWidget::OnHandleInputEvent(this=0x7c390600, input_event=0x791fb3d8, latency_info=0xbbc4bd0c, is_keyboard_shortcut=true) + 2964 at render_widget.cc:1044
  frame #89: 0x0cd42f5a Chromium Framework`void DispatchToMethod<content::RenderWidget, void (obj=0x7c390600, method=0x0cd2cc50, arg=0xbbc4bd08)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool), blink::WebInputEvent const*, ui::LatencyInfo, bool>(content::RenderWidget*, void (content::RenderWidget::*)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool), Tuple3<blink::WebInputEvent const*, ui::LatencyInfo, bool> const&) + 218 at tuple.h:562
  frame #90: 0x0cd38243 Chromium Framework`bool InputMsg_HandleInputEvent::Dispatch<content::RenderWidget, content::RenderWidget, void, void (msg=0x7e60aa78, obj=0x7c390600, sender=0x7c390600, parameter=0x00000000, func=0x0cd2cc50)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool)>(IPC::Message const*, content::RenderWidget*, content::RenderWidget*, void*, void (content::RenderWidget::*)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool)) + 227 at input_messages.h:110
  frame #91: 0x0cd2babe Chromium Framework`content::RenderWidget::OnMessageReceived(this=0x7c390600, message=0x7e60aa78) + 1166 at render_widget.cc:598
  frame #92: 0x0cce5bdb Chromium Framework`content::RenderViewImpl::OnMessageReceived(this=0x7c390600, message=0x7e60aa78) + 15243 at render_view_impl.cc:1388
  frame #93: 0x03c94ee9 Chromium Framework`content::MessageRouter::RouteMessage(this=0x79b90620, msg=0x7e60aa78) + 121 at message_router.cc:54
  frame #94: 0x03c94e35 Chromium Framework`content::MessageRouter::OnMessageReceived(this=0x79b90620, msg=0x7e60aa78) + 117 at message_router.cc:46
  frame #95: 0x0c8c846f Chromium Framework`content::ChildThread::OnMessageReceived(this=0x79b90604, msg=0x7e60aa78) + 2095 at child_thread.cc:494
  frame #96: 0x0295dbd0 Chromium Framework`IPC::ChannelProxy::Context::OnDispatchMessage(this=0x7e1155f0, message=0x7e60aa78) + 576 at ipc_channel_proxy.cc:274
  frame #97: 0x02967c44 Chromium Framework`base::internal::RunnableAdapter<void (this=0xbbc4d7d0, object=0x7e1155f0, a1=0x7e60aa78)(IPC::Message const&)>::Run(IPC::ChannelProxy::Context*, IPC::Message const&) + 148 at bind_internal.h:190
  frame #98: 0x02967b4f Chromium Framework`base::internal::InvokeHelper<false, void, base::internal::RunnableAdapter<void (runnable=(method_ = 0x0295d990), a1=0x7e60aa74, a2=0x7e60aa78)(IPC::Message const&)>, void (IPC::ChannelProxy::Context* const&, IPC::Message const&)>::MakeItSo(base::internal::RunnableAdapter<void (IPC::ChannelProxy::Context::*)(IPC::Message const&)>, IPC::ChannelProxy::Context* const&, IPC::Message const&) + 95 at bind_internal.h:898
  frame #99: 0x02967a84 Chromium Framework`base::internal::Invoker<2, base::internal::BindState<base::internal::RunnableAdapter<void (base=0x7e60aa60)(IPC::Message const&)>, void (IPC::ChannelProxy::Context*, IPC::Message const&), void (IPC::ChannelProxy::Context*, IPC::Message)>, void (IPC::ChannelProxy::Context*, IPC::Message const&)>::Run(base::internal::BindStateBase*) + 148 at bind_internal.h:1248
  frame #100: 0x0909732f Chromium Framework`base::Callback<void (this=0xbbc4dbe4)>::Run() const + 63 at callback.h:401
  frame #101: 0x019b4d4c Chromium Framework`base::debug::TaskAnnotator::RunTask(this=0x791a482c, queue_function=0x0d9bec9c, run_function=0x0d9becb2, pending_task=0xbbc4dbd0) + 1084 at task_annotator.cc:62
  frame #102: 0x01a7debe Chromium Framework`base::MessageLoop::RunTask(this=0x791a4770, pending_task=0xbbc4dbd0) + 750 at message_loop.cc:446
  frame #103: 0x01a7e072 Chromium Framework`base::MessageLoop::DeferOrRunPendingTask(this=0x791a4770, pending_task=0xbbc4dbd0) + 98 at message_loop.cc:456
  frame #104: 0x01a7e341 Chromium Framework`base::MessageLoop::DoWork(this=0x791a4770) + 321 at message_loop.cc:565
  frame #105: 0x0197f935 Chromium Framework`base::MessagePumpCFRunLoopBase::RunWork(this=0x791a48e0) + 101 at message_pump_mac.mm:325
  frame #106: 0x0197ed51 Chromium Framework`base::MessagePumpCFRunLoopBase::RunWorkSource(info=0x791a48e0) + 49 at message_pump_mac.mm:303
  frame #107: 0x9b629b5f CoreFoundation`__CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__ + 15
  frame #108: 0x9b61a95b CoreFoundation`__CFRunLoopDoSources0 + 235
  frame #109: 0x9b61a05e CoreFoundation`__CFRunLoopRun + 1022
  frame #110: 0x9b6199ea CoreFoundation`CFRunLoopRunSpecific + 394
  frame #111: 0x9b61984b CoreFoundation`CFRunLoopRunInMode + 123
  frame #112: 0x0197ff5d Chromium Framework`base::MessagePumpCFRunLoop::DoRun(this=0x791a48e0, delegate=0x791a4770) + 109 at message_pump_mac.mm:538
  frame #113: 0x0197f548 Chromium Framework`base::MessagePumpCFRunLoopBase::Run(this=0x791a48e0, delegate=0x791a4770) + 104 at message_pump_mac.mm:235
  frame #114: 0x01a7d87c Chromium Framework`base::MessageLoop::RunHandler(this=0x791a4770) + 300 at message_loop.cc:415
  frame #115: 0x01ae00e3 Chromium Framework`base::RunLoop::Run(this=0xbbc4ed88) + 83 at run_loop.cc:54
  frame #116: 0x01a7cb87 Chromium Framework`base::MessageLoop::Run(this=0x791a4770) + 55 at message_loop.cc:308
  frame #117: 0x01b51152 Chromium Framework`base::Thread::Run(this=0x7e115410, message_loop=0x791a4770) + 50 at thread.cc:174
  frame #118: 0x01b51467 Chromium Framework`base::Thread::ThreadMain(this=0x7e115410) + 631 at thread.cc:228
  frame #119: 0x01b3ac98 Chromium Framework`base::(anonymous namespace)::ThreadFunc(params=0xbff63eb8) + 296 at platform_thread_posix.cc:80
  frame #120: 0x940e45fb libsystem_pthread.dylib`_pthread_body + 144
  frame #121: 0x940e4485 libsystem_pthread.dylib`_pthread_start + 130
  frame #122: 0x940e9cf2 libsystem_pthread.dylib`thread_start + 34
```

## Frontend 1

Hit after Backend.

Messages - backtrace taken from first - first 11 frames similar for all messages.

```
message.utf8(): "{\"id\":37,\"method\":\"Runtime.getProperties\",\"params\":{\"objectId\":\"{\\\"injectedScriptId\\\":1,\\\"id\\\":1}\",\"ownProperties\":false,\"accessorPropertiesOnly\":false}}" 
routing_id(): 11
```

```
message.utf8():"{\"id\":38,\"method\":\"Debugger.setOverlayMessage\",\"params\":{\"message\":\"Paused in debugger\"}}"
routing_id() 11
```


```
* Chrome_InProcRendererThread (28) thread #28: tid = 0xa4761, 0x0cb267af Chromium Framework`content::DevToolsClient::sendMessageToBackend(this=0x7e15a1b0, message=0xbbc45088) + 1055 at devtools_client.cc:50, name = 'Chrome_InProcRendererThread', stop reason = breakpoint 15.1
#0  0x0cb267af in content::DevToolsClient::sendMessageToBackend(blink::WebString const&) at content/renderer/devtools/devtools_client.cc:50
#1  0x0cb268cf in non-virtual thunk to content::DevToolsClient::sendMessageToBackend(blink::WebString const&) at content/renderer/devtools/devtools_client.cc:52
#2  0x05e92b1f in blink::WebDevToolsFrontendImpl::sendMessageToBackend(WTF::String const&) at third_party/WebKit/Source/web/WebDevToolsFrontendImpl.cpp:170
#3  0x05e92b8f in non-virtual thunk to blink::WebDevToolsFrontendImpl::sendMessageToBackend(WTF::String const&) at third_party/WebKit/Source/web/WebDevToolsFrontendImpl.cpp:171
#4  0x06d59d13 in blink::InspectorFrontendHost::sendMessageToBackend(WTF::String const&) at third_party/WebKit/Source/core/inspector/InspectorFrontendHost.cpp:203
#5  0x07d4c923 in blink::InspectorFrontendHostV8Internal::sendMessageToBackendMethod(v8::FunctionCallbackInfo<v8::Value> const&) at /Users/thlorenz/dev/js/chromium/src/out/Debug/gen/blink/bindings/core/v8/V8InspectorFrontendHost.cpp:157
#6  0x07d4baca in blink::InspectorFrontendHostV8Internal::sendMessageToBackendMethodCallback(v8::FunctionCallbackInfo<v8::Value> const&) at /Users/thlorenz/dev/js/chromium/src/out/Debug/gen/blink/bindings/core/v8/V8InspectorFrontendHost.cpp:163
#7  0x05572ffe in v8::internal::FunctionCallbackArguments::Call(void (*)(v8::FunctionCallbackInfo<v8::Value> const&)) at v8/src/arguments.cc:33
#8  0x055c9b16 in v8::internal::Object* v8::internal::HandleApiCallHelper<false>(v8::internal::(anonymous namespace)::BuiltinArguments<(v8::internal::BuiltinExtraArguments)1>, v8::internal::Isolate*) [inlined] at v8/src/builtins.cc:1145
#9  0x055c8cad in v8::internal::Builtin_Impl_HandleApiCall(v8::internal::(anonymous namespace)::BuiltinArguments<(v8::internal::BuiltinExtraArguments)1>, v8::internal::Isolate*) [inlined] at v8/src/builtins.cc:1162
#10 0x055c8cad in v8::internal::Builtin_HandleApiCall(int, v8::internal::Object**, v8::internal::Isolate*) at v8/src/builtins.cc:1161
#11 0x3300a556 in 0x3300a556 ()
#12 0x3c25b0fe in 0x3c25b0fe ()
#13 0x3c25ad7f in 0x3c25ad7f ()
#14 0x3c25a806 in 0x3c25a806 ()
#15 0x3300bc3b in 0x3300bc3b ()
#16 0x3304cb70 in 0x3304cb70 ()
#17 0x3c259f63 in 0x3c259f63 ()
#18 0x3300bc3b in 0x3300bc3b ()
#19 0x4af250ff in 0x4af250ff ()
#20 0x4af24736 in 0x4af24736 ()
#21 0x4af24375 in 0x4af24375 ()
#22 0x4af24247 in 0x4af24247 ()
#23 0x4af23da6 in 0x4af23da6 ()
#24 0x4af23aca in 0x4af23aca ()
#25 0x3c21d72c in 0x3c21d72c ()
#26 0x3c21d55f in 0x3c21d55f ()
#27 0x3304a755 in 0x3304a755 ()
#28 0x33018a4a in 0x33018a4a ()
#29 0x0572a76d in v8::internal::Invoke(bool, v8::internal::Handle<v8::internal::JSFunction>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) at v8/src/execution.cc:91
#30 0x05729b0c in v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, bool) at v8/src/execution.cc:141
#31 0x059da551 in v8::internal::Object::SetPropertyWithDefinedSetter(v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::JSReceiver>, v8::internal::Handle<v8::internal::Object>) at v8/src/objects.cc:567
#32 0x059d9cb5 in v8::internal::Object::SetPropertyWithAccessor(v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Name>, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::JSObject>, v8::internal::Handle<v8::internal::Object>, v8::internal::StrictMode) at v8/src/objects.cc:515
#33 0x059fadff in v8::internal::Object::SetProperty(v8::internal::LookupIterator*, v8::internal::Handle<v8::internal::Object>, v8::internal::StrictMode, v8::internal::Object::StoreFromKeyed) at v8/src/objects.cc:2859
#34 0x05932e59 in v8::internal::StoreIC::Store(v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Name>, v8::internal::Handle<v8::internal::Object>, v8::internal::Object::StoreFromKeyed) at v8/src/ic/ic.cc:1332
#35 0x0593a641 in v8::internal::__RT_impl_StoreIC_Miss(v8::internal::Arguments, v8::internal::Isolate*) [inlined] at v8/src/ic/ic.cc:2023
#36 0x0593a43f in v8::internal::StoreIC_Miss(int, v8::internal::Object**, v8::internal::Isolate*) at v8/src/ic/ic.cc:2014
#37 0x3300a556 in 0x3300a556 ()
#38 0x3c23c7f4 in 0x3c23c7f4 ()
#39 0x4af1d3c6 in 0x4af1d3c6 ()
#40 0x4af1d254 in 0x4af1d254 ()
#41 0x5e414ddd in 0x5e414ddd ()
#42 0x4af1ceba in 0x4af1ceba ()
#43 0x3c2b7f87 in 0x3c2b7f87 ()
#44 0x3c2e0b9c in 0x3c2e0b9c ()
#45 0x3c2e0a6d in 0x3c2e0a6d ()
#46 0x3304cb75 in 0x3304cb75 ()
#47 0x330735c9 in 0x330735c9 ()
#48 0x5e41ba17 in 0x5e41ba17 ()
#49 0x5e41507a in 0x5e41507a ()
#50 0x5e414ddd in 0x5e414ddd ()
#51 0x5e414755 in 0x5e414755 ()
#52 0x5e4149c7 in 0x5e4149c7 ()
#53 0x5e414bc9 in 0x5e414bc9 ()
#54 0x3300bc3b in 0x3300bc3b ()
#55 0x3304a750 in 0x3304a750 ()
#56 0x33018a4a in 0x33018a4a ()
#57 0x0572a76d in v8::internal::Invoke(bool, v8::internal::Handle<v8::internal::JSFunction>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) at v8/src/execution.cc:91
#58 0x05729b0c in v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, bool) at v8/src/execution.cc:141
#59 0x05b9f2ad in v8::internal::__RT_impl_Runtime_Apply(v8::internal::Arguments, v8::internal::Isolate*) [inlined] at v8/src/runtime.cc:8979
#60 0x05b9f1a3 in v8::internal::Runtime_Apply(int, v8::internal::Object**, v8::internal::Isolate*) at v8/src/runtime.cc:8947
#61 0x3300a556 in 0x3300a556 ()
#62 0x5e4eee2e in 0x5e4eee2e ()
#63 0x3300bc3b in 0x3300bc3b ()
#64 0x3c2e4c9f in 0x3c2e4c9f ()
#65 0x3304a755 in 0x3304a755 ()
#66 0x33018a4a in 0x33018a4a ()
#67 0x0572a76d in v8::internal::Invoke(bool, v8::internal::Handle<v8::internal::JSFunction>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) at v8/src/execution.cc:91
#68 0x05729b0c in v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, bool) at v8/src/execution.cc:141
#69 0x05509f15 in v8::Script::Run() at v8/src/api.cc:1724
#70 0x0784cd14 in blink::V8ScriptRunner::runCompiledScript(v8::Handle<v8::Script>, blink::ExecutionContext*, v8::Isolate*) at third_party/WebKit/Source/bindings/core/v8/V8ScriptRunner.cpp:179
#71 0x0778f21b in blink::ScriptController::executeScriptAndReturnValue(v8::Handle<v8::Context>, blink::ScriptSourceCode const&, blink::AccessControlStatus, double*) at third_party/WebKit/Source/bindings/core/v8/ScriptController.cpp:196
#72 0x07791ec0 in blink::ScriptController::evaluateScriptInMainWorld(blink::ScriptSourceCode const&, blink::AccessControlStatus, blink::ScriptController::ExecuteScriptPolicy, double*) at third_party/WebKit/Source/bindings/core/v8/ScriptController.cpp:610
#73 0x077922e0 in blink::ScriptController::executeScriptInMainWorldAndReturnValue(blink::ScriptSourceCode const&) at third_party/WebKit/Source/bindings/core/v8/ScriptController.cpp:583
#74 0x05ed85e3 in blink::WebLocalFrameImpl::executeScriptAndReturnValue(blink::WebScriptSource const&) at third_party/WebKit/Source/web/WebLocalFrameImpl.cpp:789
#75 0x0cc7f97f in content::RenderFrameImpl::OnJavaScriptExecuteRequest(std::basic_string<unsigned short, base::string16_char_traits, std::allocator<unsigned short> > const&, int, bool) at content/renderer/render_frame_impl.cc:1251
#76 0x0cca85aa in void DispatchToMethod<content::RenderFrameImpl, void (content::RenderFrameImpl::*)(std::basic_string<unsigned short, base::string16_char_traits, std::allocator<unsigned short> > const&, int, bool), std::basic_string<unsigned short, base::string16_char_traits, std::allocator<unsigned short> >, int, bool>(content::RenderFrameImpl*, void (content::RenderFrameImpl::*)(std::basic_string<unsigned short, base::string16_char_traits, std::allocator<unsigned short> > const&, int, bool), Tuple3<std::basic_string<unsigned short, base::string16_char_traits, std::allocator<unsigned short> >, int, bool> const&) at base/tuple.h:562
#77 0x0cc9a7f4 in bool FrameMsg_JavaScriptExecuteRequest::Dispatch<content::RenderFrameImpl, content::RenderFrameImpl, void, void (content::RenderFrameImpl::*)(std::basic_string<unsigned short, base::string16_char_traits, std::allocator<unsigned short> > const&, int, bool)>(IPC::Message const*, content::RenderFrameImpl*, content::RenderFrameImpl*, void*, void (content::RenderFrameImpl::*)(std::basic_string<unsigned short, base::string16_char_traits, std::allocator<unsigned short> > const&, int, bool)) at content/common/frame_messages.h:410
#78 0x0cc7b6af in content::RenderFrameImpl::OnMessageReceived(IPC::Message const&) at content/renderer/render_frame_impl.cc:784
#79 0x03c94ee9 in content::MessageRouter::RouteMessage(IPC::Message const&) at content/common/message_router.cc:54
#80 0x03c94e35 in content::MessageRouter::OnMessageReceived(IPC::Message const&) at content/common/message_router.cc:46
#81 0x0c8c846f in content::ChildThread::OnMessageReceived(IPC::Message const&) at content/child/child_thread.cc:494
#82 0x0295dbd0 in IPC::ChannelProxy::Context::OnDispatchMessage(IPC::Message const&) at ipc/ipc_channel_proxy.cc:274
#83 0x02967c44 in base::internal::RunnableAdapter<void (IPC::ChannelProxy::Context::*)(IPC::Message const&)>::Run(IPC::ChannelProxy::Context*, IPC::Message const&) at base/bind_internal.h:190
#84 0x02967b4f in base::internal::InvokeHelper<false, void, base::internal::RunnableAdapter<void (IPC::ChannelProxy::Context::*)(IPC::Message const&)>, void (IPC::ChannelProxy::Context* const&, IPC::Message const&)>::MakeItSo(base::internal::RunnableAdapter<void (IPC::ChannelProxy::Context::*)(IPC::Message const&)>, IPC::ChannelProxy::Context* const&, IPC::Message const&) at base/bind_internal.h:898
#85 0x02967a84 in base::internal::Invoker<2, base::internal::BindState<base::internal::RunnableAdapter<void (IPC::ChannelProxy::Context::*)(IPC::Message const&)>, void (IPC::ChannelProxy::Context*, IPC::Message const&), void (IPC::ChannelProxy::Context*, IPC::Message)>, void (IPC::ChannelProxy::Context*, IPC::Message const&)>::Run(base::internal::BindStateBase*) at base/bind_internal.h:1248
#86 0x0909732f in base::Callback<void ()>::Run() const at base/callback.h:401
#87 0x019b4d4c in base::debug::TaskAnnotator::RunTask(char const*, char const*, base::PendingTask const&) at base/debug/task_annotator.cc:62
```

### Backend 2

Breakpoint hit after editing text.

```
Chrome_InProcRendererThread (28)#0  0x056ad696 in v8::internal::Debug::Break(v8::internal::Arguments, v8::internal::JavaScriptFrame*) at v8/src/debug.cc:872
#1  0x056b0ae4 in v8::internal::__RT_impl_Debug_Break(v8::internal::Arguments, v8::internal::Isolate*) [inlined] at v8/src/debug.cc:987
#2  0x056b0a0c in v8::internal::Debug_Break(int, v8::internal::Object**, v8::internal::Isolate*) at v8/src/debug.cc:984
#3  0x3300a556 in 0x3300a556 ()
#4  0x3304dabd in 0x3304dabd ()
#5  0x5e41afaa in 0x5e41afaa ()
#6  0x3c2c524c in 0x3c2c524c ()
#7  0x3300bc3b in 0x3300bc3b ()
#8  0x3c273566 in 0x3c273566 ()
#9  0x3c2c4e40 in 0x3c2c4e40 ()
#10 0x3300bc3b in 0x3300bc3b ()
#11 0x3304a750 in 0x3304a750 ()
#12 0x33018a4a in 0x33018a4a ()
#13 0x0572a76d in v8::internal::Invoke(bool, v8::internal::Handle<v8::internal::JSFunction>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) at v8/src/execution.cc:91
#14 0x05729b0c in v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, bool) at v8/src/execution.cc:141
#15 0x05b9f2ad in v8::internal::__RT_impl_Runtime_Apply(v8::internal::Arguments, v8::internal::Isolate*) [inlined] at v8/src/runtime.cc:8979
#16 0x05b9f1a3 in v8::internal::Runtime_Apply(int, v8::internal::Object**, v8::internal::Isolate*) at v8/src/runtime.cc:8947
#17 0x3300a556 in 0x3300a556 ()
#18 0x5e4eec03 in 0x5e4eec03 ()
#19 0x3300bc3b in 0x3300bc3b ()
#20 0x3c273566 in 0x3c273566 ()
#21 0x3c2c275d in 0x3c2c275d ()
#22 0x3300bc3b in 0x3300bc3b ()
#23 0x3304a750 in 0x3304a750 ()
#24 0x33018a4a in 0x33018a4a ()
#25 0x0572a76d in v8::internal::Invoke(bool, v8::internal::Handle<v8::internal::JSFunction>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) at v8/src/execution.cc:91
#26 0x05729b0c in v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, bool) at v8/src/execution.cc:141
#27 0x05b9f2ad in v8::internal::__RT_impl_Runtime_Apply(v8::internal::Arguments, v8::internal::Isolate*) [inlined] at v8/src/runtime.cc:8979
#28 0x05b9f1a3 in v8::internal::Runtime_Apply(int, v8::internal::Object**, v8::internal::Isolate*) at v8/src/runtime.cc:8947
#29 0x3300a556 in 0x3300a556 ()
#30 0x5e4eec03 in 0x5e4eec03 ()
#31 0x3300bc3b in 0x3300bc3b ()
#32 0x3c273566 in 0x3c273566 ()
#33 0x3c2fc690 in 0x3c2fc690 ()
#34 0x3c2fc011 in 0x3c2fc011 ()
#35 0x3c2fbcfd in 0x3c2fbcfd ()
#36 0x3c2facc4 in 0x3c2facc4 ()
#37 0x3c2fa74d in 0x3c2fa74d ()
#38 0x3c2b5282 in 0x3c2b5282 ()
#39 0x3300bc3b in 0x3300bc3b ()
#40 0x3c27366e in 0x3c27366e ()
#41 0x3c2b4b89 in 0x3c2b4b89 ()
#42 0x3c2f9e4d in 0x3c2f9e4d ()
#43 0x3c2f9cfa in 0x3c2f9cfa ()
#44 0x3c2f99b9 in 0x3c2f99b9 ()
#45 0x3c2f9503 in 0x3c2f9503 ()
#46 0x3304a755 in 0x3304a755 ()
#47 0x33018a4a in 0x33018a4a ()
#48 0x0572a76d in v8::internal::Invoke(bool, v8::internal::Handle<v8::internal::JSFunction>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) at v8/src/execution.cc:91
#49 0x05729b0c in v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, bool) at v8/src/execution.cc:141
#50 0x0552ab55 in v8::Function::Call(v8::Handle<v8::Value>, int, v8::Handle<v8::Value>*) at v8/src/api.cc:4141
#51 0x0784da85 in blink::V8ScriptRunner::callFunction(v8::Handle<v8::Function>, blink::ExecutionContext*, v8::Handle<v8::Value>, int, v8::Handle<v8::Value>*, v8::Isolate*) at third_party/WebKit/Source/bindings/core/v8/V8ScriptRunner.cpp:224
#52 0x0778eab2 in blink::ScriptController::callFunction(blink::ExecutionContext*, v8::Handle<v8::Function>, v8::Handle<v8::Value>, int, v8::Handle<v8::Value>*, v8::Isolate*) at third_party/WebKit/Source/bindings/core/v8/ScriptController.cpp:163
#53 0x0778e5eb in blink::ScriptController::callFunction(v8::Handle<v8::Function>, v8::Handle<v8::Value>, int, v8::Handle<v8::Value>*) at third_party/WebKit/Source/bindings/core/v8/ScriptController.cpp:146
#54 0x07811766 in blink::V8EventListener::callListenerFunction(v8::Handle<v8::Value>, blink::Event*) at third_party/WebKit/Source/bindings/core/v8/V8EventListener.cpp:88
#55 0x077f4dd5 in blink::V8AbstractEventListener::invokeEventHandler(blink::Event*, v8::Local<v8::Value>) at third_party/WebKit/Source/bindings/core/v8/V8AbstractEventListener.cpp:128
#56 0x077f4a83 in blink::V8AbstractEventListener::handleEvent(blink::ExecutionContext*, blink::Event*) at third_party/WebKit/Source/bindings/core/v8/V8AbstractEventListener.cpp:98
#57 0x0622b74f in blink::EventTarget::fireEventListeners(blink::Event*, blink::EventTargetData*, WTF::Vector<blink::RegisteredEventListener, 1ul, WTF::DefaultAllocator>&) at third_party/WebKit/Source/core/events/EventTarget.cpp:351
#58 0x0622ac2a in blink::EventTarget::fireEventListeners(blink::Event*) at third_party/WebKit/Source/core/events/EventTarget.cpp:287
#59 0x060e7159 in blink::Node::handleLocalEvents(blink::Event*) at third_party/WebKit/Source/core/dom/Node.cpp:2098
#60 0x062425a8 in blink::NodeEventContext::handleLocalEvents(blink::Event*) const at third_party/WebKit/Source/core/events/NodeEventContext.cpp:67
#61 0x0620e8f4 in blink::EventDispatcher::dispatchEventAtBubbling(blink::WindowEventContext&) at third_party/WebKit/Source/core/events/EventDispatcher.cpp:187
#62 0x0620d5a5 in blink::EventDispatcher::dispatch() at third_party/WebKit/Source/core/events/EventDispatcher.cpp:128
#63 0x0620bdb2 in blink::EventDispatchMediator::dispatchEvent(blink::EventDispatcher*) const at third_party/WebKit/Source/core/events/EventDispatchMediator.cpp:57
#64 0x0620c37f in blink::EventDispatcher::dispatchEvent(blink::Node*, WTF::PassRefPtr<blink::EventDispatchMediator>) at third_party/WebKit/Source/core/events/EventDispatcher.cpp:50
#65 0x062459b0 in blink::ScopedEventQueue::dispatchEvent(WTF::PassRefPtr<blink::EventDispatchMediator>) const at third_party/WebKit/Source/core/events/ScopedEventQueue.cpp:83
#66 0x06245a7d in blink::ScopedEventQueue::dispatchAllEvents() at third_party/WebKit/Source/core/events/ScopedEventQueue.cpp:76
#67 0x06245c41 in blink::ScopedEventQueue::decrementScopingLevel() at third_party/WebKit/Source/core/events/ScopedEventQueue.cpp:104
#68 0x06192e8d in blink::EventQueueScope::~EventQueueScope() at third_party/WebKit/Source/core/events/ScopedEventQueue.h:72
#69 0x0619223b in blink::EventQueueScope::~EventQueueScope() at third_party/WebKit/Source/core/events/ScopedEventQueue.h:72
#70 0x06a1208f in blink::CompositeEditCommand::apply() at third_party/WebKit/Source/core/editing/CompositeEditCommand.cpp:209
#71 0x06ac367d in blink::TextInsertionBaseCommand::applyTextInsertionCommand(blink::LocalFrame*, WTF::PassRefPtr<blink::TextInsertionBaseCommand>, blink::VisibleSelection const&, blink::VisibleSelection const&) at third_party/WebKit/Source/core/editing/TextInsertionBaseCommand.cpp:50
#72 0x06ada65c in blink::TypingCommand::insertText(blink::Document&, WTF::String const&, blink::VisibleSelection const&, unsigned int, blink::TypingCommand::TextCompositionType) at third_party/WebKit/Source/core/editing/TypingCommand.cpp:196
#73 0x06a4dd2a in blink::Editor::insertTextWithoutSendingTextEvent(WTF::String const&, bool, blink::TextEvent*) at third_party/WebKit/Source/core/editing/Editor.cpp:780
#74 0x06a4d2c3 in blink::Editor::handleTextEvent(blink::TextEvent*) at third_party/WebKit/Source/core/editing/Editor.cpp:177
#75 0x06f123f3 in blink::EventHandler::defaultTextInputEventHandler(blink::TextEvent*) at third_party/WebKit/Source/core/page/EventHandler.cpp:3339
#76 0x060e823f in blink::Node::defaultEventHandler(blink::Event*) at third_party/WebKit/Source/core/dom/Node.cpp:2201
#77 0x062d9022 in blink::HTMLElement::defaultEventHandler(blink::Event*) at third_party/WebKit/Source/core/html/HTMLElement.cpp:947
#78 0x063b316e in blink::HTMLTextFormControlElement::defaultEventHandler(blink::Event*) at third_party/WebKit/Source/core/html/HTMLTextFormControlElement.cpp:106
#79 0x063afc57 in blink::HTMLTextAreaElement::defaultEventHandler(blink::Event*) at third_party/WebKit/Source/core/html/HTMLTextAreaElement.cpp:258
#80 0x0620ebaf in blink::EventDispatcher::dispatchEventPostProcess(void*) at third_party/WebKit/Source/core/events/EventDispatcher.cpp:212
#81 0x0620d5c4 in blink::EventDispatcher::dispatch() at third_party/WebKit/Source/core/events/EventDispatcher.cpp:129
#82 0x0620bdb2 in blink::EventDispatchMediator::dispatchEvent(blink::EventDispatcher*) const at third_party/WebKit/Source/core/events/EventDispatchMediator.cpp:57
#83 0x0620c37f in blink::EventDispatcher::dispatchEvent(blink::Node*, WTF::PassRefPtr<blink::EventDispatchMediator>) at third_party/WebKit/Source/core/events/EventDispatcher.cpp:50
#84 0x060e7415 in blink::Node::dispatchEvent(WTF::PassRefPtr<blink::Event>) at third_party/WebKit/Source/core/dom/Node.cpp:2117
#85 0x0622a80a in blink::EventTarget::dispatchEvent(WTF::PassRefPtr<blink::Event>, blink::ExceptionState&) at third_party/WebKit/Source/core/events/EventTarget.cpp:189
#86 0x06f1232c in blink::EventHandler::handleTextInputEvent(WTF::String const&, blink::Event*, blink::TextEventInputType) at third_party/WebKit/Source/core/page/EventHandler.cpp:3333
#87 0x06a52134 in blink::Editor::insertText(WTF::String const&, blink::KeyboardEvent*) at third_party/WebKit/Source/core/editing/Editor.cpp:754
#88 0x06a67a4d in blink::Editor::handleEditingKeyboardEvent(blink::KeyboardEvent*) at third_party/WebKit/Source/core/editing/EditorKeyBindings.cpp:64
#89 0x06a67b07 in blink::Editor::handleKeyboardEvent(blink::KeyboardEvent*) at third_party/WebKit/Source/core/editing/EditorKeyBindings.cpp:70
#90 0x06f10be2 in blink::EventHandler::defaultKeyboardEventHandler(blink::KeyboardEvent*) at third_party/WebKit/Source/core/page/EventHandler.cpp:3118
#91 0x060e8072 in blink::Node::defaultEventHandler(blink::Event*) at third_party/WebKit/Source/core/dom/Node.cpp:2189
#92 0x062d9022 in blink::HTMLElement::defaultEventHandler(blink::Event*) at third_party/WebKit/Source/core/html/HTMLElement.cpp:947
#93 0x063b316e in blink::HTMLTextFormControlElement::defaultEventHandler(blink::Event*) at third_party/WebKit/Source/core/html/HTMLTextFormControlElement.cpp:106
#94 0x063afc57 in blink::HTMLTextAreaElement::defaultEventHandler(blink::Event*) at third_party/WebKit/Source/core/html/HTMLTextAreaElement.cpp:258
#95 0x0620ebaf in blink::EventDispatcher::dispatchEventPostProcess(void*) at third_party/WebKit/Source/core/events/EventDispatcher.cpp:212
#96 0x0620d5c4 in blink::EventDispatcher::dispatch() at third_party/WebKit/Source/core/events/EventDispatcher.cpp:129
#97 0x0620bdb2 in blink::EventDispatchMediator::dispatchEvent(blink::EventDispatcher*) const at third_party/WebKit/Source/core/events/EventDispatchMediator.cpp:57
#98 0x06237b6e in blink::KeyboardEventDispatchMediator::dispatchEvent(blink::EventDispatcher*) const at third_party/WebKit/Source/core/events/KeyboardEvent.cpp:228
#99 0x0620c37f in blink::EventDispatcher::dispatchEvent(blink::Node*, WTF::PassRefPtr<blink::EventDispatchMediator>) at third_party/WebKit/Source/core/events/EventDispatcher.cpp:50
#100  0x060e7a25 in blink::Node::dispatchKeyEvent(blink::PlatformKeyboardEvent const&) at third_party/WebKit/Source/core/dom/Node.cpp:2144
#101  0x06f100b3 in blink::EventHandler::keyEvent(blink::PlatformKeyboardEvent const&) at third_party/WebKit/Source/core/page/EventHandler.cpp:3030
#102  0x05f488c1 in blink::WebViewImpl::handleCharEvent(blink::WebKeyboardEvent const&) at third_party/WebKit/Source/web/WebViewImpl.cpp:1050
#103  0x05f4899f in non-virtual thunk to blink::WebViewImpl::handleCharEvent(blink::WebKeyboardEvent const&) at third_party/WebKit/Source/web/WebViewImpl.cpp:1054
#104  0x05e469a9 in blink::PageWidgetDelegate::handleInputEvent(blink::Page*, blink::PageWidgetEventHandler&, blink::WebInputEvent const&, blink::LocalFrame*) at third_party/WebKit/Source/web/PageWidgetDelegate.cpp:148
#105  0x05f4e613 in blink::WebViewImpl::handleInputEvent(blink::WebInputEvent const&) at third_party/WebKit/Source/web/WebViewImpl.cpp:2037
#106  0x0cd2d7e4 in content::RenderWidget::OnHandleInputEvent(blink::WebInputEvent const*, ui::LatencyInfo const&, bool) at content/renderer/render_widget.cc:1044
#107  0x0cd42f5a in void DispatchToMethod<content::RenderWidget, void (content::RenderWidget::*)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool), blink::WebInputEvent const*, ui::LatencyInfo, bool>(content::RenderWidget*, void (content::RenderWidget::*)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool), Tuple3<blink::WebInputEvent const*, ui::LatencyInfo, bool> const&) at base/tuple.h:562
#108  0x0cd38243 in bool InputMsg_HandleInputEvent::Dispatch<content::RenderWidget, content::RenderWidget, void, void (content::RenderWidget::*)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool)>(IPC::Message const*, content::RenderWidget*, content::RenderWidget*, void*, void (content::RenderWidget::*)(blink::WebInputEvent const*, ui::LatencyInfo const&, bool)) at content/common/input_messages.h:110
#109  0x0cd2babe in content::RenderWidget::OnMessageReceived(IPC::Message const&) at content/renderer/render_widget.cc:598
#110  0x0cce5bdb in content::RenderViewImpl::OnMessageReceived(IPC::Message const&) at content/renderer/render_view_impl.cc:1388
#111  0x03c94ee9 in content::MessageRouter::RouteMessage(IPC::Message const&) at content/common/message_router.cc:54
#112  0x03c94e35 in content::MessageRouter::OnMessageReceived(IPC::Message const&) at content/common/message_router.cc:46
#113  0x0c8c846f in content::ChildThread::OnMessageReceived(IPC::Message const&) at content/child/child_thread.cc:494
#114  0x0295dbd0 in IPC::ChannelProxy::Context::OnDispatchMessage(IPC::Message const&) at ipc/ipc_channel_proxy.cc:274
```
