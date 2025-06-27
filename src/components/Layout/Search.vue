<template>
  <div>
    <Header v-if="navMenus" :menus="navMenus" />
    <div class="header_h"></div>
    <div class="seach_wp">
      <!-- 搜索栏 -->
      <div class="seach">
        <i class="el-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path
              fill="currentColor"
              d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
            ></path>
          </svg>
        </i>
        <input
          type="text"
          v-model="keyword"
          placeholder="请输入书名或作者名"
          @keydown.enter="onEnter"
        />
        <span @click="onEnter">搜索</span>
      </div>

      <!-- 筛选栏 -->
      <div class="seach_type">
        <div class="top">
          <div class="item" :class="type == 0 ? 'on' : ''" @click="moveLine(0)">
            <span>相关</span>
          </div>
          <div class="item" :class="type == 1 ? 'on' : ''" @click="moveLine(1)">
            <span>最热</span>
          </div>
          <div class="item" :class="type == 2 ? 'on' : ''" @click="moveLine(2)">
            <span>最新</span>
          </div>
          <div class="item item_c" :class="ischose ? 'on' : ''" @click="ischose = !ischose">
            <span>筛选</span>
            <img class="img1" src="/src/assets/icons/arrow-right/icons8-arrow-100.png" alt="" />
            <img src="/src/assets/icons/arrow-right/icons9-arrow-100.png" class="img2" alt="" />
          </div>
          <div class="line" :style="{ left: lineLeft + 'px' }"></div>
        </div>
        <div class="bottom" v-if="ischose">
          <div class="filter-condition">
            <div class="condition-title">更新时间：</div>
            <div
              class="condition-item"
              :class="timeindex == index ? 'active' : ''"
              v-for="(item, index) in time"
              :key="index"
              @click="timeindex = index"
            >
              {{ item }}
            </div>
          </div>
          <div class="filter-condition">
            <div class="condition-title">字数：</div>
            <div
              class="condition-item"
              :class="numindex == index ? 'active' : ''"
              v-for="(item, index) in num"
              :key="index"
              @click="numindex = index"
            >
              {{ item }}
            </div>
          </div>
          <div class="filter-condition">
            <div class="condition-title">状态：</div>
            <div
              class="condition-item"
              :class="stateindex == index ? 'active' : ''"
              v-for="(item, index) in state"
              :key="index"
              @click="stateindex = index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索提示 -->
      <div class="muye-search-hint">
        共 <span class="count">{{ total }}</span> 项相关的结果
      </div>

      <!-- 图书列表 -->
      <div class="muye-search-book-list">
        <div class="search-book-item" v-for="(item, index) in booklist" :key="index">
          <div class="muye-book-cover book-item-cover is-book has-hover">
            <div class="book-cover" @click="goTo(item.path)">
              <img :src="item.pic" alt="" />
            </div>
          </div>
          <div class="book-item-text">
            <div class="title" @click="goTo(item.path)">
              <span v-html="highlight(item.title, keyword)"></span>
            </div>
            <div class="desc">
              <span> 作者：<span v-html="highlight(item.author, keyword)"></span> </span>
              <span class="span">{{ item.status }}</span>
              <span class="span">{{ item.wordCount }}字 · {{ item.people }}人在读</span>
            </div>
            <div class="desc abstract">
              <span>{{ item.intro }}</span>
            </div>
            <div class="footer" @click="goTo(item.updatePath)">
              <span class="chapter">最近更新：{{ item.update }}<i class="muyeicon-enter"></i></span>
              <span>{{ item.updatedAt }}</span>
            </div>
          </div>
          <div class="read" @click="goTo(item.readPath)">立即阅读</div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="custom-pagination" v-if="pageCount > 1">
        <button class="page-btn" :disabled="page === 1" @click="goPage(page - 1)">上一页</button>
        <button
          v-for="p in visiblePages"
          :key="p"
          class="page-btn"
          :class="{ active: p === page }"
          @click="goPage(p)"
        >
          {{ p }}
        </button>
        <span v-if="showEllipsis">...</span>
        <button class="page-btn" :disabled="page === pageCount" @click="goPage(page + 1)">
          下一页
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchBooks } from '@/apis/layout'
import { useGoTo } from '@/composables/useGoTo'
const { goTo } = useGoTo()

