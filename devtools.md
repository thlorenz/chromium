<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [DevTools](#devtools)
  - [IPC](#ipc)
  - [Protocol](#protocol)
  - [Flow](#flow)
- [Setting Breakpoint](#setting-breakpoint)
  - [Front End](#front-end)
  - [Backend](#backend)
  - [Backend 2](#backend-2)
- [Opening DevTools](#opening-devtools)

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

## Setting Breakpoint

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
