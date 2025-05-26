<template>
  <div>
    {{ message.text }}
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
