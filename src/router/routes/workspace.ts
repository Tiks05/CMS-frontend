import type { RouteRecordRaw } from 'vue-router'

const WorkspaceSubRoutes: RouteRecordRaw[] = [
  {
    path: '/workspace/apply',
    name: 'WorkspaceApply',
    component: () => import('@/views/Workspace/components/Apply.vue'),
    meta: { title: '申请成为作家', requiresAuth: true }
  },
  // {
  //   path: '/workspace/writer',
  //   name: 'WorkspaceWriter',
  //   component: () => import('@/views/Workspace/components/AuthorDashboard.vue'),
  //   meta: { title: '作家工作台', requiresAuth: true }
  // }
]

export default WorkspaceSubRoutes
