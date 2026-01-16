import type { UserModule } from '@/types'
import type { RouteLocationNormalized } from 'vue-router'

export const install: UserModule = ({ router }) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  router.beforeEach((to: RouteLocationNormalized) => {
    /**
     * some permission code
     */
    return true
  })
  router.afterEach(() => {})
}
