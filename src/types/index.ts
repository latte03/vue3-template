import type { HeadClient } from '@vueuse/head'
import type { App } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'

interface AppContext<HasRouter extends boolean = true> {
  app: App<Element>
  router: HasRouter extends true ? Router : undefined
  routes: HasRouter extends true ? RouteRecordRaw[] : undefined
  head?: HeadClient
}

export type UserModule = (ctx: AppContext) => void
