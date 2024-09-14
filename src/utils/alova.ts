/**
 * alova 是一个轻量级的请求策略库，支持开发者使用声明式实现例如请求共享、分页请求、表单提交、断点续传等各种较复杂的请求
 * @link https://alova.js.org/zh-CN/category/get-started
 */
import { createAlova } from 'alova'
import fetchAdapter, { type FetchRequestAdapter } from 'alova/fetch'

import VueHook from 'alova/vue'

import { baseURL } from './constant'

enum RESPONSE_CODE {
  SUCCESS = 200,
  ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
}

const alovaInstance = createAlova({
  baseURL,
  statesHook: VueHook,
  // 请求超时时间，单位为毫秒，默认为0，表示永不超时
  timeout: 50000,
  requestAdapter: (fetchAdapter as () => FetchRequestAdapter)(),
  // 函数参数为一个method实例，包含如url、params、data、headers等请求数据
  // 你可以自由修改这些数据
  beforeRequest: method => {
    console.log('🍊 method', 'color:#2eafb0', method)
    // 假设我们需要添加token到请求头
    // method.config.headers.token = 'token'
  },

  // 使用数组的两个项，分别指定请求成功的拦截器和请求失败的拦截器
  responded: {
    // 请求成功的拦截器
    // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    // eslint-disable-next-line unused-imports/no-unused-vars
    onSuccess: async (response, method) => {
      if (response.status >= RESPONSE_CODE.BAD_REQUEST) {
        throw new Error(response.statusText)
      }
      const json = await response.json()
      if (json.code !== RESPONSE_CODE.SUCCESS) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(json.message)
      }

      // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
      return json.data
    },

    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onError: (err, method) => {
      console.log('🍞 method', 'color:#6ec1c2', method)
      console.log('🍞 err', 'color:#465975', err)
    },

    // 请求完成的拦截器
    // 当你需要在请求不论是成功、失败、还是命中缓存都需要执行的逻辑时，可以在创建`alova`实例时指定全局的`onComplete`拦截器，例如关闭请求 loading 状态。
    // 接收当前请求的method实例
    onComplete: method => {
      console.log('🍻 method', 'color:#465975', method)
      // 处理请求完成逻辑
    },
  },
})

type GetParams<T> = Parameters<typeof alovaInstance.Get<T>>
type GetConfigType<T> = GetParams<T>[1]
type Arg = Record<string, any>
type RequestBody = Arg | string | FormData | Blob | ArrayBuffer | URLSearchParams | ReadableStream

class Request {
  public get<Data>(url: string, params: Arg, config: GetConfigType<Data>) {
    return alovaInstance.Get<Data>(url, { params, ...config })
  }
  public post<Data>(url: string, data: RequestBody, config: GetConfigType<Data>) {
    return alovaInstance.Post<Data>(url, data, { ...config })
  }

  public put<Data>(url: string, data: RequestBody, config: GetConfigType<Data>) {
    return alovaInstance.Put<Data>(url, data, { ...config })
  }
  public delete<Data>(url: string, data: RequestBody, config: GetConfigType<Data>) {
    return alovaInstance.Delete<Data>(url, data, { ...config })
  }
  public patch<Data>(url: string, data: RequestBody, config: GetConfigType<Data>) {
    return alovaInstance.Patch<Data>(url, data, { ...config })
  }
  public head<Data>(url: string, config: GetConfigType<Data>) {
    return alovaInstance.Head<Data>(url, { ...config })
  }
  public options<Data>(url: string, config: GetConfigType<Data>) {
    return alovaInstance.Options<Data>(url, { ...config })
  }
}

export const request = new Request()
