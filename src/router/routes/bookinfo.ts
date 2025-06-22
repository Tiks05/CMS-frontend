import type { RouteRecordRaw } from 'vue-router'

const BookInfoRoutes: RouteRecordRaw[] = [
  {
    path: '/bookinfo/:id',
    name: 'BookInfo',
    component: () => import('@/views/BookInfo/Index.vue'),
    meta: { title: '小说详情' }
  },
  {
    path: '/read/:bookId/:volumeId/:chapterId',
    name: 'BookReader',
    component: () => import('@/views/BookInfo/components/Reader.vue'),
    meta: { title: '阅读章节' }
  }
]

export default BookInfoRoutes
