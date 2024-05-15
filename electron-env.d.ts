/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string;
    VITE_PUBLIC: string;
  }
}

type Result<T> = [T, Error | null];

// Used in Renderer process, expose in `preload.ts`
interface Window {
  api: {
    openFsBrowser: () => Result<{ dir: string; tool: "nuxt" | "vite" } | null>;
  };
  ipc: import("electron").IpcRenderer;
}
