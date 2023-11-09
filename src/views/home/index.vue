<script setup lang="ts">
import Logo from '@/assets/logo.svg'
defineOptions({
  name: 'HomePage',
})
console.log('%c Line:3 🥔 Logo', 'color:#f5ce50', Logo)
definePage({
  name: 'HomePage',
  meta: {
    layout: 'DefaultLayout',
  },
})
</script>

<template>
  <img class="w-xs m-auto" :src="Logo" alt="" />
  <div><TheWelcome /></div>
</template>
