import { defineStore } from 'pinia'

interface UserProfile {
  id: string
  user_id: string
  name: string
  avatar_url: string | null
  updated_at: string
  created_at: string
}

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastFetchTime = ref<number>(0)
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds
  const MAX_RETRIES = 3
  const RETRY_DELAY = 1000 // 1 second

  const fetchProfile = async (retryCount = 0) => {
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    if (!user.value) {
      profile.value = null
      return
    }

    // Check cache
    const now = Date.now()
    if (profile.value?.user_id === user.value.id && now - lastFetchTime.value < CACHE_DURATION) {
      return
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.value.id)
        .single()

      if (fetchError) throw fetchError

      profile.value = data
      lastFetchTime.value = now
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred'
      console.error('Error fetching profile:', e)

      // Retry logic
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)))
        return fetchProfile(retryCount + 1)
      }
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    if (!user.value || !profile.value) {
      throw new Error('No user or profile found')
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', user.value.id)
        .select()
        .single()

      if (updateError) throw updateError

      profile.value = data
      lastFetchTime.value = Date.now()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred'
      console.error('Error updating profile:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  const clearProfile = () => {
    profile.value = null
    error.value = null
    lastFetchTime.value = 0
  }

  // Watch for user changes and fetch profile
  watch(() => useSupabaseUser().value, (newUser) => {
    if (newUser) {
      fetchProfile()
    } else {
      clearProfile()
    }
  }, { immediate: true })

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    clearProfile
  }
}) 