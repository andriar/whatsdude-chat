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
          leadingIcon: '!w-6 !h-6 text-black-700',
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
        leadingIcon: '!w-6 !h-6',
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
  message: string;
}>();

const emit = defineEmits<{
  'update:message': [value: string];
}>();

const sendMessage = () => {
  if (props.message.trim()) {
    console.log('Sending message:', props.message);

    // Clear message after sending
    clearMessage();
  }
};

const clearMessage = () => {
  emit('update:message', '');
};

const isSendButtonDisabled = computed(() => {
  const isMessageEmpty = !props.message.trim();

  return isMessageEmpty;
});

const handleFileAttachment = () => {
  console.log('File attachment clicked');
  // Add file attachment logic
};

const handleImageUpload = () => {
  console.log('Image upload clicked');
  // Add image upload logic
};

const handlePresentationUpload = () => {
  console.log('Presentation upload clicked');
  // Add presentation upload logic
};

const handleArchiveUpload = () => {
  console.log('Archive upload clicked');
  // Add archive upload logic
};

const handlePhoneCall = () => {
  console.log('Phone call clicked');
  // Add phone call logic
};

interface ActionButton {
  id: string;
  icon: string;
  handler: () => void;
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
];
</script>

<style scoped></style>
