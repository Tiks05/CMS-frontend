import type { RouteRecordRaw } from 'vue-router'

const WriterRoutes: RouteRecordRaw[] = [
  {
    path: '/workspace',
    name: 'Workspace',
    component: () => import('@/views/WorkspaceApply/Index.vue'),
    meta: { title: '申请作家', requiresAuth: true }
  }
]

export default WriterRoutes
