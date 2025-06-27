<template>
  <div class="comment-section">
    <div v-for="comment in comments" :key="comment.id" class="comment-item comment-level-1">
      <!-- 一级评论 -->
      <CommentCard :comment="comment" :level="1" @reply="handleReply" @like="handleLike" />

      <!-- 回复框（一级） -->
      <div v-if="replyTarget?.id === comment.id" class="inline-reply-box reply-box-level-1">
        <img :src="userStore.avatar" class="reply-avatar avatar-level-1" />
        <textarea
          v-model="replyContent"
          class="textarea-level-1"
          :rows="1"
          :disabled="!userStore.isLogin"
          :placeholder="
            userStore.isLogin ? `回复 @${replyTarget?.user.name}：` : '请先登录后再评论'
          "
          @blur="handleBlur"
          @input="autoResize"
        />
        <button
          class="submit-btn btn-level-1"
          :disabled="!userStore.isLogin || !replyContent.trim()"
          @click="submitReply(comment.id, null, comment.user.id)"
        >
          发布
        </button>
      </div>

      <!-- 子评论 -->
      <div class="sub-comments" v-if="comment.children?.length">
        <div
          v-for="sub in getVisibleChildren(comment)"
          :key="sub.id"
          class="sub-comment-wrapper comment-level-2"
        >
          <CommentCard :comment="sub" :level="2" @reply="handleReply" @like="handleLike">
            <template #content>
              <span v-if="sub.reply_to_user && sub.reply_to_user.id !== comment.user.id">
                回复 <span class="at">@{{ sub.reply_to_user.name }}</span
                >：
              </span>
              {{ sub.content }}
            </template>
          </CommentCard>

          <!-- 回复框（二级） -->
          <div v-if="replyTarget?.id === sub.id" class="inline-reply-box reply-box-level-2">
            <img :src="userStore.avatar" class="reply-avatar avatar-level-2" />
            <textarea
              v-model="replyContent"
              class="textarea-level-2"
              :rows="1"
              :disabled="!userStore.isLogin"
              :placeholder="
                userStore.isLogin ? `回复 @${replyTarget?.user.name}：` : '请先登录后再评论'
              "
              @blur="handleBlur"
              @input="autoResize"
            />
            <button
              class="submit-btn btn-level-2"
              :disabled="!userStore.isLogin || !replyContent.trim()"
              @click="submitReply(comment.id, sub.id, sub.user.id)"
            >
              发布
            </button>
          </div>
        </div>

        <!-- 展开按钮 -->
        <div
          class="toggle-btn"
          v-if="!comment.expanded && comment.children.length > 2"
          @click="expandComment(comment)"
        >
          共 {{ comment.children.length }} 条回复，点击查看
        </div>

        <!-- 分页控制 -->
        <div class="pagination" v-if="comment.expanded && comment.pageCount > 1">
          共 {{ comment.pageCount }} 页　
          <span
            v-for="p in comment.pageCount"
            :key="p"
            class="page-item"
            :class="{ active: p === comment.currentPage }"
            @click="switchPage(comment, p)"
          >
            {{ p }}
          </span>
          <span
            class="page-item"
            v-if="comment.currentPage < comment.pageCount"
            @click="nextPage(comment)"
          >
            下一页
          </span>
          <span class="page-item" @click="collapseComment(comment)">收起</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import CommentCard from './CommentCard.vue'
import { getCommentList, updateLikesBatch, createComment } from '@/apis/comment'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()

interface CommentItem {
  id: number
  user: { id: number; name: string; avatar: string }
  content: string
  time: string
  likes: number
  reply_to_user?: { id: number; name: string; avatar: string }
  parent_id?: number
  children?: CommentItem[]
  expanded: boolean
  currentPage: number
  pageCount: number
  is_flat?: boolean
}

const props = defineProps<{ bookId: string | number }>()
const PAGE_SIZE = 10
const comments = ref<CommentItem[]>([])
const likedSet = new Set<number>()

const replyTarget = ref<CommentItem | null>(null)
const replyContent = ref('')

const fetchComments = async () => {
  const res = await getCommentList(props.bookId)
  comments.value = (res.data || []).map((item: any) => ({
    ...item,
    expanded: false,
    currentPage: 1,
    pageCount: Math.ceil((item.children?.length || 0) / PAGE_SIZE)
  }))
}

onMounted(fetchComments)

onBeforeUnmount(() => {
  if (likedSet.size > 0) {
    updateLikesBatch(Array.from(likedSet))
  }
})

const handleLike = (id: number) => {
  if (!userStore.isLogin) return
  likedSet.add(id)
}

const handleReply = async (comment: CommentItem) => {
  replyTarget.value = comment
  replyContent.value = ''
  await nextTick()
}

