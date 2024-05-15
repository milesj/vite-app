export interface ActiveProject {
  dir: string;
  tool: "nuxt" | "vite";
}

export function useActiveProject() {
  return useState<ActiveProject>("activeProject");
}
