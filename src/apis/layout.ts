import request from '@/utils/request'

export const applyAsAuthor = (formData: FormData) =>
  request.post('/layout/profile/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

/**
 * 搜索图书列表
 */
export const searchBooks = (params: {
  keyword?: string
  type?: number
  timeindex?: number
  numindex?: number
  stateindex?: number
  page: number
  pageSize: number
}) => {
  return request.get('/layout/search-books', { params })
}
