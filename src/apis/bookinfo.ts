import request from '@/utils/request'

export const getBookHeader = (id: string | number) => {
  return request.get(`/bookinfo/header/${id}`)
}

export const getBookContent = (id: string | number) => {
  return request.get(`/bookinfo/content/${id}`)
}

export const getChapterContent = (bookId: string, volumeId: string, chapterId: string) => {
  return request.get('/bookinfo/chapter', {
    params: {
      bookId,
      volumeId,
      chapterId
    }
  })
}
