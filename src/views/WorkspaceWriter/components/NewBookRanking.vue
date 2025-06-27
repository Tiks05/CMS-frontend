<template>
  <div class="home-activity">
    <div class="serial-card">
      <div class="home-activity-title">
        <h4>
          原创新书榜<em>统计时间：{{ yesterdayDate }} 24:00</em>
        </h4>
        <span class="author-title-extra">
          <span class="home-activity-title-more"
            >查看全部
            <!-- icon 省略不动 -->
          </span>
        </span>
      </div>

      <!-- 分类与频道切换 -->
      <div class="word-list-switch">
        <div class="down_btn">
          <span>{{ activeCategory }}</span>
          <img src="@/assets/images/workspace/writer/x.png" alt="" />
          <div class="down_link">
            <em v-for="(cat, i) in categoryList" :key="i" @click="activeCategory = cat">{{
              cat
            }}</em>
          </div>
        </div>
        <div class="word-list-switch-type">
          <span :class="{ active: readerType === '男生' }" @click="readerType = '男生'">男频</span>
          <span :class="{ active: readerType === '女生' }" @click="readerType = '女生'">女频</span>
        </div>
      </div>

      <!-- 榜单内容 -->
      <div class="home-new-book-list">
        <div class="hot-card" v-for="(item, i) in currentList" :key="i" @click="goTo(item.path)">
          <div
            class="hot-card-rank"
            :class="
              i === 0
                ? 'hot-card-rank-gold1'
                : i === 1
                  ? 'hot-card-rank-gold2'
                  : i === 2
                    ? 'hot-card-rank-gold3'
                    : ''
            "
          >
            {{ String(item.num).padStart(2, '0') }}
          </div>
          <div class="hot-card-right hot-card-right-book">
            <div class="hot-card-right-cover">
              <img :src="item.pic" alt="" />
            </div>
            <div class="hot-card-right-info">
              <div class="hot-card-right-info-title">{{ item.title }}</div>
              <div class="hot-card-right-info-desc">{{ item.author }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getBookRank } from '@/apis/workspace'
import { useGoTo } from '@/composables/useGoTo'

const { goTo } = useGoTo()

interface SortItem {
  num: number
  title: string
  path: string
  pic: string
  author: string
  desc: string
}
interface SortResponse {
  plot_type: string
  child: SortItem[]
}

const readerType = ref<'男生' | '女生'>('男生')
const categoryList = ['西方奇幻', '东方仙侠']
const activeCategory = ref(categoryList[0])

// 所有榜单缓存
const allRankMap = ref<Record<string, SortItem[]>>({})

// 计算当前展示榜单
const currentList = computed(() => {
  const key = `${readerType.value}-${activeCategory.value}`
  return allRankMap.value[key] || []
})

// 一次性加载所有榜单
const fetchAllRanks = async () => {
  for (const gender of ['男生', '女生']) {
    for (const category of categoryList) {
      const res = await getBookRank(gender as '男生' | '女生', category)
      allRankMap.value[`${gender}-${category}`] = res.data.child
    }
  }
}

const yesterdayDate = computed(() => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  return `${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`
})

onMounted(fetchAllRanks)
</script>

<style scoped>
.home-activity {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
}

.home-activity-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 12px;
}

.home-activity-title h4 {
  font-size: 20px;
  font-weight: normal;
}

.home-activity-title h4 em {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 6px;
  font-style: normal;
}

.home-activity-title-more {
  align-items: center;
  color: #0006;
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  justify-content: flex-end;
  line-height: 20px;
}

.word-list-switch {
  display: flex;
  margin-top: 12px;
  justify-content: space-between;
  align-items: center;
}

.word-list-switch-type {
  background: #f5f5f5;
  border-radius: 6px;
  height: 32px;
  width: 108px;
  margin-left: 11px;
  padding: 2px;
}

.word-list-switch-type span {
  border-radius: 4px;
  color: #0006;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 52px;
}

.word-list-switch-type .active {
  background: #fff;
  color: #000;
  font-size: 14px;
  font-weight: 500;
}

.down_btn {
  width: 100px;
  margin-left: 18px;
  height: 36px;
  border-radius: 50px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding-right: 14px;
  position: relative;
  line-height: 36px;
}

.down_btn img {
  width: 12px;
  position: absolute;
  right: 0;
  top: 12px;
  margin-left: 4px;
  transition: transform 0.3s ease;
}

.down_btn:hover img {
  transform: rotate(180deg);
}

.down_btn .down_link {
  position: absolute;
  z-index: 99;
  width: 100%;
  padding-top: 5px;
  display: none;
  top: 100%;
  left: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.08);
}

.down_btn .down_link em {
  display: block;
  font-style: normal;
  height: 36px;
  background-color: #fff;
  text-align: center;
  line-height: 36px;
}

