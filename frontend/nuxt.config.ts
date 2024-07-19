// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '_nuxt/assets/logo.svg' }]    }
  },

  build: {
    transpile: [  
      /echarts/,
      'vue-echarts',
    ],
  },


  routeRules: {
    '/api/**': { proxy: process.env.NODE_ENV === 'development' ?
      `http://localhost:3000/**` :
      `https://bpm.wug.ge/api/**`
    },
  },
})