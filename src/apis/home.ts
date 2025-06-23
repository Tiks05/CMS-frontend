import request from '@/utils/request'

// 获取首页排行榜数据
export const fetchTopBooks = () => request.get('/home/top-books')

// 获取首页最新资讯
export const fetchNewsList = (params: { limit?: number } = {}) => {
  return request.get('/home/news-list', { params })
}

// 获取首页作家列表
export const getWriterList = () => request.get('/home/writer-list')

// 获取首页推荐书籍
export const getRecommendBooks = () => request.get('/home/recommend')

// 获取首页适配列表
export const getAdaptList = (limit?: number) =>
  request.get('/home/adaptlist', {
    params: { limit }
  })

// 获取首页排行榜
export const fetchRankingList = (reader_type: string, plot_type: string) =>
  request.get('/home/ranking', {
    params: { reader_type, plot_type }
  })

export const getRecentUpdates = () => {
  return request.get('/home/recent-updates')
}