<template>
  <div ref="lottieContainer" :style="{ width: width, height: height }" />
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import lottie from 'lottie-web'
  import type { AnimationItem } from 'lottie-web'

  defineOptions({
    name: 'LottieAnimation',
  })

  const props = defineProps<{
    animationData: object
    width?: string
    height?: string
    loop?: boolean
    autoplay?: boolean
  }>()

  const lottieContainer = ref<HTMLElement | null>(null)
  let animation: AnimationItem | null = null

  onMounted(() => {
    if (lottieContainer.value) {
      animation = lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: 'svg',
        loop: props.loop ?? true,
        autoplay: props.autoplay ?? true,
        animationData: props.animationData,
      })
    }
  })

  onBeforeUnmount(() => {
    if (animation) {
      animation.destroy()
    }
  })

  defineExpose({
    play: () => animation?.play(),
    pause: () => animation?.pause(),
    stop: () => animation?.stop(),
  })
</script>
