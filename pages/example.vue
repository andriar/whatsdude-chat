<template>
  <div>
    <h1>Example Page</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'sidebar',
})
</script>

<style></style>