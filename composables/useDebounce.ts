import type { UnwrapRef } from 'vue';
import { ref } from 'vue'

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked.
 * @param fn The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the provided function
 */
export function useDebounce<T extends (...args: unknown[]) => unknown>(fn: T, wait: number) {
  const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null)
  const isPending = ref(false)

  return function debounced(...args: Parameters<T>) {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }

    isPending.value = true

    return new Promise<ReturnType<T>>((resolve) => {
      timeoutId.value = setTimeout(() => {
        try {
          const result = fn(...args)
          resolve(result as ReturnType<T>)
        } catch (error) {
          console.error('Error in debounced function:', error)
          throw error
        } finally {
          isPending.value = false
        }
      }, wait)
    })
  }
}

/**
 * Creates a queue that processes items sequentially with a specified delay between each item.
 * @param processFn The function to process each item
 * @param delay The delay in milliseconds between processing each item
 * @returns An object containing methods to add items to the queue and check queue status
 */
export function useQueue<T>(processFn: (item: UnwrapRef<T>) => Promise<void> | void, delay: number = 0) {
  const queue = ref<T[]>([])
  const isProcessing = ref(false)

  const processQueue = async () => {
    if (isProcessing.value || queue.value.length === 0) return

    isProcessing.value = true
    const item = queue.value.shift()

    if (item) {
      try {
        await processFn(item as UnwrapRef<T>)
      } catch (error) {
        console.error('Error processing queue item:', error)
      }
    }

    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    isProcessing.value = false
    processQueue()
  }

  const add = (item: T) => {
    queue.value.push(item)
    processQueue()
  }

  const clear = () => {
    queue.value = []
  }

  return {
    queue,
    isProcessing,
    add,
    clear
  }
} 