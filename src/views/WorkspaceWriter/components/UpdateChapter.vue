<template>
	<div class="bg_hui">
		<!-- 顶部栏 -->
		<div class="publish_header">
			<div class="left">
				<div class="pic" @click="goBack">
					<svg class="serial-icon serial-icon-general_arrow1_left icon-left" width="1em" height="1em" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3076 26.6066C20.9171 26.9971 20.2839 26.9971 19.8934 26.6066L9.99387 16.7071C9.60335 16.3166 9.60335 15.6834 9.99387 15.2929L19.8934 5.3934C20.2839 5.00287 20.9171 5.00287 21.3076 5.3934C21.6981 5.78392 21.6981 6.41709 21.3076 6.80761L12.1152 16L21.3076 25.1924C21.6981 25.5829 21.6981 26.2161 21.3076 26.6066Z" />
					</svg>
				</div>
				<div class="text">
					<p>第{{ volumeIndexCN }}卷：{{ volumeTitle }}</p>
					<span>章节编号：第{{ chapterNumber }}章</span>
				</div>
			</div>
			<div class="right">
				<span class="btn1" @click="handleSaveDraft">存草稿</span>
				<span class="btn2" @click="handleUpdate">提交</span>
			</div>
		</div>

		<div class="h70"></div>

		<!-- 编辑区域 -->
		<div class="edit_con">
			<div class="tit">
				<span>第</span>
				<input type="text" class="one" v-model="chapterNumber" />
				<span>章</span>
				<input type="text" class="two" v-model="chapterTitle" placeholder="请输入标题" />
			</div>

			<textarea v-model="chapterContent" placeholder="请输入内容"></textarea>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGoTo } from '@/composables/useGoTo'
import { getChapterDetailById, updateChapter } from '@/apis/workspace'
import { ElMessage } from 'element-plus'

const route = useRoute()
const { goTo } = useGoTo()
const bookId = Number(route.params.bookId)
const chapterId = Number(route.params.chapterId)

// 编辑字段
const volumeIndex = ref(1)
const volumeTitle = ref('')
const chapterNumber = ref('')
const chapterTitle = ref('')
const chapterContent = ref('')

// 初始化加载
onMounted(async () => {
	try {
		const res = await getChapterDetailById(bookId, chapterId)
		if (res?.data) {
			volumeIndex.value = res.data.volume_index
			volumeTitle.value = res.data.volume_title
			chapterNumber.value = res.data.chapter_num.toString()
			chapterTitle.value = res.data.title
			chapterContent.value = res.data.content
		}
	} catch (err) {
		console.error('章节加载失败', err)
		ElMessage.error('加载章节失败')
	}
})

const goBack = () => window.history.back()

// 草稿保存
const handleSaveDraft = () => {
	console.log('保存草稿：', {
		book_id: bookId,
		chapter_id: chapterId,
		chapter_num: chapterNumber.value,
		title: chapterTitle.value,
		content: chapterContent.value,
		is_draft: true
	})
}

// 提交更新
const handleUpdate = async () => {
	const content = chapterContent.value.trim()
	if (!chapterTitle.value || !content || !chapterNumber.value) {
		ElMessage.warning('请填写完整的章节信息')
		return
	}
	if (content.length < 1000) {
		ElMessage.warning(`章节内容不得少于 1000 字，当前 ${content.length} 字`)
		return
	}

	const payload = {
		book_id: bookId,
		chapter_id: chapterId,
		chapter_num: Number(chapterNumber.value),
		title: chapterTitle.value,
		content,
		word_count: content.length,
		is_draft: false
	}

	try {
		await updateChapter(payload)
		ElMessage.success('章节更新成功')
		goTo('/workspace/writer')
	} catch (err) {
		console.error('更新失败', err)
		ElMessage.error('章节更新失败')
	}
}

// 汉字数字转换函数
const toChineseNumber = (num: number): string => {
	const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
	if (num <= 10) return chars[num]
	if (num < 20) return '十' + chars[num % 10]
	if (num < 100) {
		const tens = Math.floor(num / 10)
		const units = num % 10
		return chars[tens] + '十' + (units === 0 ? '' : chars[units])
	}
	return num.toString()
}

// 中文卷序号
const volumeIndexCN = computed(() => toChineseNumber(volumeIndex.value))

</script>

<style scoped>
.bg_hui {
	background-color: #f5f5f5;
}

.h70 {
	height: 85px;
}

.edit_con {
	width: 1240px;
	margin: 0 auto;
	background-color: #fff;
	padding: 60px 130px;
	border-radius: 12px;
}

.publish_header {
	padding: 0 50px;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	display: flex;
	height: 68px;
	background-color: #fff;
	justify-content: space-between;
	align-items: center;
}

.publish_header .left {
	position: relative;
	padding-left: 50px;
}

.publish_header .left .pic {
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	background-color: #f5f5f5;
	width: 34px;
	height: 34px;
	border-radius: 6px;
	text-align: center;
	line-height: 34px;
}

.publish_header .left .pic:hover {
	background-color: #ddd;
}

.publish_header .left span {
	font-size: 12px;
	color: #999;
}

.publish_header .right span {
	width: 96px;
	height: 36px;
	display: inline-block;
	background-color: #f5f5f5;
	text-align: center;
	font-size: 14px;
	color: #000;
	cursor: pointer;
	line-height: 36px;
	border-radius: 50px;
	margin-left: 25px;
}

.publish_header .right span.btn1:hover {
	background-color: #ddd;
}

.publish_header .right span.btn2 {
	color: #ff5f00;
	background-color: #ffefe4;
}

.publish_header .right span.btn2:hover {
	background-color: #fde3d0;
}

.edit_con .tit span {
	font-size: 24px;
	color: #999;
	margin: 0 10px;
}

.edit_con .tit input {
	height: 24px;
	font-size: 24px;
	border: none;
	outline: none;
}

.edit_con .tit input.one {
	width: 80px;
	text-align: center;
	border-bottom: 1px solid #ddd;
}

.edit_con .tit input.two {
	width: 200px;
	padding-left: 12px;
}

.edit_con textarea {
	width: 100%;
	height: 600px;
	resize: none;
	border: none;
	outline: none;
	padding: 8px;
	font-family: '微软雅黑';
	margin-top: 20px;
	font-size: 16px;
	color: #333;
}

html,
body {
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none;
}
</style>