import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes)
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
