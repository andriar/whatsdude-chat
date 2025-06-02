<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 w-full">
    <main class="flex flex-1 p-8 gap-8">
      <!-- Inbox List -->
      <section
        v-if="conversationsStore.conversations.length > 0"
        class="w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col py-6 border border-gray-100 dark:border-gray-500"
      >
        <div
          class="flex items-center justify-between px-6 pb-4 border-b border-gray-100 dark:border-gray-500"
        >
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Inbox</h2>
          <UButton icon="i-lucide-plus" size="sm" variant="ghost" @click="openPopUp" />
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
            conversationsStore.conversations.length == 0
          "
          class="absolute top-0 left-0 w-full h-full"
        >
          <div class="flex flex-col items-center justify-center gap-4 w-full">
            <Lottie name="conversation" autoplay loop width="300px" height="300px" />
            <p class="text-gray-500 dark:text-gray-400">You don't have any conversations yet.</p>

            <UButton label="Create Conversation" @click="openPopUp" />
          </div>
        </EmptyChat>

        <EmptyChat v-else-if="messageStore.loading" class="absolute top-0 left-0 w-full h-full">
          <div class="flex flex-col items-center justify-center h-full">
            <Lottie name="default-loading" autoplay loop width="300px" height="300px" />
            <p class="text-gray-500 dark:text-gray-400 -translate-y-24">Loading messages...</p>
          </div>
        </EmptyChat>
      </div>

      <PopUpNewConversation v-model:open="isOpen" @select="handleSelect" />
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
  import PopUpNewConversation from '~/components/features/inbox/PopUpNewConversation.vue'

  definePageMeta({
    layout: 'sidebar',
  })

  // Composables
  const conversationsStore = useConversationsStore()
  const messageStore = useMessagesStore()
  const { createNewConversation } = useConversationManagement()
  const isOpen = ref(false)

  const openPopUp = () => {
    isOpen.value = true
  }

  const createConversation = async (targetId: string) => {
    const existingConversation = conversationsStore.conversations.find(
      conv => conv.sender_id === targetId
    )

    if (existingConversation) {
      conversationsStore.setActiveConversation(existingConversation)
      return
    }
    const conversation = await createNewConversation(targetId)

    const data: IConversation = {
      ...conversation,
      conversation_id: conversation?.id,
      preview: conversation?.last_message || 'No messages yet',
      unread: 0,
    }

    const newConversation = await conversationsStore.addConversation(data)

    conversationsStore.setActiveConversation(newConversation)
  }

  const handleSelect = async (userProfile: any) => {
    isOpen.value = false
    createConversation(userProfile.user_id)
  }
</script>
