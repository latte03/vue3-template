import type { UserModule } from '@/types'

export const install: UserModule = ({ router }) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  router.beforeEach(to => {
    /**
     * some permission code
     */
    return true
  })
  router.afterEach(() => {})
}
