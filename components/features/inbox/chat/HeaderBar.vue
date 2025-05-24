<template>
  <div class="flex items-center p-6 border-b border-white-300 bg-white">
    <UAvatar :src="activeConversation.avatar" class="w-10 h-10" />
    <div class="ml-4.5">
      <div class="body-sm font-semibold">{{ activeConversation.name }}</div>
      <div class="text-xs text-green-400">Online</div>
    </div>

    <UInput
      icon="i-lucide-search"
      placeholder="Search..."
      class="ml-auto w-44"
    />

    <div class="flex gap-2 ml-4">
      <UButton icon="i-lucide-mic" size="sm" variant="ghost" />
      <UButton icon="i-lucide-paperclip" size="sm" variant="ghost" />
      <UButton icon="i-lucide-ellipsis-vertical" size="sm" variant="ghost" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IConversation } from '~/types/inbox';

defineProps<{
  activeConversation: IConversation;
}>();
</script>
