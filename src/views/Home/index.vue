<template>
  <div>
    <Header />
    <Banner />
    <!-- 内容区 -->
    <div class="content-wrapper">
      <HomeShortcut />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/Home/components/Header.vue'
import Banner from '@/views/Home/components/Banner.vue'
import HomeShortcut from '@/views/Home/components/HomeShortcut.vue'
</script>

<style scoped>
/* 内容区域居中 */
.content-wrapper {
  width: 1240px;
  margin: auto;
}
</style>
