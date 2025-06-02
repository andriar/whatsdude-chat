export const runtimeConfig = {
  public: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
}

export const supabaseConfig = {
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_KEY,
  redirectOptions: {
    login: '/login',
    callback: '/confirm',
    exclude: ['/signup', '/login', '/'],
  },
} 