// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getAllDisplays: () => ipcRenderer.invoke('get-all-displays'),
    handleOpenUrl: (display, url) => ipcRenderer.invoke('open-url', JSON.stringify(display), url),
    // 能暴露的不仅仅是函数，我们还可以暴露变量
})