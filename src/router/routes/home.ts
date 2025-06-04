// src/router/routes/home.ts
import type { RouteRecordRaw } from 'vue-router'

const HomeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/Index.vue'),
    meta: {
      title: '首页',
      requiresAuth: false
    }
  }
]

export default HomeRoutes
