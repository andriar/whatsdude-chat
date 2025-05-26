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
import type { IMessage, ITab } from '@/types/inbox';

// import components
import ChatContainer from '@/components/features/inbox/chat/ChatContainer.vue';
import RoomListContainer from '@/components/features/inbox/RoomListContainer.vue';
import { useConversationsStore } from '~/stores/inbox/conversations';
import { useMessagesStore } from '~/stores/inbox/messages';

definePageMeta({
  middleware: ['auth'],
  layout: 'sidebar',
});

const tabs: ITab[] = [{ label: 'General' }, { label: 'Total' }];
const supabase = useSupabaseClient();
const conversationsStore = useConversationsStore();
const messageStore = useMessagesStore();

onMounted(async () => {
  conversationsStore.fetchConversations();


  supabase
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
          // TODO: Add new message to messages list
          console.log('New message:', payload.new)
          conversationsStore.updateLastMessage(payload.new.conversation_id, payload.new.content)
          messageStore.addMessage(payload.new as IMessage)
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
});
</script>
