<template>
  <Header v-if="navMenus" :menus="navMenus" />
  <div class="comment-page">
    <div class="container">
      <!-- 顶部返回箭头 + 标题 -->
      <div class="comment-title" @click="goBack">
        <img src="@/assets/icons/arrow-left/icons8-arrow-50.png" class="back-icon" />
        <span class="title">评论</span>
      </div>

      <div class="inline-reply-box">
        <img :src="userStore.avatar" class="reply-avatar" />
        <textarea
          v-model="commentContent"
          class="inline-textarea"
          :rows="1"
          :disabled="!userStore.isLogin"
          :placeholder="userStore.isLogin ? '尊重是评论打动人心的入场券' : '请先登录后再评论'"
          @input="autoResize"
        />
        <button
          class="submit-btn"
          :disabled="!userStore.isLogin || !commentContent.trim()"
          @click="submitComment"
        >
          发布
        </button>
      </div>

      <!-- 评论列表 -->
      <Comments ref="commentsRef" :book-id="bookId" />
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Comments from './components/Comments.vue'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import { useUserStore } from '@/stores/useUserStore'
import { createComment } from '@/apis/comment'

const userStore = useUserStore()
const route = useRoute()
const bookId = String(route.params.bookId)
const router = useRouter()
const goBack = () => router.back()

const commentsRef = ref<InstanceType<typeof Comments> | null>(null)
const commentContent = ref('')

// 提交一级评论
const submitComment = async () => {
  if (!userStore.user?.id || !commentContent.value.trim()) return
  await createComment({
    user_id: userStore.user.id,
    book_id: Number(bookId),
    content: commentContent.value,
    parent_id: undefined,
    reply_to_user_id: undefined
  })
  commentContent.value = ''
  commentsRef.value?.fetchComments?.()
}

// 动态自适应 textarea 高度
const autoResize = (e: Event) => {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.overflowY = 'hidden'

  const scrollHeight = el.scrollHeight
  const maxHeight = 70 * 3 // 三行的高度

  if (scrollHeight <= maxHeight) {
    el.style.height = scrollHeight + 'px'
  } else {
    el.style.height = maxHeight + 'px'
    el.style.overflowY = 'auto'
  }
}

const navMenus = [
  { path: '/home', label: '首页' },
  { path: '/library', label: '书库' },
  { path: '/bookshelf', label: '书架' },
  { path: '/writer', label: '作家专区' },
  { path: '/copyright', label: '版权专区' }
]
</script>

<style scoped>
.comment-page {
  background-color: #f8f8f8;
  padding: 40px 0;
}
.container {
  width: 1300px;
  margin: 30px auto 0;
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 顶部返回 + 标题 */
.comment-title {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 24px;
}
.back-icon {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}
.title {
  font-size: 30px;
  font-weight: bold;
  color: #333;
}
.inline-reply-box {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 8px 0 12px 0;
}
.reply-avatar {
  width: 80px;
  border-radius: 50%;
  flex-shrink: 0;
}
.inline-textarea {
  flex: 1;
  min-width: 240px;
  max-width: 800px;
  min-height: 48px; /* 1 行高度 */
  max-height: calc(65px * 3); /* 最多显示 3 行（约96px） */
  padding: 6px 12px;
  font-size: 30px;
  line-height: 65px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: none;
  overflow-y: auto; /* 超过 3 行出现滚动条 */
  box-sizing: border-box;
  word-break: break-word;
  white-space: pre-wrap;
  transition: border-color 0.2s ease;
}

.inline-textarea:focus {
  border-color: #ff5f00;
  outline: none;
}
.inline-textarea::placeholder {
  color: #bbb;
}
.submit-btn {
  background-color: #ff5f00;
  color: white;
  border: none;
  border-radius: 4px;
  height: 78px;
  width: 120px;
  padding: 5px 22px;
  font-size: 30px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.submit-btn:hover:not(:disabled) {
  background-color: #ff5f00;
}
.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
