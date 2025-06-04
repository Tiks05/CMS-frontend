<template>
  <div class="home-shortcut-wrapper">
    <div class="shortcut-list">
      <div
        class="shortcut-item"
        v-for="(item, index) in shortcuts"
        :key="index"
        @click="goTo(item.path)"
      >
        <div class="left">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
        <div class="right">
          <img :src="arrowRight" alt="arrow" class="arrow-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoTo } from '@/composables/useGoTo'

const arrowRight = new URL('@/assets/icons/arrow-right/icons8-arrow-50.png', import.meta.url).href

const { goTo } = useGoTo()

const shortcuts = [
  { title: '作家福利', desc: '番茄作家福利区', path: '/benefit' },
  { title: '作家专区', desc: '创建作品、查看作品数据及收益', path: '/author' },
  { title: '版权专区', desc: '优秀版权作品展示', path: '/copyright' }
]
</script>

<style scoped>
.home-shortcut-wrapper {
  width: 1300px;
  height: 88px;
  margin: auto;
  padding: 0 20px;
}

.shortcut-list {
  display: flex;
  gap: 200px;
}

.shortcut-item {
  flex: 1;
  padding: 21px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.title {
  font-size: 15px;
  margin-bottom: 5px;
  color: #333;
}

.shortcut-item:hover .title {
  color: #ff8140;
}

.desc {
  font-size: 14px;
  color: #999;
}

.right {
  color: #999;
  font-size: 20px;
}

.arrow-icon {
  width: 16px;
  height: 16px;
}
</style>