const submitReply = async (
  topCommentId: number,
  parentId: number | null,
  replyToUserId: number
) => {
  if (!userStore.isLogin || !replyContent.value.trim()) return
  if (!userStore.user?.id) return

  await createComment({
    user_id: userStore.user.id,
    book_id: Number(props.bookId),
    content: replyContent.value,
    parent_id: parentId || topCommentId,
    reply_to_user_id: replyToUserId
  })

  replyTarget.value = null
  replyContent.value = ''
  await fetchComments()
}

const getVisibleChildren = (comment: CommentItem) => {
  const nested = comment.children || []
  if (!comment.expanded) return nested.slice(0, 2)
  const start = (comment.currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  return nested.slice(start, end)
}

const expandComment = (comment: CommentItem) => {
  comment.expanded = true
  comment.currentPage = 1
}

const switchPage = (comment: CommentItem, page: number) => {
  comment.currentPage = page
}

const nextPage = (comment: CommentItem) => {
  if (comment.currentPage < comment.pageCount) {
    comment.currentPage += 1
  }
}

const collapseComment = (comment: CommentItem) => {
  comment.expanded = false
  comment.currentPage = 1
}

const handleBlur = () => {
  setTimeout(() => {
    replyTarget.value = null
    replyContent.value = ''
  }, 100)
}

const autoResize = (e: Event) => {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.overflowY = 'hidden'

  const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight) + 10 || 24
  const maxLines = 3
  const maxHeight = lineHeight * maxLines
  const scrollHeight = el.scrollHeight

  if (scrollHeight <= maxHeight) {
    el.style.height = scrollHeight + 'px'
    el.style.overflowY = 'hidden'
  } else {
    el.style.height = maxHeight + 'px'
    el.style.overflowY = 'auto'
  }
}

defineExpose({
  fetchComments
})
</script>

<style scoped>
.comment-section {
  padding: 20px;
}

.sub-comments {
  margin-left: 45px;
  margin-top: 10px;
}

.toggle-btn {
  color: #999;
  font-size: 15px;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 14px;
  user-select: none;
}
.toggle-btn:hover {
  color: #ff5f00;
}

.pagination {
  font-size: 15px;
  color: #666;
  margin-top: 10px;
  margin-bottom: 10px;
}

.page-item {
  margin: 0 6px;
  cursor: pointer;
  color: #333;
}
.page-item.active {
  color: #ff5f00;
  font-weight: bold;
}
.page-item:hover {
  color: #ff5f00;
}

.at {
  color: #ff5f00;
  margin-right: 4px;
}

/* 公共回复框结构 */
.inline-reply-box {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 8px 0;
}

/* 一级评论项容器 */
.comment-level-1 {
  font-size: 17px;
}

/* 二级评论项容器 */
.comment-level-2 {
  font-size: 15px;
  padding: 10px 15px;
  border-radius: 6px;
  margin-top: -10px;
}

/* 一级头像样式 */
.avatar-level-1 {
  margin-top: 8px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* 二级头像样式 */
.avatar-level-2 {
  margin-top: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* 一级 textarea */
.textarea-level-1 {
  flex: 1;
  width: auto !important;
  margin-top: 8px;
  min-width: 240px;
  max-width: 480px;
  max-height: calc(70px * 3);
  overflow-y: auto;
  padding: 6px 12px;
  font-size: 22px;
  /* height: 70px !important; */
  line-height: 57px !important;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  word-break: break-word;
  white-space: pre-wrap;
}
.textarea-level-1:focus {
  border-color: #ff5f00;
  outline: none;
}
.textarea-level-1::placeholder {
  color: #bbb;
}

/* 二级 textarea */
.textarea-level-2 {
  flex: 1;
  width: auto !important;
  margin-top: 5px;
  min-width: 240px;
  max-width: 480px;
  max-height: calc(36px * 3);
  overflow-y: auto;
  padding: 6px 12px;
  font-size: 16px;
  /* height: 50px !important; */
  line-height: 36px !important;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  word-break: break-word;
  white-space: pre-wrap;
}
.textarea-level-2:focus {
  border-color: #ff5f00;
  outline: none;
}
.textarea-level-2::placeholder {
  color: #bbb;
}

/* 通用按钮样式 */
.submit-btn {
  background-color: #ff5f00;
  color: white;
  border: none;
  border-radius: 4px;
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

/* 一级发布按钮 */
.btn-level-1 {
  margin-top: 8px;
  font-size: 24px;
  height: 70px;
  width: 100px;
  padding: 5px 22px;
}

/* 二级发布按钮 */
.btn-level-2 {
  margin-top: 5px;
  font-size: 16px;
  height: 50px;
  padding: 4px 18px;
}
</style>
