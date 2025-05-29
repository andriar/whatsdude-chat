<template>
  <UApp>
    <div class="flex h-screen w-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-white flex flex-col p-8 pt-8 pb-4 rounded-l-3xl shadow-md">
        <div class="flex items-center mb-8">
          <UIcon name="i-lucide-bot-message-square" size="2xl" class="mr-2" />
          <span class="font-bold text-lg">WhatsDude</span>
        </div>

        <nav class="flex-1">
          <UNavigationMenu :items="navItems" orientation="vertical" class="data-[orientation=vertical]:w-48" />
        </nav>
        <div class="mt-8">
          <div class="text-xs text-gray-400 mb-2">PROJECTS</div>
          <div class="mb-2">
            <div v-for="project in projects" :key="project.name" class="flex items-center mb-1 text-sm">
              <span :class="project.color" class="w-2 h-2 rounded-full mr-2 inline-block" />
              <span>{{ project.name }}</span>
              <span v-if="project.count" class="ml-auto text-xs text-gray-400">+{{ project.count }}</span>
            </div>
          </div>
          <UButton size="sm" variant="ghost">Show more</UButton>
        </div>
      </aside>

      <div class="w-full">
        <slot />
      </div>
    </div>
  </UApp>
</template>

<script lang="ts" setup>
import { useConversationsStore } from '~/stores/inbox/conversations';

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
      }
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      disabled: true
    }
  ]
])

const projects = [
  { name: 'Callipso', color: 'bg-purple-500' },
  { name: 'BWS bank', color: 'bg-blue-500', count: 5 },
  { name: 'Unicorn app', color: 'bg-pink-400', count: 3 },
  { name: 'Salt', color: 'bg-green-400', count: 1 },
];

// Composables
const user = useSupabaseUser();
const authId = user.value?.id;
const { trackPresence, untrackPresence } = usePresence();
const supabase = useSupabaseClient();
const { setupMessageSubscription } = useConversationSubscriptions();
const channel = setupMessageSubscription();
const conversationsStore = useConversationsStore();


// Lifecycle hooks
onMounted(() => {
  conversationsStore.fetchConversations();
  if (authId) {
    trackPresence(authId);
  }
});

onUnmounted(() => {
  if (channel) {
    supabase.removeChannel(channel);
  }
  untrackPresence();
});
</script>