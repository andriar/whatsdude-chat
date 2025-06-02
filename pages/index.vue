<script setup lang="ts">
  const user = useSupabaseUser()

  // Redirect authenticated users to inbox
  watchEffect(() => {
    if (user.value) {
      navigateTo('/inbox')
    }
  })

  // SEO metadata
  useHead({
    title: 'WhatsDude - Modern Messaging Platform',
    meta: [
      {
        name: 'description',
        content:
          'WhatsDude is a modern messaging platform that helps you stay connected with your friends and family. Secure, fast, and easy to use.',
      },
    ],
  })

  // Structured data for better SEO
  const structuredData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'WhatsDude',
    description: 'A modern messaging platform for staying connected with friends and family',
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }))

  // Add structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(structuredData.value),
      },
    ],
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
      <div class="max-w-2xl mx-auto">
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Experience seamless communication with our modern messaging platform. Connect with friends
          and family through a secure, fast, and user-friendly interface.
        </p>
      </div>
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
