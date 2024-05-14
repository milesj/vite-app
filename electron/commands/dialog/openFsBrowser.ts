import { BrowserWindow, app, dialog } from "electron";
import fs from "node:fs";
import path from "node:path";
import type { PackageJson } from "type-fest";

export async function openFsBrowser(win: BrowserWindow) {
  const { canceled, filePaths } = await dialog.showOpenDialog(win!, {
    defaultPath: app.getPath("home"),
    message: "Open a Vite enabled directory.",
    properties: ["openDirectory"],
  });

  if (canceled || filePaths.length === 0) {
    return null;
  }

  const dir = filePaths[0];

  for (const configName of ["vite.config.ts", "vite.config.js"]) {
    if (fs.existsSync(path.join(dir, configName))) {
      return dir;
    }
  }

  const pkgPath = path.join(dir, "package.json");

  if (fs.existsSync(pkgPath)) {
    const pkg: PackageJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

    if (pkg.dependencies?.vite || pkg.devDependencies?.vite) {
      return dir;
    }
  }

  throw new Error(
    "Opened directory is not Vite enabled. Must contain a `vite.config.*` file, or have a `vite` package dependency."
  );
}
