<template>
  <div
    class="p-4 mx-4 mb-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
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
            base: 'h-12 w-full border-0 rounded-none p-0 focus:ring-0 focus:outline-none text-black dark:text-gray-100 placeholder:text-black-700 dark:placeholder:text-gray-500 text-sm font-normal',
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
  import MessageInputActions from './MessageInputActions.vue'

  const emit = defineEmits(['send'])

  const message = ref('')

  const handleKeydown = (event: KeyboardEvent) => {
    // Send message when Enter is pressed (without Shift)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent adding new line
      sendMessage()
    }
    // Allow Shift+Enter for new line (default behavior)
  }

  const clearMessage = () => {
    message.value = ''
  }

  const sendMessage = () => {
    if (message.value.trim()) {
      emit('send', message.value)

      // Clear message after sending
      clearMessage()
    }
  }
</script>

<style scoped></style>
