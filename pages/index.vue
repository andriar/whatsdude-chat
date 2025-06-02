<script setup>
  const user = useSupabaseUser()

  // Redirect authenticated users to inbox
  watchEffect(() => {
    if (user.value) {
      navigateTo('/inbox')
    }
  })
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="text-center mb-12">
      <div class="flex items-center justify-center mb-6">
        <UIcon
          name="i-lucide-bot-message-square"
          size="4xl"
          class="text-primary-600 dark:text-primary-400"
        />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Welcome to WhatsDude</h1>
      <p class="text-gray-600 dark:text-gray-400 text-lg mb-8">Your modern messaging platform</p>
    </div>

    <div class="flex gap-4">
      <UButton to="/login" color="primary" size="lg"> Login </UButton>

      <UButton to="/signup" variant="outline" size="lg"> Sign Up </UButton>
    </div>

    <div class="mt-16">
      <Lottie name="conversation" autoplay loop width="400px" height="400px" />
    </div>
  </div>
</template>
