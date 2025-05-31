// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  components: false,
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'nuxt-lottie',
    '@formkit/auto-animate/nuxt'
  ],

  fonts: {
    families: [{
      name: 'Inter',
      provider: 'google',
      weights: [400, 500, 600],
      preload: true,
      display: 'swap'
    }],
    defaults: {
      weights: [400],
      preload: true
    }
  },

  lottie: {
    componentName: 'Lottie', // Optional: Customize the component name
    lottieFolder: '/assets/lottie' // Optional: Customize the Lottie folder path
  },

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico', // Or your favicon's path
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/signup', '/login'],
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
});
