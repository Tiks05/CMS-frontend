<template>
  <div class="book_card" @click="goTo(book.path)">
    <div class="pic">
      <img :src="book.coverUrl" alt="封面" class="cover" />
    </div>

    <div class="info">
      <div class="title">{{ book.title }}</div>
      <div class="author">作者：{{ book.author }}</div>
      <div class="status">{{ book.status }}：{{ formatWordCount(book.wordCount) }}</div>
      <div class="intro">{{ truncateIntro(book.intro) }}</div>
      <div class="update-time">{{ formatUpdateTime(book.updatedAt) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGoTo } from '@/composables/useGoTo'

const { goTo } = useGoTo()

interface Book {
  id: number
  title: string
  author: string
  status: string
  wordCount: number
  intro: string
  coverUrl: string
  updatedAt: string
  path: string
}

const { book } = defineProps<{ book: Book }>()

function formatWordCount(count: number): string {
  if (count >= 100000000) return (count / 100000000).toFixed(1) + '亿字'
  if (count >= 10000) return (count / 10000).toFixed(1) + '万字'
  return count + '字'
}

function truncateIntro(intro: string): string {
  return intro.length > 40 ? intro.slice(0, 40) + '...' : intro
}

function formatUpdateTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 1) return '刚刚'
  if (diffHours < 24) return `${diffHours}小时前`
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.book_card {
  position: relative;
  height: 130px;
  padding-left: 120px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.pic {
  width: 100px;
  height: 130px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

.pic img {
  width: 100px;
  height: 130px;
  transition: transform 0.3s ease;
}

.book_card:hover .pic img {
  transform: scale(1.1);
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.author,
.status,
.intro,
.update-time {
  font-size: 13px;
  color: #999;
  line-height: 20px;
}

.intro {
  max-height: 39px;
  overflow: hidden;
}
</style>
