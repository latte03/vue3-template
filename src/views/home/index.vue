<script setup lang="ts">
import Logo from '@/assets/logo.svg'
defineOptions({
  name: 'HomePage',
})
definePage({
  name: 'HomePage',
  meta: {
    layout: 'other-layout',
  },
})

const route = useRoute('HomePage')

console.log('%c Line:16 🥐', 'color:#f5ce50', route.meta)
</script>

<template>
  <img class="m-auto w-xs" :src="Logo" alt="" />
  <div><TheWelcome /></div>
</template>
