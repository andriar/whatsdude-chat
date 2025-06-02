<template>
  <div
    class="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
  >
    <div class="flex items-center gap-x-4 flex-1">
      <!-- Avatar -->
      <div class="relative">
        <UAvatar :src="activeConversation.avatar" class="w-8 h-8" />
        <div
          class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-800"
          :class="{
            'bg-green-500': isOnline,
            'bg-gray-300 dark:bg-gray-600': !isOnline,
          }"
        />
      </div>

      <!-- Name and Status -->
      <div>
        <div class="text-sm text-black-900 dark:text-gray-100 font-semibold">
          {{ activeConversation.name }}
        </div>
        <div
          class="text-xs"
          :class="isOnline ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'"
        >
          {{ statusText }}
        </div>
      </div>
    </div>

    <!-- Actions -->
    <HeaderActionButton />
  </div>
</template>

<script setup lang="ts">
  import type { IConversation } from '~/types/inbox'
  import HeaderActionButton from './HeaderActionButton.vue'
  import { useOnlineStatusStore } from '~/stores/online-status'
  import { computed } from 'vue'

  const props = defineProps<{
    activeConversation: IConversation
  }>()

  const onlineStatusStore = useOnlineStatusStore()
  const isOnline = computed(() =>
    onlineStatusStore.isUserOnline(props.activeConversation.sender_id.toString())
  )

  const statusText = computed(() => {
    if (isOnline.value) return 'Online'
    return 'Offline'
  })
</script>
