<template>
  <div class="flex h-screen bg-gray-100 w-full">
    <main class="flex flex-1 p-8 gap-8">
      <!-- Inbox List -->
      <section
        v-if="conversationsStore.conversations.length > 0"
        class="w-80 bg-white rounded-2xl shadow-md flex flex-col py-6"
      >
        <div class="flex items-center justify-between px-6 pb-4">
          <h2 class="text-xl font-semibold">Inbox</h2>
          <UButton icon="i-lucide-plus" size="sm" variant="ghost" @click="createConversation" />
        </div>
        <RoomListContainer
          :items="conversationsStore.conversations"
          :active-conversation="conversationsStore.activeConversation"
          @select="conversationsStore.setActiveConversation"
        />
      </section>

      <!-- Chat Area -->
      <ChatContainer
        v-if="conversationsStore.activeConversation"
        :active-conversation="conversationsStore.activeConversation"
        :messages="messageStore.messages"
      />
      <EmptyChat v-else @create-conversation="handleCreateConversation" />
    </main>
  </div>
</template>

<script lang="ts" setup>
  import type { IConversation } from '@/types/inbox'
  import EmptyChat from '~/components/empty/EmptyChat.vue'
  import ChatContainer from '~/components/features/inbox/chat/ChatContainer.vue'
  import RoomListContainer from '~/components/features/inbox/RoomListContainer.vue'
  import { useConversationsStore } from '~/stores/inbox/conversations'
  import { useMessagesStore } from '~/stores/inbox/messages'
  import { useConversationManagement } from '~/composables/useConversationManagement'

  definePageMeta({
    layout: 'sidebar',
  })

  // Composables
  const conversationsStore = useConversationsStore()
  const messageStore = useMessagesStore()
  const { createNewConversation } = useConversationManagement()

  const createConversation = async () => {
    const conversation = await createNewConversation('8886fd45-4c07-49dd-ab1e-84c93f43807b')

    const data: IConversation = {
      ...conversation,
      conversation_id: conversation?.id,
      preview: conversation?.last_message || 'No messages yet',
      unread: 0,
    }
    const newConversation = await conversationsStore.addConversation(data)

    conversationsStore.setActiveConversation(newConversation)
  }

  function handleCreateConversation() {
    createConversation()
  }
</script>
