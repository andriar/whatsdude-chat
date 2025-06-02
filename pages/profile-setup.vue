<script setup>
  import { useProfileStore } from '../stores/profile'

  definePageMeta({
    middleware: ['profile'],
  })

  const name = ref('')
  const avatar = ref(null)
  const loading = ref(false)
  const previewUrl = ref('')
  const avatarLoading = ref(false)
  const profileStore = useProfileStore()

  // File validation constants
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

  // Handle file selection
  function handleFileSelect(event) {
    const file = event.target.files[0]
    if (!file) return

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const toast = useToast()
      toast.add({
        title: 'File too large',
        description: 'Please select an image smaller than 5MB',
        color: 'red',
        icon: 'i-lucide-alert-circle',
        timeout: 5000,
      })
      return
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      const toast = useToast()
      toast.add({
        title: 'Invalid file type',
        description: 'Please select a JPEG, PNG, GIF, or WebP image',
        color: 'red',
        icon: 'i-lucide-alert-circle',
        timeout: 5000,
      })
      return
    }

    avatar.value = file
    // Create preview URL
    previewUrl.value = URL.createObjectURL(file)
  }

  // Upload avatar function
  async function uploadAvatar() {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    if (!user.value) {
      throw new Error('No user found')
    }

    avatarLoading.value = true
    try {
      const fileExt = avatar.value.name.split('.').pop()
      const fileName = `${user.value.id}/${Date.now()}.${fileExt}`

      // Check and delete existing avatar
      const { data: existingFiles, error: listError } = await supabase.storage
        .from('avatars')
        .list(user.value.id)

      if (listError) throw listError

      if (existingFiles && existingFiles.length > 0) {
        // Delete all existing avatars for this user
        const deletePromises = existingFiles.map(file =>
          supabase.storage.from('avatars').remove([`${user.value.id}/${file.name}`])
        )
        const deleteResults = await Promise.all(deletePromises)

        // Check if any delete operations failed
        const deleteErrors = deleteResults.filter(result => result.error)
        if (deleteErrors.length > 0) {
          throw new Error('Failed to delete some existing avatars')
        }
      }

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatar.value)

      if (uploadError) throw uploadError

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error('Avatar upload failed:', error)
      const toast = useToast()
      toast.add({
        title: 'Error',
        description: error.message || 'Failed to upload avatar',
        color: 'red',
        icon: 'i-lucide-alert-circle',
        timeout: 5000,
      })
      throw error
    } finally {
      avatarLoading.value = false
    }
  }

  async function onSubmit() {
    if (!name.value) {
      const toast = useToast()
      toast.add({
        title: 'Validation Error',
        description: 'Please enter your name',
        color: 'red',
        icon: 'i-lucide-alert-circle',
        timeout: 5000,
      })
      return
    }

    loading.value = true
    try {
      const supabase = useSupabaseClient()
      const user = useSupabaseUser()

      if (!user.value) {
        throw new Error('No user found')
      }

      // Upload avatar if selected
      let avatarUrl = null
      if (avatar.value) {
        avatarUrl = await uploadAvatar()
      }

      // Save profile data
      const { error } = await supabase.from('user_profiles').upsert(
        {
          user_id: user.value.id,
          name: name.value,
          avatar: avatarUrl,
        },
        { onConflict: 'user_id' }
      )

      if (error) throw error

      // Update profile store
      await profileStore.fetchProfile()

      const toast = useToast()
      toast.add({
        title: 'Success',
        description: 'Profile updated successfully',
        color: 'green',
        icon: 'i-lucide-check-circle',
        timeout: 5000,
      })

      // Wait for profile to be loaded before navigating
      if (profileStore.profile) {
        await navigateTo('/inbox', { replace: true })
      } else {
        throw new Error('Profile not loaded after update')
      }
    } catch (error) {
      console.error('Profile update failed:', error)
      const toast = useToast()
      toast.add({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        color: 'red',
        icon: 'i-lucide-alert-circle',
        timeout: 5000,
      })
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    if (profileStore.profile) {
      await navigateTo('/inbox', { replace: true })
    }
  })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <UCard class="w-full max-w-md dark:bg-gray-800">
      <template #header>
        <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Complete Your Profile</h1>
      </template>

      <UForm :state="{ name }" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-4">
          <!-- Avatar Upload -->
          <div class="flex flex-col items-center gap-2">
            <div
              class="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700"
            >
              <img
                v-if="previewUrl"
                :src="previewUrl"
                alt="Avatar preview"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
              >
                <UIcon name="i-lucide-user" class="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <!-- Loading Overlay -->
              <div
                v-if="avatarLoading"
                class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              >
                <UIcon name="i-lucide-loader-2" class="w-8 h-8 text-white animate-spin" />
              </div>
            </div>
            <UInput
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              class="w-full dark:bg-gray-700 dark:text-gray-100"
              :disabled="avatarLoading"
              @change="handleFileSelect"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Max file size: 5MB. Supported formats: JPEG, PNG, GIF, WebP
            </p>
          </div>

          <!-- Name Input -->
          <UInput
            v-model="name"
            type="text"
            placeholder="Enter your name"
            class="w-full dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div class="mt-4">
          <UButton type="submit" color="primary" block :loading="loading" :disabled="avatarLoading">
            Save Profile
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
