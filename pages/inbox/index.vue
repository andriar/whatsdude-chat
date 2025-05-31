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

      <div class="flex-1 relative overflow-hidden">
        <ChatContainer
          v-if="conversationsStore.activeConversation"
          :active-conversation="conversationsStore.activeConversation"
          :messages="messageStore.messages"
        />

        <EmptyChat
          v-if="
            !messageStore.loading &&
            !conversationsStore.activeConversation &&
            conversationsStore.conversations.length > 0
          "
          class="absolute top-0 left-0 w-full h-full"
        >
          <div class="flex flex-col items-center justify-center gap-4 w-full">
            <Lottie name="conversation" autoplay loop width="300px" height="300px" />
            <p class="text-gray-500">You don't have any conversations yet.</p>

            <UButton label="Create Conversation" @click="createConversation" />
          </div>
        </EmptyChat>

        <EmptyChat v-else-if="messageStore.loading" class="absolute top-0 left-0 w-full h-full">
          <div class="flex flex-col items-center justify-center h-full">
            <Lottie name="default-loading" autoplay loop width="300px" height="300px" />
            <p class="text-gray-500 -translate-y-24">Loading messages...</p>
          </div>
        </EmptyChat>
      </div>
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
</script>
