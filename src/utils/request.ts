import Axios from 'axios'

const baseUrl = `${import.meta.env.VITE_BASE_URL}`

const axios = Axios.create({
  baseURL: baseUrl,
  headers: {}
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

export default axios
