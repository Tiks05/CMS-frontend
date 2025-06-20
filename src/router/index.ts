import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 引入路由模块
import authRoutes from './routes/auth'
import ModuleRoutes from './routes/layout'
import WriterRoutes from './routes/writer'
import BookInfoRoutes from './routes/bookinfo'
import WriterInfoRoutes from './routes/writerinfo'
import WorkspaceRoutes from './routes/workspace'

// 汇总所有路由
const routes: RouteRecordRaw[] = [
  ...ModuleRoutes,   // module.ts 中的 `/` 重定向 和 `/home`
  ...authRoutes,   // `/login` 登录页面
  ...WriterRoutes,
  ...BookInfoRoutes,
  ...WriterInfoRoutes,
  ...WorkspaceRoutes
]

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = 'CMS_文章管理系统'
  // 权限校验预留（未启用）
  next()
})

export default router
