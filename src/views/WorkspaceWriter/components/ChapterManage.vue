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
						<button type="button" class="edit-volume" @click="openVolumeDialog">
						  <span>编辑分卷</span>
						</button>

						<button
						  type="button"
						  class="add"
						  @click="handleCreateChapter"
						>
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
                  <option
									  v-for="(v, index) in volumeList"
									  :key="v.id"
									  :value="v.id"
									>
									  第{{ toChineseNumber(index + 1) }}卷：{{ v.title }}
									</option>
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

  <!-- 分卷管理弹窗 -->
  <el-dialog
    v-model="showVolumeDialog"
    title="分卷"
    width="500px"
    class="custom-volume-dialog"
    align-center
    :close-on-click-modal="false"
  >
		<div
		  v-for="(v, index) in tempVolumeList"
		  :key="v.id"
		  class="volume-item"
		>
		  <!-- 编辑状态 -->
		  <template v-if="v.isEditing">
		    <div class="title-editing">
		      <el-tooltip content="最多输入20个字">
		        <input v-model="v.title" class="volume-input" maxlength="20" />
		      </el-tooltip>
		      <div class="info">{{ v.title.length }}/20</div>
		      <div class="action">
		        <el-icon @click="confirmEditVolume(index)" class="icon-confirm">
		          <Check />
		        </el-icon>
		        <el-icon @click="cancelEditVolume(index)" class="icon-cancel">
		          <Close />
		        </el-icon>
		      </div>
		    </div>
		  </template>
		
		  <!-- 普通状态 -->
		  <template v-else>
		    <div class="title">第{{ toChineseNumber(index + 1) }}卷：{{ v.title }}</div>
		    <div class="info">{{ getChapterCount(v.id) }}/20</div>
		    <div class="action">
		      <span class="btn btn1" @click="editVolume(index)"></span>
		      <span class="btn btn2" @click="deleteVolume(index)"></span>
		    </div>
		  </template>
		</div>

    <!-- Footer -->
    <template #footer>
      <div class="dialog-footer-layout">
        <div class="left-section" @click="addVolume">
          <svg
            viewBox="0 0 1024 1024"
            width="16"
            height="16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style="margin-right: 6px;"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.2 0-372-166.8-372-372S306.8 140 512 140s372 166.8 372 372-166.8 372-372 372z" />
            <path d="M704 480H544V320a32 32 0 1 0-64 0v160H320a32 32 0 1 0 0 64h160v160a32 32 0 1 0 64 0V544h160a32 32 0 1 0 0-64z" />
          </svg>
          <span class="add-volume-text">新建分卷</span>
        </div>
        <div class="right-section">
          <el-button @click="showVolumeDialog = false">取消</el-button>
          <el-button
            type="primary"
            style="background:#ff5f00;border-color:#ff5f00;"
            @click="submitVolumeChange"
          >确定</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus'
import { Check, Close } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGoTo } from '@/composables/useGoTo'
import { getChapterListByBookId, deleteChapterById, deleteVolumeById, createVolume, updateVolume } from '@/apis/workspace'

const route = useRoute()
const { goTo } = useGoTo()
const bookId = Number(route.params.bookId)

