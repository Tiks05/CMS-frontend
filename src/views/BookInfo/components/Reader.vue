<template>
  <div class="bg_hui">
    <div class="reader_wp">
      <!-- 头部 -->
      <ReaderHead :book-title="bookTitle" :book-id="route.params.bookId as string" />

      <div class="web_reader">
        <div class="title">
          <h4>第{{ chapterIndex }}章 {{ chapterTitle }}</h4>
          <p>
            <span>本章字数：{{ wordCount }} 字</span>
            <span>更新时间：{{ updatedAt }}</span>
          </p>
        </div>

        <div class="html">
          <div>
            <p v-for="(para, index) in content" :key="index">{{ para }}</p>
          </div>
        </div>

        <div class="btn-group">
          <span class="btn" v-if="prevChapterId" @click="goToPrev">上一章</span>
          <span class="btn" v-if="nextChapterId" @click="goToNext">下一章</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReaderHead from '@/views/BookInfo/components/ReaderHead.vue'
import { getChapterContent } from '@/apis/bookinfo'

const route = useRoute()
const router = useRouter()

const chapterIndex = ref(0)
const bookTitle = ref('')
const chapterTitle = ref('')
const wordCount = ref(0)
const updatedAt = ref('')
const content = ref<string[]>([])
const prevChapterId = ref<number | null>(null)
const nextChapterId = ref<number | null>(null)

const fetchContent = async () => {
  const bookId = route.params.bookId as string
  const volumeId = route.params.volumeId as string
  const chapterId = route.params.chapterId as string

  try {
    const res = await getChapterContent(bookId, volumeId, chapterId)
    bookTitle.value = res.data.book_title
    chapterTitle.value = res.data.chapter_title
    wordCount.value = res.data.word_count
    updatedAt.value = res.data.updated_at
    content.value = res.data.content.split('\n')
    chapterIndex.value = res.data.chapter_index || 1
    prevChapterId.value = res.data.prev_chapter_id
    nextChapterId.value = res.data.next_chapter_id
    console.log('章节内容获取成功', res.data)
  } catch (err) {
    console.error('获取章节内容失败', err)
  }
}

const goToPrev = () => {
  const bookId = route.params.bookId
  const volumeId = route.params.volumeId
  if (prevChapterId.value) {
    router.push(`/read/${bookId}/${volumeId}/${prevChapterId.value}`)
  }
}

const goToNext = () => {
  const bookId = route.params.bookId
  const volumeId = route.params.volumeId
  if (nextChapterId.value) {
    router.push(`/read/${bookId}/${volumeId}/${nextChapterId.value}`)
  }
}

onMounted(fetchContent)

watch(
  () => route.params.chapterId,
  () => {
    fetchContent()
  }
)
</script>

<style scoped>
body {
  background-color: #e0e0e0;
}

.bg_hui {
  background-color: #e0e0e0;
}

.reader_wp {
  width: 960px;
  margin: 0 auto;
  background-color: #fff;
  padding: 0 80px;
}

.web_reader {
  padding: 60px 0;
}

.web_reader .title h4 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
}

.web_reader .title p {
  font-size: 14px;
  color: #999;
  margin-top: 12px;
}

.web_reader .title span {
  margin-right: 25px;
}

.web_reader .html {
  margin-top: 30px;
}

.web_reader .html p {
  margin-top: 20px;
  font-size: 16px;
  color: #000;
  line-height: 1.6;
  text-indent: 2em;
}

.btn-group {
  text-align: center;
  margin-top: 110px;
}

.btn-group .btn {
  width: 160px;
  height: 44px;
  line-height: 44px;
  border-radius: 50px;
  display: inline-block;
  background-color: #fa6725;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  margin: 0 12px;
  opacity: 0.9;
}

.btn-group .btn:hover {
  opacity: 1;
}
</style>
