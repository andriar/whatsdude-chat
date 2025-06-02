<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Confirming your authentication...
      </h1>
      <p class="text-gray-600 dark:text-gray-400">Please wait while we complete your sign in.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const client = useSupabaseClient()
  const router = useRouter()

  onMounted(async () => {
    try {
      // Get the session from the URL hash
      const {
        data: { session },
        error,
      } = await client.auth.getSession()

      if (error) throw error

      if (session) {
        // If we have a session, redirect to the home page
        router.push('/')
      }
    } catch (error) {
      console.error('Error during authentication:', error)
      // Redirect to login page if there's an error
      router.push('/login')
    }
  })
</script>
