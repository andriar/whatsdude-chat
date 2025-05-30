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
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/signup', '/login'],
    },
  },
});
