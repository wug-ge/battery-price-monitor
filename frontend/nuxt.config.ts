// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  app: {
    head: {
      title: "Batter Price Monitor",
      link: [{ rel: "icon", type: "image/svg", href: "/logo.svg" }],
    },
  },

  build: {
    transpile: [
      /echarts/,
      "vue-echarts",
      "resize-detector", // needed for echarts, see https://github.com/nuxt/nuxt/issues/14553#issuecomment-1934042981
    ],
  },

  routeRules: {
    "/api/**": {
      proxy:
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/**`
          : `https://bpm.wug.ge/api/**`,
    },
  },
});
