<template>
	<div class="bg_bai">
		<Header v-if="navMenus" :menus="navMenus" />
		<Banner />
		<!-- 快捷入口 -->
		<HomeShortcut v-if="shortcutList" :shortcuts="shortcutList" />
		<div class="index_wrapper">
			<!-- 排行榜 + 资讯 -->
			<div class="ranking_news_wrapper">
				<RankingList />
				<NewsList />
			</div>
			<!-- 作家 -->
			<WriterList />
		</div>
		<!-- 精选 -->
		<Recommend />
		<!-- 排行榜 -->
		<Sort />
		<!-- 版权改编 -->
		<Adapt />
		<!-- 更多书籍 -->
		<BookList />
		<!-- 最新更新 -->
		<Recently />
		<!-- 底部 -->
		<Footer />
	</div>
</template>

<script setup lang="ts">
import Header from '@/components/Layout/Header.vue'
import Banner from '@/components/Module/Banner.vue'
import HomeShortcut from '@/components/Module/HomeShortcut.vue'
import RankingList from '@/views/Home/components/RankingList.vue'
import NewsList from '@/views/Home/components/NewsList.vue'
import WriterList from '@/views/Home/components/WriterList.vue'
import Recommend from '@/views/Home/components/Recommend.vue'
import Sort from '@/views/Home/components/Sort.vue'
import Adapt from '@/components/Module/Adapt.vue'
import BookList from '@/components/Module/BookList.vue'
import Recently from '@/views/Home/components/Recently.vue'
import Footer from '@/components/Layout/Footer.vue'

const navMenus = [
	{ path: '/home', label: '首页' },
	{ path: '/library', label: '书库' },
	{ path: '/bookshelf', label: '书架' },
	{ path: '/writer', label: '作家专区' },
	{ path: '/copyright', label: '版权专区' }
]

const shortcutList = [
  { 
		title: '作家福利', 
		desc: '番茄作家福利区', 
		path: '/benefit' 
	},
  { 
		title: '作家专区', 
		desc: '创建作品、查看作品数据及收益', 
		path: '/writer' 
	},
  { 
		title: '版权专区', 
		desc: '优秀版权作品展示', 
		path: '/copyright' 
	}
]
</script>

<style scoped>
.bg_bai {
	background-color: #fff;
	overflow-x: hidden;
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