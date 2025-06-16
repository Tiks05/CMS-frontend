<template>
	<div class="news_wrapper">
		<div class="news_tit">
			<h2>最新资讯</h2>
		</div>
		<div class="list">
			<div class="item" v-for="(item, i) in newslist" :key="i" @click="goTo(item.path)">
				<p>{{item.title}}</p>
				<span></span>
			</div>
			<div class="more">
				更多
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchNewsList } from '@/apis/home'
import { useGoTo } from '@/composables/useGoTo'

const newslist = ref<any[]>([])
const { goTo } = useGoTo()

onMounted(async () => {
	const limit = 8
  const res = await fetchNewsList({ limit })
  newslist.value = res.data
})
</script>

<style scoped>
	.news_wrapper {
		width: 275px;
	}

	.news_tit h2 {
		font-size: 24px;
		font-weight: 500;
		color: #000;
		position: relative;
		display: inline-block;
		padding-right: 35px;
		line-height: 1;
	}

	.news_tit h2:after {
		content: "";
		display: block;
		right: 0;
		top: 50%;
		transform: translateY(-60%);
		position: absolute;
		width: 31px;
		height: 32px;
		background-image: url('@/assets/images/home/news-list/tit-1.png');
		background-size: 100% 100%;
	}

	.list .item {
		position: relative;
		margin-top: 35px;
		cursor: pointer;
	}

	.list .item p {
		word-wrap: normal;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 250px;
		transition: .6s;
		font-size: 14px;
		line-height: 20px;
		color: #333;
	}

	.list .item:hover p {
		color: #ff8140;
		transition: .3s;
	}

	.list .item span {
		display: block;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(0, -50%);
		background-image: url('@/assets/icons/arrow-right/icons8-arrow-100.png');
		width: 12px;
		height: 12px;
		background-size: cover;
		margin-left: 80px;
		transition: .3s;
	}

	.list .item:hover span {
		background-image: url('@/assets/icons/arrow-right/icons9-arrow-100.png');
		transform: translate(3px, -50%);
		transition: .3s;
	}

	.more {
		margin-top: 40px;
		display: inline-block;
		background-image: url('@/assets/icons/arrow-right/icons8-arrow-100.png');
		background-size: 12px auto;
		background-repeat: no-repeat;
		background-position: right center;
		font-size: 14px;
		color: #333;
		opacity: 0.6;
		padding-right: 16px;
		cursor: pointer;
		transition: .3s;
	}

	.more:hover {
		background-image: url('@/assets/icons/arrow-right/icons9-arrow-100.png');
		color: #ff8140;opacity: 1;
		transition: .3s;
	}
</style>