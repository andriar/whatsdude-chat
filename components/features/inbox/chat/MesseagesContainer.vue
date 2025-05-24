<template>
  <div class="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
    <div
      v-for="msg in messages"
      :key="msg.id"
      :class="[
        'flex flex-col',
        msg.from === 'me' ? 'items-end' : 'items-start',
      ]"
    >
      <div
        v-if="msg.type === 'text'"
        :class="[
          'rounded-xl px-4 py-2 max-w-[60%] text-base',
          msg.from === 'me' ? 'bg-indigo-500 text-white' : 'bg-gray-100',
        ]"
      >
        {{ msg.text }}
      </div>
      <div
        v-else-if="msg.type === 'audio'"
        :class="[
          'flex items-center gap-2 rounded-xl px-3 py-2',
          msg.from === 'me' ? 'bg-indigo-500 text-white' : 'bg-gray-100',
        ]"
      >
        <UButton icon="i-lucide-play" size="sm" variant="ghost" />
        <div class="w-16 h-2 bg-gray-300 rounded" />
        <span class="text-xs text-gray-400">{{ msg.duration }}</span>
      </div>
      <div
        v-else-if="msg.type === 'file'"
        :class="[
          'flex items-center gap-2 rounded-xl px-3 py-2',
          msg.from === 'me' ? 'bg-indigo-500 text-white' : 'bg-gray-100',
        ]"
      >
        <UIcon name="i-lucide-file" />
        <span>{{ msg.fileName }}</span>
        <span class="text-xs text-gray-400">{{ msg.fileSize }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMessage } from '~/types/inbox';

defineProps<{
  messages: IMessage[];
}>();
</script>

<style scoped></style>
