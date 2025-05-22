export default defineNuxtRouteMiddleware((to, _) => {
  const user = useSupabaseUser()

  // If user is not authenticated and trying to access protected route
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  // If user is authenticated and trying to access login page
  if (user.value && to.path === '/login') {
    return navigateTo('/inbox')
  }

})
