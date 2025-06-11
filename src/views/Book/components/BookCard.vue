<template>
  <div class="book-card">
    <img :src="book.coverUrl" alt="封面" class="cover" />

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
interface Book {
  id: number
  title: string
  author: string
  status: string
  wordCount: number
  intro: string
  coverUrl: string
  updatedAt: string
}

const props = defineProps<{ book: Book }>()

function formatWordCount(count: number): string {
  if (count >= 100000000) {
    return (count / 100000000).toFixed(1) + '亿字'
  }
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万字'
  }
  return count + '字'
}

function truncateIntro(intro: string): string {
  return intro.length > 40 ? intro.substring(0, 40) + '...' : intro
}

function formatUpdateTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 1) {
    return '刚刚'
  } else if (diffHours < 24) {
    return `${diffHours}小时前`
  } else {
    return date.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
  }
}
</script>

<style scoped>
.book-card {
  display: flex;
  padding: 10px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,0.1);
  transition: all 0.3s;
  cursor: pointer;
}
.book-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}
.cover {
  width: 80px;
  height: 110px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}
.info {
  flex: 1;
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}
.author, .status, .intro, .update-time {
  font-size: 14px;
  color: #666;
  margin-bottom: 3px;
}
</style>