interface SearchBookItem {
  title: string
  author: string
  status: string
  wordCount: number
  intro: string
  updatedAt: string
  pic: string
  people: number
  update: string
  path: string
  readPath: string
  updatePath: string
}

const router = useRouter()
const route = useRoute()

// 当前页和分页逻辑
const page = ref(1)
const pageSize = 10
const total = ref(0)
const pageCount = computed(() => Math.ceil(total.value / pageSize))

const visiblePages = computed(() => {
  const totalPages = pageCount.value
  const current = page.value
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
  if (current <= 3) return [1, 2, 3, 4, 5]
  if (current >= totalPages - 2)
    return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  return [current - 2, current - 1, current, current + 1, current + 2]
})
const showEllipsis = computed(() => pageCount.value > 5 && page.value <= pageCount.value - 3)

// 搜索关键词
const keyword = ref((route.query.keyword as string) || '')

// 排序分类状态
const type = ref(0)
const lineLeft = ref(22)
const ischose = ref(false)

// 筛选条件
const time = ['全部', '过去三十分钟', '今天', '本周', '本月', '今年']
const timeindex = ref(0)
const num = ['全部', '30万字以下', '30-50万', '50-100万', '100-200万']
const numindex = ref(0)
const state = ['全部', '已完结', '连载中']
const stateindex = ref(0)

// 图书列表
const booklist = ref<SearchBookItem[]>([])

// 请求数据
const fetchBooks = async () => {
  const res = await searchBooks({
    keyword: keyword.value,
    type: type.value,
    timeindex: timeindex.value,
    numindex: numindex.value,
    stateindex: stateindex.value,
    page: page.value,
    pageSize
  })
  booklist.value = res.data.records
  total.value = res.data.total
}

// 分页
const goPage = (val: number) => {
  if (val !== page.value && val >= 1 && val <= pageCount.value) {
    page.value = val
    fetchBooks()
  }
}

// 点击排序项
const moveLine = (index: number) => {
  type.value = index
  lineLeft.value = 22 + 64 * index
  page.value = 1
  router.replace({ query: { ...route.query, keyword: keyword.value } }) // 更新 URL
  fetchBooks()
}

// 回车搜索
const onEnter = () => {
  router.replace({ query: { ...route.query, keyword: keyword.value } })
  page.value = 1
  fetchBooks()
}

// 筛选变动时（可选添加 URL 同步）
watch([timeindex, numindex, stateindex], () => {
  page.value = 1
  fetchBooks()
})

// 初始加载
fetchBooks()

const navMenus = [
  { path: '/home', label: '首页' },
  { path: '/library', label: '书库' },
  { path: '/bookshelf', label: '书架' },
  { path: '/writer', label: '作家专区' },
  { path: '/copyright', label: '版权专区' }
]

const highlight = (text: string, keyword: string): string => {
  if (!keyword) return text
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 转义正则字符
  const regex = new RegExp(escaped, 'gi')
  return text.replace(regex, match => `<span class="highlight-text">${match}</span>`)
}
</script>

<style scoped>
.header_h {
  height: 65px;
}

.seach_wp {
  max-width: 1240px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px 66px;
}

.seach_wp .seach {
  width: 510px;
  margin: 0 auto;
  border-radius: 50px;
  overflow: hidden;
  position: relative;
}
.seach_wp .seach input {
  width: 510px;
  height: 42px;
  border-radius: 50px;
  border: 1px solid #d6d6d6;
  font-size: 18px;
  color: #333;
  padding-left: 52px;
  padding-right: 100px;
  outline: none;
}
.seach_wp .seach .el-icon {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  width: 1.3em;
  height: 1.3em;
}
.seach_wp .seach .el-icon svg {
  width: 1.3em;
  height: 1.3em;
  color: #999;
}

