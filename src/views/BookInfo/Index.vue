<template>
  <Header v-if="navMenus" :menus="navMenus" />

  <!-- 名称 -->
  <BookHeader v-if="bookHeader" :bookHeader="bookHeader" />

  <!-- 目录 -->
  <BookContent v-if="bookContent" :bookContent="bookContent" />

  <Footer />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Layout/Header.vue'
import BookHeader from '@/views/BookInfo/components/BookHeader.vue'
import BookContent from '@/views/BookInfo/components/BookContent.vue'
import Footer from '@/components/Layout/Footer.vue'

import { getBookHeader, getBookContent } from '@/apis/bookinfo'

// 菜单配置
const navMenus = [
  { path: '/home', label: '首页' },
  { path: '/library', label: '书库' },
  { path: '/bookshelf', label: '书架' },
  { path: '/writer', label: '作家专区' },
  { path: '/copyright', label: '版权专区' }
]

// 路由参数类型
const route = useRoute()

// 定义类型接口（可根据接口实际调整）
interface Author {
  nickname: string
  cover_url: string
  signature: string
  path: string
}

interface Book {
  id: number
  title: string
  cover_url: string
  status: string
  word_count: number
  tags: string
  updated_at?: string
  latest_chapter: number
  latest_chapter_title: string
}

interface BookHeaderData {
  book: Book
  author: Author
}

interface Chapter {
  title: string
  path: string
}

interface Volume {
  title: string
  chapter_count: number
  chapters: Chapter[]
}

interface BookContentData {
  intro: string
  volumes: Volume[]
}

// 响应数据状态
const bookHeader = ref<BookHeaderData | null>(null)
const bookContent = ref<BookContentData | null>(null)

onMounted(async () => {
  const id = route.params.id as string | undefined
  if (id) {
    try {
      const [headerRes, contentRes] = await Promise.all([getBookHeader(id), getBookContent(id)])
      bookHeader.value = headerRes.data
      bookContent.value = contentRes.data
    } catch (error) {
      console.error('获取书籍详情失败:', error)
    }
  }
})
</script>

<style scoped></style>
