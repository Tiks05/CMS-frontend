<template>
	<div class="recommend_wrapper">
		<div class="list list_one">
			<div class="wrapper">
				<h2>男频精选</h2>

				<div class="book_list">
					<div class="item" v-for="(item, i) in malelist" :key="i" @click="goTo(item.path)">
						<div class="pic">
							<img :src="item.pic" alt="">
						</div>
						<div class="text">
							<h3 class="name">{{item.title}}</h3>
							<div class="author">{{item.desc}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="pic1">
				<img src="@/assets/images/home/recommend/recommend-1.png" alt="" />
			</div>
			<div class="pic2">
				<img src="@/assets/images/home/recommend/recommend-2.png" alt="" />
			</div>
		</div>
		<div class="list list_two" :class="isOpen?'list_two_open':''">
			<div class="wrapper">
				<h2>女频精选</h2>

				<div class="book_list">
					<div class="item" v-for="(item, i) in femalelist" :key="i" @click="goTo(item.path)">
						<div class="pic">
							<img :src="item.pic" alt="">
						</div>
						<div class="text">
							<h3 class="name">{{item.title}}</h3>
							<div class="author">{{item.desc}}</div>
						</div>
					</div>
				</div>

			</div>


			<div class="pic3">
				<img src="@/assets/images/home/recommend/recommend-3.png" alt="" />
			</div>
			<div class="pic4">
				<img src="@/assets/images/home/recommend/recommend-4.png" alt="" />
			</div>
			<div class="line"></div>

			<div class="butt" :class="isOpen?'rotate':''" @click="Open">
				<img src="@/assets/icons/arrow-right/icons8-arrow-100.png" alt="">
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGoTo } from '@/composables/useGoTo'
import { getRecommendBooks } from '@/apis/home'

interface BookItem {
  id: number;
  title: string;
  desc: string;
  cover_url: string;
  author_nickname: string;
  path: string;      // 新增：后端已返回完整 path
  pic?: string;      // 额外字段，用于兼容模板
}

// 接口返回结构
interface RecommendResponse {
  male: BookItem[];
  female: BookItem[];
}

const malelist = ref<BookItem[]>([])
const femalelist = ref<BookItem[]>([])

const { goTo } = useGoTo()
const isOpen = ref(false)
const Open = () => { isOpen.value = !isOpen.value }

const fetchData = async () => {
  const res = await getRecommendBooks()
  const data = res.data as RecommendResponse

  malelist.value = data.male.map(item => ({
    ...item,
    pic: item.cover_url,
    desc: item.author_nickname
  }))

  femalelist.value = data.female.map(item => ({
    ...item,
    pic: item.cover_url,
    desc: item.author_nickname
  }))
}

onMounted(() => { fetchData() })
</script>

<style scoped>
	.recommend_wrapper {
			width: 1920px;
	    position: relative;
	    margin: 20px auto;
	}

	.recommend_wrapper .list {
		padding-top: 78px;
		padding-bottom: 110px;
		position: relative;
	}

	.recommend_wrapper .list_one {
		background-color: #fffcf3;
		width: 100%;
	}

	.recommend_wrapper .list h2 {
		font-weight: 500;
		font-size: 28px;
		line-height: 39px;
		text-align: center;
		color: #382802;
	}

	.recommend_wrapper .list_two h2 {
		color: #772431;
	}

	.recommend_wrapper .pic1 {
		width: 173px;
		height: 136px;
		position: absolute;
		left: 0;
		top: 0;
	}

	.recommend_wrapper img {
		width: 100%;
	}

	.recommend_wrapper .pic2 {
		left: 0;
		bottom: 0;
		width: 301px;
		height: 55px;
		position: absolute;
	}

	.recommend_wrapper .pic3 {
		right: 0;
		top: 0;
		width: 160px;
		height: 125px;
		position: absolute;
	}

	.recommend_wrapper .pic4 {
		right: 0;
		bottom: 0;
		width: 195px;
		height: 140px;
		position: absolute;
	}

	.recommend_wrapper .list_one .wrapper {
		padding-left: 350px;
		width: 1405px;
	}

	.recommend_wrapper .book_list {
		overflow: hidden;
		margin-top: 70px;
		width: 1055px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 77px;
	}

	.recommend_wrapper .book_list .item {
		cursor: pointer;
		float: left;
		width: 130px;
	}

	.recommend_wrapper .book_list .pic {
		width: 130px;
		height: 180px;
		overflow: hidden;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
	}

	.recommend_wrapper .book_list .pic img {
		width: 130px;
		height: 180px;

		transition: .3s;
	}

	.recommend_wrapper .book_list .item:hover .pic img {
		transform: scale(1.1);
		transition: .3s;
	}

	.recommend_wrapper .book_list .name {
		margin-top: 16px;
		white-space: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 25px;
		color: #382802;
		height: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		line-clamp: 2;
	}

	.recommend_wrapper .book_list .item:hover .name {
		color: #ff5f00;
	}

	.recommend_wrapper .book_list .author {
		margin-top: 4px;
		font-weight: 400;
		opacity: 0.6;
		font-size: 14px;
		line-height: 22px;
		color: #999;
	}

	.recommend_wrapper .list_two .wrapper {
		padding-left: 35px;
		padding-right: 340px;
		width: 100%;
		overflow: hidden;
	}

	.recommend_wrapper .list_two .book_list {
		margin-left: -850px;
		transition: .3s;
	}

	.recommend_wrapper .list_two {
		background-color: #fff5f5;
		position: absolute;
		left: 1385px;
		padding-left: 20px;
		right: 0;
		top: 0;
		transition: .6s;
	}

	.recommend_wrapper .list_two.list_two_open {
		left: 505px;
		transition: .6s;
	}

	.recommend_wrapper .list_two .book_list {
		transition: .6s;
	}

	.recommend_wrapper .list_two.list_two_open .book_list {
		margin-left: 0;
		transition: .6s;
	}



	.recommend_wrapper .list_two .butt {
		width: 44px;
		position: absolute;
		height: 44px;
		bottom: 50px;
		left: 0;
		cursor: pointer;
		transform: translateX(-30%);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		border-radius: 50%;
		box-shadow: 0 0 8px rgba(0, 0, 0, .3);
		transition: .3s;
	}

	.recommend_wrapper .list_two .butt:hover {
		transform: translateX(-45%);
		transition: .3s;
	}

	.recommend_wrapper .list_two .butt img {
		width: 14px;
		vertical-align: middle;
	}

	.recommend_wrapper .list_two .butt.rotate {
		transform: rotate(180deg);
		transition: .6s;
	}


	.recommend_wrapper .line {
		left: 0;
		width: 10px;
		position: absolute;
		top: 0;
		background-color: #fff;
		height: 100%;
	}
</style>