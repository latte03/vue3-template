import axios from '@/utils/request'

import type { UserInfo } from './type'

export default {
  getUserInfo(): Promise<UserInfo> {
    return axios.get('/oauth/anyone/current')
  }
}
