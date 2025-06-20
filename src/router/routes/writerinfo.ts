import type { RouteRecordRaw } from 'vue-router'

const WriterInfoRoutes: RouteRecordRaw[] = [
  {
    path: '/writerinfo/:id',
    name: 'WriterInfo',
    component: () => import('@/views/WriterInfo/Index.vue'),
    meta: { title: '作家详情' }
  }
]

export default WriterInfoRoutes