.down_btn .down_link em:hover {
  background-color: #f1f1f1;
}

.down_btn:hover .down_link {
  display: block;
}

.hot-card {
  margin-top: 21px;
  width: 100%;
}

.hot-card,
.hot-card-rank {
  align-items: center;
  display: flex;
}

.hot-card-rank {
  color: rgba(0, 0, 0, 0.4);
  flex-shrink: 0;
  font-family:
    -apple-system, 'PingFang SC', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC',
    'WenQuanYi Micro Hei', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  width: 20px;
}

.hot-card-rank-gold1 {
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxMyIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTUuMTQ4IDEyLjI3M2MyLjU5NCAwIDQuMTY1LTIuMjczIDQuMTY1LTUuOTA2di0uMDE1YzAtMy42MzMtMS41Ny01Ljg5OS00LjE2NS01Ljg5OUMyLjU0Ny40NTMuOTg0IDIuNzIuOTg0IDYuMzUydi4wMTVjMCAzLjYzMyAxLjU2MyA1LjkwNiA0LjE2NCA1LjkwNm0wLTEuNDUzYy0xLjUxNSAwLTIuMzk4LTEuNjk1LTIuMzk4LTQuNDUzdi0uMDE1YzAtMi43NTguODgzLTQuNDM4IDIuMzk4LTQuNDM4IDEuNTA4IDAgMi4zOTkgMS42OCAyLjM5OSA0LjQzOHYuMDE1YzAgMi43NTgtLjg5IDQuNDUzLTIuMzk5IDQuNDUzTTE0LjMyIDEyaDEuNzVWLjcyN2gtMS43NWwtMi45NjggMi4xMDl2MS43MTlsMi44MzUtMi4wMjRoLjEzM3oiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIyMC4wNTQiIHgyPSI1LjE4OCIgeTE9IjQuMDU2IiB5Mj0iLTExLjE5OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNDQjkyNEYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNFREM2ODciIHN0b3Atb3BhY2l0eT0iLjk1MiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==')
    0px center no-repeat;
  color: rgba(0, 0, 0, 0);
}

.hot-card-rank-gold2 {
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMyIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTUuMDU1IDEyLjI3M2MyLjU5MyAwIDQuMTY0LTIuMjczIDQuMTY0LTUuOTA2di0uMDE1YzAtMy42MzMtMS41Ny01Ljg5OS00LjE2NC01Ljg5OUMyLjQ1My40NTMuODkgMi43Mi44OSA2LjM1MnYuMDE1YzAgMy42MzMgMS41NjIgNS45MDYgNC4xNjQgNS45MDZtMC0xLjQ1M2MtMS41MTYgMC0yLjM5OS0xLjY5NS0yLjM5OS00LjQ1M3YtLjAxNWMwLTIuNzU4Ljg4My00LjQzOCAyLjM5OS00LjQzOCAxLjUwOCAwIDIuMzk4IDEuNjggMi4zOTggNC40Mzh2LjAxNWMwIDIuNzU4LS44OSA0LjQ1My0yLjM5OCA0LjQ1M00xMS40NjkgMTJoNy41OTR2LTEuNDkyaC01LjIxMXYtLjE1NmwyLjM5LTIuMzgzYzIuMDQ3LTIuMDMyIDIuNjQtMy4wMTYgMi42NC00LjI5N3YtLjAyNGMwLTEuODU5LTEuNTQ2LTMuMTk1LTMuNjQ4LTMuMTk1LTIuMjY1IDAtMy44NTkgMS40NTMtMy44NjcgMy41MTZsLjAxNi4wMTVoMS42NGwuMDA4LS4wMjNjMC0xLjIzNC44NDQtMi4wNjMgMi4xMS0yLjA2MyAxLjIzNCAwIDEuOTkyLjgxMyAxLjk5MiAxLjkxNXYuMDIzYzAgLjkxNC0uNDMgMS40OTItMS45MjIgMy4wNDdsLTMuNzQyIDMuOTN6Ii8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMjEuMDU0IiB4Mj0iNi4xODgiIHkxPSI0LjA1NiIgeTI9Ii0xMS4xOTgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjQ0I5MjRGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRURDNjg3IiBzdG9wLW9wYWNpdHk9Ii45NTIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=')
    0px center / 20px no-repeat;
  color: rgba(0, 0, 0, 0);
}

