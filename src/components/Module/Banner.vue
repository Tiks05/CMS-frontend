<template>
	<div class="index_banner">
		<swiper
			:modules="[Pagination, EffectFade, Autoplay]"
			:pagination="{ clickable: true }"
			@swiper="onSwiper"
			:effect="'fade'"
			:loop="true"
			:autoplay="{ delay: 3000 }"
		>
			<swiper-slide v-for="(item, index) in bannerList" :key="index">
				<div class="slide-content" @click="goTo(item.path)">
					<img :src="item.banner_url" alt="" />
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, EffectFade, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import { getBannerList } from '@/apis/module'

const bannerList = ref<{ banner_url: string; path: string }[]>([])
const router = useRouter()

const fetchBannerList = async () => {
	const res = await getBannerList({ limit: 5 })
	bannerList.value = res.data || []
}

const onSwiper = (swiper: any) => {
	setTimeout(() => swiper.update(), 100)
}

const goTo = (path: string) => {
	router.push(path)
}

onMounted(() => {
	fetchBannerList()
})
</script>

<style>
.index_banner {
	width: 100%;
}

.index_banner img {
	width: 100%;
	vertical-align: middle;
	cursor: pointer;
}

.index_banner .swiper-pagination {
	bottom: 18px;
}

.index_banner .swiper-pagination-bullet {
	width: 24px;
	cursor: pointer;
	height: 2px;
	opacity: 1;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 0;
}

.index_banner .swiper-pagination-bullet.swiper-pagination-bullet-active {
	background-color: #fa6725;
}
</style>
