<template>
  <div class="bg_bai">
    <div class="bookindex_wp">
      <div class="author-wroks">
        <div class="header-title">全部作品（{{ writerWorks.works.length }}）</div>
        <div class="line1"></div>
        <div
          class="book-item"
          v-for="(item, i) in writerWorks.works"
          :key="i"
          @click="goTo(item.bookinfo_path)"
        >
          <div class="cover">
            <img :src="item.cover_url" alt="" />
          </div>
          <div class="content">
            <h2 class="title">{{ item.title }}</h2>
            <div class="status">{{ item.tags }}</div>
            <div class="desc1">{{ item.intro }}</div>
            <div class="desc2">
              <span class="clickable"
                >最近更新：{{ item.max_chapter_title || '无最新章节' }}
                <i class="muyeicon-enter clickable"></i
              ></span>
              <span class="time">{{
                item.updated_at ? item.updated_at.replace('T', ' ').slice(0, 16) : ''
              }}</span>
            </div>
          </div>
          <div class="right">
            <div>
              <span class="big">{{ (item.word_count / 10000).toFixed(1) }}</span>
              <span class="text1">万字</span>
            </div>
            <div class="btn">书籍详情</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGoTo } from '@/composables/useGoTo'
const { goTo } = useGoTo()

// 用 props 获取父组件传入的数据，类型 WriterWorksData
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

const props = defineProps<{ writerWorks: WriterWorksData }>()
</script>

<style scoped>
.bg_bai {
  background-color: #fff;
}

.bookindex_wp {
  width: 1240px;
  margin: 0 auto;
}

.author-wroks {
  padding-top: 61px;
  padding-bottom: 150px;
}

.author-wroks .header-title {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.author-wroks .line1 {
  height: 1px;
  width: 100%;
  border-radius: 0;
  background: #0000000f;
  margin: 18px auto 60px;
}

.author-wroks div.book-item {
  margin-bottom: 58px;
}

.author-wroks .notice-list-pagination {
  margin-top: 68px;
}

.author-wroks .notice-list-pagination .byte-pagination-list {
  margin: 0 auto;
  padding-left: 9px;
}

.author-wroks .notice-list-pagination .byte-pagination-item-icon {
  display: none;
}

.author-wroks
  .notice-list-pagination
  .byte-pagination-item:not(.byte-pagination-item-active):not(.disabled):hover {
  background-color: rgba(255, 79, 0, 0.1);
}

.author-wroks .notice-list-pagination .byte-pagination-item-active {
  background-color: rgba(255, 79, 0, 0.9);
}

.book-item {
  cursor: pointer;
  display: flex;
}

.book-item .cover {
  overflow: hidden;
  flex-shrink: 0;
  height: 156px;
}

.book-item .cover img {
  height: 156px;
  width: 120px;
  border-radius: 4.8px;
  transition: all 0.2s ease-in;
}

.book-item .cover img:hover {
  transform: scale(1.2);
}

.book-item .content {
  margin-left: 24px;
  flex-basis: 715px;
}

.book-item .content .title {
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0;
}

.book-item .content .status {
  margin-top: 10px;
  margin-left: -2px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  color: #999;
}

.book-item .content .status .rate {
  margin-left: 20px;
}

.book-item .content .desc1 {
  margin-top: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.book-item .content .desc1,
.book-item .content .desc2 {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  color: #999;
}

.book-item .content .desc2 {
  margin-top: 8px;
}

.book-item .content .desc2 a {
  color: #999;
}

.book-item .content .desc2 i {
  color: #999;
  font-weight: 400;
  position: relative;
  top: 2px;
  left: -1px;
}

.book-item .content .desc2:hover a {
  color: #fa6725;
}

.book-item .content .desc2:hover i.clickable {
  color: #fa6725;
  cursor: pointer;
}

.book-item .content .desc2 .time {
  margin-left: 53px;
}

.book-item .content .clickable:hover {
  color: #fa6725;
  cursor: pointer;
}

.book-item .right {
  margin-left: 68px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0;
  color: #c4c4c4;
  position: relative;
  flex-grow: 1;
}

.book-item .right div {
  white-space: nowrap;
  text-align: right;
}

.book-item .right .big,
.book-item .right .big2 {
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0;
  color: #333;
}

.book-item .right .btn {
  position: absolute;
  margin-top: 63px;
  right: 0;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  text-align: center;
  color: #fa6725;
  padding: 7px 21px;
  border: 1px solid #fa6725;
  box-sizing: border-box;
  border-radius: 17px;
}

.book-item .right .btn a {
  color: #fa6725;
}

.book-item .right .text1 {
  margin-left: 4px;
}

.book-item .right .operate {
  width: 1px;
  height: 16px;
  background: #d8d8d8;
  display: inline-block;
  margin-right: 4px;
  position: relative;
  top: -1px;
  margin-left: 20px;
}

.book-item .right .big2 {
  margin-left: 20px;
}

.book-item .right .text2 {
  margin-left: 5px;
}
</style>
