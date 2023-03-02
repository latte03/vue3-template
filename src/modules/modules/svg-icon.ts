import type { UserModule } from '@/types'
import SvgIcon from '@/components/SvgIcon.vue'
import 'virtual:svg-icons-register'
/**
 * svg 图标
 */
export const install: UserModule = ({ app }) => {
  app.component('SvgIcon', SvgIcon)
}
