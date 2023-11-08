import { setupLayouts } from 'virtual:meta-layouts'
import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto/routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
