<template>
  <div class="flex items-center gap-2 text-xs text-gray-500">
    <div class="flex gap-1">
      <div class="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0ms" />
      <div class="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 150ms" />
      <div class="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 300ms" />
    </div>
    <span>{{ userName }} is typing...</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  userName: string
}>()
</script>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}
</style>