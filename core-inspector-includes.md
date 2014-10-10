# Following Core Inspector Includes

In order to figure out what part of blink needs to be included in order to get Debugger/Profiler/etc. protocol.

Generated via [devtools snippet](https://github.com/thlorenz/chromium/blob/master/includes-to-md.snippet.js).

Sub dependencies are indented below, if they are not, that means that they already occurred as a sub dependency before.

## core/inspector/InspectorDebuggerAgent.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScriptState.h](#bindingscorev8scriptstateh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h) |
| [core/InspectorFrontend.h](#coreinspectorfrontendh) | [*chromium/src/out/Debug/gen/blink/core/InspectorFrontend.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorFrontend.h) |
| [core/frame/ConsoleTypes.h](#coreframeconsoletypesh) | [*chromium/src/third_party/WebKit/Source/core/frame/ConsoleTypes.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/frame/ConsoleTypes.h) |
| [core/inspector/AsyncCallStackTracker.h](#coreinspectorasynccallstacktrackerh) | [*chromium/src/third_party/WebKit/Source/core/inspector/AsyncCallStackTracker.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/AsyncCallStackTracker.h) |
| [core/inspector/ConsoleAPITypes.h](#coreinspectorconsoleapitypesh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ConsoleAPITypes.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ConsoleAPITypes.h) |
| [core/inspector/InjectedScript.h](#coreinspectorinjectedscripth) | [*chromium/src/third_party/WebKit/Source/core/inspector/InjectedScript.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InjectedScript.h) |
| [core/inspector/InspectorBaseAgent.h](#coreinspectorinspectorbaseagenth) | [*chromium/src/third_party/WebKit/Source/core/inspector/InspectorBaseAgent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InspectorBaseAgent.h) |
| [core/inspector/PromiseTracker.h](#coreinspectorpromisetrackerh) | [*chromium/src/third_party/WebKit/Source/core/inspector/PromiseTracker.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/PromiseTracker.h) |
| [core/inspector/ScriptBreakpoint.h](#coreinspectorscriptbreakpointh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptBreakpoint.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptBreakpoint.h) |
| [core/inspector/ScriptDebugListener.h](#coreinspectorscriptdebuglistenerh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptDebugListener.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptDebugListener.h) |

#### bindings/core/v8/ScriptState.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScopedPersistent.h](#bindingscorev8scopedpersistenth) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h) |
| [bindings/core/v8/V8PerContextData.h](#bindingscorev8v8percontextdatah) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/V8PerContextData.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/V8PerContextData.h) |

###### bindings/core/v8/ScopedPersistent.h

- None

###### bindings/core/v8/V8PerContextData.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [bindings/core/v8/CustomElementBinding.h](#bindingscorev8customelementbindingh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/CustomElementBinding.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/CustomElementBinding.h) |
  | [bindings/core/v8/ScopedPersistent.h](#bindingscorev8scopedpersistenth) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h) |
  | [bindings/core/v8/V8PersistentValueMap.h](#bindingscorev8v8persistentvaluemaph) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/V8PersistentValueMap.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/V8PersistentValueMap.h) |
  | [bindings/core/v8/WrapperTypeInfo.h](#bindingscorev8wrappertypeinfoh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/WrapperTypeInfo.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/WrapperTypeInfo.h) |
  | [gin/public/context_holder.h](#ginpubliccontext_holderh) | [*chromium/src/gin/public/context_holder.h*](https://code.google.com/p/chromium/codesearch#chromium/src/gin/public/context_holder.h) |
  | [gin/public/gin_embedders.h](#ginpublicgin_embeddersh) | [*chromium/src/gin/public/gin_embedders.h*](https://code.google.com/p/chromium/codesearch#chromium/src/gin/public/gin_embedders.h) |

#### chromium/src/out/Debug/gen/blink/core/InspectorFrontend.h

| Name     |      Path      |
|----------|----------------|
| [InspectorTypeBuilder.h](#inspectortypebuilderh) | [*chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h) |
| [core/inspector/InspectorFrontendChannel.h](#coreinspectorinspectorfrontendchannelh) | [*chromium/src/third_party/WebKit/Source/core/inspector/InspectorFrontendChannel.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InspectorFrontendChannel.h) |
| [platform/JSONValues.h](#platformjsonvaluesh) | [*chromium/src/third_party/WebKit/Source/platform/JSONValues.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/JSONValues.h) |

###### chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [platform/JSONValues.h](#platformjsonvaluesh) | [*chromium/src/third_party/WebKit/Source/platform/JSONValues.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/JSONValues.h) |

###### core/inspector/InspectorFrontendChannel.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [platform/JSONValues.h](#platformjsonvaluesh) | [*chromium/src/third_party/WebKit/Source/platform/JSONValues.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/JSONValues.h) |

###### platform/JSONValues.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [platform/PlatformExport.h](#platformplatformexporth) | [*chromium/src/third_party/WebKit/Source/platform/PlatformExport.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/PlatformExport.h) |

### core/frame/ConsoleTypes.h

None

### core/inspector/AsyncCallStackTracker.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScriptValue.h](#bindingscorev8scriptvalueh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptValue.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptValue.h) |
| [core/dom/ContextLifecycleObserver.h](#coredomcontextlifecycleobserverh) | [*chromium/src/third_party/WebKit/Source/core/dom/ContextLifecycleObserver.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/dom/ContextLifecycleObserver.h) |

### core/inspector/ConsoleAPITypes.h

None

### core/inspector/InjectedScript.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScriptValue.h](#bindingscorev8scriptvalueh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptValue.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptValue.h) |
| [core/InspectorTypeBuilder.h](#coreinspectortypebuilderh) | [*chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h) |
| [core/inspector/InjectedScriptBase.h](#coreinspectorinjectedscriptbaseh) | [*chromium/src/third_party/WebKit/Source/core/inspector/InjectedScriptBase.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InjectedScriptBase.h) |
| [core/inspector/InjectedScriptManager.h](#coreinspectorinjectedscriptmanagerh) | [*chromium/src/third_party/WebKit/Source/core/inspector/InjectedScriptManager.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InjectedScriptManager.h) |
| [core/inspector/ScriptArguments.h](#coreinspectorscriptargumentsh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptArguments.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptArguments.h) |

###### bindings/core/v8/ScriptValue.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [bindings/core/v8/ScriptState.h](#bindingscorev8scriptstateh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h) |
  | [bindings/core/v8/SharedPersistent.h](#bindingscorev8sharedpersistenth) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/SharedPersistent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/SharedPersistent.h) |

###### chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [platform/JSONValues.h](#platformjsonvaluesh) | [*chromium/src/third_party/WebKit/Source/platform/JSONValues.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/JSONValues.h) |

###### core/inspector/InjectedScriptBase.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [bindings/core/v8/ScriptState.h](#bindingscorev8scriptstateh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h) |
  | [bindings/core/v8/ScriptValue.h](#bindingscorev8scriptvalueh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptValue.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptValue.h) |
  | [core/InspectorTypeBuilder.h](#coreinspectortypebuilderh) | [*chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h) |

###### core/inspector/InjectedScriptManager.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [bindings/core/v8/ScriptState.h](#bindingscorev8scriptstateh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h) |


###### core/inspector/ScriptArguments.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [bindings/core/v8/ScriptState.h](#bindingscorev8scriptstateh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h) |


#### core/inspector/InspectorBaseAgent.h

| Name     |      Path      |
|----------|----------------|
| [core/InspectorBackendDispatcher.h](#coreinspectorbackenddispatcherh) | [*chromium/src/out/Debug/gen/blink/core/InspectorBackendDispatcher.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorBackendDispatcher.h) |
| [core/inspector/InstrumentingAgents.h](#coreinspectorinstrumentingagentsh) | [*chromium/src/third_party/WebKit/Source/core/inspector/InstrumentingAgents.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InstrumentingAgents.h) |
| [platform/heap/Handle.h](#platformheaphandleh) | [*chromium/src/third_party/WebKit/Source/platform/heap/Handle.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Handle.h) |

###### chromium/src/out/Debug/gen/blink/core/InspectorBackendDispatcher.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [InspectorTypeBuilder.h](#inspectortypebuilderh) | [*chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h) |
  | [platform/heap/Handle.h](#platformheaphandleh) | [*chromium/src/third_party/WebKit/Source/platform/heap/Handle.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Handle.h) |

###### core/inspector/InstrumentingAgents.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [core/InstrumentingAgentsInl.h](#coreinstrumentingagentsinlh) | [*chromium/src/out/Debug/gen/blink/core/InstrumentingAgentsInl.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InstrumentingAgentsInl.h) |

###### platform/heap/Handle.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [platform/heap/Heap.h](#platformheapheaph) | [*chromium/src/third_party/WebKit/Source/platform/heap/Heap.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Heap.h) |
  | [platform/heap/ThreadState.h](#platformheapthreadstateh) | [*chromium/src/third_party/WebKit/Source/platform/heap/ThreadState.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/ThreadState.h) |
  | [platform/heap/Visitor.h](#platformheapvisitorh) | [*chromium/src/third_party/WebKit/Source/platform/heap/Visitor.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Visitor.h) |

#### core/inspector/PromiseTracker.h

| Name     |      Path      |
|----------|----------------|
| [core/InspectorTypeBuilder.h](#coreinspectortypebuilderh) | [*chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h) |
| [platform/heap/Handle.h](#platformheaphandleh) | [*chromium/src/third_party/WebKit/Source/platform/heap/Handle.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Handle.h) |

#### core/inspector/ScriptBreakpoint.h

None

#### core/inspector/ScriptDebugListener.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScriptState.h](#bindingscorev8scriptstateh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h) |