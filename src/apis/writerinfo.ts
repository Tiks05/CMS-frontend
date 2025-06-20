import request from '@/utils/request'

export const getWriterHeader = (id: string | number) => {
  return request.get(`/writerinfo/header/${id}`)
}

export const getWriterWorks = (id: string | number) => {
  return request.get(`/writerinfo/works/${id}`)
}
