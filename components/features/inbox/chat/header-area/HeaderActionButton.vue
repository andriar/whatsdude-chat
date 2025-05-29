<template>
  <div class="flex gap-2">
    <UButton
      class="bg-primary antialiased text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center justify-center">
      Resolved
    </UButton>

    <UButton
      icon="i-lucide-ellipsis-vertical"
      :ui="{
        leadingIcon: '!w-6 !h-6 ',
      }"
      class="text-black-900 p-0"
      variant="ghost" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
