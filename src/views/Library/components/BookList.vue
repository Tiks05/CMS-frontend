<template>
  <div class="library_list">
    <!-- 排序 -->
    <div class="sort">
      <span :class="{ on: sort_index === 0 }" @click="SortIndex(0)">最热</span>
      <span :class="{ on: sort_index === 1 }" @click="SortIndex(1)">最新</span>
      <span :class="{ on: sort_index === 2 }" @click="SortIndex(2)">字数</span>
    </div>

    <!-- 图书列表 -->
    <div class="list">
      <div class="library_item" v-for="item in booklist" :key="item.id">
        <BookCard :book="item" />
      </div>
    </div>

    <!-- 自定义分页 -->
    <div class="custom-pagination" v-if="pageCount > 1">
      <button class="page-btn" :disabled="page === 1" @click="goPage(page - 1)">上一页</button>

      <button
        v-for="p in visiblePages"
        :key="p"
        class="page-btn"
        :class="{ active: p === page }"
        @click="goPage(p)"
      >
        {{ p }}
      </button>

      <span v-if="showEllipsis">...</span>

      <button class="page-btn" :disabled="page === pageCount" @click="goPage(page + 1)">下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import BookCard from './BookCard.vue'
import { getBookList } from '@/apis/library'

interface Book {
  id: number
  title: string
  author: string
  status: string
  wordCount: number
  intro: string
  coverUrl: string
  updatedAt: string
}

// 接收父组件传来的筛选条件
const props = defineProps<{
  filters: {
    reader_type: string
    category_group: string
    category_type: string
    status: string
    word_count_range: string
  }
}>()

// 排序状态：0 最热 | 1 最新 | 2 字数
const sort_index = ref(0)

// 分页相关
const page = ref(1)
const pageSize = 18
const total = ref(0)
const sortTypes = ['hot', 'new', 'words'] as const

// 书籍列表
const booklist = ref<Book[]>([])

// 当前总页数
const pageCount = computed(() => Math.ceil(total.value / pageSize))

// 计算显示页码（分页核心）
const visiblePages = computed(() => {
  const totalPages = pageCount.value
  const current = page.value
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (current <= 4) return [1, 2, 3, 4, 5]
  if (current >= totalPages - 2) return [
    totalPages - 4,
    totalPages - 3,
    totalPages - 2,
    totalPages - 1,
    totalPages
  ]

  return [current - 2, current - 1, current, current + 1, current + 2]
})

const showEllipsis = computed(() => {
  return pageCount.value > 6 && page.value <= pageCount.value - 3
})

// 翻页处理
const goPage = (val: number) => {
  if (val !== page.value) {
    page.value = val
    fetchBooks()
  }
}

// 排序点击
const SortIndex = (index: number) => {
  sort_index.value = index
  page.value = 1
  fetchBooks()
}

// 请求图书数据
const fetchBooks = async () => {
  const res = await getBookList({
    ...props.filters,
    sort: sortTypes[sort_index.value],
    page: page.value,
    pageSize
  })
  booklist.value = res.data.records
  total.value = res.data.total
}

// 筛选条件变动时重新获取
watch(() => props.filters, () => {
  page.value = 1
  fetchBooks()
}, { immediate: true })
</script>

<style scoped>
.library_list {
  padding-bottom: 100px;
}

.library_list .sort {
  height: 44px;
  border-bottom: 1px solid #f6f6f6;
}

.library_list .sort span {
  height: 44px;
  display: inline-block;
  line-height: 42px;
  margin: 0 20px;
  cursor: pointer;
  font-size: 16px;
}

.library_list .sort span.on {
  color: #fa6725;
  border-bottom: 2px solid #fa6725;
}

.library_list .list {
  overflow: hidden;
  margin-left: -65px;
}

.library_item {
  width: 33.3333%;
  float: left;
  padding-left: 65px;
  margin-top: 42px;
}

/* 分页样式 */
.custom-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 60px;
  flex-wrap: wrap;
}

.page-btn {
  padding: 4px 10px;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
  min-width: 32px;
  text-align: center;
}

.page-btn:hover {
  border-color: #fa6725;
  color: #fa6725;
}

.page-btn.active {
  background-color: #fa6725;
  border-color: #fa6725;
  color: #fff;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
