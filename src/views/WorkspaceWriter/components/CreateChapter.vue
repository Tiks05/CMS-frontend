<template>
  <div class="bg_hui">
    <!-- 顶部栏 -->
    <div class="publish_header">
      <div class="left">
        <div class="pic" @click="goBack">
          <svg class="serial-icon serial-icon-general_arrow1_left icon-left" width="1em" height="1em"
            viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M21.3076 26.6066C20.9171 26.9971 20.2839 26.9971 19.8934 26.6066L9.99387 16.7071C9.60335 16.3166 9.60335 15.6834 9.99387 15.2929L19.8934 5.3934C20.2839 5.00287 20.9171 5.00287 21.3076 5.3934C21.6981 5.78392 21.6981 6.41709 21.3076 6.80761L12.1152 16L21.3076 25.1924C21.6981 25.5829 21.6981 26.2161 21.3076 26.6066Z" />
          </svg>
        </div>
        <div class="text">
          <!-- 当前写入卷标题 or 最后一卷 -->
          <p v-if="currentVolumeId && volumeTitle">
            第{{ numberToChinese(currentVolumeId) }}卷：{{ volumeTitle }}
          </p>
          <p v-else-if="lastVolumeId && lastVolumeTitle">
            第{{ numberToChinese(lastVolumeId) }}卷：{{ lastVolumeTitle }}
          </p>

					<!-- 最新章节 -->
					<span>
					  最新章节：
					  <span v-if="latestChapterTitle">
					    第{{ numberToChinese(latestVolumeSort) }}卷
					    <span v-if="latestChapterNum > 0"> 第{{ latestChapterNum }}章</span>
					    {{ latestChapterTitle }}（{{ latestChapterUpdateTime }}）
					  </span>
					  <span v-else>无</span>
					</span>
        </div>
      </div>
      <div class="right">
        <span class="btn1" @click="handleSaveDraft">存草稿</span>
        <span class="btn2" @click="confirm">提交</span>
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
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGoTo } from '@/composables/useGoTo'
import { getLastChapterByVolumeId, getLastChapterByBookId, createChapter, getLatestChapterByBookId } from '@/apis/workspace'

const route = useRoute()
const { goTo } = useGoTo()

// 当前书籍 ID 和分卷 ID
const bookId = Number(route.params.bookId)
const volumeId = Number(route.query.volume_id || 0)

// 输入内容
const chapterTitle = ref('')
const chapterContent = ref('')
const chapterNumber = ref('')

// 上次提交信息
const volumeTitle = ref('')
const currentVolumeId = ref(0)
const lastVolumeId = ref(0)
const lastVolumeTitle = ref('')
const lastChapter = ref(0)
const lastChapterTitle = ref('')
const lastUpdatedTime = ref('')
const hasLastChapter = ref(false)

// 返回上一页
const goBack = () => window.history.back()

// 获取章节信息
const latestVolumeSort = ref(0)
const latestChapterNum = ref(0)
const latestChapterTitle = ref('')
const latestChapterUpdateTime = ref('')

onMounted(async () => {
  try {
    let res
    if (volumeId) {
      res = await getLastChapterByVolumeId(bookId, volumeId)
      volumeTitle.value = res.data.volume_title || ''
      currentVolumeId.value = res.data.current_volume_id || 0
    } else {
      res = await getLastChapterByBookId(bookId)
    }

    if (res?.data) {
      lastVolumeId.value = res.data.last_volume_id || 0
      lastVolumeTitle.value = res.data.last_volume_title || ''
      lastChapter.value = res.data.chapter_index || 0
      lastChapterTitle.value = res.data.chapter_title || ''
      lastUpdatedTime.value = res.data.updated_at || ''
    }

    // 新增获取最新章节
    const latestRes = await getLatestChapterByBookId(bookId)
    if (latestRes?.data) {
      latestVolumeSort.value = latestRes.data.latest_volume_sort || 0
      latestChapterNum.value = latestRes.data.latest_chapter_num || 0
      latestChapterTitle.value = latestRes.data.latest_chapter_title || ''
      latestChapterUpdateTime.value = latestRes.data.latest_chapter_updated_at || ''
    }
  } catch (err) {
    console.error('获取章节信息失败', err)
  }
})

// 阿拉伯数字转中文
const numberToChinese = (num: number): string => {
  const chineseNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const unit = ['', '十', '百', '千']
  if (num <= 10) return num === 10 ? '十' : chineseNum[num]
  const digits = String(num).split('').map(n => parseInt(n))
  let result = ''
  digits.forEach((digit, index) => {
    const pos = digits.length - index - 1
    if (digit !== 0) {
      result += chineseNum[digit] + unit[pos]
    } else if (!result.endsWith('零')) {
      result += '零'
    }
  })
  return result.replace(/零+$/, '')
}

// 模拟草稿保存
const handleSaveDraft = () => {
  console.log('📝 存草稿：', {
    bookId,
    volumeId,
    chapterTitle: chapterTitle.value,
    chapterContent: chapterContent.value
  })
}

// 提交章节
const confirm = async () => {
  const content = chapterContent.value.trim()

  if (!chapterTitle.value || !content) {
    ElMessage.warning('请填写完整的章节信息')
    return
  }
  if (content.length < 1000) {
    ElMessage.warning(`章节内容不得少于 1000 字，当前 ${content.length} 字`)
    return
  }

  const payload = {
    book_id: bookId,
    volume_id: volumeId || null,  // 有就传，没有就传 null
    title: chapterTitle.value,
    content,
    word_count: content.length
  }

  try {
    await createChapter(payload)
    ElMessage.success('章节提交成功')
    goTo('/workspace/writer')
  } catch (err) {
    console.error('章节提交失败：', err)
    ElMessage.error('章节提交失败')
  }
}
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