// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { appConfig } from './config/app'
import { seoConfig } from './config/seo'
import { modulesConfig, fontsConfig, lottieConfig } from './config/modules'
import { runtimeConfig, supabaseConfig } from './config/runtime'

export default defineNuxtConfig({
  // App config
  components: appConfig.components,
  css: appConfig.css,
  devtools: appConfig.devtools,
  compatibilityDate: appConfig.compatibilityDate,

  // Vite config
  vite: {
    plugins: [tailwindcss()],
  },

  // Modules
  modules: modulesConfig,

  // Fonts
  fonts: fontsConfig,

  // Lottie
  lottie: lottieConfig,

  // App settings
  app: {
    head: seoConfig,
    pageTransition: appConfig.pageTransition,
  },

  // Supabase
  supabase: supabaseConfig,

  // Runtime config
  runtimeConfig,
})
