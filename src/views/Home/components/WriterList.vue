<template>
  <div class="writer">
    <div class="title">
      <h2>殿堂、金番作家</h2>
      <div
			  class="more"
			  v-if="userStore.role !== 'admin' && userStore.role !== 'author'"
			  @click="goTo(goToApplyPage)"
			>
			  成为作家
			</div>
    </div>

    <div class="writer_swiper">
      <swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="7"
        :space-between="20"
        :slides-per-group="3"
        :loop="false"
        :autoplay="{ delay: 3000000 }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide class="slide" v-for="(item, i) in writerlist" :key="i" @click="goTo(item.path)">
          <div class="avatar"><img :src="item.pic"></div>
          <div class="bottom">
            <div class="name">{{ item.title }}</div>
            <div class="level">{{ item.type }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
        </swiper-slide>
      </swiper>

      <div class="swiper-button-prev" :class="{ 'swiper_disabled': isBeginning }" @click="slidePrev"></div>
      <div class="swiper-button-next" :class="{ 'swiper_disabled': isEnd }" @click="slideNext"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGoTo } from '@/composables/useGoTo'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useUserStore } from '@/stores/useUserStore'
import { getWriterList } from '@/apis/home'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const { goTo } = useGoTo()
const userStore = useUserStore()

// swiper 状态
const swiperInstance = ref<any>(null)
const isBeginning = ref(true)
const isEnd = ref(false)

const writerlist = ref<any[]>([])

// 是否跳转申请页
const goToApplyPage = computed(() =>
  !userStore.isLogin ? '/' : '/workspace/apply'
)

// swiper 相关方法
const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}

const onSlideChange = () => {
  const swiper = swiperInstance.value
  if (swiper?.realIndex != null) {
    isBeginning.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
    console.log('isBeginning:', isBeginning.value, 'isEnd:', isEnd.value)
  }
}

const slidePrev = () => {
  swiperInstance.value?.slidePrev()
}

const slideNext = () => {
  swiperInstance.value?.slideNext()
}

// 页面初始化
onMounted(async () => {
  const res = await getWriterList()
  writerlist.value = res.data
})
</script>

<style>
	.writer .more {
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

	.writer .more:hover {
		background-image: url('@/assets/icons/arrow-right/icons9-arrow-100.png');
		color: #ff8140;
		opacity: 1;
		transition: .3s;
	}

	.ranking_swiper .swiper-pagination-bullet {
		width: 24px;
		cursor: pointer;
		height: 2px;
		opacity: 1;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 0;
	}

	.ranking_swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
		background-color: #fa6725;
	}

	.ranking_swiper .swiper-button-prev,
	.ranking_swiper .swiper-button-next {
		width: 44px;
		height: 44px;
		background-color: #fff;
		border-radius: 50%;
		box-shadow: 0 0 8px rgba(0, 0, 0, .3);
	}

	.ranking_swiper .swiper-button-prev:after,
	.ranking_swiper .swiper-button-next:after {
		font-size: 12px;
		color: #000;
		font-weight: bold;
	}

	.ranking_swiper .swiper-button-prev {
		left: -30px;
		transition: transform 0.6s;
	}

	.ranking_swiper .swiper-button-next {
		right: -60px;
		transition: transform 0.6s;
	}

	.ranking_swiper .swiper-button-prev:hover {
		transform: translateX(-8px);
	}

	.ranking_swiper .swiper-button-next:hover {
		transform: translateX(8px);
	}

	.writer {
		margin-top: 70px;
	}

	.writer .title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.writer .title h2 {
		font-size: 24px;
		font-weight: 500;
		color: #000;
		position: relative;
		display: inline-block;
		padding-right: 35px;
		line-height: 1;
	}

	.writer .title h2:after {
		content: "";
		display: block;
		right: 0;
		top: 50%;
		transform: translateY(-60%);
		position: absolute;
		width: 31px;
		height: 32px;
		background-image: url('@/assets/images/tit1.png');
		background-size: 100% 100%;
	}

	.writer .avatar {
		width: 100%;
		height: 126px;
		position: relative;
		z-index: 1;
		overflow: hidden;
		display: inline-block;
		mask: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTU1IiBoZWlnaHQ9IjEyNiIgdmlld0JveD0iMCAwIDE1NSAxMjYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMTIuMjA3IDExMy41ODFDMTI3LjEyOSAxMDguNjYxIDE0MS40NDkgMTAyLjM2MyAxNTUgOTQuODE3OVYwLjAxMDI1MzlIMFYxMjMuNTI0QzM3LjM3NSAxMjguODU2IDc1Ljc4NTIgMTI1LjU5MSAxMTIuMjA3IDExMy41ODFaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K);
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
	}

	.writer_swiper {
		position: relative;
		width: 1200px;
		margin-left: auto;
		margin-right: auto;
	}

	.writer_swiper .swiper-wrapper {
		padding-top: 45px;
		padding-bottom: 45px;
			}

	.writer_swiper .slide {
		border-radius: 15px;
		overflow: hidden;
		transition: transform 0.3s;
		box-shadow: 0 0px 20px rgba(0, 0, 0, .1);
		cursor: pointer;
	}

	.writer_swiper .slide:hover {
		transform: translateY(-10px);
		transition: transform 0.3s;
		box-shadow: 0 0px 20px rgba(0, 0, 0, .2);
	}

	.writer .avatar img {
		width: 100%;
		vertical-align: middle;
	}

	.writer .bottom {
		text-align: center;
		width: 100%;
		padding-bottom: 15px;
	}

	.writer .bottom .name {
		color: #000;
		text-align: center;
		font-size: 16px;
		font-weight: 500;
		line-height: 20px
	}

	.writer .bottom .level {
		margin-top: 9px;
		width: 54px;
		text-align: center;
		font-size: 12px;
		font-weight: 400;
		line-height: 15px;
		display: inline-block;
		padding: 2px 0;
		border-radius: 4px;
		border: .5px solid #f7e1c1;
		background: #ffeed5;
		color: #955b02;
	}

	.writer .bottom .desc {
		padding: 0 12px;
		margin-top: 10px;
		color: rgba(0, 0, 0, .4);
		text-align: center;
		font-size: 12px;
		font-weight: 400;
		line-height: 17px;
		height: 34px;
		overflow: hidden;
	}


	.writer .swiper-button-prev,
	.writer .swiper-button-next {
		width: 44px;
		height: 44px;
		background-color: #fff;
		border-radius: 50%;
		box-shadow: 0 0 8px rgba(0, 0, 0, .3);
	}

	.writer .swiper-button-prev:after,
	.writer .swiper-button-next:after {
		font-size: 12px;
		color: #000;
		font-weight: bold;
	}

	.writer .swiper-button-prev {
		left: -30px;
		transition: transform 0.6s;
	}

	.writer .swiper-button-next {
		right: -30px;
		transition: transform 0.6s;
	}

	.writer .swiper-button-prev:hover {
		transform: translateX(-8px);
	}

	.writer .swiper-button-next:hover {
		transform: translateX(8px);
	}

	.swiper-button-prev.swiper_disabled,
	.swiper-button-next.swiper_disabled {
	  opacity: 0;
	  pointer-events: none;
	}
</style>