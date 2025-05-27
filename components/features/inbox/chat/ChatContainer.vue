<template>
  <section v-if="activeConversation" class="flex-1 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
    <!-- Header Chat Section -->
    <HeaderBar :active-conversation="activeConversation" />

    <!-- Chat Messages Section -->
    <MessagesContainer :messages="messages" />

    <!-- Chat Messages Input Section -->
    <MessagesInput @send="sendMessage" />
  </section>
</template>

<script lang="ts" setup>
import type { IConversation, IMessage } from '~/types/inbox';

// import components
import HeaderBar from '~/components/features/inbox/chat/header-area/HeaderBar.vue';
import MessagesInput from '~/components/features/inbox/chat/input-area/MessagesInput.vue';
import MessagesContainer from '~/components/features/inbox/chat/messages-area/MessagesContainer.vue';

const props = defineProps<{
  activeConversation: IConversation | null;
  messages: IMessage[];
}>();

const sendMessage = async (message: string) => {
  if (!props.activeConversation?.id || !useSupabaseUser().value?.id) return;

  console.log('Sending message:', message);
  const supabase = useSupabaseClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newMessage: any = {
    content: message,
    conversation_id: props.activeConversation.id,
    sender_id: useSupabaseUser().value?.id || '',
  };

  const { data: _data, error: _error } = await supabase
    .from('messages')
    .insert(newMessage);
};
</script>

<style scoped></style>