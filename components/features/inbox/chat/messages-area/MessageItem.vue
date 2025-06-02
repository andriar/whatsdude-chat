<template>
  <div
    :class="[
      'flex items-center gap-2',
      isFromMe && 'flex-row-reverse',
      isFirstMessageFromSender && 'mt-4',
    ]"
  >
    <!-- Avatar is only displayed if this is the first message from the sender -->
    <UAvatar
      v-if="isFirstMessageFromSender"
      :src="'https://latest-multichannel.qiscus.com/img/default_avatar.svg'"
      class="w-10 h-10"
    />
    <!-- Spacer to maintain alignment when avatar is not displayed -->
    <div v-else class="w-10 h-10" />

    <!-- Message content -->
    <component
      :is="messageComponentMap[message.type]"
      :message="message"
      :class="[
        'rounded-xl px-4 py-2 max-w-[60%] text-sm shadow-lg',
        isFromMe ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-100',
      ]"
    />

    <!-- Message time and status -->
    <div :class="['flex flex-col h-full', isFromMe ? 'items-end' : 'justify-center']">
      <span class="text-xs text-black-700 dark:text-gray-400">{{ time }}</span>
      <UIcon v-if="isFromMe" name="i-lucide-check-check" class="text-primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { IMessage } from '~/types/inbox'

  // import components
  import TextMessage from './message-types/TextMessage.vue'
  import AudioMessage from './message-types/AudioMessage.vue'
  import FileMessage from './message-types/FileMessage.vue'

  interface Props {
    message: IMessage
    previousMessage?: IMessage | null
  }

  const props = defineProps<Props>()

  // Computed properties
  const isFromMe = computed(() => props.message.from === 'me')
  const messageComponentMap = computed(() => MESSAGE_COMPONENTS)
  const time = computed(() => {
    return formatTime(props.message.created_at).time || '00:00'
  })

  // Logic to display avatar only on the first message
  const isFirstMessageFromSender = computed(() => {
    // If there's no previous message, show the avatar
    if (!props.previousMessage) return true

    // If the sender is different from the previous message, show the avatar
    return props.previousMessage.from !== props.message.from
  })

  // Constants
  const MESSAGE_COMPONENTS = {
    text: TextMessage,
    audio: AudioMessage,
    file: FileMessage,
  } as const
</script>

<style scoped></style>
