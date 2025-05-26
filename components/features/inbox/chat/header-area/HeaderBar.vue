<template>
  <div
    class="flex items-center justify-between px-4 py-2 border-b border-white-300 bg-white"
  >
    <div class="flex items-center gap-x-4 flex-1">
      <!-- Avatar -->
      <UAvatar :src="activeConversation.avatar" class="w-10 h-10" />

      <!-- Name and Status -->
      <div>
        <div class="text-sm text-black-900 font-semibold">
          {{ activeConversation.name }}
        </div>
        <div class="text-xs text-green-400">Online</div>
      </div>
    </div>

    <!-- Actions -->
    <HeaderActionButton />
  </div>
</template>

<script setup lang="ts">
import type { IConversation } from '~/types/inbox';
import HeaderActionButton from './HeaderActionButton.vue';

defineProps<{
  activeConversation: IConversation;
}>();
</script>
