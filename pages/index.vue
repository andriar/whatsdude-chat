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
    title: 'LinkUp - Secure Private Messaging Platform',
    meta: [
      {
        name: 'description',
        content:
          'LinkUp is a secure and private messaging platform that helps you stay connected with your friends and family. End-to-end encrypted, fast, and easy to use.',
      },
    ],
  })

  // Structured data for better SEO
  const structuredData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'LinkUp',
    description:
      'A secure and private messaging platform for staying connected with friends and family',
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
        innerHTML: JSON.stringify(structuredData.value),
      },
    ],
  })
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <div class="text-center mb-12 relative">
      <!-- Animated background elements -->
      <div class="absolute inset-0 -z-10">
        <div
          class="absolute top-0 left-1/4 w-72 h-72 bg-primary-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"
        />
        <div
          class="absolute top-0 right-1/4 w-72 h-72 bg-secondary-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"
        />
        <div
          class="absolute -bottom-8 left-1/3 w-72 h-72 bg-accent-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"
        />
      </div>

      <div class="flex items-center justify-center mb-6">
        <div class="relative">
          <div class="absolute inset-0 bg-primary-400/20 rounded-full blur-2xl animate-pulse" />
          <img src="/logo.png" alt="LinkUp Logo" class="w-24 h-24 relative z-10" />
        </div>
      </div>

      <h1
        class="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-300 dark:to-secondary-300"
      >
        Welcome to LinkUp
      </h1>
      <p class="text-xl text-gray-700 dark:text-gray-100 mb-8 font-medium">
        Your secure private messaging platform
      </p>
      <div class="max-w-2xl mx-auto">
        <p class="text-gray-600 dark:text-gray-200 mb-8 text-lg leading-relaxed">
          Experience secure and private communication with our end-to-end encrypted messaging
          platform. Connect with friends and family through a safe, fast, and user-friendly
          interface.
        </p>
      </div>

      <!-- Feature highlights -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div
          class="p-6 bg-white/80 dark:bg-gray-800/90 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
        >
          <UIcon
            name="i-lucide-shield-check"
            class="w-12 h-12 text-primary-500 dark:text-primary-400 mb-4"
          />
          <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            End-to-End Encryption
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Your messages are always secure and private
          </p>
        </div>
        <div
          class="p-6 bg-white/80 dark:bg-gray-800/90 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
        >
          <UIcon
            name="i-lucide-zap"
            class="w-12 h-12 text-secondary-500 dark:text-secondary-400 mb-4"
          />
          <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Lightning Fast</h3>
          <p class="text-gray-600 dark:text-gray-300">Real-time messaging with instant delivery</p>
        </div>
        <div
          class="p-6 bg-white/80 dark:bg-gray-800/90 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
        >
          <UIcon
            name="i-lucide-smile"
            class="w-12 h-12 text-accent-500 dark:text-accent-400 mb-4"
          />
          <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">User Friendly</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Intuitive interface for seamless communication
          </p>
        </div>
      </div>
    </div>

    <div class="flex gap-4 mb-16">
      <UButton
        to="/login"
        color="primary"
        size="xl"
        class="px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Get Started
      </UButton>
      <UButton
        to="/signup"
        variant="outline"
        size="xl"
        class="px-8 py-3 text-lg font-medium border-2 hover:bg-white/10 dark:hover:bg-gray-700/50 transition-all duration-300"
      >
        Sign Up
      </UButton>
    </div>

    <div class="relative w-full max-w-2xl">
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl"
      />
      <Lottie name="conversation" autoplay loop width="100%" height="400px" class="relative z-10" />
    </div>
  </div>
</template>

<style>
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }
</style>
