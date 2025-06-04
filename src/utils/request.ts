import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

// 创建 Axios 实例
const httpInstance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 5000
})

// 请求拦截器：自动加 token
httpInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：简化返回结构 & 错误提示可加
httpInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    // 后端统一返回格式：{ code, message, data }
    if (res.data.code === 0) {
      return res.data
    } else {
      return Promise.reject(new Error(res.data.message || '请求失败'))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default httpInstance
