import request from '@/utils/request'

export function getBannerList(params: { limit: number }) {
  return request.get('/module/banner-list', { params })
}
