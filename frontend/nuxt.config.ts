// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/i18n", "@nuxt/icon"],

  app: {
    head: {
      title: "Battery Price Monitor",
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


  icon: {
    localApiEndpoint: "/_nuxt_icon",
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