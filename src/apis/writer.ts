import request from '@/utils/request'

export function getNewsList(params: { type: string; limit: number }) {
  return request.get('/writer/news', { params })
}

export function fetchClassroomList(category_type: string) {
  return request.get('/writer/classroom', {
    params: {
      category_type
    }
  })
}