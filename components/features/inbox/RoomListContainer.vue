<template>
  <div class="flex-1 overflow-y-auto dark:bg-gray-900">
    <RoomItem
      v-for="conv in items"
      :key="conv.id"
      :conversation="conv"
      :active="!!(activeConversation && activeConversation.id === conv.id)"
      :is-online="activeConversation ? isOnline(conv.sender_id) : false"
      @select="selectActiveConversation"
    />
  </div>
</template>

<script lang="ts" setup>
  import type { IConversation } from '~/types/inbox'
  import RoomItem from './RoomItem.vue'
  import { useOnlineStatusStore } from '~/stores/online-status'

  defineProps<{
    items: IConversation[]
    activeConversation: IConversation | null
  }>()

  const emit = defineEmits<{
    (e: 'select', conv: IConversation): void
  }>()

  function selectActiveConversation(conv: IConversation) {
    emit('select', conv)
  }

  const onlineStatusStore = useOnlineStatusStore()

  function isOnline(userId: string) {
    return onlineStatusStore.isUserOnline(userId)
  }
</script>

<style></style>
