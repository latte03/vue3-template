<script lang="ts" setup>
import { getRoutes } from '@/router'

definePage({
  name: 'IndexPage',
  path: '/',
})

// 获取路由表但是不包含布局路由
console.log(getRoutes())
</script>

<template>
  <div>this is index</div>
</template>
