<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UCard class="w-full max-w-md">
      <template #header>
        <h1 class="text-xl font-bold">Sign Up</h1>
      </template>

      <UForm :state="{ email, password, confirmPassword }" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-4">
          <UInput v-model="email" type="email" placeholder="Enter your email" class="w-full" />

          <UInput v-model="password" type="password" placeholder="Enter your password" class="w-full" />

          <UInput v-model="confirmPassword" type="password" placeholder="Confirm your password" class="w-full" />
        </div>

        <div class="mt-4">
          <UButton type="submit" color="primary" block :loading="loading">
            Sign Up
          </UButton>
        </div>

        <div class="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <NuxtLink to="/login" class="text-primary-600 hover:text-primary-500">
            Login here
          </NuxtLink>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup>
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

async function onSubmit() {
  if (password.value !== confirmPassword.value) {
    const toast = useToast()
    toast.add({
      title: 'Validation Error',
      description: 'Passwords do not match',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    return
  }

  loading.value = true
  try {
    const { error } = await useSupabaseClient().auth.signUp({
      email: email.value,
      password: password.value
    })

    if (error) {
      const toast = useToast()
      toast.add({
        title: 'Signup Failed',
        description: error.message || 'There was a problem with your request.',
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
      return
    }

    const toast = useToast()
    toast.add({
      title: 'Success',
      description: 'Please check your email to verify your account.',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    navigateTo('/login')
  } catch (error) {
    console.error('Signup failed:', error)
  } finally {
    loading.value = false
  }
}
</script>
