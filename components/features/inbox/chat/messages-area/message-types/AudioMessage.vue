<template>
  <div class="flex items-center gap-2">
    <UButton
      icon="i-lucide-play"
      size="sm"
      variant="ghost"
      :class="message.from === 'me' ? 'text-white' : 'text-gray-400'"
    />
    <div class="w-16 h-2 bg-gray-300 rounded" />
    <span class="text-xs">{{ message.duration }}</span>
  </div>
</template>

<script setup lang="ts">
import type { IMessage } from '~/types/inbox';

interface Props {
  message: IMessage;
}

defineProps<Props>();
</script>

<style scoped></style>
