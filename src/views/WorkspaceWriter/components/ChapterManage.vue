<template>
	<div class="tower_con">
		<div class="serial-card">
			<div class="book-info-container">
				<!-- 顶部返回 + 书名 -->
				<div class="book-info-header-back" @click="goBack">
					<svg class="serial-icon serial-icon-general_arrow1_left icon-left" width="1em" height="1em"
						viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M21.3076 26.6066C20.9171 26.9971 20.2839 26.9971 19.8934 26.6066L9.99387 16.7071C9.60335 16.3166 9.60335 15.6834 9.99387 15.2929L19.8934 5.3934C20.2839 5.00287 20.9171 5.00287 21.3076 5.3934C21.6981 5.78392 21.6981 6.41709 21.3076 6.80761L12.1152 16L21.3076 25.1924C21.6981 25.5829 21.6981 26.2161 21.3076 26.6066Z" />
					</svg>
					{{ bookTitle || '未命名书籍' }}
				</div>

				<!-- 顶部按钮 -->
				<div class="arco-tabs">
					<div class="book-info-tabs">
						<div class="book-info-tabs-item tab-active">章节管理</div>
					</div>
					<div class="right-btns">
						<button type="button" class="add" @click="goTo(`/workspace/writer/create-chapter/${bookId}`)">
							<span>新建章节</span>
						</button>
					</div>
				</div>

				<!-- 控制栏 -->
				<div class="noveladmin">
					<div class="doing">
						<div class="ll">
							<div class="item">
								<select v-model="selectedVolumeId" @change="fetchList">
									<option value="">全部分卷</option>
									<option v-for="v in volumeList" :key="v.id" :value="v.id">{{ v.title }}</option>
								</select>
							</div>
							<div class="item">
								<span>审核状态</span>
								<select v-model="selectedStatus" class="select2" @change="fetchList">
									<option value="">全部</option>
									<option value="published">已发布</option>
									<option value="reviewing">审核中</option>
									<option value="rejected">审核不通过</option>
									<option value="pending">待发布</option>
								</select>
							</div>
						</div>
						<div class="seach">
							<svg class="serial-icon serial-icon-general_search" width="1em" height="1em"
								viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M15.5 4C9.14873 4 4 9.14873 4 15.5C4 21.8513 9.14873 27 15.5 27C18.3156 27 20.8949 25.9881 22.894 24.3082L26.2929 27.7071C26.6834 28.0976 27.3166 28.0976 27.7071 27.7071C28.0976 27.3166 28.0976 26.6834 27.7071 26.2929L24.3082 22.894C25.9881 20.8949 27 18.3156 27 15.5C27 9.14873 21.8513 4 15.5 4ZM6 15.5C6 10.2533 10.2533 6 15.5 6C20.7467 6 25 10.2533 25 15.5C25 20.7467 20.7467 25 15.5 25C10.2533 25 6 20.7467 6 15.5Z" />
							</svg>
							<input type="text" v-model="searchTitle" placeholder="搜索章节" @keyup.enter="fetchList" />
						</div>
					</div>

					<!-- 表格 -->
					<table>
						<tr>
							<th>章节名称</th>
							<th>字数</th>
							<th>错别字</th>
							<th>审核状态</th>
							<th>发布时间</th>
							<th>操作</th>
						</tr>
						<tr v-for="c in chapters" :key="c.id">
							<td>{{ c.title }}</td>
							<td>{{ c.word_count }}</td>
							<td>{{ c.typo_count || 0 }}</td>
							<td>{{ c.status_text }}</td>
							<td>{{ c.updated_at }}</td>
							<td>
								<span class="btn btn1" @click="goTo(`/workspace/writer/edit-chapter/${bookId}/${c.id}`)"></span>
								<span class="btn btn2" @click="deleteChapter(c.id)"></span>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGoTo } from '@/composables/useGoTo'
import { getChapterListByBookId, deleteChapterById  } from '@/apis/workspace'

// 获取路由中的书籍 ID
const route = useRoute()
const { goTo } = useGoTo()
const bookId = Number(route.params.bookId)

interface BookInfo {
  id: number
  title: string
}

interface VolumeItem {
  id: number
  book_id: number
  title: string
  sort: number
  created_at: string
}

interface ChapterItem {
  id: number
  volume_id: number
  chapter_num: number
  title: string
  word_count: number
  updated_at: string
  status?: string
  status_text?: string
  typo_count?: number
}

// 后端返回结构
interface ChapterListResponse {
  title: string
  volumes: VolumeItem[]
  list: ChapterItem[]
}

// ========== 响应数据 ==========

const bookTitle = ref('')
const volumeList = ref<VolumeItem[]>([])
const chapters = ref<ChapterItem[]>([])

// ========== 搜索/筛选状态 ==========

const selectedVolumeId = ref('')
const selectedStatus = ref('')
const searchTitle = ref('')

// ========== 加载章节列表 ==========

