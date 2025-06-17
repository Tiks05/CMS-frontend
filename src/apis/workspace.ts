import request from '@/utils/request'

export const applyAsAuthor = (formData: FormData) =>
  request.post('/workspace/apply', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })