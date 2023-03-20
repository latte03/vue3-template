import Axios from 'axios'
import { MessagePlugin as Message } from 'tdesign-vue-next'
import { getToken, toLogin } from '@/utils'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/wlsq-api`
const axios = Axios.create({
  baseURL: baseUrl,
  headers: {}
})

axios.interceptors.request.use(
  config => {
    const token = getToken()

    config.headers!.Token = `${token}`

    if (config.params) {
      config.params.Token ??= token
    }

    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  res => {
    if (res.status === 401 || res.data.code === 404) {
      return res
    }
    if (!res.data) {
      // 网络不通的时候
      Message.error('error!')
      return Promise.reject(new Error('网络错误！'))
    }
    const { data } = res
    if (res.data.code === 0) {
      return res.data.data
    }

    if (res.data.status === 1) {
      // 登陆过期
      toLogin()
      return res
    }

    Message.error(data.msg)

    return res
  },
  error => {
    const { status } = error.response
    if (status === 401) {
      toLogin()
    }

    return Promise.reject(error)
  }
)

export default axios
