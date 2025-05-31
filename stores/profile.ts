import { defineStore } from 'pinia';

interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  avatar_url: string | null;
  updated_at: string;
  created_at: string;
}

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<UserProfile | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProfile = async () => {
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();

    if (!user.value) {
      profile.value = null;
      return;
    }

    loading.value = true;
    error.value = null;
    
    try {
      const { data, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.value.id)
        .single();

      if (fetchError) {
        error.value = fetchError.message;
        profile.value = null;
      } else {
        profile.value = data;
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred';
      profile.value = null;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();

    if (!user.value || !profile.value) {
      throw new Error('No user or profile found');
    }

    loading.value = true;
    error.value = null;

    try {
      const { data, error: updateError } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', user.value.id)
        .select()
        .single();

      if (updateError) throw updateError;

      profile.value = data;
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred';
      console.error('Error updating profile:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const clearProfile = () => {
    profile.value = null;
    error.value = null;
  };

  // Watch for user changes and fetch profile
  watch(
    () => useSupabaseUser().value,
    (newUser) => {
      if (newUser) {
        fetchProfile();
      } else {
        clearProfile();
      }
    },
    { immediate: true }
  );

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    clearProfile,
  };
});
