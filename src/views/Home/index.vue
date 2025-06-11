<template>
	<div class="bg_bai">
		<Header />
		<Banner />
		<!-- 快捷入口 -->
		<HomeShortcut />
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
		<Food />
		
		
	</div>
</template>

<script setup lang="ts">
	import Header from '@/views/Home/components/Header.vue'
	import Banner from '@/views/Home/components/Banner.vue'
	import HomeShortcut from '@/views/Home/components/HomeShortcut.vue'
	import RankingList from '@/views/Home/components/RankingList.vue'
	import NewsList from '@/views/Home/components/NewsList.vue'
	import WriterList from '@/views/Home/components/WriterList.vue'
	import Recommend from '@/views/Home/components/Recommend.vue'
	import Sort from '@/views/Home/components/Sort.vue'
	import Adapt from '@/views/Home/components/Adapt.vue'
	import BookList from '@/views/Home/components/BookList.vue'
	import Recently from '@/views/Home/components/Recently.vue'
	import Food from '@/views/Home/components/Food.vue'
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