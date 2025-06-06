export const modulesConfig = [
  '@nuxt/eslint',
  '@nuxt/icon',
  '@nuxt/fonts',
  '@nuxt/ui',
  '@nuxtjs/supabase',
  '@pinia/nuxt',
  'nuxt-lottie',
  '@formkit/auto-animate/nuxt',
  '@nuxtjs/storybook',
]

export const fontsConfig = {
  families: [
    {
      name: 'Inter',
      provider: 'google',
      weights: [400, 500, 600],
      preload: true,
      display: 'swap',
    },
  ],
  defaults: {
    weights: [400],
    preload: true,
  },
}

export const lottieConfig = {
  componentName: 'Lottie',
  lottieFolder: '/assets/lottie',
}
