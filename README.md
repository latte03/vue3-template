# vue3-template

## Feature

- 🚀 Pinia,Unocss,Typescript
- 🦾 Eslint,Stylelint,commitizen
- ⚡️ vitest
- ✨ [vue-router file based routing](https://router.vuejs.org/guide/features/extras/file-based-routing):Automatic file based Routing in Vue with TS support (vue-router 5 内置，无需 unplugin-vue-router)
- ✨ [vue-macros](https://github.com/sxzz/vue-macros): Explore and extend more macros and syntax sugar to Vue.

## 环境

- Node >= 24（见 `.nvmrc` / `.tool-versions`），pnpm 12
- pnpm 的配置放在 `pnpm-workspace.yaml`（pnpm 12 起不再读取 `package.json` 的 `pnpm` 字段）
- `typescript` 别名为 `@typescript/typescript6`：TypeScript 7 原生编译器暂不被 vue-tsc / typescript-eslint 支持，需等 TS 7.1 的稳定 API。类型检查用 `pnpm type-check`（vue-tsc），原生 TS6 的 CLI 是 `pnpm tsc6`

## 注意

由于布局系统需要在最外层嵌套一层布局路由，所以可能会造成路由表的获取混乱，此时可以用辅助的函数 👇

```

import { createGetRoutes } from "virtual:meta-layouts"

const getRoutes = createGetRoutes(router)

// 获取路由表但是不包含布局路由
console.log(getRoutes())

```