.seach_wp .seach span {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  width: 90px;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  font-size: 18px;
  color: #fff;
  background-image: linear-gradient(117deg, #ff9000 12%, #ff4f00 87%);
}
.seach_wp .seach span:hover {
  background: #ff4f00;
}
.seach_wp .seach_type {
  position: relative;
}
.seach_wp .seach_type .top {
  border-bottom: 1px solid #d6d6d6;
  position: relative;
}
.seach_wp .seach_type .item {
  display: inline-block;
  cursor: pointer;
}
.seach_wp .seach_type .item img {
  width: 12px;
  vertical-align: middle;
  margin-left: 0px;
  transform: rotate(90deg);
}
.seach_wp .seach_type .item span {
  vertical-align: middle;
  cursor: pointer;
  margin: 0 18px;
  display: inline-block;
  line-height: 44px;
  font-size: 14px;
}
.seach_wp .seach_type .item.item_c span {
  margin-right: 6px;
}
.seach_wp .seach_type .item:hover span,
.seach_wp .seach_type .item.on span {
  color: #fa6725;
}
.seach_wp .seach_type .item.item_c .img2 {
  display: none;
}
.seach_wp .seach_type .item.item_c .img1 {
  display: inline-block;
}
.seach_wp .seach_type .item.item_c:hover .img2,
.seach_wp .seach_type .item.item_c.on .img2 {
  display: inline-block;
}
.seach_wp .seach_type .item.item_c:hover .img1,
.seach_wp .seach_type .item.item_c.on .img1 {
  display: none;
}
.seach_wp .seach_type .line {
  position: absolute;
  width: 20px;
  height: 3px;
  background-color: #fa6725;
  border-radius: 50px;
  bottom: 0;
  transition: left 0.3s ease;
}
.seach_wp .seach_type .item.item_c.on .img2 {
  transform: rotate(270deg);
}

.seach_wp .bottom {
  margin-top: 16px;
  background-color: #fafafa;
  border-radius: 2px;
  padding: 20px 30px;
  position: relative;
}

.filter-condition {
  display: flex;
  align-items: center;
}

.filter-condition:not(:last-child) {
  margin-bottom: 20px;
}

.condition-title {
  font-weight: 500;
  padding-right: 20px;
  font-size: 14px;
}

.condition-item {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin-right: 20px;
  line-height: 24px;
  border-radius: 12px;
}

.condition-item:not(.active) {
  cursor: pointer;
}

.condition-item:not(.active):hover {
  color: #fa6725;
}

.condition-item.active {
  padding: 0 10px;
  font-weight: 500;
  color: #fa6725;
  background-color: rgba(250, 103, 37, 0.1);
}

:deep(.highlight-text) {
  color: #ff5f00;
}

.muye-search-hint {
  padding-top: 30px;
  line-height: 20px;
  font-size: 14px;
}

.muye-search-hint .count {
  color: #fa6725;
  font-size: 14px;
}

.muye-search-empty {
  background-color: #fff;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.muye-search-empty .empty-logo {
  width: 140px;
  height: 140px;
  background-size: 100% 100%;
  background-image: url('https://p3-novel.byteimg.com/origin/novel-static/747f82c6a22c9cb97dfa0cc7fd683fca');
  margin: 0 auto;
}

.muye-search-empty .empty-title {
  font-size: 24px;
  line-height: 33px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
}

.muye-search-empty .empty-desc {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
  line-height: 32px;
}

.muye-search-empty .empty-link {
  cursor: pointer;
  color: #333;
}

.muye-search-empty .empty-link:hover {
  color: #fa6725;
}

.muye-search-book-list {
  padding-bottom: 42px;
}

.muye-search-book-list .search-author-item,
.muye-search-book-list .search-book-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.search-book-item .book-cover {
  width: 119px;
  height: 155px;
  overflow: hidden;
}
.search-book-item .book-cover img {
  width: 119px;
  height: 155px;
  border-radius: 4px;
  transition: transform 0.3s ease; /* 设置过渡效果，0.3秒，缓动函数为ease */
}

.search-book-item .book-cover:hover img {
  transform: scale(1.05); /* 放大到1.05倍，可以调整 */
}

.muye-search-book-list .author-item-cover {
  flex: 0 0 auto;
  width: 106px;
  height: 106px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #f1f1f1;
}

.muye-search-book-list .author-item-text {
  flex: 1;
  padding-left: 38px;
  margin-right: 296px;
  cursor: pointer;
  font-size: 14px;
  line-height: 24px;
}

.muye-search-book-list .author-item-text .title {
  font-size: 18px;
  line-height: 25px;
  font-weight: 700;
  cursor: pointer;
}

.muye-search-book-list .author-item-text .title .logo,
.muye-search-book-list .author-item-text .title span {
  vertical-align: middle;
}

.muye-search-book-list .author-item-text .desc {
  color: rgba(0, 0, 0, 0.4);
  margin-top: 12px;
}

.muye-search-book-list .author-item-text .footer {
  color: rgba(0, 0, 0, 0.4);
  padding-top: 21px;
}

.muye-search-book-list .author-item-text .amount-item:not(:last-child) {
  margin-right: 68px;
}

.muye-search-book-list .author-item-text .amount {
  line-height: 24px;
  font-size: 18px;
  line-height: 25px;
  font-weight: 700;
  color: #333;
  margin: 0 2px 0 8px;
}

.muye-search-book-list .author-item-text .amount,
.muye-search-book-list .author-item-text .amount-text {
  vertical-align: text-bottom;
}

.muye-search-book-list .author-item-btn,
.muye-search-book-list .book-item-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 100px;
  height: 34px;
  line-height: 32px;
  font-size: 14px;
}

