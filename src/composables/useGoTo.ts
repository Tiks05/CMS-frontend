import { useRouter, useRoute } from 'vue-router'

export function useGoTo() {
  const router = useRouter()
  const route = useRoute()

  /**
   * 页面跳转封装函数
   * @param path 路径，例如 '/login'
   * @param replace 是否使用 replace 模式（替代当前历史记录）
   */
  const goTo = (path: string, replace = false) => {
    if (path !== route.path) {
      replace ? router.replace(path) : router.push(path)
    }
  }

  return {
    goTo
  }
}
