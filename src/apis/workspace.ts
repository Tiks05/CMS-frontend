import request from '@/utils/request'

export const applyAsAuthor = (formData: FormData) =>
  request.post('/workspace/apply', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const getUserStats = (userId: number) => 
  request.get(`/workspace/writer/stats/${userId}`)

export const getActiveList = (limit: number = 3) => {
  return request.get('/workspace/writer/notice-list', {
    params: { limit }
  })
}

export const getNewsList = async (limit = 4) => {
  return request.get('/workspace/writer/news-list', {
    params: { limit }
  })
}

export const getBookRank = (type: string, category: string) => {
  return request.get('/workspace/writer/book-rank', {
    params: { type, category }
  })
}

export const createBookInfo = (formData: FormData) =>
  request.post('/workspace/writer/create-book', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export function getMyBookList(params: { user_id: number }) {
  return request.get('/workspace/writer/my-book-list', { params })
}

export function getBookDetail(bookId: number) {
  return request.get(`/workspace/writer/book-overview/${bookId}`)
}

export function updateBookInfo(formData: FormData) {
  return request.post('/workspace/writer/update-book', formData)
}

export function getLastChapterInfoByBookId(bookId: number) {
  return request.get('/workspace/writer/get-last-chapterInfo', {
    params: { book_id: bookId }
  })
}

export const createChapter = (data: {
  book_id: number
  volume_id: number
  chapter_num: number
  title: string
  content: string
  word_count: number
}) => {
  return request.post('/workspace/writer/create-chapter', data)
}

export function getChapterListByBookId(params: {
  book_id: number
  type: number
  title?: string
  volume_id?: string | number
  status?: string
}) {
  return request.get('/workspace/writer/chapter-list', { params })
}

export function deleteChapterById(chapterId: number) {
  return request.delete(`/workspace/writer/delete-chapter/${chapterId}`)
}

export function getChapterDetailById(bookId: number, chapterId: number) {
  return request.get('/workspace/writer/chapter-detail', {
    params: { book_id: bookId, chapter_id: chapterId }
  })
}

export function updateChapter(data: any) {
  return request.post('/workspace/writer/update-chapter', data)
}

export const deleteVolumeById = (bookId: number, volumeId: number) =>
  request.delete('/workspace/writer/delete-volume', { params: { book_id: bookId, volume_id: volumeId } })

// 更新分卷
export const updateVolume = (data: { id: number; book_id: number; title: string }) =>
  request.post('/workspace/writer/update-volume', data)

export const createVolume = (data: { book_id: number; title: string; sort: number }) =>
  request.post('/workspace/writer/create-volume', data)

// 获取某个分卷下最后一章的信息
export const getLastChapterByVolumeId = (bookId: number, volumeId: number) => {
  return request.get('/workspace/writer/last-chapter-by-volume', {
    params: {
      book_id: bookId,
      volume_id: volumeId
    }
  })
}

// 获取整本书的最后一章（无指定分卷时使用）
export const getLastChapterByBookId = (bookId: number) => {
  return request.get('/workspace/writer/last-chapter', {
    params: { book_id: bookId }
  })
}

export const getLatestChapterByBookId = (bookId: number) => {
  return request.get('/workspace/writer/latest-chapter', {
    params: { book_id: bookId }
  })
}
