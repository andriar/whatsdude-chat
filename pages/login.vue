<script setup>
const email = ref('user@mail.com')
const password = ref('password')
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    const { error } = await useSupabaseClient().auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) {
      const toast = useToast()
      toast.add({
        title: 'Login Failed',
        description: error.message || 'There was a problem with your request.',
        color: 'red',
        icon: 'i-lucide-alert-circle',
        timeout: 5000
      })
      return
    }
    navigateTo('/inbox')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UCard class="w-full max-w-md">
      <template #header>
        <h1 class="text-xl font-bold">Login</h1>
      </template>

      <UForm :state="{ email, password }" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-4 ">
          <UInput v-model="email" type="email" placeholder="Enter your email" class="w-full" />

          <UInput v-model="password" type="password" placeholder="Enter your password" class="w-full" />
        </div>

        <div class="mt-4">
          <UButton type="submit" color="primary" block :loading="loading">
            Login
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>