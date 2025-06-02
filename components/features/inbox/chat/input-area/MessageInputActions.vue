<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-x-6">
      <!-- Action Buttons  -->
      <UButton
        v-for="action in actionButtons"
        :key="action.id"
        :icon="action.icon"
        :ui="{
          base: 'w-6 h-6 !p-0 flex items-center justify-center hover',
          leadingIcon: '!w-6 !h-6 text-black-700 dark:text-gray-400',
        }"
        size="sm"
        variant="ghost"
        @click="action.handler"
      />
    </div>

    <!-- Send Button -->
    <UButton
      :disabled="isSendButtonDisabled"
      :ui="{
        base: 'w-6 h-6 !p-0 flex items-center justify-center flex-shrink-0',
        leadingIcon: '!w-6 !h-6 text-black-700 dark:text-gray-400',
      }"
      size="sm"
      variant="ghost"
      icon="i-lucide-send"
      @click="sendMessage"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    message: string
  }>()

  const emit = defineEmits<{
    send: []
  }>()

  const sendMessage = () => {
    if (props.message.trim()) {
      emit('send')
    }
  }

  // List of rules that make the send button disabled:
  // 1. When the message is empty (no text or only whitespace)
  const isSendButtonDisabled = computed(() => {
    const isMessageEmpty = !props.message.trim()
    return isMessageEmpty
  })

  const handleFileAttachment = () => {
    console.log('File attachment clicked')
  }

  const handleImageUpload = () => {
    console.log('Image upload clicked')
  }

  const handlePresentationUpload = () => {
    console.log('Presentation upload clicked')
  }

  const handleArchiveUpload = () => {
    console.log('Archive upload clicked')
  }

  const handlePhoneCall = () => {
    console.log('Phone call clicked')
  }

  interface ActionButton {
    id: string
    icon: string
    handler: () => void
  }

  const actionButtons: ActionButton[] = [
    {
      id: 'file-attachment',
      icon: 'i-lucide-file-text',
      handler: handleFileAttachment,
    },
    {
      id: 'image-upload',
      icon: 'i-lucide-image',
      handler: handleImageUpload,
    },
    {
      id: 'presentation-upload',
      icon: 'i-lucide-message-square-text',
      handler: handlePresentationUpload,
    },
    {
      id: 'archive-upload',
      icon: 'i-lucide-archive',
      handler: handleArchiveUpload,
    },
    {
      id: 'phone-call',
      icon: 'i-lucide-phone',
      handler: handlePhoneCall,
    },
  ]
</script>

<style scoped></style>
