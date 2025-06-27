<template>
  <div class="bookindex_name muye-author-home-page">
    <div class="bookindex_wp">
      <div class="now_nav">
        <span @click="goTo('/home')">首页</span>
        <b>/</b>
        <em>{{ writerHeader.writer.nickname }}</em>
      </div>

      <div class="author-message">
        <div class="left">
          <div class="cover">
            <img :src="writerHeader.writer.avatar_url" alt="头像" />
          </div>
          <div class="text">
            <div class="first">
              <h1 class="title">{{ writerHeader.writer.nickname }}</h1>
              <div class="mark">番茄签约作家</div>
            </div>
            <div class="desc">{{ writerHeader.writer.signature || '暂无签名' }}</div>
          </div>
        </div>
        <div class="middle"></div>
        <div class="right">
          <div class="first">
            <div>作品总字数</div>
            <div class="bottom">
              <span class="big">{{ writerHeader.writer.total_words?.toLocaleString() || 0 }}</span>
              <span class="unit">字</span>
            </div>
          </div>
          <div class="second">
            <div>粉丝数</div>
            <div class="bottom">
              <span class="big">{{
                writerHeader.writer.follower_count?.toLocaleString() || 0
              }}</span>
              <span class="unit">人</span>
            </div>
          </div>
          <div class="third">
            <div>创作天数</div>
            <div class="bottom">
              <span class="big">{{ daysAsAuthor }}</span>
              <span class="unit">天</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGoTo } from '@/composables/useGoTo'

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

const { goTo } = useGoTo()

// 这里假设 props 的类型你已在父组件声明
const props = defineProps<{ writerHeader: WriterHeaderData }>()

const daysAsAuthor = computed(() => {
  if (!props.writerHeader.writer.become_author_at) return 0
  const begin = new Date(props.writerHeader.writer.become_author_at).getTime()
  const now = Date.now()
  return Math.max(Math.floor((now - begin) / (1000 * 60 * 60 * 24)), 0)
})
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

.muye-author-home-page .author-message {
  display: flex;
  margin-top: 45px;
  justify-content: flex-start;
  background-image: url(@/assets/images/pic1.png);
  background-repeat: no-repeat;
  background-size: contain;
  height: 272px;
  background-position-y: bottom;
  position: relative;
  overflow: hidden;
  background-color: #fcfcfc;
  border-radius: 16px;
}

.muye-author-home-page .author-message .middle {
  position: absolute;
  width: 1px;
  height: 500px;
  left: 557px;
  top: -4px;
  transform: rotate(10deg);
  z-index: 1;
  background: rgba(0, 0, 0, 0.06);
}

.muye-author-home-page .author-message .left {
  display: flex;
  width: 500px;
  margin-left: 58px;
  margin-top: 65px;
}

.muye-author-home-page .author-message .left .cover {
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  position: relative;
  top: -6px;
}
.muye-author-home-page .author-message .left .cover img {
  width: 100%;
  vertical-align: middle;
  border-radius: 50px;
}
.muye-author-home-page .author-message .left .text {
  margin-left: 18px;
  margin-top: 2px;
  flex-shrink: 1;
}

.muye-author-home-page .author-message .left .text .first {
  display: flex;
  align-items: center;
  margin-top: -8px;
}

.muye-author-home-page .author-message .left .text .first .title {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  text-align: center;
}

.muye-author-home-page .author-message .left .text .first .mark {
  margin-left: 7px;
  border: 1px solid #fdae31;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0 6px 0 7px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  color: #fdae31;
}

.muye-author-home-page .author-message .left .text .desc {
  position: relative;
  top: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  width: 356px;
}

.muye-author-home-page .author-message .right {
  display: flex;
  margin-left: 117px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0;
  color: #a4a4a4;
}

.muye-author-home-page .author-message .right .big {
  font-size: 24px;
  font-weight: bold;
  line-height: 30px;
  letter-spacing: 0;
  text-align: left;
  color: #000;
}

.muye-author-home-page .author-message .right .first,
.muye-author-home-page .author-message .right .second,
.muye-author-home-page .author-message .right .third {
  width: 300px;
}

.muye-author-home-page .author-message .right .first,
.muye-author-home-page .author-message .right .third {
  margin-top: 59px;
}

.muye-author-home-page .author-message .right .first .bottom,
.muye-author-home-page .author-message .right .third .bottom {
  margin-top: 12px;
  margin-left: 1px;
}

.muye-author-home-page .author-message .right .first .unit,
.muye-author-home-page .author-message .right .third .unit {
  position: relative;
  top: 0;
  left: 9px;
}

.muye-author-home-page .author-message .right .first {
  margin-left: 76px;
}

.muye-author-home-page .author-message .right .second {
  margin-left: -302px;
  margin-top: 157px;
}

.muye-author-home-page .author-message .right .second .bottom {
  margin-top: 14px;
  margin-left: -2px;
}

.muye-author-home-page .author-message .right .second .unit {
  position: relative;
  top: -2px;
  left: 9px;
}

.muye-author-home-page .author-message .right .third {
  margin-left: -15px;
}

.muye-author-home-page .author-message .right .third .unit {
  left: 5px;
  top: 0;
}
</style>
