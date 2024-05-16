import { app, BrowserWindow, ipcMain, session } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openFsBrowser } from "./commands/dialog/openFsBrowser";
import { execChildProcess } from "./commands/process/execChild";

process.env.APP_ROOT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, ".output/public");

process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    height: 728,
    width: 1024,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(MAIN_DIST, "preload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, "index.html"));
  }
}

function initIpc() {
  ipcMain.handle("app:start-time", () => new Date().toLocaleString());

  ipcMain.handle("dialog:open-fs-browser", () => openFsBrowser(win!));

  ipcMain.handle("process:exec-child", (event, command, args, options) =>
    execChildProcess(win!, command, args, options)
  );
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  initIpc();

  // https://www.electronjs.org/docs/latest/tutorial/security#7-define-a-content-security-policy
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,
  //       "Content-Security-Policy": ["script-src 'self' https://apis.example.com"],
  //     },
  //   });
  // });

  createWindow();
});
