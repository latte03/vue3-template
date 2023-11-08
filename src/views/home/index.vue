<script setup lang="ts">
defineOptions({
  name: 'HomePage',
})

definePage({
  name: 'HomePage',
  meta: {
    layout: 'DefaultLayout',
  },
})
</script>

<template>
  <div><TheWelcome /></div>
</template>
