<template>
  <div class="home-page">

    <!-- Header 改成绝对定位 -->
    <div class="header-wrapper">
      <Header />
    </div>

    <!-- 全屏 Banner -->
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
.home-page {
  width: 100%;
  position: relative;
}

/* Header绝对定位盖在Banner上面 */
.header-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 20px 0;
}

/* 内容区域居中 */
.content-wrapper {
  width: 1300px;
  margin: auto;
  padding: 0 20px;
}
</style>
