import type { UserModule } from '@/types'

export const install: UserModule = ({ router }) => {
  // if (isClient)
  router.beforeEach(to => {
    /**
     * some permission code
     */
    return true
  })
  router.afterEach(() => {})
  // }
}
