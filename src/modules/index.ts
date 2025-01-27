import { routes } from 'vue-router/auto-routes'
import router from '@/router'

import type { UserModule } from '@/types'
import type { App } from 'vue'

const modules = import.meta.glob('./modules/*.ts', {
  eager: true,
})

export function setupModules(app: App<Element>) {
  Object.keys(modules).forEach(path => {
    ;(modules[path] as { install: UserModule }).install?.({
      app,
      router,
      routes,
    })
  })
}
