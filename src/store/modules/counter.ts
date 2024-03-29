import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { store } from '@/store'

/**
 * store example
 */
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useCounterStoreWithout = () => {
  return useCounterStore(store)
}