.hot-card-rank-gold3 {
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMyIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTQuODgzIDEyLjI3M2MyLjU5NCAwIDQuMTY0LTIuMjczIDQuMTY0LTUuOTA2di0uMDE1YzAtMy42MzMtMS41Ny01Ljg5OS00LjE2NC01Ljg5OUMyLjI4LjQ1My43MTkgMi43Mi43MTkgNi4zNTJ2LjAxNWMwIDMuNjMzIDEuNTYyIDUuOTA2IDQuMTY0IDUuOTA2bTAtMS40NTNjLTEuNTE2IDAtMi4zOTktMS42OTUtMi4zOTktNC40NTN2LS4wMTVjMC0yLjc1OC44ODMtNC40MzggMi4zOTktNC40MzggMS41MDggMCAyLjM5OCAxLjY4IDIuMzk4IDQuNDM4di4wMTVjMCAyLjc1OC0uODkgNC40NTMtMi4zOTggNC40NTNtMTAuMzM2IDEuMzljMi4zOSAwIDQuMDg2LTEuMzkgNC4wODYtMy4zMjd2LS4wMTZjMC0xLjU3OC0xLjExLTIuNTc4LTIuNzY2LTIuNzI2VjYuMWMxLjM3NS0uMjg4IDIuMzc1LTEuMjI2IDIuMzc1LTIuNjI0VjMuNDZjMC0xLjc0Mi0xLjQ2OS0yLjk0NS0zLjcxLTIuOTQ1LTIuMjA0IDAtMy43MDQgMS4yNTctMy44NzYgMy4xNTZsLS4wMDguMDg2aDEuNjRsLjAwOS0uMDc4Yy4xMS0xLjA2My45ODQtMS43MjcgMi4yMzQtMS43MjcgMS4yNzQgMCAyLjAwOC42NCAyLjAwOCAxLjczNXYuMDE1YzAgMS4wNDctLjg3NSAxLjgwNS0yLjE2NCAxLjgwNWgtMS4zMnYxLjM2aDEuMzc1YzEuNSAwIDIuNDIxLjcxIDIuNDIxIDEuOTg0di4wMTVjMCAxLjExLS45MyAxLjg4My0yLjMwNCAxLjg4My0xLjM5OSAwLTIuMzQ0LS43MTktMi40NTMtMS43NDJsLS4wMDgtLjA3OGgtMS42NzJsLjAwOC4wOTNjLjE0OCAxLjg2OCAxLjcxOSAzLjE4OCA0LjEyNSAzLjE4OCIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjIxLjA1NCIgeDI9IjYuMTg4IiB5MT0iNC4wNTYiIHkyPSItMTEuMTk4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0NCOTI0RiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0VEQzY4NyIgc3RvcC1vcGFjaXR5PSIuOTUyIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+')
    0px center / 20px no-repeat;
  color: rgba(0, 0, 0, 0);
}

.hot-card-arrow {
  color: rgba(0, 0, 0, 0.4);
  display: inline-block;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  margin-left: 8px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: 15px;
}

.hot-card-arrow::before {
  border-width: 3px 3px 5px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0.2);
  border-image: initial;
  content: '';
  display: block;
  height: 0px;
  left: -2px;
  position: absolute;
  top: 2px;
  width: 0px;
}

.hot-card-arrow-down,
.hot-card-arrow-up {
  padding-left: 9px;
}

.hot-card-arrow-down::before {
  border-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  border-top-style: solid;
  border-top-width: 5px;
  top: 5px;
}

.hot-card-right {
  margin-left: 20px;
}

.hot-card-right-wrap {
  display: inline-block;
  width: auto;
}

.hot-card-right-wrap:hover .hot-card-right-type {
  color: rgb(255, 95, 0);
}

.hot-card-right-type {
  align-items: center;
  color: rgb(0, 0, 0);
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.hot-card-right-type .tomato-left {
  font-size: 14px;
  margin-left: 2px;
  transform: rotate(180deg);
}

.hot-card-right-list {
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  font-weight: 400;
  height: 22px;
  line-height: 22px;
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot-card-right-list-item {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  padding: 0px 7px 0px 0px;
  position: relative;
}

.hot-card-right-list-item:first-of-type {
  padding-left: 0px;
}

.hot-card-right-list-item-divider {
  font-size: 12px;
  margin-left: 7px;
  vertical-align: 1px;
}

.hot-card-right-list-item:last-child .hot-card-right-list-item-divider {
  display: none;
}

.hot-card-right-book {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
}

.hot-card-right-cover {
  border-radius: 4px;
  height: 56px;
  margin-right: 16px;
  overflow: hidden;
  width: 42px;
}
.hot-card-right-cover img {
  width: 42px;
  height: 56px;
  vertical-align: middle;
  transition: transform 0.3s;
}

.hot-card-right-cover:hover img {
  transform: scale(1.2);
}

.hot-card-right-info {
  font-weight: 400;
}

.hot-card-right-info-title {
  color: rgb(0, 0, 0);
  font-family:
    DNMrHsV173Pd4pgy,
    -apple-system,
    'PingFang SC',
    'Microsoft YaHei',
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
}

.hot-card-right-info-desc,
.hot-card-right-info-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 243px;
}

.hot-card-right-info-desc {
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  line-height: 22px;
}
</style>
