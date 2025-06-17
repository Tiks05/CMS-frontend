import type { RouteRecordRaw } from 'vue-router'

const WriterRoutes: RouteRecordRaw[] = [
  {
    path: '/workspace',
    name: 'Workspace',
    component: () => import('@/views/Workspace/Index.vue'),
    meta: { title: '工作台', requiresAuth: true }
  }
]

export default WriterRoutes
