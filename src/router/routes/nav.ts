import type { RouteRecordRaw } from 'vue-router'

const HomeRoutes : RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/views/Home/Index.vue'),
		meta: {
			title: '首页',
			requiresAuth: false
		}
	},
	{
		path: '/library',
		name: 'Library',
		component: () => import('@/views/Library/Index.vue'),
		meta: {
			title: '书库',
			requiresAuth: false
		}
	},{
		path: '/author',
		name: 'Author',
		component: () => import('@/views/Writer/Index.vue'),
		meta: {
			title: '作家专区',
			requiresAuth: false
		}
	},{
		path: '/authorwriter',
		name: 'Writer',
		component: () => import('@/views/Writer/Writer.vue'),
		meta: {
			title: '作家专区',
			requiresAuth: false
		}
	}
]

export default HomeRoutes
