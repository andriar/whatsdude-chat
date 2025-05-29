export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    addRouteMiddleware('auth', (to) => {
      const user = useSupabaseUser()
      const publicRoutes = ['/login', '/signup', '/daftar']

      if (!user.value && !publicRoutes.includes(to.path)) {
        const toast = useToast()
        toast.add({
          title: 'Access Denied',
          description: 'Please login to access this page',
          color: 'error',
          icon: 'i-lucide-alert-circle'
        })
        return navigateTo('/login')
      }

      if (user.value && to.path === '/login') {
        return navigateTo('/inbox')
      }
    }, { global: true })
  })
}) 