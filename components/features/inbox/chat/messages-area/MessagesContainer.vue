<template>
  <div ref="chatContainer" v-auto-animate class="flex-1 p-6 overflow-y-auto flex flex-col gap-y-1">
    <template v-for="(message, index) in messages" :key="message.id">
      <MessageItem :message="message" :previous-message="getPreviousMessage(index)" />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick } from 'vue'
  import type { IMessage } from '~/types/inbox'
  import MessageItem from './MessageItem.vue'

  const props = defineProps<{
    messages: IMessage[]
  }>()

  const chatContainer = ref<HTMLElement>()

  // Functions
  const getPreviousMessage = (currentIndex: number): IMessage | null => {
    return currentIndex > 0 ? props.messages[currentIndex - 1] : null
  }

  // Watches
  watch(
    () => props.messages.length,
    () => {
      nextTick(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTo({
            top: chatContainer.value.scrollHeight,
            behavior: 'smooth',
          })
        }
      })
    }
  )
</script>

<style scoped></style>
