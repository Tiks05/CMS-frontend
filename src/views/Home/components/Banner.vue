<template>
	<div class="index_banner">
		<swiper :modules="[Pagination,EffectFade,Autoplay]" :pagination="{ clickable: true }" @swiper="onSwiper" :effect="'fade'" :loop="true" :autoplay="{delay: 3000}">
			<swiper-slide v-for="(slide, index) in images" :key="index">
				<div class="slide-content">
					<img :src="slide" alt="" />
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount } from 'vue'
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { Pagination, EffectFade ,Autoplay } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/pagination';
	import 'swiper/css/effect-fade';
	import 'swiper/css/autoplay';
	const images = [
		new URL('@/assets/images/HomeBKG1.jpg', import.meta.url).href,
		new URL('@/assets/images/HomeBKG2.jpg', import.meta.url).href,
		new URL('@/assets/images/HomeBKG3.jpg', import.meta.url).href,
		new URL('@/assets/images/HomeBKG4.jpg', import.meta.url).href
	]

	const onSwiper = (swiper : any) => {
		setTimeout(() => swiper.update(), 100);
	};
</script>

<style>
	.index_banner {
		width: 100%;
	}

	.index_banner img {
		width: 100%;
		vertical-align: middle;
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