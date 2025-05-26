<template>
  <div
    class="p-4 mx-4 mb-4 border border-gray-200 rounded-lg bg-white shadow-sm"
  >
    <!-- Input Area -->
    <div class="flex flex-col gap-y-2">
      <!-- Message Input -->
      <div>
        <UTextarea
          v-model="message"
          autoresize
          variant="none"
          placeholder="Send a message..."
          class="w-full"
          :ui="{
            base: 'h-12 w-full border-0 rounded-none p-0 focus:ring-0 focus:outline-none  text-black placeholder:text-black-700 text-sm font-normal',
          }"
          @keydown="handleKeydown"
        />
      </div>

      <!-- Action Buttons Row -->
      <MessageInputActions :message="message" @send="sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageInputActions from './MessageInputActions.vue';

const message = ref('');

const handleKeydown = (event: KeyboardEvent) => {
  // Send message when Enter is pressed (without Shift)
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // Prevent adding new line
    sendMessage();
  }
  // Allow Shift+Enter for new line (default behavior)
};

const clearMessage = () => {
  message.value = '';
};

const sendMessage = () => {
  if (message.value.trim()) {
    console.log('Sending message:', message.value);

    // Clear message after sending
    clearMessage();
  }
};
</script>

<style scoped></style>
