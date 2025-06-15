<template>
	<div class="book_card">
		<div class="pic">
			<img :src="book.coverUrl" alt="封面" class="cover" />
		</div>

		<div class="info">
			<div class="title">{{ book.title }}</div>
			<div class="author">作者：{{ book.author }}</div>
			<div class="status">{{ book.status }}：{{ formatWordCount(book.wordCount) }}</div>
			<div class="intro">{{ truncateIntro(book.intro) }}</div>
			<div class="update-time">{{ formatUpdateTime(book.updatedAt) }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Book {
		id : number
		title : string
		author : string
		status : string
		wordCount : number
		intro : string
		coverUrl : string
		updatedAt : string
	}

	const props = defineProps<{ book : Book }>()

	function formatWordCount(count : number) : string {
		if (count >= 100000000) {
			return (count / 100000000).toFixed(1) + '亿字'
		}
		if (count >= 10000) {
			return (count / 10000).toFixed(1) + '万字'
		}
		return count + '字'
	}

	function truncateIntro(intro : string) : string {
		return intro.length > 40 ? intro.substring(0, 40) + '...' : intro
	}

	function formatUpdateTime(dateStr : string) : string {
		console.log(dateStr)
		const date = new Date(dateStr)
		const now = new Date()
		const diffMs = now.getTime() - date.getTime()
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

		if (diffHours < 1) {
			return '刚刚'
		} else if (diffHours < 24) {
			return `${diffHours}小时前`
		} else {
			return date.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
		}
	}
</script>

<style scoped>
	.book_card {
		position: relative;
		height: 130px;
		padding-left: 120px;
		cursor: pointer;
	}

	.pic {
		width: 100px;
		height: 130px;
		object-fit: cover;
		border-radius: 4px;
		margin-right: 15px;
		position: absolute;
		left: 0;
		overflow: hidden;
		top: 0;
	}

	.pic img {
		width: 100px;
		height: 130px;
		transition: .3s;
	}

	.book_card:hover .pic img {transform: scale(1.1);
		transition: .3s;}

	.title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.author,
	.status,
	.intro,
	.update-time {
		font-size: 12px;
		color: #999;
	}

	.intro {
		height: 39px;
		overflow: hidden;
	}
</style>