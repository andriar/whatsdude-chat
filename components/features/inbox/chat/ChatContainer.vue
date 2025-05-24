<template>
  <section
    v-if="activeConversation"
    class="flex-1 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden"
  >
    <!-- Header Chat Section -->
    <HeaderBar :active-conversation="activeConversation" />

    <!-- Chat Messages Section -->
    <MesseagesContainer :messages="messages" />

    <!-- Chat Messages Input Section -->
    <MessagesInput />
  </section>
</template>

<script lang="ts" setup>
import type { IConversation, IMessage } from '~/types/inbox';

// import components
import HeaderBar from '~/components/features/inbox/chat/header-area/HeaderBar.vue';
import MessagesInput from '~/components/features/inbox/chat/input-area/MessagesInput.vue';
import MesseagesContainer from '~/components/features/inbox/chat/messages-area/MessagesContainer.vue';

defineProps<{
  activeConversation: IConversation | null;
  messages: IMessage[];
}>();
</script>

<style scoped></style>
