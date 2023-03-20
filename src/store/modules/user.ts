import { acceptHMRUpdate, defineStore } from 'pinia'
import { TOKEN } from '@/utils/constant'
import { user } from '@/api'
import type { UserInfo } from '@/api/user/type'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem(TOKEN))
  const userInfo = ref<UserInfo>({} as UserInfo)

  const latestToken = computed(() => {
    return token.value || localStorage.getItem(TOKEN)
  })

  watch(
    [token, userInfo],
    async () => {
      if (userInfo.value.id) return
      if (token.value) {
        console.log('object')
        const res = await user.getUserInfo()
        console.log('%c Line:18 🍇 res', 'color:#465975', res)
        userInfo.value = res
      }
    },
    { immediate: true }
  )

  function setToken(t: string) {
    token.value = t
    localStorage.setItem(TOKEN, t)
  }
  function clearUser() {
    token.value = ''
    userInfo.value = {} as UserInfo
    localStorage.removeItem(TOKEN)
  }
  return { token, latestToken, setToken, clearUser, userInfo }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
