import type { BrowserWindow } from "electron";
import { spawn, type SpawnOptions } from "node:child_process";

export function execChildProcess(
  window: BrowserWindow,
  command: string,
  args: string[],
  options: SpawnOptions
) {
  const child = spawn(command, args, {
    ...options,
    stdio: "pipe",
  });

  child.stderr.on("data", (line) => {
    window.webContents.send("process:stderr", line);
  });

  child.stdout.on("data", (line) => {
    window.webContents.send("process:stdout", line);
  });

  child.on("close", (code) => {
    window.webContents.send("process:close", code);
  });

  child.on("error", (error) => {
    window.webContents.send("process:error", error);
  });
}
