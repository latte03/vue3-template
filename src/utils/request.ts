import Axios from 'axios'

import { baseURL } from './constant'

const axios = Axios.create({
  baseURL,
  headers: {},
})

axios.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export { axios }
