<template>
  <div class="home-hot-word-list">
    <div class="word-list-header">
      <div class="author-title">
        <span class="author-title-content">
          <div class="">书荒热词榜</div>
        </span>
        <span class="author-title-extra"
          ><span class="word-list-header-title-more hoverup"
            >查看全部
            <svg
              class="serial-icon serial-icon-general_arrow_circle word-list-header-title-more-icon"
              width="1em"
              height="1em"
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7071 10.359C14.3166 9.96849 13.6835 9.96849 13.2929 10.359C12.9024 10.7495 12.9024 11.3827 13.2929 11.7732L17.5356 16.0159L13.2929 20.2585C12.9024 20.649 12.9024 21.2822 13.2929 21.6727C13.6835 22.0632 14.3166 22.0632 14.7071 21.6727L19.6569 16.723C20.0474 16.3325 20.0474 15.6993 19.6569 15.3088L14.7071 10.359Z"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3ZM5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16Z"
              ></path></svg></span
        ></span>
      </div>
    </div>
    <div class="word-list-switch">
      <div class="word-list-switch-channel">
        <span :class="bill == 1 ? 'active' : ''" @click="bill = 1">脑洞榜</span>
        <span :class="bill == 2 ? 'active' : ''" @click="bill = 2">传统榜</span>
      </div>
      <div class="word-list-switch-type">
        <span :class="sex == 1 ? 'active' : ''" @click="sex = 1">男频</span>
        <span :class="sex == 2 ? 'active' : ''" @click="sex = 2">女频</span>
      </div>
    </div>
    <div class="word-list-content">
      <div class="hot-card" v-for="(item, i) in wordlist" :key="i">
        <div
          class="hot-card-rank"
          :class="
            i == 0
              ? 'hot-card-rank-gold1'
              : i == 1
                ? 'hot-card-rank-gold2'
                : i == 2
                  ? 'hot-card-rank-gold3'
                  : ''
          "
        >
          {{ item.num }}
        </div>
        <div
          class="hot-card-arrow"
          :class="item.type == 1 ? 'hot-card-arrow-up' : 'hot-card-arrow-down'"
        >
          {{ item.change }}
        </div>
        <div class="hot-card-right">
          <span class="hot-card-right-wrap">
            <span class="hot-card-right-type">
              <span class="hot-card-right-type-text">{{ item.title }}</span>
              <span class="tomato-left">
                <img src="/src/assets/icons/arrow-right/icons8-arrow-100.png" alt="" />
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const bill = ref(1)
const sex = ref(1)
const wordlist = [
  {
    num: '01',
    title: '游戏',
    type: 1,
    change: 2
  },
  {
    num: '02',
    title: '单女主',
    type: 1,
    change: 4
  },
  {
    num: '03',
    title: '末世',
    type: 2,
    change: 1
  },
  {
    num: '04',
    title: '搞笑',
    type: 2,
    change: 1
  },
  {
    num: '05',
    title: '异能',
    type: 2,
    change: 1
  },
  {
    num: '06',
    title: '搞笑',
    type: 2,
    change: 1
  },
  {
    num: '07',
    title: '异能',
    type: 2,
    change: 1
  },
  {
    num: '08',
    title: '搞笑',
    type: 2,
    change: 1
  },
  {
    num: '09',
    title: '异能',
    type: 2,
    change: 1
  },
  {
    num: '10',
    title: '末世',
    type: 2,
    change: 1
  },
  {
    num: '11',
    title: '末世',
    type: 2,
    change: 1
  },
  {
    num: '12',
    title: '末世',
    type: 2,
    change: 1
  }
]
</script>

<style scoped>
.home-hot-word-list {
  flex-shrink: 0;
  background-color: #fff;
  margin-top: 15px;
  border-radius: 10px;
  padding: 15px;
}

.home-hot-word-list .word-list-header {
  padding-bottom: 24px;
}

.author-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author-title-content {
  align-items: center;
  color: #000;
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
}

.home-hot-word-list .word-list-header-title {
  align-items: center;
  display: flex;
}

.home-hot-word-list .word-list-header-title-info {
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
}

