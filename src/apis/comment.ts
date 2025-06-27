import request from '@/utils/request'

/**
 * 获取某本书下的所有一级评论及其子评论
 */
export function getCommentList(bookId: string | number) {
  return request.get('/comment/list', {
    params: { book_id: bookId }
  })
}

export function updateLikesBatch(ids: number[]) {
  return request.post('/comment/likes', { ids })
}

export function createComment(data: {
  book_id: number
  content: string
  parent_id?: number
  reply_to_user_id?: number
  user_id: number
}) {
  return request.post('/comment/create', data)
}
