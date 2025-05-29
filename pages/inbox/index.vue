<template>
  <div class="flex h-screen bg-gray-100 w-full">
    <main class="flex flex-1 p-8 gap-8">
      <!-- Inbox List -->
      <section class="w-80 bg-white rounded-2xl shadow-md flex flex-col py-6">
        <div class="flex items-center justify-between px-6 pb-4">
          <h2 class="text-xl font-semibold">Inbox</h2>
          <UButton icon="i-lucide-plus" size="sm" variant="ghost" @click="createConversation" />
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
import type { IConversation, ITab } from '@/types/inbox';
import { onMounted, onUnmounted } from 'vue';
import ChatContainer from '~/components/features/inbox/chat/ChatContainer.vue';
import RoomListContainer from '~/components/features/inbox/RoomListContainer.vue';
import { useConversationsStore } from '~/stores/inbox/conversations';
import { useMessagesStore } from '~/stores/inbox/messages';
import { usePresence } from '~/composables/usePresence';
import { useConversationSubscriptions } from '~/composables/useConversationSubscriptions';
import { useConversationManagement } from '~/composables/useConversationManagement';

definePageMeta({
  middleware: ['auth'],
  layout: 'sidebar',
});

// Constants
const tabs: ITab[] = [{ label: 'General' }, { label: 'Total' }];

// Composables
const user = useSupabaseUser();
const authId = user.value?.id;
const conversationsStore = useConversationsStore();
const messageStore = useMessagesStore();
const { trackPresence, untrackPresence } = usePresence();
const { setupMessageSubscription } = useConversationSubscriptions();
const { createNewConversation } = useConversationManagement();
const supabase = useSupabaseClient();

// Realtime subscriptions
const channel = setupMessageSubscription();

const createConversation = async () => {
  const conversation = await createNewConversation('8886fd45-4c07-49dd-ab1e-84c93f43807b');

  const newConversation: IConversation = {
    ...conversation,
    conversation_id: conversation?.id,
    preview: conversation?.last_message || 'No messages yet',
    unread: 0
  }
  const conversation22 = await conversationsStore.addConversation(newConversation);

  conversationsStore.setActiveConversation(conversation22);
}

// Lifecycle hooks
onMounted(() => {
  conversationsStore.fetchConversations();
  if (authId) {
    trackPresence(authId);
  }
});

onUnmounted(() => {
  if (channel) {
    supabase.removeChannel(channel);
  }
  if (conversationChannel) {
    supabase.removeChannel(conversationChannel);
  }
  untrackPresence();
});
</script>
