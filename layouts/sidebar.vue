<template>
  <UApp>
    <div class="flex h-screen w-screen">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div
          v-if="profileStore.loading"
          class="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm fixed top-0 left-0 w-full h-full flex items-center justify-center z-10"
        >
          <div class="w-[300px] h-[300px]">
            <Lottie name="default-loading" autoplay loop />
          </div>
        </div>
      </Transition>
      <!-- Sidebar -->
      <aside
        class="w-64 bg-white dark:bg-gray-900 flex flex-col p-8 pt-8 pb-4 rounded-l-3xl shadow-md"
      >
        <div class="flex items-center mb-8">
          <UIcon
            name="i-lucide-bot-message-square"
            size="2xl"
            class="mr-2 text-gray-900 dark:text-gray-100"
          />
          <span class="font-bold text-lg text-gray-900 dark:text-gray-100">WhatsDude</span>
        </div>

        <nav class="flex-1">
          <UNavigationMenu
            :items="navItems"
            orientation="vertical"
            class="data-[orientation=vertical]:w-48 dark:text-gray-100"
          />
        </nav>
      </aside>

      <div class="w-full dark:bg-gray-800">
        <slot />
      </div>
    </div>
  </UApp>
</template>

<script lang="ts" setup>
  import { useConversationsStore } from '~/stores/inbox/conversations'
  // import defaultLoading from '~/assets/lottie/default-loading.json'

  // Composables
  const user = useSupabaseUser()
  const authId = user.value?.id
  const { trackPresence, untrackPresence } = usePresence()
  const supabase = useSupabaseClient()
  const { setupMessageSubscription } = useConversationSubscriptions()
  const channel = setupMessageSubscription()
  const conversationsStore = useConversationsStore()
  const profileStore = useProfileStore()

  const navItems = ref([
    [
      {
        label: 'inbox',
        icon: 'i-lucide-message-circle',
        description: 'Inbox.',
        to: '/inbox',
      },
      {
        label: 'example',
        icon: 'i-lucide-equal-approximately',
        description: 'Example.',
        to: '/example',
      },
      {
        label: 'Logout',
        icon: 'i-lucide-log-out',
        description: 'Logout.',
        onSelect: async () => {
          const { error } = await useSupabaseClient().auth.signOut()
          if (error) {
            console.error('Error signing out:', error)
          } else {
            navigateTo('/login')
          }
        },
      },
    ],
    [
      {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        badge: '3.8k',
        to: 'https://github.com/nuxt/ui',
        target: '_blank',
      },
      {
        label: 'Help',
        icon: 'i-lucide-circle-help',
        disabled: true,
      },
    ],
  ])

  // Lifecycle hooks
  onMounted(async () => {
    if (authId) {
      conversationsStore.fetchConversations()
      trackPresence(authId)
    }
  })

  onUnmounted(() => {
    if (channel) {
      supabase.removeChannel(channel)
    }
    untrackPresence()
  })
</script>
