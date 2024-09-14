import SvgIcon from '~virtual/svg-component'
import type { UserModule } from '@/types'
/**
 * svg 图标
 */
export const install: UserModule = ({ app }) => {
  app.component(SvgIcon.name!, SvgIcon)
}
