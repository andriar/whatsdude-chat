<template>
  <UModal
    title="Modal with title"
    description="Modal with description"
    :open="props.open"
    class="dark:bg-gray-900"
    @update:open="emit('update:open', $event)"
  >
    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        :loading="isLoading"
        multiple
        :groups="groups"
        class="flex-1 dark:bg-gray-800 dark:text-gray-100"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
  const props = defineProps<{
    open: boolean
  }>()

  const emit = defineEmits<{
    'update:open': [value: boolean]
    select: [value: UserProfile]
  }>()
  const supabase = useSupabaseClient()

  const searchTerm = ref('')

  interface UserProfile {
    id: string
    name: string
    email: string
    avatar: string
  }

  interface UserItem {
    id: string
    label: string
    suffix: string
    avatar: { src: string }
  }

  const users = ref<UserItem[]>([])
  const isLoading = ref(false)
  const getUsers = async () => {
    isLoading.value = true
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .ilike('name', `%${searchTerm.value}%`)
      .not('user_id', 'eq', useSupabaseUser().value?.id)
      .limit(10)

    if (error) {
      console.error('Error fetching users:', error)
      return []
    }

    const users = (data as UserProfile[]).map(user => ({
      id: user.id,
      label: user.name || '',
      suffix: user.email || '',
      avatar: { src: user.avatar || '' },
      onSelect() {
        emit('select', user)
      },
    }))

    isLoading.value = false
    return users
  }

  const groups = computed(() => [
    {
      id: 'users',
      label: searchTerm.value ? `Users matching "${searchTerm.value}"...` : 'Users',
      items: users.value || [],
      ignoreFilter: true,
    },
  ])

  const debouncedSearch = useDebounce(async () => {
    users.value = await getUsers()
  }, 300)

  watch(searchTerm, () => {
    debouncedSearch()
  })

  watch(
    () => props.open,
    async newValue => {
      if (newValue) {
        users.value = await getUsers()
      } else {
        users.value = []
        searchTerm.value = ''
      }
    }
  )
</script>
