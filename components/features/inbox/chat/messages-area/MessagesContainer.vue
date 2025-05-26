<template>
  <div class="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
    <MessageItem v-for="(message, index) in messages" :key="message.id" :message="message"
      :previous-message="index > 0 ? messages[index - 1] : null" />
  </div>
</template>

<script setup lang="ts">
import type { IMessage } from '~/types/inbox';

// import components
import MessageItem from './MessageItem.vue';

defineProps<{
  messages: IMessage[];
}>();
</script>

<style scoped></style>