.home-hot-word-list .word-list-header-title-more {
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

.home-hot-word-list .word-list-header-title-more-icon {
  font-size: 14px;
  margin-left: 4px;
}

.home-hot-word-list .word-list-header-time {
  color: #0000003d;
  display: block;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 8px;
}

.home-hot-word-list .word-list-header .hot-word-list-has-new {
  display: inline-block;
  position: relative;
}

.home-hot-word-list .word-list-header .hot-word-list-has-new:after {
  color: #fb4d3f;
  content: '新!';
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  position: absolute;
  right: -2px;
  top: -2px;
  transform: translateX(100%);
}

.home-hot-word-list .word-list-content {
  margin-bottom: 12px;
  width: 100%;
}

.home-hot-word-list .word-list-content .hot-card:first-of-type {
  margin-top: 21px;
}

.home-hot-word-list .word-list-content .hot-card-right-type-text {
  display: inline-block;
  max-width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.home-hot-word-list .word-list-content .hot-card-right-list {
  overflow: hidden;
  width: 370px;
}

.home-hot-word-list .word-list-content-empty {
  color: #a4a4a4;
  font-size: 14px;
  margin-top: 120px;
  text-align: center;
}

.home-hot-word-list .word-list-switch {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.home-hot-word-list .word-list-switch-type {
  background: #f5f5f5;
  border-radius: 6px;
  height: 32px;
  margin-left: 11px;
  padding: 2px;
}

.home-hot-word-list .word-list-switch-type span {
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

.home-hot-word-list .word-list-switch-type .active {
  background: #fff;
  color: #000;
  font-size: 14px;
  font-weight: 500;
}

.home-hot-word-list .word-list-switch-channel span {
  color: #0006;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  line-height: 26px;
  margin-right: 24px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
  width: 48px;
}

.home-hot-word-list .word-list-switch-channel .active {
  color: #000;
  font-weight: 500;
}

.home-hot-word-list .hot-card {
  margin-top: 38px;
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
  color: #0006;
  flex-shrink: 0;
  font-family:
    -apple-system,
    PingFang SC,
    Microsoft YaHei,
    Source Han Sans SC,
    Noto Sans CJK SC,
    WenQuanYi Micro Hei,
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  width: 20px;
}

.hot-card-rank-gold1 {
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxMyIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTUuMTQ4IDEyLjI3M2MyLjU5NCAwIDQuMTY1LTIuMjczIDQuMTY1LTUuOTA2di0uMDE1YzAtMy42MzMtMS41Ny01Ljg5OS00LjE2NS01Ljg5OUMyLjU0Ny40NTMuOTg0IDIuNzIuOTg0IDYuMzUydi4wMTVjMCAzLjYzMyAxLjU2MyA1LjkwNiA0LjE2NCA1LjkwNm0wLTEuNDUzYy0xLjUxNSAwLTIuMzk4LTEuNjk1LTIuMzk4LTQuNDUzdi0uMDE1YzAtMi43NTguODgzLTQuNDM4IDIuMzk4LTQuNDM4IDEuNTA4IDAgMi4zOTkgMS42OCAyLjM5OSA0LjQzOHYuMDE1YzAgMi43NTgtLjg5IDQuNDUzLTIuMzk5IDQuNDUzTTE0LjMyIDEyaDEuNzVWLjcyN2gtMS43NWwtMi45NjggMi4xMDl2MS43MTlsMi44MzUtMi4wMjRoLjEzM3oiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIyMC4wNTQiIHgyPSI1LjE4OCIgeTE9IjQuMDU2IiB5Mj0iLTExLjE5OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNDQjkyNEYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNFREM2ODciIHN0b3Atb3BhY2l0eT0iLjk1MiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==)
    0 no-repeat;
  color: #0000;
}

.hot-card-rank-gold2 {
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMyIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTUuMDU1IDEyLjI3M2MyLjU5MyAwIDQuMTY0LTIuMjczIDQuMTY0LTUuOTA2di0uMDE1YzAtMy42MzMtMS41Ny01Ljg5OS00LjE2NC01Ljg5OUMyLjQ1My40NTMuODkgMi43Mi44OSA2LjM1MnYuMDE1YzAgMy42MzMgMS41NjIgNS45MDYgNC4xNjQgNS45MDZtMC0xLjQ1M2MtMS41MTYgMC0yLjM5OS0xLjY5NS0yLjM5OS00LjQ1M3YtLjAxNWMwLTIuNzU4Ljg4My00LjQzOCAyLjM5OS00LjQzOCAxLjUwOCAwIDIuMzk4IDEuNjggMi4zOTggNC40Mzh2LjAxNWMwIDIuNzU4LS44OSA0LjQ1My0yLjM5OCA0LjQ1M00xMS40NjkgMTJoNy41OTR2LTEuNDkyaC01LjIxMXYtLjE1NmwyLjM5LTIuMzgzYzIuMDQ3LTIuMDMyIDIuNjQtMy4wMTYgMi42NC00LjI5N3YtLjAyNGMwLTEuODU5LTEuNTQ2LTMuMTk1LTMuNjQ4LTMuMTk1LTIuMjY1IDAtMy44NTkgMS40NTMtMy44NjcgMy41MTZsLjAxNi4wMTVoMS42NGwuMDA4LS4wMjNjMC0xLjIzNC44NDQtMi4wNjMgMi4xMS0yLjA2MyAxLjIzNCAwIDEuOTkyLjgxMyAxLjk5MiAxLjkxNXYuMDIzYzAgLjkxNC0uNDMgMS40OTItMS45MjIgMy4wNDdsLTMuNzQyIDMuOTN6Ii8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMjEuMDU0IiB4Mj0iNi4xODgiIHkxPSI0LjA1NiIgeTI9Ii0xMS4xOTgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjQ0I5MjRGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRURDNjg3IiBzdG9wLW9wYWNpdHk9Ii45NTIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=)
    0/20px no-repeat;
  color: #0000;
}

.hot-card-rank-gold3 {
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMyIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTQuODgzIDEyLjI3M2MyLjU5NCAwIDQuMTY0LTIuMjczIDQuMTY0LTUuOTA2di0uMDE1YzAtMy42MzMtMS41Ny01Ljg5OS00LjE2NC01Ljg5OUMyLjI4LjQ1My43MTkgMi43Mi43MTkgNi4zNTJ2LjAxNWMwIDMuNjMzIDEuNTYyIDUuOTA2IDQuMTY0IDUuOTA2bTAtMS40NTNjLTEuNTE2IDAtMi4zOTktMS42OTUtMi4zOTktNC40NTN2LS4wMTVjMC0yLjc1OC44ODMtNC40MzggMi4zOTktNC40MzggMS41MDggMCAyLjM5OCAxLjY4IDIuMzk4IDQuNDM4di4wMTVjMCAyLjc1OC0uODkgNC40NTMtMi4zOTggNC40NTNtMTAuMzM2IDEuMzljMi4zOSAwIDQuMDg2LTEuMzkgNC4wODYtMy4zMjd2LS4wMTZjMC0xLjU3OC0xLjExLTIuNTc4LTIuNzY2LTIuNzI2VjYuMWMxLjM3NS0uMjg4IDIuMzc1LTEuMjI2IDIuMzc1LTIuNjI0VjMuNDZjMC0xLjc0Mi0xLjQ2OS0yLjk0NS0zLjcxLTIuOTQ1LTIuMjA0IDAtMy43MDQgMS4yNTctMy44NzYgMy4xNTZsLS4wMDguMDg2aDEuNjRsLjAwOS0uMDc4Yy4xMS0xLjA2My45ODQtMS43MjcgMi4yMzQtMS43MjcgMS4yNzQgMCAyLjAwOC42NCAyLjAwOCAxLjczNXYuMDE1YzAgMS4wNDctLjg3NSAxLjgwNS0yLjE2NCAxLjgwNWgtMS4zMnYxLjM2aDEuMzc1YzEuNSAwIDIuNDIxLjcxIDIuNDIxIDEuOTg0di4wMTVjMCAxLjExLS45MyAxLjg4My0yLjMwNCAxLjg4My0xLjM5OSAwLTIuMzQ0LS43MTktMi40NTMtMS43NDJsLS4wMDgtLjA3OGgtMS42NzJsLjAwOC4wOTNjLjE0OCAxLjg2OCAxLjcxOSAzLjE4OCA0LjEyNSAzLjE4OCIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjIxLjA1NCIgeDI9IjYuMTg4IiB5MT0iNC4wNTYiIHkyPSItMTEuMTk4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0NCOTI0RiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0VEQzY4NyIgc3RvcC1vcGFjaXR5PSIuOTUyIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+)
    0/20px no-repeat;
  color: #0000;
}

.hot-card-arrow {
  color: #0006;
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

.hot-card-arrow:before {
  border: 3px solid #0000;
  border-bottom: 5px solid #0003;
  content: '';
  display: block;
  height: 0;
  left: -2px;
  position: absolute;
  top: 2px;
  width: 0;
}

.hot-card-arrow-down,
.hot-card-arrow-up {
  padding-left: 9px;
}

.hot-card-arrow-down:before {
  border-color: #0003 #0000 #0000;
  border-top-style: solid;
  border-top-width: 5px;
  top: 5px;
}

.hot-card-arrow-hold:before,
.hot-card-arrow-new:before {
  display: none;
}

.hot-card-right {
  margin-left: 20px;
}

.hot-card-right-wrap {
  display: inline-block;
  width: auto;
}

.hot-card-right-wrap:hover .hot-card-right-type {
  color: #ff5f00;
}

.hot-card-right-type {
  align-items: center;
  color: #000;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.hot-card-right-type .tomato-left {
  margin-left: 6px;
}
.hot-card-right-type .tomato-left img {
  width: 12px;
  vertical-align: 0px;
}
.hot-card-right-list {
  color: #0006;
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
  padding: 0 7px 0 0;
  position: relative;
}

.hot-card-right-list-item:first-of-type {
  padding-left: 0;
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

.hot-card-right-info {
  font-weight: 400;
}

.hot-card-right-info-title {
  color: #000;

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
</style>
