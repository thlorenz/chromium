## Debugging

In order to successfully debug Chromium it needs to run as a single process. Therefore start it as follow:

```
./out/Debug/Chromium.app/Contents/MacOS/Chromium --single-process
```

### Debugging related links

- [src/base/debug/debugger.h](https://code.google.com/p/chromium/codesearch#chromium/src/base/debug/debugger.h)

### Printing StackTrace

As it is not trivial to properly debug chromium (for me it keeps crashing or fails to hit breakpoints) it is very useful
to at least be able to print stack traces from specific points in the code.

Fortunately the chromium team provides a nice stack trace implementation inside
[src/base/debug/stack_trace.cc](https://code.google.com/p/chromium/codesearch#chromium/src/base/debug/stack_trace.cc).

Use it as follows:


```cpp
#include "base/debug/stack_trace.h"

// ...

LOG(INFO) << base::debug::StackTrace.ToString();
```

### Logging

- [src/base/logging.h](https://code.google.com/p/chromium/codesearch#chromium/src/base/logging.h)
- [src/ipc/ipc_logging.cc](https://code.google.com/p/chromium/codesearch#chromium/src/ipc/ipc_logging.cc) contains IPC
  message specific log helpers including loggin in color
