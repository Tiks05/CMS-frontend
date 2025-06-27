<template>
  <Header v-if="navMenus" :menus="navMenus" />

  <!-- 作家名称和简介 -->
  <WriterHeader v-if="writerHeader" :writerHeader="writerHeader" />

  <!-- 作品列表 -->
  <WriterWorks v-if="writerWorks" :writerWorks="writerWorks" />

  <Footer />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Layout/Header.vue'
import WriterHeader from '@/views/WriterInfo/components/WriterHeader.vue'
import WriterWorks from '@/views/WriterInfo/components/WriterWorks.vue'
import Footer from '@/components/Layout/Footer.vue'

import { getWriterHeader, getWriterWorks } from '@/apis/writerinfo'

// 菜单配置
const navMenus = [
  { path: '/home', label: '首页' },
  { path: '/library', label: '书库' },
  { path: '/bookshelf', label: '书架' },
  { path: '/writer', label: '作家专区' },
  { path: '/copyright', label: '版权专区' }
]

// 路由参数
const route = useRoute()

// 类型接口（按实际接口调整）
interface Writer {
  nickname: string
  avatar_url: string
  signature: string
  intro: string
  become_author_at: string
  total_words: number
  follower_count: number
}

interface WriterHeaderData {
  writer: Writer
}

interface Work {
  title: string
  cover_url: string
  status: string
  word_count: number
  tags: string
  intro: string
  updated_at?: string
  bookinfo_path: string
  max_chapter?: number
  max_chapter_title?: string
}

interface WriterWorksData {
  works: Work[]
}

// 响应数据状态
const writerHeader = ref<WriterHeaderData | null>(null)
const writerWorks = ref<WriterWorksData | null>(null)

onMounted(async () => {
  const id = route.params.id as string | undefined
  if (id) {
    try {
      const [headerRes, worksRes] = await Promise.all([getWriterHeader(id), getWriterWorks(id)])
      writerHeader.value = headerRes.data
      writerWorks.value = worksRes.data
    } catch (error) {
      console.error('获取作家详情失败:', error)
    }
  }
})
</script>

<style scoped>
/* 需要自定义样式可加在这里 */
</style>
