import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 引入路由模块
import loginRoutes from './routes/login'

// 所有路由统一汇总
const routes: RouteRecordRaw[] = [
  ...loginRoutes
  // 未来你还可以加入: ...homeRoutes, ...articleRoutes 等
]

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(), // 默认使用 HTML5 模式
  routes
})

// 全局路由守卫（可选）
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = String(to.meta.title)
  }

  // 登录鉴权逻辑（可选扩展）
  // const userStore = useUserStore()
  // if (to.meta.requiresAuth && !userStore.isLogin) {
  //   return next('/login')
  // }

  next()
})

export default router
