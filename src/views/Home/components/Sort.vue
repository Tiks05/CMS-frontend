<template>
	<div class="bg_hui">
		<div class="sort_wrapper">
			<div class="chose_tit">
				<span :class="{ on: readerType === '男生' }" @click="switchReader('男生')">男频排行榜</span>
  			<span :class="{ on: readerType === '女生' }" @click="switchReader('女生')">女频排行榜</span>
			</div>
			<div class="type_list">
				<span v-for="(item, index) in sortlist" :key="index" class="custom-pagination-bullet"
					:class="{ 'on': activeIndex === index }" @click="goToSlide(index)">{{item.plot_type}}</span>
			</div>

			<div class="sort_swiper">
				<swiper :modules="[Navigation,Pagination,Autoplay]" :loop="true" :autoplay="{delay: 3000000}"
					@swiper="onSwiper" @slide-change="onSlideChange">
					<swiper-slide class="slide" v-for="(item, i) in sortlist" :key="i">
						<div class="item">
							<div class="title">
								<h3>{{item.plot_type}}·阅读榜</h3>
								<p>仅展示原创作品，统计时间截止至{{ yesterdayDate }} 24:00</p>
							</div>

							<div class="p" v-for="(slide, j) in item.child" :key="j" @click="goTo(slide.path)"
								:class="item1index==j?'on':''" @mouseover="MouseOne(j)">
								<div class="text">
									<h4><em
											:class="j==0?'em0':j==1?'em1':j==2?'em2':''">{{slide.num}}</em>{{slide.title}}
									</h4>
									<span>{{slide.author}}</span>
									<p>{{slide.desc}}</p>
								</div>
								<div class="pic">
									<img :src="slide.pic" alt="">
								</div>
							</div>
						</div>

						<div class="item item_new">
							<div class="title">
								<h3>{{item.plot_type}}·新书榜</h3>
								<p>仅展示原创作品，统计时间截止至{{ yesterdayDate }} 24:00</p>
							</div>

							<div class="p" v-for="(slide, j) in item.new_child" :key="j" @click="goTo(slide.path)"
								:class="item2index==j?'on':''" @mouseover="MouseTwo(j)">
								<div class="text">
									<h4><em
											:class="j==0?'em0':j==1?'em1':j==2?'em2':''">{{slide.num}}</em>{{slide.title}}
									</h4>
									<span>{{slide.author}}</span>
									<p>{{slide.desc}}</p>
								</div>
								<div class="pic">
									<img :src="slide.pic" alt="">
								</div>
							</div>

						</div>

					</swiper-slide>
				</swiper>

				<div class="swiper-button-prev" :class="{ 'swiper_disabled': isBeginning }" @click="slidePrev"></div>

				<div class="swiper-button-next" :class="{ 'swiper_disabled': isEnd }" @click="slideNext"></div>

			</div>

		</div>

	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchRankingList } from '@/apis/home'
import { useGoTo } from '@/composables/useGoTo'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

interface SortItem {
	num: number;
	title: string;
	desc: string;
	path: string;
	pic: string;
	author: string;
}

interface SortResponse {
  plot_type: string;
  child: SortItem[];
  new_child: SortItem[];
}

const swiperInstance = ref<any>(null)
const isBeginning = ref(true)
const isEnd = ref(false)
const item1index = ref(0)
const item2index = ref(0)
const activeIndex = ref(0)

const readerType = ref<'男生' | '女生'>('男生')
const categoryList = ['西方奇幻', '东方仙侠']
const sortlist = ref<any[]>([])
const yesterdayDate = computed(() => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');
  return `${month}-${day}`;
});

const { goTo } = useGoTo()

const MouseOne = (num: number) => item1index.value = num
const MouseTwo = (num: number) => item2index.value = num

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

const onSlideChange = () => {
  if (swiperInstance.value) {
    isBeginning.value = swiperInstance.value.isBeginning
    isEnd.value = swiperInstance.value.isEnd
    activeIndex.value = swiperInstance.value.activeIndex
  }
}

// 请求所有榜单数据（多次请求）
const fetchAllCategories = async () => {
  const result: SortResponse[] = []
  for (const cat of categoryList) {
    const category = cat
    try {
      const res = await fetchRankingList(readerType.value, category)
			console.log('加载榜单数据：', res.data)
      result.push(res.data)
    } catch (e) {
      console.error('加载榜单失败：', e)
    }
  }
  sortlist.value = result
}

onMounted(fetchAllCategories)

const switchReader = async (type: '男生' | '女生') => {
  if (readerType.value !== type) {
    readerType.value = type
    await fetchAllCategories()
    item1index.value = 0
    item2index.value = 0
  }
}

const slidePrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev()
    item1index.value = 0
    item2index.value = 0
  }
}

const slideNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext()
    item1index.value = 0
    item2index.value = 0
  }
}

const goToSlide = (index: number) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index)
    item1index.value = 0
    item2index.value = 0
  }
}
</script>

