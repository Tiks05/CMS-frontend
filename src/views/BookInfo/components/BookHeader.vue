<template>
  <div class="bookindex_name" v-if="bookHeader">
    <div class="bookindex_wp">
      <div class="now_nav" v-if="bookHeader.book.title">
        <span @click="goTo('/home')">首页</span>
        <b>/</b>
        <em>{{ bookHeader.book.title }}</em>
      </div>

      <div class="page-header-info">
        <div class="img" v-if="bookHeader.book.cover_url">
          <img :src="bookHeader.book.cover_url" alt="封面" />
        </div>
        <div class="info">
          <div class="info-name" v-if="bookHeader.book.title">
            <h1>{{ bookHeader.book.title }}</h1>
          </div>
          <div class="info-label" v-if="bookHeader.book.status || bookHeader.book.tags">
            <span v-if="bookHeader.book.status" class="info-label-yellow">{{
              bookHeader.book.status
            }}</span>
            <span v-for="(tag, index) in tags" :key="index" class="info-label-grey">{{ tag }}</span>
          </div>
          <div class="info-count" v-if="bookHeader.book.word_count != null">
            <div class="info-count-word">
              <span class="detail">{{ (bookHeader.book.word_count / 10000).toFixed(1) }}</span>
              <span class="text">万字</span>
            </div>
          </div>
          <div class="info-last" v-if="latestChapter != null || bookHeader.book.updated_at">
            <span class="info-last-title">
              最近更新： 第{{ latestChapter }}章
              <template v-if="latestChapterTitle"> {{ latestChapterTitle }}</template>
            </span>
            <span class="info-last-time">{{ bookHeader.book.updated_at }}</span>
          </div>

          <span class="byte-btn" @click="startReading">开始阅读</span>
          <span class="byte-btn byte-btn2" @click="addBookshelf">加入书架</span>
          <span class="byte-btn" @click="handleComment">评论</span>
        </div>

        <div class="author" v-if="bookHeader.author" @click="goTo(authorPath)">
          <div class="author-divider"></div>
          <div class="author-info">
            <img
              v-if="bookHeader.author.cover_url"
              class="author-img"
              :src="bookHeader.author.cover_url"
              alt="作者头像"
            />
            <div class="author-name" v-if="bookHeader.author.nickname">
              <span class="author-name-logo"></span>
              <span class="author-name-text">{{ bookHeader.author.nickname }}</span>
            </div>
            <div class="author-desc" v-if="bookHeader.author.signature">
              {{ bookHeader.author.signature }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useGoTo } from '@/composables/useGoTo'

const { goTo } = useGoTo()

interface Author {
  nickname?: string
  cover_url?: string
  signature?: string
  path?: string
}

interface Book {
  id: number
  title?: string
  cover_url?: string
  status?: string
  word_count?: number
  tags?: string
  updated_at?: string
  latest_chapter: number
  latest_chapter_title: string
}

interface BookHeaderData {
  book: Book
  author: Author
}

const props = defineProps<{ bookHeader: BookHeaderData | null }>()

const tags = computed(() => {
  if (!props.bookHeader?.book.tags) return []
  return props.bookHeader.book.tags.split(',').map(tag => tag.trim())
})

const authorPath = computed(() => props.bookHeader?.author.path || '/authorinfo')

const latestChapter = computed(() => {
  return (props.bookHeader?.book as Book).latest_chapter || ''
})

const latestChapterTitle = computed(() => {
  return (props.bookHeader?.book as Book).latest_chapter_title || ''
})

function startReading() {
  if (!props.bookHeader?.book.id) return
  goTo(`/read/${props.bookHeader.book.id}/1/1`)
}

function addBookshelf() {
  alert('加入书架功能待实现')
}

const handleComment = () => {
  if (!props.bookHeader?.book.id) return
  console.log('bookId:', props.bookHeader.book.id)
  goTo(`/comments/${props.bookHeader.book.id}`)
}
</script>

<style scoped>
.bookindex_name {
  margin-top: 64px;
  background-color: #fff;
  padding: 30px 0;
}

.bookindex_wp {
  width: 1240px;
  margin: 0 auto;
}

.bookindex_name .now_nav span {
  font-size: 14px;
  cursor: pointer;
  line-height: 20px;
  color: #333;
}

.bookindex_name .now_nav span:hover {
  color: #fa6725;
}

