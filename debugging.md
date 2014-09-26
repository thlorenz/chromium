## Debugging

- [src/base/logging.h](https://code.google.com/p/chromium/codesearch#chromium/src/base/logging.h)
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