<style scoped>
	.sort_wrapper {
		padding-top: 55px;
		padding-bottom: 55px;
		width: 1240px;
		margin-left: auto;
		margin-right: auto;
	}

	.sort_wrapper .chose_tit {
		text-align: center;
	}

	.sort_wrapper .chose_tit span {
		height: 54px;
		line-height: 55px;
		font-size: 24px;
		color: #000;
		margin: 0 20px;
		cursor: pointer;
		position: relative;
	}

	.sort_wrapper .chose_tit span.on:after {
		content: "";
		display: inline-block;
		position: absolute;
		left: 50%;
		bottom: -12px;
		transform: translateX(-50%);
		width: 51px;
		height: 3px;
		background-color: #000;
	}


	.sort_wrapper .type_list {
		text-align: center;
		margin-top: 32px;
	}

	.sort_wrapper .type_list span {
		height: 34px;
		line-height: 34px;
		padding: 0 16px;
		cursor: pointer;
		border-radius: 50px;
		background-color: #f1f1f1;
		display: inline-block;
		margin: 0 6px;
		font-size: 14px;
		color: #666;
	}

	.sort_wrapper .type_list span:hover {
		background-color: #e7e7e7;
	}

	.sort_wrapper .type_list span.on {
		background-color: #ff5f00;
		color: #fff;
	}

	.sort_wrapper .type_list span.on:hover {
		background-color: #ff5f00;
	}

	.sort_swiper {
		margin-top: 55px;
		position: relative;
	}

	.sort_swiper .slide {
		padding: 0 118px;
		display: flex;
		justify-content: space-between;
	}

	.sort_swiper .slide .item {
		width: 476px;
		padding: 40px 33px;
		background-color: #fff;
		border-radius: 8px;
		overflow: hidden;
		background-image: url('/src/assets/images/home/sort/bkg-left.png');
		background-size: 100% auto;
		background-position: top center;
		background-repeat: no-repeat;
	}

	.sort_swiper .item h3 {
		display: inline-block;
		background-image: url('@/assets/icons/arrow-right/icons8-arrow-100.png');
		background-size: 14px auto;
		background-repeat: no-repeat;
		background-position: right 65%;
		font-size: 20px;
		color: #000;
		line-height: 1;
		padding-right: 20px;
		cursor: pointer;
		transition: .3s;
	}

	.sort_swiper .item h3:hover {
		background-image: url('@/assets/icons/arrow-right/icons9-arrow-100.png');
		color: #ff8140;
		opacity: 1;
		transition: .3s;
	}

	.sort_swiper .item .title p {
		margin-top: 3px;
		font-weight: 400;
		font-size: 12px;
		line-height: 20px;
		color: rgba(0, 0, 0, .3);
	}

	.sort_swiper .item .title {
		margin-bottom: 20px;
	}



	.sort_swiper .slide .item.item_new {
		background-image: url('/src/assets/images/home/sort/bkg-right.png');
	}

	.sort_swiper .slide .item .p {
		position: relative;
		margin-bottom: 24px;
	}

	.sort_swiper .slide .item .pic {
		position: absolute;
		cursor: pointer;
		display: none;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
	}

	.sort_swiper .slide .p h4 {
		color: rgba(0, 0, 0, .8);
		font-weight: 400;
		font-size: 18px;
		line-height: 24px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.sort_swiper .slide .p span {
		display: none;
	}

	.sort_swiper .slide .p p {
		display: none;
	}

	.sort_swiper .slide .p em {
		font-weight: 500;
		font-size: 18px;
		font-style: normal;
		line-height: 22px;
		color: rgba(0, 0, 0, .24);
		margin-right: 8px;
	}

	.sort_swiper .slide .p em.em0 {
		color: #ff5f00;
	}

	.sort_swiper .slide .p em.em1 {
		color: #00754a;
	}

	.sort_swiper .slide .p em.em2 {
		color: #d6a562;
	}




	.bg_hui {
		background-color: #fbfbfb;
	}

	.sort_swiper .slide .p {
		width: 100%;
	}

	.sort_swiper .slide .item .p.on {
		background-color: #fff;
		padding: 15px 10px;
		border-radius: 8px;
		padding-right: 145px;
	}

	.sort_swiper .slide .item .p.on .pic {
		width: 100px;
		height: 140px;
		border-radius: 8px;
		overflow: hidden;
		display: block;
		right: 20px;
		bottom: 15px;
	}

	.sort_swiper .slide .item .p.on .pic img {
		width: 100%;
		height: 140px;
	}

	.sort_swiper .slide .item .p.on span {
		display: block;
		padding-left: 30px;
		color: rgba(0, 0, 0, .64);
		margin-top: 4px;
		font-size: 12px;
		line-height: 20px;
	}

	.sort_swiper .slide .item .p.on p {
		display: block;
		padding-left: 30px;
		color: rgba(0, 0, 0, .64);
		margin-top: 4px;
		font-size: 12px;
		line-height: 20px;
	}

	.sort_swiper .swiper-button-prev,
	.sort_swiper .swiper-button-next {
		width: 44px;
		height: 44px;
		background-color: #fff;
		border-radius: 50%;
		box-shadow: 0 0 8px rgba(0, 0, 0, .3);
	}

	.sort_swiper .swiper-button-prev:after,
	.sort_swiper .swiper-button-next:after {
		font-size: 12px;
		color: #000;
		font-weight: bold;
	}

	.sort_swiper .swiper-button-prev {
		left: 0px;
		transition: transform 0.6s;
	}

	.sort_swiper .swiper-button-next {
		right: 0px;
		transition: transform 0.6s;
	}

	.sort_swiper .swiper-button-prev:hover {
		transform: translateX(-8px);
	}

	.sort_swiper .swiper-button-next:hover {
		transform: translateX(8px);
	}
</style>