.muye-search-book-list .book-item-cover {
  flex: 0 0 auto;
  width: 120px;
  height: 156px;
  cursor: pointer;
}

.muye-search-book-list .book-item-text {
  flex: 1;
  padding: 0 296px 0 24px;
  font-size: 14px;
  line-height: 24px;
}

:deep(.muye-search-book-list .book-item-text .title) {
  font-size: 18px;
  line-height: 25px;
  font-weight: bold !important;
  cursor: pointer;
  display: inline-block;
}

.muye-search-book-list .book-item-text .title:hover {
  color: #fa6725;
}

.muye-search-book-list .book-item-text .desc {
  line-height: 20px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 8px;
}

.muye-search-book-list .book-item-text .abstract {
  line-height: 23px;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.muye-search-book-list .book-item-text .footer {
  color: rgba(0, 0, 0, 0.4);
  padding-top: 30px;
  display: flex;
  margin-right: -200px;
}

.muye-search-book-list .book-item-text .span {
  margin-left: 60px;
}

.muye-search-book-list .book-item-text .chapter {
  color: #999;
  display: flex;
  margin-right: 60px;
  cursor: pointer;
}

.muye-search-book-list .book-item-text .chapter:hover,
.muye-search-book-list .book-item-text .chapter:hover .muyeicon-enter {
  color: #fa6725;
}

.muye-search-book-list .book-item-text .chapter .muyeicon-enter {
  font-size: 10px;
  margin-right: 60px;
  color: #999;
}

.muye-search-book-list .book-item-text .highlight {
  color: #fa6725;
}
.muye-search-book-list .read {
  width: 100px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 50px;
  color: #fa6725;
  font-size: 14px;
  cursor: pointer;
}
.muye-search-book-list .read:hover {
  background-color: rgba(250, 103, 37, 0.08);
}
.list_page {
  text-align: center;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.page-btn {
  padding: 4px 10px;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
  min-width: 32px;
  text-align: center;
}

.page-btn:hover {
  border-color: #fa6725;
  color: #fa6725;
}

.page-btn.active {
  background-color: #fa6725;
  border-color: #fa6725;
  color: #fff;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
