import type { RouteRecordRaw } from 'vue-router'

const CommentRoutes: RouteRecordRaw[] = [
  {
    path: '/comments/:bookId',
    name: 'BookComments',
    component: () => import('@/views/Comment/Index.vue'),
    meta: { title: '全部评论' }
  }
]

export default CommentRoutes