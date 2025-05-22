<script setup>
const email = ref('')
const password = ref('')
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    // Add your login logic here
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
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

      <UForm :state="{ email, password }" @submit="onSubmit">
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