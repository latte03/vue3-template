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
// 这里的 sha 是 vite-plugin-git-revision 插件注入的变量
// 你可以在这里使用它来显示当前的 git 提交哈希值
// 例如：在页面上显示
// console.log('Current git commit sha:', sha)
// 你可以在这里使用 sha 变量来做其他操作，比如发送到服务器等
</script>

<template>
  <div>
    sha: {{ sha }}
    <img :src="logo" alt="" class="h-10 w-10" />
  </div>
</template>