.bookindex_name .now_nav em {
  font-style: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.bookindex_name .now_nav em:hover {
  color: #fa6725;
}

.bookindex_name .now_nav b {
  font-weight: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin: 0 5px;
}

.page-header {
  padding: 30px 20px 45px;
  width: 1240px;
  margin: 0 auto;
}

.page-header-info {
  margin-top: 32px;
  overflow: hidden;
}

.page-header-info .img {
  float: left;
  height: 234px;
  width: 180px;
  border-radius: 8px;
}

.page-header-info .img img {
  height: 234px;
  width: 180px;
  border-radius: 8px;
}

.page-header-info .info {
  float: left;
  margin-left: 24px;
  max-width: 585px;
  min-width: 400px;
  height: 234px;
  overflow: hidden;
  position: relative;
}

.page-header-info .info-name {
  margin-top: 10px;
  height: 32px;
  line-height: 32px;
  font-size: 24px;
  font-weight: 500;
}

.page-header-info .info-name h1 {
  font-size: 24px;
  font-weight: bold;
}

.page-header-info .info-label {
  margin-top: 12px;
  height: 22px;
}

.page-header-info .info-label-grey,
.page-header-info .info-label-yellow {
  padding: 0 7px;
  height: 22px;
  line-height: 22px;
  border-radius: 4px;
}

.page-header-info .info-label-yellow {
  color: #fdae31;
  border: 1px solid #fdae31;
}

.page-header-info .info-label-grey {
  margin-left: 10px;
  color: #000;
  border: 1px solid #000;
  opacity: 0.3;
}

.page-header-info .info-count {
  margin-top: 18px;
  height: 28px;
  overflow: hidden;
  display: flex;
}

.page-header-info .info-count-read,
.page-header-info .info-count-word {
  display: flex;
  align-items: flex-end;
}

.page-header-info .info-count-read .detail,
.page-header-info .info-count-word .detail {
  font-size: 24px;
  line-height: 28px;
  margin-right: 8px;
}

.page-header-info .info-count-read .text,
.page-header-info .info-count-word .text {
  opacity: 0.4;
  color: #000;
  font-size: 12px;
  position: relative;
  top: -1px;
}

.page-header-info .info-count-read {
  margin-left: 32px;
  position: relative;
}

.page-header-info .info-count-read:before {
  position: absolute;
  left: -16px;
  top: 50%;
  margin-top: -8px;
  content: ' ';
  width: 1px;
  height: 16px;
  background-color: #d8d8d8;
}

.page-header-info .info-last {
  font-size: 14px;
  color: #666;
  line-height: 24px;
  margin-top: 35px;
  color: #000;
  display: flex;
}

.page-header-info .info-last-time {
  margin-left: 15px;
  flex: 0 0 auto;
}

.page-header-info .info-last a {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.page-header-info .info-last a,
.page-header-info .info-last a:hover {
  color: #000;
}

.page-header-info .byte-btn {
  margin-top: 8px;
  width: 150px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  font-weight: 500;
  background-image: linear-gradient(117deg, #ff9000 12%, #ff4f00 87%);
  border-radius: 50px;
}
.page-header-info .byte-btn2 {
  color: #333;
  margin-left: 10px;
  background: rgba(0, 0, 0, 0.04) !important;
}
.page-header-info .byte-btn:hover {
  background: #fa6725;
}

.page-header-info .info-btn > a {
  color: #fff;
  height: 40px;
  line-height: 32px;
  display: inline-block;
  width: 100%;
}

.page-header-info .info-btn:hover {
  cursor: pointer;
}

.page-header-info .info-btn_disabled {
  background-color: #f5f6f7;
  color: #c2c6cc;
}

.page-header-info .info .add-bookshelf-btn {
  position: absolute;
  bottom: 0;
  left: 160px;
  color: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.04) !important;
  background-image: none;
  min-width: 150px;
  width: auto !important;
}

.page-header-info .info .add-bookshelf-btn:hover {
  background-color: rgba(0, 0, 0, 0.04) !important;
  background-image: none !important;
}

.page-header-info .info .download-btn {
  position: absolute;
  bottom: 0;
  left: 160px;
  color: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.04) !important;
  background-image: none;
  min-width: 150px;
  width: auto !important;
}

.page-header-info .info .download-btn:hover {
  color: rgba(0, 0, 0, 0.8) !important;
  background: rgba(0, 0, 0, 0.04) !important;
}

.page-header-info .info .download-icon {
  position: absolute;
  bottom: 0;
  left: 322px;
  background-color: rgba(0, 0, 0, 0.04) !important;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 32px;
  text-align: center;
}

.page-header-info .info .download-icon:hover {
  color: #ff5f00;
}

.page-header-info .author {
  width: 364px;
  float: right;
  text-align: center;
  margin-top: 10px;
  position: relative;
  font-size: 0;
}

.page-header-info .author-divider {
  position: absolute;
  top: 6;
  left: 0;
  height: 210px;
  opacity: 0.1;
  background-color: #000;
  width: 1px;
}

.page-header-info .author-info {
  cursor: pointer;
}

.page-header-info .author-img {
  border-radius: 50%;
  border: 1px solid #f1f1f1;
  width: 70px;
  height: 70px;
}

.page-header-info .author-name {
  font-size: 22px;
  height: 30px;
  line-height: 30px;
  margin-top: 12px;
}

.page-header-info .author-name-logo {
  display: inline-block;
  width: 47px;
  height: 20px;
  background-size: 100% 100%;
  background-image: url(@/assets/images/bookinfo/author-tag.png);
  margin-right: 8px;
  position: relative;
  top: 2px;
}

.page-header-info .author-desc {
  margin: 8px auto 0;
  font-size: 12px;
  line-height: 17px;
  width: 174px;
  color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.page-header-info .author-follow {
  margin: 20px auto 0;
  height: 36px;
  width: 84px;
  line-height: 34px;
  padding: 0;
}
</style>
