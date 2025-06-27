<template>
  <div class="bg_bai">
    <Header v-if="navMenus" :menus="navMenus" />
    <Banner />
    <!-- 快捷入口 -->
    <HomeShortcut v-if="shortcutList" :shortcuts="shortcutList" />

    <div class="index_wrapper">
      <!-- 公告-活动 -->
      <Active />
    </div>
    <!-- 作家课堂 -->
    <Classroom />

    <!-- 版权改编 -->
    <Adapt />
    <!-- 更多书籍 -->
    <BookList />

    <!-- 作家有话说 -->
    <Talk />

    <!-- 底部 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Layout/Header.vue'
import Active from './components/Active.vue'
import Classroom from './components/Classroom.vue'
import Talk from './components/Talk.vue'
import Banner from '@/components/Module/Banner.vue'
import HomeShortcut from '@/components/Module/HomeShortcut.vue'
import Adapt from '@/components/Module/Adapt.vue'
import BookList from '@/components/Module//BookList.vue'
import Footer from '@/components/Layout/Footer.vue'

const navMenus = [
  { path: '/benefit', label: '作家福利' },
  { path: '/classroom', label: '作家课堂' },
  { path: '/help', label: '帮助中心' }
]

const shortcutList = [
  {
    title: '全年/半年/季度奖',
    desc: '持续更新高额现金激励',
    path: '/welfare/yearly'
  },
  {
    title: '优质加更奖',
    desc: '优质作品进阶更新分成激励',
    path: '/welfare/quality'
  },
  {
    title: '新书追更奖',
    desc: '高追更新书分成激励',
    path: '/welfare/newbook'
  }
]
</script>

<style scoped>
.bg_bai {
  background-color: #fff;
}

.index_wrapper {
  width: 1240px;
  margin: auto;
}

.ranking_news_wrapper {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
}
</style>
