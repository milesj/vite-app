import { BrowserWindow, app, dialog } from "electron";
import fs from "node:fs";
import path from "node:path";
import type { PackageJson } from "type-fest";
import { ok, err, type Result } from "#utils/result";

// Vite should be last!
const TOOLS = {
  nuxt: {
    configs: ["nuxt.config.ts"],
    dep: "nuxt",
  },
  vite: {
    configs: ["vite.config.ts", "vite.config.js"],
    dep: "vite",
  },
};

export async function openFsBrowser(
  win: BrowserWindow,
  checkForVite: boolean
): Promise<Result<{ dir: string; tool: string } | null>> {
  let { canceled, filePaths } = await dialog.showOpenDialog(win!, {
    defaultPath: app.getPath("home"),
    properties: ["openDirectory", "createDirectory", "promptToCreate"],
  });

  if (canceled || filePaths.length === 0) {
    return ok(null);
  }

  let dir = filePaths[0];

  if (!checkForVite) {
    return ok({ dir, tool: "vite" });
  }

  let pkgPath = path.join(dir, "package.json");
  let pkg: PackageJson = {};

  if (fs.existsSync(pkgPath)) {
    pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  }

  for (let [name, tool] of Object.entries(TOOLS)) {
    let result = { dir, tool: name };

    for (let configName of tool.configs) {
      if (fs.existsSync(path.join(dir, configName))) {
        return ok(result);
      }
    }

    if (pkg.dependencies?.[tool.dep] || pkg.devDependencies?.[tool.dep]) {
      return ok(result);
    }
  }

  return err("Selected directory does not contain Vite.");
}
