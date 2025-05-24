<template>
  <div class="flex items-center gap-2">
    <UIcon name="i-lucide-file" />
    <span class="file-name">{{ message.fileName }}</span>
    <span class="file-size">{{ message.fileSize }}</span>
  </div>
</template>

<script setup lang="ts">
import type { IMessage } from '~/types/inbox';

interface Props {
  message: IMessage;
}

defineProps<Props>();
</script>

<style scoped></style>
