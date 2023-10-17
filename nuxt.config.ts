// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Notes app"
    }
  },
  css: ["~/assets/scss/main.scss"],
  modules: [
    ["@pinia/nuxt", {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ]
  ],
  buildModules: [
    '@nuxtjs/moment'
  ],
  devtools: { enabled: true }
})
