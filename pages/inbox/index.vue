<template>
  <div class="flex h-screen bg-gray-100 w-full">
    <!-- Main Content -->
    <main class="flex flex-1 p-8 gap-8">
      <!-- Inbox List -->
      <section class="w-80 bg-white rounded-2xl shadow-md flex flex-col py-6">
        <div class="flex items-center justify-between px-6 pb-4">
          <h2 class="text-xl font-semibold">Inbox</h2>
          <UButton icon="i-lucide-plus" size="sm" variant="ghost" />
        </div>
        <UTabs :items="tabs" class="px-6 pb-4" />
        <RoomListContainer :items="conversationsStore.conversations"
          :active-conversation="conversationsStore.activeConversation"
          @select="conversationsStore.setActiveConversation" />
      </section>

      <!-- Chat Area -->
      <ChatContainer :active-conversation="conversationsStore.activeConversation" :messages="messageStore.messages" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { ITab } from '@/types/inbox';
import { onMounted, onUnmounted } from 'vue';

// import components
import ChatContainer from '@/components/features/inbox/chat/ChatContainer.vue';
import RoomListContainer from '@/components/features/inbox/RoomListContainer.vue';
import { useConversationsStore } from '~/stores/inbox/conversations';
import { useMessagesStore } from '~/stores/inbox/messages';
import type { ISupabaseMessage } from '~/types/supabase';

definePageMeta({
  middleware: ['auth'],
  layout: 'sidebar',
});

const tabs: ITab[] = [{ label: 'General' }, { label: 'Total' }];
const supabase = useSupabaseClient();
const user = useSupabaseUser()
const authId = user.value?.id
const conversationsStore = useConversationsStore();
const messageStore = useMessagesStore();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let channel: any = null;

channel = supabase
  .channel('messages-changes')
  .on(
    'postgres_changes',
    {
      event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
      schema: 'public',
      table: 'messages',
    },
    (payload) => {
      // Handle new messages
      if (payload.eventType === 'INSERT') {
        handleNewMessage(payload.new as ISupabaseMessage)
      }
      // Handle message updates
      else if (payload.eventType === 'UPDATE') {
        // TODO: Update existing message
        console.log('Updated message:', payload.new)
      }
      // Handle message deletions
      else if (payload.eventType === 'DELETE') {
        // TODO: Remove message from list
        console.log('Deleted message:', payload.old)
      }
    }
  )
  .subscribe()

onMounted(() => {
  conversationsStore.fetchConversations();
});

function handleNewMessage(payload: ISupabaseMessage) {
  conversationsStore.updateLastMessage(payload.conversation_id, payload.content)

  const isOpenedConversation = payload.conversation_id === conversationsStore.activeConversation.id
  if (isOpenedConversation) {
    messageStore.addMessage(payload)
  }

  // show notification when the message is not from the user and the conversation is not the active conversation
  if (payload.sender_id !== authId || !isOpenedConversation) {
    showNotification(payload)
  }
}


function showNotification(payload: ISupabaseMessage) {
  const toast = useToast()
  toast.add({
    title: 'New message received',
    description: payload.content,
  })
}


onUnmounted(() => {
  if (channel) {
    supabase.removeChannel(channel);
  }
});
</script>
