<template>
  <div
    :class="[
      'flex items-center px-6 py-3 cursor-pointer border-l-4 transition select-none hover:bg-gray-50',
      active ? 'bg-gray-100 border-indigo-500' : 'border-transparent',
    ]"
    @click="$emit('select', conversation)">
    <div class="relative">
      <UAvatar :src="conversation.avatar" size="xl" />
      <div
        class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
        :class="{
          'bg-green-500': isOnline,
          'bg-gray-300': !isOnline,
        }" />
    </div>
    <div class="ml-3 flex-1">
      <div class="flex items-center justify-between">
        <div class="font-semibold">{{ conversation.name }}</div>
        <div class="text-xs text-gray-400">
          {{ conversation.last_message_at }}
        </div>
      </div>
      <div class="text-sm text-gray-400 flex items-center justify-between">
        {{ conversation.preview }}
        <div
          v-if="unread && unread !== '0'"
          class="bg-indigo-500 rounded-full text-white min-w-5 h-5 flex items-center justify-center text-xs">
          {{ unread }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IConversation } from '~/types/inbox';

const props = defineProps<{
  conversation: IConversation;
  active: boolean;
  isOnline: boolean;
}>();

const unread = computed(() => {
  if (props.conversation.unread === 0) return '0';

  if (props.conversation.unread && props.conversation.unread > 9) return '9+';

  return props.conversation.unread?.toString();
});

defineEmits<{
  (e: 'select', conversation: IConversation): void;
}>();
</script>
