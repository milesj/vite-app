// https://www.electronjs.org/docs/latest/tutorial/esm#preload-scripts

const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;

    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    return ipcRenderer.off(...args);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    return ipcRenderer.send(...args);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    return ipcRenderer.invoke(...args);
  },
});

contextBridge.exposeInMainWorld("api", {
  openFsBrowser: () => ipcRenderer.invoke("dialog:open-fs-browser"),
});
