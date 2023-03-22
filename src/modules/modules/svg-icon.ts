import type { UserModule } from '@/types'
import SvgIcon from '~virtual/svg-component'
/**
 * svg 图标
 */
export const install: UserModule = ({ app }) => {
  app.component(SvgIcon.name, SvgIcon)
}
