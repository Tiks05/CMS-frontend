<template>
  <div
    class="comment-card"
    :class="[{ 'is-sub': level > 1 && !comment.is_flat }, `level-${level}`]"
  >
    <img class="avatar" :src="comment.user.avatar" alt="avatar" />
    <div class="content-box">
      <div class="meta">
        <span class="name">{{ comment.user.name }}</span>
        <span class="time">{{ comment.time }}</span>
      </div>

      <div class="text">
        <slot name="content">
          {{ comment.content }}
        </slot>
      </div>

      <div class="actions">
        <span class="like" @click="handleLike">
          <img :src="hasLiked ? iconLiked : iconLike" class="like-icon" />
          {{ localLikes }}
        </span>
        <span class="reply" @click="$emit('reply', comment)">回复</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import iconLike from '@/assets/icons/thumbs-up/thumbs-up.svg'
import iconLiked from '@/assets/icons/thumbs-up/thumbs-up-active.svg'

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

const props = defineProps<{
  comment: CommentItem
  level: number
}>()

const emit = defineEmits<{
  (e: 'reply', comment: CommentItem): void
  (e: 'like', id: number, liked: boolean): void
}>()

const hasLiked = ref(false)
const localLikes = ref(props.comment.likes)

const handleLike = () => {
  hasLiked.value = !hasLiked.value
  localLikes.value += hasLiked.value ? 1 : -1
  emit('like', props.comment.id, hasLiked.value)
}
</script>

<style scoped>
.comment-card {
  display: flex;
}

.avatar {
  border-radius: 999px;
  object-fit: cover;
}

.content-box {
  margin-left: 12px;
  flex: 1;
}

.meta {
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
}

.name {
  font-weight: bold;
  margin-right: 10px;
}

.time {
  color: #999;
  font-size: 14px;
}

.text {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 6px;
  word-break: break-word;
}

.actions {
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 4px;
}

.actions span {
  margin-right: 14px;
  cursor: pointer;
  user-select: none;
}

.actions span:hover {
  color: #ff5f00;
}

.like-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 4px;
}

.at {
  color: #ff5f00;
  font-weight: 500;
  margin-right: 4px;
}

/* === 区分等级样式 === */
.level-1 .avatar {
  width: 70px;
  height: 70px;
}

.level-1 .meta {
  font-size: 18px;
}

.level-1 .text {
  font-size: 18px;
}

.level-1 .actions {
  font-size: 16px;
}

.level-2 .avatar {
  width: 50px;
  height: 50px;
}

.level-2 .meta {
  font-size: 16px;
}

.level-2 .text {
  font-size: 16px;
}

.level-2 .actions {
  font-size: 13px;
}
</style>
