<template>
  <div ref="chatContainer" class="flex-1 p-6 overflow-y-auto flex flex-col gap-y-1">
    <MessageItem
      v-for="(message, index) in messages"
      :key="message.id"
      :message="message"
      :previous-message="getPreviousMessage(index)" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import type { IMessage } from '~/types/inbox';
import MessageItem from './MessageItem.vue';

const props = defineProps<{
  messages: IMessage[];
}>();

const chatContainer = ref<HTMLElement>();

// Functions
const getPreviousMessage = (currentIndex: number): IMessage | null => {
  return currentIndex > 0 ? props.messages[currentIndex - 1] : null;
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// Watches
watch(
  () => props.messages.length,
  () => {
    nextTick(() => {
      scrollToBottom();
    });
  }
);
</script>

<style scoped></style>
