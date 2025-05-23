import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

// 创建实例
const httpInstance: AxiosInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 请求拦截器
httpInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (e: any) => Promise.reject(e)
)

// 响应拦截器
httpInstance.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  (e: any) => Promise.reject(e)
)

export default httpInstance