interface VolumeItem {
  id: number
  book_id: number
  title: string
  sort: number
  created_at: string
  isEditing?: boolean
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

interface ChapterListResponse {
  title: string
  volumes: VolumeItem[]
  list: ChapterItem[]
}

const bookTitle = ref('')
const volumeList = ref<VolumeItem[]>([])
const chapters = ref<ChapterItem[]>([])
const selectedVolumeId = ref('')
const selectedStatus = ref('')
const searchTitle = ref('')

// 阿拉伯数字转中文数字（1 -> 一，11 -> 十一）
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

const handleCreateChapter = () => {
  if (!selectedVolumeId.value) {
    ElMessage.warning('请先选择一个分卷再创建章节')
    return
  }
  goTo(`/workspace/writer/create-chapter/${bookId}?volume_id=${selectedVolumeId.value}`)
}

// 获取章节 + 分卷数据
const fetchList = async () => {
  const res = await getChapterListByBookId({
    book_id: bookId,
    type: 1,
    title: searchTitle.value,
    volume_id: selectedVolumeId.value,
    status: selectedStatus.value
  })

  const data = res.data as ChapterListResponse
  bookTitle.value = data.title
  volumeList.value = data.volumes

  // 排序章节列表：按发布时间倒序
  chapters.value = data.list.sort((a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  })
}

// 删除章节（带弹窗确认）
const deleteChapter = (id: number) => {
  ElMessageBox.confirm('确定要删除该章节吗？删除后不可恢复！', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
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

// 分卷弹窗相关逻辑
const showVolumeDialog = ref(false)
const tempVolumeList = ref<VolumeItem[]>([])

// 打开弹窗时复制 volumeList 到 tempVolumeList
const openVolumeDialog = () => {
  tempVolumeList.value = volumeList.value.map(v => ({ ...v, isEditing: false }))
  showVolumeDialog.value = true
}

// 添加新分卷
const addVolume = () => {
  tempVolumeList.value.forEach(v => (v.isEditing = false))

  tempVolumeList.value.push({
    id: 'temp-' + Date.now(), // ⬅ 使用字符串 ID 作为临时标识
    book_id: bookId,
    title: '',
    sort: tempVolumeList.value.length + 1,
    created_at: new Date().toISOString(),
    isEditing: true
  })
}

// 编辑指定分卷
const editVolume = (index: number) => {
  tempVolumeList.value.forEach((v, i) => {
    v.isEditing = i === index
  })
}

// 确认编辑
const confirmEditVolume = async (index: number) => {
  const v = tempVolumeList.value[index]

  // 如果没有输入标题，默认使用“第X卷”
  if (!v.title.trim()) {
    v.title = `第${toChineseNumber(index + 1)}卷`
  }

  try {
    if (String(v.id).startsWith('temp-')) {
      // 新建分卷（ID 是临时生成的）
			await createVolume({
			  book_id: bookId,
			  title: v.title,
			  sort: index + 1
			})
      ElMessage.success('新建成功')
    } else {
      // 修改已存在分卷
      await updateVolume({
        id: v.id,
        book_id: bookId,
        title: v.title
      })
      ElMessage.success('修改成功')
    }

    v.isEditing = false
    await fetchList()
  } catch (err) {
    console.error('保存失败', err)
    ElMessage.error('保存失败，请稍后重试')
  }
}

// 取消编辑（恢复原始标题）
const cancelEditVolume = (index: number) => {
  const v = tempVolumeList.value[index]

  if (String(v.id).startsWith('temp-')) {
    // 是新建的分卷 → 移除
    tempVolumeList.value.splice(index, 1)
  } else {
    // 已存在的分卷 → 恢复原标题
    const original = volumeList.value.find(item => item.id === v.id)
    if (original) {
      v.title = original.title
    }
    v.isEditing = false
  }
}

// 删除分卷（带弹窗确认）
const deleteVolume = (index: number) => {
  const volume = tempVolumeList.value[index]

  ElMessageBox.confirm(
    `确定要删除“${volume.title}”吗？该分卷下所有章节也将一并删除，且无法恢复！`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(async () => {
      try {
        await deleteVolumeById(bookId, volume.id)
        ElMessage.success('分卷及其章节已成功删除')

        tempVolumeList.value.splice(index, 1)
        await fetchList()
      } catch (error) {
        console.error('删除失败', error)
        ElMessage.error('删除失败，请稍后重试')
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

// 保存弹窗修改 -> 应用回主 volumeList
const submitVolumeChange = () => {
  volumeList.value = [...tempVolumeList.value]
  showVolumeDialog.value = false
}

// 获取分卷下章节数量
const getChapterCount = (volumeId: number): number => {
  return chapters.value.filter(c => c.volume_id === volumeId).length
}

// 返回上一页
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
.volume-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 8px;
}

.title, .title-editing {
  flex: 1;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
}

.volume-input {
  flex: 1;
  font-size: 14px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 12px;
}

.info {
  font-size: 13px;
  color: #999;
  margin-right: 16px;
}

.action .btn {
  width: 16px;
  height: 16px;
  background-size: 16px auto;
  background-repeat: no-repeat;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
}

.btn1 {
	margin-top: 5px;
  background-image: url('/src/assets/icons/work/d3.png');
}
.btn1:hover {
  background-image: url('/src/assets/icons/work/d4.png');
}
.btn2 {
	margin-top: 5px;
  background-image: url('/src/assets/icons/work/d1.png');
}
.btn2:hover {
  background-image: url('/src/assets/icons/work/d2.png');
}

.dialog-footer-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.dialog-footer-layout .left-section {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.dialog-footer-layout .left-section:hover {
  color: #ff5f00;
}

.dialog-footer-layout .right-section {
  display: flex;
}

.el-icon {
	margin-top: 5px;
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
  color: #666;
}

.el-icon:hover {
  color: #ff5f00;
}

</style>