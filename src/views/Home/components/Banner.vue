<template>
  <div class="banner-wrapper">
    <div
      v-for="(img, index) in images"
      :key="index"
      :class="['banner-img', { active: currentIndex === index }]"
      :style="{ backgroundImage: `url(${img})` }"
    ></div>

    <!-- 自定义扁条指示器 -->
    <div class="custom-indicator">
      <span
        v-for="(_, i) in images"
        :key="i"
        :class="['dot', { active: currentIndex === i }]"
        @click="switchTo(i)"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const images = [
  new URL('@/assets/images/HomeBKG1.jpg', import.meta.url).href,
  new URL('@/assets/images/HomeBKG2.jpg', import.meta.url).href,
  new URL('@/assets/images/HomeBKG3.jpg', import.meta.url).href,
  new URL('@/assets/images/HomeBKG4.jpg', import.meta.url).href
]

const currentIndex = ref(0)
let timer: number | null = null

const startLoop = () => {
  timer = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 5000)
}

const switchTo = (i: number) => {
  currentIndex.value = i
}

onMounted(() => {
  startLoop()
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.banner-wrapper {
  position: relative;
  width: 100vw;
  height: 380px;
  overflow: hidden;
}

.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 380px;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: 0;
}

.banner-img.active {
  opacity: 1;
  z-index: 1;
}

/* ✅ 提示：指示器始终浮在最上面 */
.custom-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10; /* ✅ 保证高于图片 */
  pointer-events: auto; /* ✅ 确保能点到 */
}

.dot {
  width: 30px;
  height: 2px;
  background-color: #ffffff;
  opacity: 0.6;
  border-radius: 2px;
  transition: all 0.3s;
  cursor: pointer;
}

.dot.active {
  background-color: #ff5722;
  opacity: 1;
}
</style>
