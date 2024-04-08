import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:meta-layouts'
import { createGetRoutes } from 'virtual:meta-layouts'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes),
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

//@ts-expect-error
export const getRoutes = createGetRoutes(router)

export default router
