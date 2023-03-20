import { useUserStore } from '@/store/modules/user'
import { MessagePlugin } from 'tdesign-vue-next'
import { TOKEN } from './constant'

export function openURL(url: string) {
  if (!url) {
    MessagePlugin.info('开发中...')
    return
  }

  window.open(url, 'bank_target')
}
export function getToken() {
  return localStorage.getItem(TOKEN)
}

export function toLogin() {
  // const userStore = useUserStore()
  // userStore.clearUser()
  // window.location.href =
  //   'https://www.txwlsq.com/wlsq/#/login?clientId=5juznl0dvwuce0oph4s7enk6&redirectUrl=' +
  //   encodeURIComponent(location.href)
}
export function toLoginOut() {
  const userStore = useUserStore()
  userStore.clearUser()
  window.location.href = 'https://www.txwlsq.com/wlsq/#/logout'
}

export function isWebURL(url: string) {
  const regex = new RegExp(
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
  )
  return regex.test(url)
}
