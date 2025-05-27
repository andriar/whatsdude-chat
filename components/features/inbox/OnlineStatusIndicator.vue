<template>
  <UTooltip :text="tooltipText">
    <div class="flex items-center gap-1">
      <div class="w-2 h-2 rounded-full transition-all duration-300 ease-in-out" :class="{
        'bg-green-500': isOnline,
        'bg-gray-300': !isOnline
      }" />
      <span class="text-xs text-gray-500">
        {{ statusText }}
      </span>
    </div>
  </UTooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOnlineStatusStore } from '~/stores/inbox/onlineStatus'

const props = defineProps<{
  userId: string
}>()

const onlineStatusStore = useOnlineStatusStore()
const isOnline = computed(() => onlineStatusStore.isUserOnline(props.userId))
const lastSeen = computed(() => onlineStatusStore.getLastSeen(props.userId))

const statusText = computed(() => {
  if (isOnline.value) return 'Online'
  return `Last seen ${onlineStatusStore.formatLastSeen(lastSeen.value)}`
})

const tooltipText = computed(() => {
  if (isOnline.value) {
    return 'User is currently online'
  }
  return `User was last seen ${onlineStatusStore.formatLastSeen(lastSeen.value)}`
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

@keyframes ping {

  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>