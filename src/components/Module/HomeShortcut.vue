<template>
  <div class="home-shortcut-wrapper">
    <div class="shortcut-list">
      <div
        class="shortcut-item"
        v-for="(item, index) in props.shortcuts"
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
import { useGoTo } from '@/composables/useGoTo'

const props = defineProps<{
  shortcuts: {
    title: string
    desc: string
    path: string
  }[]
}>()

const arrowRight = new URL('@/assets/icons/arrow-right/icons8-arrow-50.png', import.meta.url).href

const { goTo } = useGoTo()
</script>

<style scoped>
.home-shortcut-wrapper {
  width: 100%;
}

.shortcut-list {
  width: 1240px;
  margin: 0 auto;
  height: 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shortcut-item {
  width: 275px;
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
