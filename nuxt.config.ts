import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["@nuxthub/core", "@nuxt/icon", "@vueuse/nuxt"],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2025-03-01",
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    cloudflareAccountId: "",
    cloudflareGatewayId: "",
    googleAiToken: "",
  },
  hub: {
    browser: true,
  },
});