const fetchList = async () => {
  const res = await getChapterListByBookId({
    book_id: bookId,
    type: 1, // 仅查章节，不查草稿
    title: searchTitle.value,
    volume_id: selectedVolumeId.value,
    status: selectedStatus.value
  })

  const data = res.data as ChapterListResponse
  bookTitle.value = data.title
  volumeList.value = data.volumes
  chapters.value = data.list
}

const deleteChapter = (id: number) => {
  ElMessageBox.confirm(
    '确定要删除该章节吗？删除后不可恢复！',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(async () => {
      try {
        await deleteChapterById(id) 
        ElMessage.success('删除成功')
        fetchList()
      } catch (error) {
        console.error('删除失败', error)
        ElMessage.error('删除失败，请稍后重试')
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

const goBack = () => window.history.back()

onMounted(fetchList)
</script>

<style scoped>
	.tower_con {
		margin-left: 250px;
		padding-top: 15px;
	}

	.serial-card {
		padding: 32px;
		background-color: #fff;
		border-radius: 10px;
	}

	.book-info-container .book-info-header-back {
		align-items: center;
		color: var(--Color_gray_100, #000);
		display: flex;
		font-size: 20px;
		font-weight: 500;
		line-height: 32px;
		margin-bottom: 12px;
		position: relative
	}

	.book-info-container .book-info-header-back:hover {
		color: var(--Color_brand, #ff5f00);
		cursor: pointer
	}

	.book-info-container .book-info-header-back .icon-left {
		font-size: 24px;
		margin-right: 8px
	}

	.book-info-container .book-info-tabs {
		display: flex;
		padding: 32px 0 12px
	}

	.book-info-container .book-info-tabs-item {
		color: var(--Color_gray_40, #0006);
		cursor: pointer;
		font-size: 16px;
		line-height: 26px
	}

	.book-info-container .book-info-tabs-item:not(:last-of-type) {
		margin-right: 40px
	}

	.book-info-container .book-info-tabs-item.tab-active {
		color: #000;
		font-weight: 500
	}

	.book-info-container .arco-tabs-content {
		padding-top: 0 !important
	}

	.right-btns button {
		width: 96px;
		margin-left: 18px;
		height: 36px;
		border-radius: 50px;
		border: none;
		font-size: 14px;
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.05);
		position: relative;
	}

	.right-btns button.add {
		background-image: linear-gradient(96deg, #ff9a62 0, #ff5f00 100%);
		color: #fff;
	}

	.right-btns button.add:hover {
		background: #ff5f00;
	}

	.arco-tabs {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.noveladmin .doing {
		display: flex;
		margin-top: 20px;
		justify-content: space-between;
		align-items: center;
	}

	.noveladmin .doing .item {
		padding: 0 15px;
		display: inline-block;
	}

	.noveladmin .doing .item {
		background-color: #f5f5f5;
		border-radius: 8px;
		overflow: hidden;
		margin-right: 20px;
	}

	.noveladmin .doing .item select {
		height: 40px;
		line-height: 40px;
		background-color: #f5f5f5;
		border: none;
		width: 200px;
		outline: none;
		font-size: 14px;
		color: #000;

	}

	.noveladmin .doing .item span {
		height: 40px;
		line-height: 40px;
		width: 80px;
		text-align: center;
		display: inline-block;
		font-size: 14px;
		color: #000;
		margin-right: 15px;
		border-right: 1px solid #e2e2e2;
	}

	.noveladmin .doing .item select.select2 {
		width: 120px;
	}

	.noveladmin .seach {
		background-color: #f5f5f5;
		position: relative;
		height: 40px;
		border-radius: 8px;
		width: 180px;
		overflow: hidden;
		padding-left: 30px;
	}

	.noveladmin .seach svg {
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
	}

	.noveladmin .seach input {
		border: none;
		width: 100%;
		background-color: #f5f5f5;
		height: 40px;
		outline: none;

	}

	.noveladmin table {
		width: 100%;
		text-align: left;
		border-collapse: collapse;
		border-spacing: 0;
		margin-top: 20px;
	}
	.info_mass{font-size: 12px;color: #999;margin-top: 20px;}
	.noveladmin table th {
		height: 40px;
		background-color: #fafafa;
		padding-left: 10px;
		font-size: 14px;
		color: #999;
		border: none;
	}

	.noveladmin table td {
		border-bottom: 1px solid #f5f5f5;
		height: 64px;
		padding-left: 10px;
		font-size: 14px;
		color: #000;
	}

	.noveladmin table .btn {
		width: 16px;
		cursor: pointer;
		height: 16px;
		margin-right: 15px;
		background-size: 16px auto;
		display: inline-block;
		background-repeat: no-repeat;
	}

	.noveladmin table .btn2 {
		background-image: url('/src/assets/icons/work/d1.png');
	}

	.noveladmin table .btn2:hover {
		background-image: url('/src/assets/icons/work/d2.png');
	}

	.noveladmin table .btn1 {
		background-image: url('/src/assets/icons/work/d3.png');
	}

	.noveladmin table .btn1:hover {
		background-image: url('/src/assets/icons/work/d4.png');
	}
</style>