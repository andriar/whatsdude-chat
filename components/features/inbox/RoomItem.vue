<template>
  <div @click="$emit('select', conversation)" :class="[
    'flex items-center px-6 py-3 cursor-pointer border-l-4 transition select-none hover:bg-gray-50',
    active ? 'bg-gray-100 border-indigo-500' : 'border-transparent'
  ]">
    <UAvatar :src="conversation.avatar" size="xl" />
    <div class="ml-3 flex-1">
      <div class="font-semibold">{{ conversation.name }}</div>
      <div class="text-sm text-gray-400">{{ conversation.preview }}</div>
    </div>
    <div v-if="conversation.unread"
      class="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
      {{ conversation.unread }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IConversation } from '~/types/inbox';

defineProps<{
  conversation: IConversation
  active: boolean
}>()

defineEmits<{
  (e: 'select', conversation: IConversation): void
}>()
</script>