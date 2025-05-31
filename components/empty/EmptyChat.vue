<template>
  <section class="flex-1 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
    <div class="flex items-center justify-center h-full">
      <div class="flex flex-col items-center justify-center gap-4 w-full">
        <Lottie name="conversation" autoplay loop width="300px" height="300px" />
        <p class="text-gray-500">You don't have any conversations yet.</p>

        <UButton label="Create Conversation" @click="createConversation" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  const emit = defineEmits<{
    (e: 'createConversation'): void
  }>()

  const createConversation = () => {
    console.log('createConversation')
    emit('createConversation')
  }
</script>
