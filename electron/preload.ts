// https://www.electronjs.org/docs/latest/tutorial/esm#preload-scripts

// eslint-disable-next-line no-var-requires
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
  execChildProcess: (command: string, args: string[], options: object) =>
    ipcRenderer.invoke("process:exec-child", command, args, options),
  openProject: () => ipcRenderer.invoke("dialog:open-fs-browser"),
});
