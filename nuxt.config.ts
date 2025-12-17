// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true },
//   modules: ['@nuxt/ui', '@nuxt/content'],
//   css:["assets/css/main.css"]
// })



export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content'], 
  css: ['assets/css/main.css'],
  content: {
    
  },
  nitro: {
    devProxy: {
      host: '127.0.0.1',
    }
  }
})
