import request from '@/utils/request'

// 图书列表搜索
export const getBookList = (params: {
  reader_type?: string
  category_group?: string
  category_type?: string
  status?: string
  word_count_range?: string
  sort?: 'hot' | 'new' | 'words'
  page: number
  pageSize: number
}) => {
  return request.get('/library/books', { params })
}
