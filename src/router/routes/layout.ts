import type { RouteRecordRaw } from 'vue-router'

const ModuleRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/Index.vue'),
    meta: { title: '首页', requiresAuth: false }
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('@/views/Library/Index.vue'),
    meta: { title: '书库', requiresAuth: false }
  },
  {
    path: '/writer',
    name: 'Writer',
    component: () => import('@/views/Writer/Index.vue'),
    meta: { title: '作家首页', requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/components/Layout/Profile.vue'),
    meta: { title: '个人信息', requiresAuth: true }
  }
]

export default ModuleRoutes
