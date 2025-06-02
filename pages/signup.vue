<template>
  <div class="min-h-screen flex">
    <!-- Left side - Animated background -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500/50 to-primary-700/50" />
      <div class="relative z-10 flex flex-col items-center justify-center w-full px-12 text-white">
        <img src="/logo.png" alt="Logo" class="w-32 h-32 mb-8 animate-float drop-shadow-2xl" />
        <h2 class="text-4xl font-bold mb-4 text-center">Join LinkUp</h2>
        <p class="text-lg text-white/80 text-center max-w-md">
          Create your account and start connecting with friends and family in a whole new way.
        </p>
      </div>
      <!-- Animated shapes -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="shape shape-1" />
        <div class="shape shape-2" />
        <div class="shape shape-3" />
      </div>
    </div>

    <!-- Right side - Signup form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <div class="text-center mb-8 lg:hidden animate-fade-in">
          <img src="/logo.png" alt="Logo" class="w-20 h-20 mx-auto mb-4" />
        </div>
        <h1
          class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 animate-fade-in"
          style="animation-delay: 100ms"
        >
          Create your account
        </h1>

        <UForm :state="{ email, password, confirmPassword, username }" @submit.prevent="onSubmit">
          <div class="space-y-4">
            <UInput
              v-model="username"
              placeholder="Choose a username"
              class="w-full animate-fade-in"
              icon="i-lucide-user"
              style="animation-delay: 200ms"
            />

            <UInput
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full animate-fade-in"
              icon="i-lucide-mail"
              style="animation-delay: 300ms"
            />

            <UInput
              v-model="password"
              type="password"
              placeholder="Create a password"
              class="w-full animate-fade-in"
              icon="i-lucide-lock"
              style="animation-delay: 400ms"
            />

            <UInput
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              class="w-full animate-fade-in"
              icon="i-lucide-lock"
              style="animation-delay: 500ms"
            />
          </div>

          <div class="mt-6 animate-fade-in" style="animation-delay: 600ms">
            <UButton type="submit" color="primary" block :loading="loading" class="h-12 text-base">
              Create Account
            </UButton>
          </div>

          <div
            class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 animate-fade-in"
            style="animation-delay: 700ms"
          >
            Already have an account?
            <NuxtLink
              to="/login"
              class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              Sign in here
            </NuxtLink>
          </div>
        </UForm>
      </div>
    </div>
  </div>
</template>

<script setup>
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const username = ref('')
  const loading = ref(false)

  async function onSubmit() {
    if (password.value !== confirmPassword.value) {
      const toast = useToast()
      toast.add({
        title: 'Password Mismatch',
        description: 'The passwords do not match.',
        color: 'red',
        icon: 'i-lucide-alert-circle',
        timeout: 5000,
      })
      return
    }

    loading.value = true
    try {
      const { error } = await useSupabaseClient().auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            username: username.value,
          },
        },
      })

      if (error) {
        const toast = useToast()
        toast.add({
          title: 'Signup Failed',
          description: error.message || 'There was a problem with your request.',
          color: 'red',
          icon: 'i-lucide-alert-circle',
          timeout: 5000,
        })
        return
      }

      // Navigate to profile setup
      navigateTo('/profile-setup')
    } catch (error) {
      console.error('Signup failed:', error)
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped>
  .shape {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 20s infinite;
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
    animation-delay: 0s;
  }

  .shape-2 {
    width: 200px;
    height: 200px;
    top: 50%;
    right: -100px;
    animation-delay: -5s;
  }

  .shape-3 {
    width: 150px;
    height: 150px;
    bottom: -75px;
    left: 50%;
    animation-delay: -10s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(50px, 50px) rotate(90deg);
    }
    50% {
      transform: translate(0, 100px) rotate(180deg);
    }
    75% {
      transform: translate(-50px, 50px) rotate(270deg);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .bg-grid-white {
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
  }
</style>
