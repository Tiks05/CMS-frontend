<template>
  <div class="author_classroom">
    <div class="classroom_wp">
      <!-- 标题 -->
      <div class="title">
        <span>作家课堂</span>
        <img :src="iconTit1" alt="标题图标" />
      </div>

      <!-- 分类类型切换 -->
      <div class="type_list">
        <span
          v-for="(item, index) in stypelist"
          :key="index"
          class="custom-pagination-bullet"
          :class="{ on: activeIndex === index }"
          @click="goToSlide(index)"
        >
          {{ item }}
        </span>
      </div>

      <!-- 卡片列表 -->
      <div class="classroom_list">
        <div v-if="classlist.length">
          <div class="item" v-for="(item, index) in classlist" :key="index">
            <ClassCard :classitem="item" />
          </div>
        </div>
      </div>

      <!-- 查看全部 -->
      <div class="more">
        <span :style="{ backgroundImage: `url(${arrowRight})` }">
          查看全部
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchClassroomList } from '@/apis/writer'
import ClassCard from './ClassCard.vue'

const iconTit1 = new URL('@/assets/images/writer/classroom/tit-1.png', import.meta.url).href
const arrowRight = new URL('@/assets/icons/arrow-right/icons8-arrow-100.png', import.meta.url).href

const stypelist = ['直播培训', '新手专区', '写作技巧', '分类进阶', '大神专访']
const activeIndex = ref(0)

interface ClassroomItem {
  title: string
  intro: string
  cover_url: string
  path: string
  is_include_video: boolean
}

const classlist = ref<ClassroomItem[]>([])

const isValidItem = (item: any): item is ClassroomItem => {
  return (
    typeof item.title === 'string' &&
    typeof item.intro === 'string' &&
    typeof item.cover_url === 'string' &&
    typeof item.path === 'string' &&
    typeof item.is_include_video === 'boolean'
  )
}

// 获取数据 + 校验
const loadClassroomData = async () => {
  const category = stypelist[activeIndex.value]
  const res = await fetchClassroomList(category)

  if (Array.isArray(res.data)) {
    classlist.value = res.data.filter(isValidItem)
  } else {
    classlist.value = []
    console.warn('课程数据格式不合法:', res.data)
  }
}

const goToSlide = (index: number) => {
  activeIndex.value = index
  loadClassroomData()
}

onMounted(loadClassroomData)
</script>

<style scoped>
.author_classroom {
	padding: 80px 0;
	background-color: #f6f6f6;
}

.classroom_wp {
	width: 1240px;
	margin: 0 auto;
}

.author_classroom .title {
	text-align: center;
	font-size: 26px;
}

.author_classroom .title img {
	width: 32px;
	vertical-align: middle;
	margin-left: 3px;
}

.author_classroom .title span {
	vertical-align: middle;
}

.author_classroom .type_list {
	text-align: center;
	margin-top: 32px;
}

.author_classroom .type_list span {
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

.author_classroom .type_list span:hover {
	background-color: #e7e7e7;
}

.author_classroom .type_list span.on {
	background-color: #ff5f00;
	color: #fff;
}

.author_classroom .type_list span.on:hover {
	background-color: #ff5f00;
}

.author_classroom .classroom_list {
	overflow: hidden;
	margin-left: -20px;
	margin-top: 20px;
}

.author_classroom .classroom_list .item {
	width: 20%;
	float: left;
	padding-right: 20px;
	margin-top: 20px;
}

.more {
	text-align: center;
	margin-top: 40px;
}

.more span {
	display: inline-block;
	width: 150px;
	height: 40px;
	text-align: center;
	cursor: pointer;
	line-height: 40px;
	background-color: #ececec;
	margin-top: 15px;
	border-radius: 50px;
	background-size: 12px auto;
	padding-right: 15px;
	background-repeat: no-repeat;
	background-position: 80% center;
	background-image: url("v-bind(arrowRight)");
}
</style>