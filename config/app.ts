type DateString = `${number}-${number}-${number}`;

export const appConfig = {
  pageTransition: { name: 'page', mode: 'out-in' as const },
  components: false,
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  compatibilityDate: {
    default: '2025-05-15' as DateString
  }
} 