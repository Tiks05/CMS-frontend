<template>
	<div class="bg_bai">
		<!-- 头部 -->
		<div class="header_con">
			<Header :menus="navMenus" />
		</div>
		<div class="library_wrapper">
			<!-- 类别选择 -->
			<TypeList @update:filters="handleFilters" />

			<!-- 列表：接收筛选条件 -->
			<BookList :filters="filters" />
		</div>

		<!-- 底部 -->
		<Footer />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import TypeList from './components/TypeList.vue'
import BookList from './components/BookList.vue'

// 顶部导航菜单
const navMenus = [
	{ path: '/home', label: '首页' },
	{ path: '/library', label: '书库' },
	{ path: '/bookshelf', label: '书架' },
	{ path: '/writer', label: '作家专区' },
	{ path: '/copyright', label: '版权专区' }
]

// 定义筛选条件 filters
const filters = ref({
	reader_type: '',
	category_group: '',
	category_type: '',
	status: '',
	word_count_range: ''
})

// 监听子组件 TypeList 的 emit
const handleFilters = (val: typeof filters.value) => {
	filters.value = val
	// 可选：你也可以在这里执行 fetchBookList() 等操作
}
</script>

<style scoped>
.header_con {
	height: 64px;
	background-color: #f6f6f6;
}

.bg_bai {
	background-color: #fff;
}

.library_wrapper {
	width: 1240px;
	margin: auto;
}
</style>
