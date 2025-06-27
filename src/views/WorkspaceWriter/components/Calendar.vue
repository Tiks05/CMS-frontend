<template>
  <div class="home-book-container">
    <div class="serial-card serial-card-normal home-book-expand">
      <div class="home-book-header">
        <span
          class="header-tab header-tab_right"
          :class="type == 1 ? 'active' : ''"
          @click="type = 1"
          >打卡日历</span
        >
        <span
          class="header-tab header-tab_right"
          :class="type == 2 ? 'active' : ''"
          @click="type = 2"
          >签到日历</span
        >
        <div class="header-label header-label_left">
          <span class="write-button">
            <div class="hoverup">规则</div>
          </span>
        </div>
      </div>

      <div class="chose_time">
        <el-date-picker
          v-model="value5"
          format="YYYY年MM月"
          value-format="YYYY-MM"
          type="month"
          :clearable="false"
          :editable="false"
          @change="MonthChange"
        />

        <div class="down_btn">
          <span>Tikers的新书</span>
          <img src="@/assets/images/workspace/writer/x.png" alt="" />

          <div class="down_link">
            <em>Tikers的新书</em>
          </div>
        </div>
      </div>
      <div class="calendar_con">
        <el-calendar v-model="value" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const type = ref(1)

const value = ref(new Date())

const getCurrentYearMonth = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${year}年${month}月`
}
const MonthChange = (e: any) => {
  value.value = e
}

const value5 = ref(getCurrentYearMonth())
const booklist = [
  {
    title: 'Tikers的新书',
    pic: '/src/assets/images/book7.png',
    now: '第1章 旧信封',
    chapter: 1,
    words: 1589
  }
]
</script>

<style scoped>
.home-book-container {
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
}

.home-book-header {
  width: 100%;
  font-size: 16px;
  height: 32px;
  line-height: 32px;
}

.home-book-header .header-tab {
  color: #0006;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  line-height: 32px;
  margin: 0 14px;
  position: relative;
}

.home-book-header .header-tab.active {
  color: #000;
  font-weight: 500;
}

.home-book-header .header-tab:first-of-type {
  margin-left: 0;
}

.home-book-header .header-tab-new {
  background: #ff5f00;
  border-radius: 12px 14px 14px 0;
  color: #fff;
  display: inline-block;
  font-size: 18px;
  font-weight: 500;
  height: 27px;
  line-height: 27px;
  position: absolute;
  right: -42px;
  text-align: center;
  top: -15px;
  transform: scale(0.66);
  transform-origin: 100% 0;
  width: 63px;
}

.home-book-header .header-tab_right {
  position: relative;
}

.home-book-header .header-label {
  float: right;
  font-size: 14px;
  margin-left: 40px;
  cursor: pointer;
  color: #999;
}

.home-book-header .header-label-icon {
  float: right;
  font-size: 12px;
  margin-left: 4px;
}

.home-book-header .header-label_right {
  border: none;
  position: relative;
}

.home-book-header .header-label_right:after {
  border-radius: 0;
  border-right: 1px solid #0000003d;
  box-sizing: border-box;
  content: '';
  height: 10px;
  left: -20px;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 11px;
  transform-origin: 100% 0;
  width: 1px;
}

.chose_time {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<style>
.chose_time .el-input {
  width: 150px !important;
}
.chose_time .down_btn {
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

.chose_time .down_btn img {
  width: 12px;
  position: absolute;
  right: 0;
  top: 12px;
  margin-left: 4px;
  transition: transform 0.3s ease;
}

.chose_time .down_btn:hover img {
  transform: rotate(180deg);
}

.chose_time .down_btn .down_link {
  position: absolute;
  z-index: 99;
  width: 100%;
  padding-top: 5px;
  display: none;
  top: 100%;
  left: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.08);
}

.chose_time .down_btn .down_link em {
  display: block;
  font-style: normal;
  height: 36px;
  background-color: #fff;
  text-align: center;
  line-height: 36px;
}

.chose_time .down_btn .down_link em:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.chose_time .down_btn:hover .down_link {
  display: block;
}

.calendar_con .el-calendar__header {
  display: none !important;
}

.calendar_con .el-calendar-table td {
  border: none !important;
}

.calendar_con .el-calendar-table .el-calendar-day {
  height: 44px;
  text-align: center;
}
</style>
