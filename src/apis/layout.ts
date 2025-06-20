import request from '@/utils/request'

export const applyAsAuthor = (formData: FormData) =>
  request.post('/profile/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })