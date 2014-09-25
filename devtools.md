## DevTools

- [src/third_party/WebKit/Source/devtools](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/devtools/)

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
