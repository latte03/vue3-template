<script lang="ts" setup>
import { useAssetsImageURL } from '@composables/url-composable'

import { getRoutes } from '@/router'
import { sha } from '~build/git'

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
    <img :src="logo" alt="" class="w-10 h-10" />
  </div>
</template>
