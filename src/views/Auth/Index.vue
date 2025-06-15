<template>
	<!-- 顶部导航 -->
	<div class="top-nav">
		<div class="nav-left">
			<img :src="logo" class="nav-logo" />
			CMS
			<span class="divider">|</span>
			<span class="nav-item-left" @click="goTo('/author')">作家专区</span>
		</div>
		<div class="nav-right">
			<span class="nav-item-right" @click="goAsGuest">游客登录</span>
			<span class="nav-item-right" @click="goAuthorBenefit">作家福利</span>
		</div>
	</div>

	<!-- 页面内容 -->
	<div class="login-page">
		<!-- 懒加载封面 + 背景视频 -->
		<img v-if="!videoLoaded" class="video-placeholder" :src="poster" alt="背景加载中..." />
		<video v-show="videoLoaded" autoplay muted loop playsinline class="bg-video"
			@canplaythrough="videoLoaded = true">
			<source src="@/assets/movies/auth/welcome.mp4" type="video/mp4" />
		</video>

		<!-- 遮罩 -->
		<div class="overlay"></div>

		<!-- 登录表单区域 -->
		<div class="login-panel">
			<div class="login-box">
				<router-view />
			</div>
		</div>
	</div>

	<!-- 页脚 -->
	<div class="footer-text">©2025 CMS | 本系统仅供学习与教学使用</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { useGoTo } from '@/composables/useGoTo'

	const { goTo } = useGoTo()
	const router = useRouter()
	const videoLoaded = ref(false)

	const poster = new URL('@/assets/images/auth/welcome.png', import.meta.url).href
	const logo = new URL('@/assets/icons/logo/icons8-firebase-undefined-32.png', import.meta.url).href

	const goAsGuest = () => {
		router.push('/home') // 游客登录跳转首页
	}

	const goAuthorBenefit = () => {
		router.push('/benefit') // 作家福利页面
	}
</script>

<style scoped>
	/* 顶部导航 */
	.top-nav {
		position: absolute;
		top: 20px;
		left: 0;
		width: 100%;
		z-index: 3;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* ✅ 垂直居中对齐 */
		padding: 0 20%;
		font-size: 14px;
		font-weight: 500;
		color: white;
		pointer-events: none;
	}

	.nav-left {
		font-size: 20px;
		line-height: 1;
		/* ✅ 避免字体偏移 */
		height: 24px;
		/* ✅ 与右边文字高度保持一致 */
		display: flex;
		align-items: center;
		pointer-events: auto;
	}

	.nav-right {
		display: flex;
		gap: 24px;
		pointer-events: auto;
	}

	.nav-right {
		display: flex;
		gap: 24px;
	}

	.nav-item-left,
	.nav-item-right {
		cursor: pointer;
		transition: color 0.2s ease;
		font-size: 14px;
	}

	.nav-item-right:hover {
		color: #ff8140;
	}

	.nav-logo {
		width: 26px;
		margin-right: 8px;
		object-fit: contain;
	}

	/* 整体容器 */
	.login-page {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
	}

	/* 视频与封面图 */
	.bg-video,
	.video-placeholder {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}

	/* 遮罩层 */
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.25);
		z-index: 1;
	}

	/* 登录框区域 */
	.login-panel {
		position: absolute;
		top: 50%;
		right: 100px;
		transform: translateY(-50%);
		z-index: 2;
		display: flex;
		justify-content: flex-end;
		width: 100%;
	}

	.login-box {
		width: 400px;
		padding: 40px 32px;
		background: #ffffff;
		/* 完全不透明 */
		border-radius: 16px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
	}

	/* 页脚版权 */
	.footer-text {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%); /* 向左移动自身宽度的一半 */
		font-size: 12px;
		color: rgba(255, 255, 255, 0.6);
		z-index: 2;
	}

	.divider {
		margin: 0 8px;
		/* 分隔符两边留空 */
		color: rgba(255, 255, 255, 0.7);
		font-size: 14px;
		user-select: none;
		font-weight: normal;
	}
</style>