<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isLoading" class="loading-screen">
      <UCard class="loading-card">
        <div class="loading-content">
          <div class="icon-wrapper">
            <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
          </div>
          <p class="loading-text">{{ context || 'Loading...' }}</p>
        </div>
      </UCard>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  defineProps<{
    isLoading: boolean
    context?: string
  }>()
</script>

<style scoped>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.85) 100%
    );
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease-out;
  }

  .loading-card {
    padding: 2.5rem;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    transform: translateY(0);
    animation: slideUp 0.4s ease-out;
  }

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .icon-wrapper {
    background: linear-gradient(135deg, #3498db, #2980b9);
    padding: 1rem;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
  }

  .icon-wrapper :deep(svg) {
    width: 2rem;
    height: 2rem;
    color: white;
  }

  .loading-text {
    color: var(--color-gray-700);
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
    background: linear-gradient(135deg, #2c3e50, #3498db);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: pulse 2s infinite;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0.6;
    }
  }
</style>
