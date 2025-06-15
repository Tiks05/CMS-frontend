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
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('@/views/Library/Index.vue'),
    meta: {
      title: '图书馆',
      requiresAuth: false
    }
  }
]

export default HomeRoutes
