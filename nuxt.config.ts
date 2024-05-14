// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-electron"],
  electron: {
    build: [
      {
        entry: "electron/main.ts",
      },
      {
        entry: "electron/preload.ts",
      },
    ],
  },
  ui: {
    global: true,
  },
  ssr: false,
});
