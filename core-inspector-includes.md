# Following Core Inspector Includes

In order to figure out what part of blink needs to be included in order to get Debugger/Profiler/etc. protocol.

Generated via [devtools snippet](https://github.com/thlorenz/chromium/blob/master/includes-to-md.snippet.js).

Sub dependencies are indented below, if they are not, that means that they already occurred as a sub dependency before.

`wtf` lib and `v8` lib dependencies are left out since they are considered to be covered. Additionally it is assumed
that `platform/heap/` is self serving, i.e. it doesn't reach out of its tree.

#### gin and it's dependencies

[Looks like](https://code.google.com/p/chromium/codesearch#chromium/src/gin/gin.gyp) gin depends on `v8` and some of `base`:

```
target_name': 'gin',
'type': '<(component)',
'dependencies': [
  '../base/base.gyp:base',
  '../base/third_party/dynamic_annotations/dynamic_annotations.gyp:dynamic_annotations',
  '../v8/tools/gyp/v8.gyp:v8',
],
```

[base](https://code.google.com/p/chromium/codesearch#chromium/src/base/base.gyp) (when not testing it) depends on some
core base modules as well.

```
'target_name': 'base',
'type': '<(component)',
'dependencies': [
  'base_static',
  'allocator/allocator.gyp:allocator_extension_thunks',
  '../third_party/modp_b64/modp_b64.gyp:modp_b64',
  'third_party/dynamic_annotations/dynamic_annotations.gyp:dynamic_annotations',
],
```

None of the base dependencies depend on anything but each other.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [core/inspector/InspectorDebuggerAgent.h](#coreinspectorinspectordebuggeragenth)
    - [bindings/core/v8/ScriptState.h](#bindingscorev8scriptstateh)
        - [bindings/core/v8/ScopedPersistent.h](#bindingscorev8scopedpersistenth)
        - [bindings/core/v8/V8PerContextData.h](#bindingscorev8v8percontextdatah)
    - [chromium/src/out/Debug/gen/blink/core/InspectorFrontend.h](#chromiumsrcoutdebuggenblinkcoreinspectorfrontendh)
        - [chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h](#chromiumsrcoutdebuggenblinkcoreinspectortypebuilderh)
        - [core/inspector/InspectorFrontendChannel.h](#coreinspectorinspectorfrontendchannelh)
        - [platform/JSONValues.h](#platformjsonvaluesh)
  - [core/frame/ConsoleTypes.h](#coreframeconsoletypesh)
  - [core/inspector/AsyncCallStackTracker.h](#coreinspectorasynccallstacktrackerh)
        - [core/dom/ContextLifecycleObserver.h](#coredomcontextlifecycleobserverh)
  - [core/inspector/ConsoleAPITypes.h](#coreinspectorconsoleapitypesh)
  - [core/inspector/InjectedScript.h](#coreinspectorinjectedscripth)
        - [bindings/core/v8/ScriptValue.h](#bindingscorev8scriptvalueh)
        - [chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h](#chromiumsrcoutdebuggenblinkcoreinspectortypebuilderh-1)
        - [core/inspector/InjectedScriptBase.h](#coreinspectorinjectedscriptbaseh)
        - [core/inspector/InjectedScriptManager.h](#coreinspectorinjectedscriptmanagerh)
        - [core/inspector/ScriptArguments.h](#coreinspectorscriptargumentsh)
    - [core/inspector/InspectorBaseAgent.h](#coreinspectorinspectorbaseagenth)
        - [chromium/src/out/Debug/gen/blink/core/InspectorBackendDispatcher.h](#chromiumsrcoutdebuggenblinkcoreinspectorbackenddispatcherh)
        - [core/inspector/InstrumentingAgents.h](#coreinspectorinstrumentingagentsh)
        - [platform/heap/Handle.h](#platformheaphandleh)
    - [core/inspector/PromiseTracker.h](#coreinspectorpromisetrackerh)
    - [core/inspector/ScriptBreakpoint.h](#coreinspectorscriptbreakpointh)
    - [core/inspector/ScriptDebugListener.h](#coreinspectorscriptdebuglistenerh)
  - [DEPS bindings/core/v8/V8PerContextData.h](#deps-bindingscorev8v8percontextdatah)
    - [bindings/core/v8/CustomElementBinding.h](#bindingscorev8customelementbindingh)
    - [bindings/core/v8/ScopedPersistent.h](#bindingscorev8scopedpersistenth-1)
    - [bindings/core/v8/V8PersistentValueMap.h](#bindingscorev8v8persistentvaluemaph)
    - [bindings/core/v8/WrapperTypeInfo.h](#bindingscorev8wrappertypeinfoh)
        - [chromium/src/gin/public/wrapper_info.h](#chromiumsrcginpublicwrapper_infoh)
    - [chromium/src/gin/public/context_holder.h](#chromiumsrcginpubliccontext_holderh)
        - [chromium/src/base/basictypes.h](#chromiumsrcbasebasictypesh)
        - [chromium/src/base/memory/scoped_ptr.h](#chromiumsrcbasememoryscoped_ptrh)
      - [chromium/src/gin/gin_export.h](#chromiumsrcgingin_exporth)
    - [chromium/src/gin/public/gin_embedders.h](#chromiumsrcginpublicgin_embeddersh)
  - [DEPS core/dom/ContextLifecycleObserver.h](#deps-coredomcontextlifecycleobserverh)
    - [platform/LifecycleContext.h](#platformlifecyclecontexth)
        - [platform/LifecycleNotifier.h](#platformlifecyclenotifierh)
        - [platform/LifecycleObserver.h](#platformlifecycleobserverh)
  - [DEPS bindings/core/v8/ScriptValue.h](#deps-bindingscorev8scriptvalueh)
    - [bindings/core/v8/SharedPersistent.h](#bindingscorev8sharedpersistenth)
        - [bindings/core/v8/ScopedPersistent.h](#bindingscorev8scopedpersistenth-2)
  - [DEPS core/inspector/InjectedScriptBase.h](#deps-coreinspectorinjectedscriptbaseh)
    - [chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h](#chromiumsrcoutdebuggenblinkcoreinspectortypebuilderh-2)
  - [DEPS core/inspector/InstrumentingAgents.h](#deps-coreinspectorinstrumentingagentsh)
    - [chromium/src/out/Debug/gen/blink/core/InstrumentingAgentsInl.h](#chromiumsrcoutdebuggenblinkcoreinstrumentingagentsinlh)
- [core/inspector/InspectorDebuggerAgent.cpp](#coreinspectorinspectordebuggeragentcpp)
    - [bindings/core/v8/ScriptDebugServer.h](#bindingscorev8scriptdebugserverh)
    - [bindings/core/v8/ScriptRegexp.h](#bindingscorev8scriptregexph)
    - [bindings/core/v8/ScriptSourceCode.h](#bindingscorev8scriptsourcecodeh)
        - [bindings/core/v8/ScriptStreamer.h](#bindingscorev8scriptstreamerh)
    - [core/inspector/ConsoleMessage.h](#coreinspectorconsolemessageh)
    - [core/inspector/ContentSearchUtils.h](#coreinspectorcontentsearchutilsh)
    - [core/inspector/InspectorPageAgent.h](#coreinspectorinspectorpageagenth)
        - [core/inspector/InspectorResourceContentLoader.h](#coreinspectorinspectorresourcecontentloaderh)
    - [core/inspector/InspectorState.h](#coreinspectorinspectorstateh)
    - [core/inspector/InstrumentingAgents.h](#coreinspectorinstrumentingagentsh-1)
    - [core/inspector/JavaScriptCallFrame.h](#coreinspectorjavascriptcallframeh)
        - [bindings/core/v8/ScriptWrappable.h](#bindingscorev8scriptwrappableh)
    - [core/inspector/ScriptAsyncCallStack.h](#coreinspectorscriptasynccallstackh)
    - [core/inspector/ScriptCallFrame.h](#coreinspectorscriptcallframeh)
    - [core/inspector/ScriptCallStack.h](#coreinspectorscriptcallstackh)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


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

[DEPS](#deps-bindingscorev8v8percontextdatah)

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

###### core/dom/ContextLifecycleObserver.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [platform/LifecycleContext.h](#platformlifecyclecontexth) | [*chromium/src/third_party/WebKit/Source/platform/LifecycleContext.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/LifecycleContext.h) |

[DEPS](#deps-coredomcontextlifecycleobserverh)

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

[DEPS](#deps-bindingscorev8scriptvalueh)

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

[DEPS](#deps-coreinspectorinjectedscriptbaseh)

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


[DEPS](#deps-coreinspectorinstrumentingagentsh)

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


* * *

### DEPS bindings/core/v8/V8PerContextData.h

[REF](#bindingscorev8v8percontextdatah)

#### bindings/core/v8/CustomElementBinding.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScopedPersistent.h](#bindingscorev8scopedpersistenth) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h) |

#### bindings/core/v8/ScopedPersistent.h

None

#### bindings/core/v8/V8PersistentValueMap.h

None

#### bindings/core/v8/WrapperTypeInfo.h

| Name     |      Path      |
|----------|----------------|
| [gin/public/wrapper_info.h](#ginpublicwrapper_infoh) | [*chromium/src/gin/public/wrapper_info.h*](https://code.google.com/p/chromium/codesearch#chromium/src/gin/public/wrapper_info.h) |
| [platform/heap/Handle.h](#platformheaphandleh) | [*chromium/src/third_party/WebKit/Source/platform/heap/Handle.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Handle.h) |

###### chromium/src/gin/public/wrapper_info.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [gin/gin_export.h](#gingin_exporth) | [*chromium/src/gin/gin_export.h*](https://code.google.com/p/chromium/codesearch#chromium/src/gin/gin_export.h) |
  | [gin/public/gin_embedders.h](#ginpublicgin_embeddersh) | [*chromium/src/gin/public/gin_embedders.h*](https://code.google.com/p/chromium/codesearch#chromium/src/gin/public/gin_embedders.h) |

#### chromium/src/gin/public/context_holder.h

| Name     |      Path      |
|----------|----------------|
| [base/basictypes.h](#basebasictypesh) | [*chromium/src/base/basictypes.h*](https://code.google.com/p/chromium/codesearch#chromium/src/base/basictypes.h) |
| [base/memory/scoped_ptr.h](#basememoryscoped_ptrh) | [*chromium/src/base/memory/scoped_ptr.h*](https://code.google.com/p/chromium/codesearch#chromium/src/base/memory/scoped_ptr.h) |
| [gin/gin_export.h](#gingin_exporth) | [*chromium/src/gin/gin_export.h*](https://code.google.com/p/chromium/codesearch#chromium/src/gin/gin_export.h) |

###### chromium/src/base/basictypes.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [base/macros.h](#basemacrosh) | [*chromium/src/base/macros.h*](https://code.google.com/p/chromium/codesearch#chromium/src/base/macros.h) |
  | [base/port.h](#baseporth) | [*chromium/src/base/port.h*](https://code.google.com/p/chromium/codesearch#chromium/src/base/port.h) |

###### chromium/src/base/memory/scoped_ptr.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [base/basictypes.h](#basebasictypesh) | [*chromium/src/base/basictypes.h*](https://code.google.com/p/chromium/codesearch#chromium/src/base/basictypes.h) |
  | [base/compiler_specific.h](#basecompiler_specifich) | [*chromium/src/base/compiler_specific.h*](https://code.google.com/p/chromium/codesearch#chromium/src/base/compiler_specific.h) |
  | [base/move.h](#basemoveh) | [*chromium/src/base/move.h*](https://code.google.com/p/chromium/codesearch#chromium/src/base/move.h) |
  | [base/template_util.h](#basetemplate_utilh) | [*chromium/src/base/template_util.h*](https://code.google.com/p/chromium/codesearch#chromium/src/base/template_util.h) |

##### chromium/src/gin/gin_export.h

None

#### chromium/src/gin/public/gin_embedders.h

None

* * *

### DEPS core/dom/ContextLifecycleObserver.h  

[REF](#coredomcontextlifecycleobserverh)

#### platform/LifecycleContext.h

| Name     |      Path      |
|----------|----------------|
| [platform/LifecycleNotifier.h](#platformlifecyclenotifierh) | [*chromium/src/third_party/WebKit/Source/platform/LifecycleNotifier.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/LifecycleNotifier.h) |
| [platform/LifecycleObserver.h](#platformlifecycleobserverh) | [*chromium/src/third_party/WebKit/Source/platform/LifecycleObserver.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/LifecycleObserver.h) |

###### platform/LifecycleNotifier.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [platform/LifecycleObserver.h](#platformlifecycleobserverh) | [*chromium/src/third_party/WebKit/Source/platform/LifecycleObserver.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/LifecycleObserver.h) |

###### platform/LifecycleObserver.h

None

* * *

### DEPS bindings/core/v8/ScriptValue.h

#### bindings/core/v8/SharedPersistent.h

[REF](#bindingscorev8scriptvalueh)

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScopedPersistent.h](#bindingscorev8scopedpersistenth) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h) |

###### bindings/core/v8/ScopedPersistent.h

None

* * *

### DEPS core/inspector/InjectedScriptBase.h

[REF](#coreinspectorinjectedscriptbaseh)

#### chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h

| Name     |      Path      |
|----------|----------------|
| [platform/JSONValues.h](#platformjsonvaluesh) | [*chromium/src/third_party/WebKit/Source/platform/JSONValues.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/JSONValues.h) |

* * *

### DEPS core/inspector/InstrumentingAgents.h

[REF](#coreinspectorinstrumentingagentsh)

#### chromium/src/out/Debug/gen/blink/core/InstrumentingAgentsInl.h

| Name     |      Path      |
|----------|----------------|
| [platform/heap/Handle.h](#platformheaphandleh) | [*chromium/src/third_party/WebKit/Source/platform/heap/Handle.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Handle.h) |

* * *

## core/inspector/InspectorDebuggerAgent.cpp

| Name     |      Path      |
|----------|----------------|
| [core/inspector/InspectorDebuggerAgent.h](#coreinspectorinspectordebuggeragenth) | [*chromium/src/third_party/WebKit/Source/core/inspector/InspectorDebuggerAgent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InspectorDebuggerAgent.h) |
| [bindings/core/v8/ScriptDebugServer.h](#bindingscorev8scriptdebugserverh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptDebugServer.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptDebugServer.h) |
| [bindings/core/v8/ScriptRegexp.h](#bindingscorev8scriptregexph) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptRegexp.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptRegexp.h) |
| [bindings/core/v8/ScriptSourceCode.h](#bindingscorev8scriptsourcecodeh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptSourceCode.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptSourceCode.h) |
| [bindings/core/v8/ScriptValue.h](#bindingscorev8scriptvalueh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptValue.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptValue.h) |
| [core/dom/Document.h](#coredomdocumenth) | [*chromium/src/third_party/WebKit/Source/core/dom/Document.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/dom/Document.h) |
| [core/dom/ExecutionContextTask.h](#coredomexecutioncontexttaskh) | [*chromium/src/third_party/WebKit/Source/core/dom/ExecutionContextTask.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/dom/ExecutionContextTask.h) |
| [core/fetch/Resource.h](#corefetchresourceh) | [*chromium/src/third_party/WebKit/Source/core/fetch/Resource.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/fetch/Resource.h) |
| [core/inspector/ConsoleMessage.h](#coreinspectorconsolemessageh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ConsoleMessage.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ConsoleMessage.h) |
| [core/inspector/ContentSearchUtils.h](#coreinspectorcontentsearchutilsh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ContentSearchUtils.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ContentSearchUtils.h) |
| [core/inspector/InjectedScriptManager.h](#coreinspectorinjectedscriptmanagerh) | [*chromium/src/third_party/WebKit/Source/core/inspector/InjectedScriptManager.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InjectedScriptManager.h) |
| [core/inspector/InspectorPageAgent.h](#coreinspectorinspectorpageagenth) | [*chromium/src/third_party/WebKit/Source/core/inspector/InspectorPageAgent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InspectorPageAgent.h) |
| [core/inspector/InspectorState.h](#coreinspectorinspectorstateh) | [*chromium/src/third_party/WebKit/Source/core/inspector/InspectorState.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InspectorState.h) |
| [core/inspector/InstrumentingAgents.h](#coreinspectorinstrumentingagentsh) | [*chromium/src/third_party/WebKit/Source/core/inspector/InstrumentingAgents.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InstrumentingAgents.h) |
| [core/inspector/JavaScriptCallFrame.h](#coreinspectorjavascriptcallframeh) | [*chromium/src/third_party/WebKit/Source/core/inspector/JavaScriptCallFrame.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/JavaScriptCallFrame.h) |
| [core/inspector/ScriptArguments.h](#coreinspectorscriptargumentsh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptArguments.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptArguments.h) |
| [core/inspector/ScriptAsyncCallStack.h](#coreinspectorscriptasynccallstackh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptAsyncCallStack.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptAsyncCallStack.h) |
| [core/inspector/ScriptCallFrame.h](#coreinspectorscriptcallframeh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallFrame.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallFrame.h) |
| [core/inspector/ScriptCallStack.h](#coreinspectorscriptcallstackh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallStack.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallStack.h) |
| [platform/JSONValues.h](#platformjsonvaluesh) | [*chromium/src/third_party/WebKit/Source/platform/JSONValues.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/JSONValues.h) |

- leaving out `core/dom` dependencies, there is no way we should pull those in neither should we need them.
- leaving out `core/fetch/Resource.h` since we shouldn't need to fetch any

#### bindings/core/v8/ScriptDebugServer.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScopedPersistent.h](#bindingscorev8scopedpersistenth) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h) |
| [core/inspector/ScriptBreakpoint.h](#coreinspectorscriptbreakpointh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptBreakpoint.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptBreakpoint.h) |
| [core/inspector/ScriptCallStack.h](#coreinspectorscriptcallstackh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallStack.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallStack.h) |
| [core/inspector/ScriptDebugListener.h](#coreinspectorscriptdebuglistenerh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptDebugListener.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptDebugListener.h) |

#### bindings/core/v8/ScriptRegexp.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScopedPersistent.h](#bindingscorev8scopedpersistenth) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h) |

#### bindings/core/v8/ScriptSourceCode.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScriptStreamer.h](#bindingscorev8scriptstreamerh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptStreamer.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptStreamer.h) |
| [core/fetch/ResourcePtr.h](#corefetchresourceptrh) | [*chromium/src/third_party/WebKit/Source/core/fetch/ResourcePtr.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/fetch/ResourcePtr.h) |
| [core/fetch/ScriptResource.h](#corefetchscriptresourceh) | [*chromium/src/third_party/WebKit/Source/core/fetch/ScriptResource.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/fetch/ScriptResource.h) |
| [platform/weborigin/KURL.h](#platformweboriginkurlh) | [*chromium/src/third_party/WebKit/Source/platform/weborigin/KURL.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/weborigin/KURL.h) |

- leaving out last 3 since they seem only necessary when fetching resources remotely which we won't do

###### bindings/core/v8/ScriptStreamer.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [core/dom/PendingScript.h](#coredompendingscripth) | [*chromium/src/third_party/WebKit/Source/core/dom/PendingScript.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/dom/PendingScript.h) |

- ignore this include, we want to leave the dom out of this

#### core/inspector/ConsoleMessage.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScriptState.h](#bindingscorev8scriptstateh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h) |
| [core/frame/ConsoleTypes.h](#coreframeconsoletypesh) | [*chromium/src/third_party/WebKit/Source/core/frame/ConsoleTypes.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/frame/ConsoleTypes.h) |
| [core/inspector/ConsoleAPITypes.h](#coreinspectorconsoleapitypesh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ConsoleAPITypes.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ConsoleAPITypes.h) |
| [core/inspector/ScriptCallStack.h](#coreinspectorscriptcallstackh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallStack.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallStack.h) |
| [platform/heap/Handle.h](#platformheaphandleh) | [*chromium/src/third_party/WebKit/Source/platform/heap/Handle.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Handle.h) |

#### core/inspector/ContentSearchUtils.h

| Name     |      Path      |
|----------|----------------|
| [core/InspectorTypeBuilder.h](#coreinspectortypebuilderh) | [*chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h) |

#### core/inspector/InspectorPageAgent.h

| Name     |      Path      |
|----------|----------------|
| [core/InspectorFrontend.h](#coreinspectorfrontendh) | [*chromium/src/out/Debug/gen/blink/core/InspectorFrontend.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorFrontend.h) |
| [core/inspector/InspectorBaseAgent.h](#coreinspectorinspectorbaseagenth) | [*chromium/src/third_party/WebKit/Source/core/inspector/InspectorBaseAgent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InspectorBaseAgent.h) |
| [core/inspector/InspectorResourceContentLoader.h](#coreinspectorinspectorresourcecontentloaderh) | [*chromium/src/third_party/WebKit/Source/core/inspector/InspectorResourceContentLoader.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/InspectorResourceContentLoader.h) |

###### core/inspector/InspectorResourceContentLoader.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [core/fetch/ResourcePtr.h](#corefetchresourceptrh) | [*chromium/src/third_party/WebKit/Source/core/fetch/ResourcePtr.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/fetch/ResourcePtr.h) |

- ignore this include since related to fetching resources

#### core/inspector/InspectorState.h

| Name     |      Path      |
|----------|----------------|
| [platform/JSONValues.h](#platformjsonvaluesh) | [*chromium/src/third_party/WebKit/Source/platform/JSONValues.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/JSONValues.h) |
| [platform/heap/Handle.h](#platformheaphandleh) | [*chromium/src/third_party/WebKit/Source/platform/heap/Handle.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Handle.h) |

#### core/inspector/InstrumentingAgents.h

| Name     |      Path      |
|----------|----------------|
| [core/InstrumentingAgentsInl.h](#coreinstrumentingagentsinlh) | [*chromium/src/out/Debug/gen/blink/core/InstrumentingAgentsInl.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InstrumentingAgentsInl.h) |

#### core/inspector/JavaScriptCallFrame.h

| Name     |      Path      |
|----------|----------------|
| [bindings/core/v8/ScopedPersistent.h](#bindingscorev8scopedpersistenth) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScopedPersistent.h) |
| [bindings/core/v8/ScriptState.h](#bindingscorev8scriptstateh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptState.h) |
| [bindings/core/v8/ScriptWrappable.h](#bindingscorev8scriptwrappableh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptWrappable.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/ScriptWrappable.h) |

###### bindings/core/v8/ScriptWrappable.h

- 

  | Name     |      Path      |
  |----------|----------------|
  | [bindings/core/v8/WrapperTypeInfo.h](#bindingscorev8wrappertypeinfoh) | [*chromium/src/third_party/WebKit/Source/bindings/core/v8/WrapperTypeInfo.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/core/v8/WrapperTypeInfo.h) |
  | [platform/ScriptForbiddenScope.h](#platformscriptforbiddenscopeh) | [*chromium/src/third_party/WebKit/Source/platform/ScriptForbiddenScope.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/ScriptForbiddenScope.h) |

- `platform/ScriptForbiddenScope.h` has no dependencies that aren't already covered, so no DEPS section was included
  here

#### core/inspector/ScriptAsyncCallStack.h

| Name     |      Path      |
|----------|----------------|
| [core/InspectorTypeBuilder.h](#coreinspectortypebuilderh) | [*chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h) |
| [core/inspector/ScriptCallStack.h](#coreinspectorscriptcallstackh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallStack.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallStack.h) |
| [platform/heap/Handle.h](#platformheaphandleh) | [*chromium/src/third_party/WebKit/Source/platform/heap/Handle.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Handle.h) |

#### core/inspector/ScriptCallFrame.h

| Name     |      Path      |
|----------|----------------|
| [core/InspectorTypeBuilder.h](#coreinspectortypebuilderh) | [*chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h) |

#### core/inspector/ScriptCallStack.h

| Name     |      Path      |
|----------|----------------|
| [core/InspectorTypeBuilder.h](#coreinspectortypebuilderh) | [*chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h*](https://code.google.com/p/chromium/codesearch#chromium/src/out/Debug/gen/blink/core/InspectorTypeBuilder.h) |
| [core/inspector/ScriptCallFrame.h](#coreinspectorscriptcallframeh) | [*chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallFrame.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/core/inspector/ScriptCallFrame.h) |
| [platform/heap/Handle.h](#platformheaphandleh) | [*chromium/src/third_party/WebKit/Source/platform/heap/Handle.h*](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/platform/heap/Handle.h) |
