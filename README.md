# vue3-template

## Feature

- 🚀 Pinia,Unocss,Typescript
- 🦾 Eslint,Stylelint,commitizen
- ⚡️ vitest
- 💚 Supports pnpm-patch
- ✨ [unplugin-vue-router](https://github.com/posva/unplugin-vue-router):Automatic file based Routing in Vue with TS support
- ✨ [unplugin-vue-macros](https://github.com/sxzz/unplugin-vue-macros): Explore and extend more macros and syntax sugar to Vue.

## 注意

由于布局系统需要在最外层嵌套一层布局路由，所以可能会造成路由表的获取混乱，此时可以用辅助的函数 👇

```

import { createGetRoutes } from "virtual:meta-layouts"

const getRoutes = createGetRoutes(router)

// 获取路由表但是不包含布局路由
console.log(getRoutes())

```
