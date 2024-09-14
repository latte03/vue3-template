<script lang="ts" setup>
import { useAssetsImageURL } from '@composables/url-composable'

import { sha } from '~build/git'
import { getRoutes } from '@/router'

definePage({
  name: 'IndexPage',
  path: '/',
})

// 获取路由表但是不包含布局路由
console.log(getRoutes())

const logo = useAssetsImageURL('logo', { extension: '.svg' })
</script>

<template>
  <div>
    sha: {{ sha }}
    <img :src="logo" alt="" class="h-10 w-10" />
  </div>
</template>
