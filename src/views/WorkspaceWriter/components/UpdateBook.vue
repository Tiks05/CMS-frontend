<template>
  <div class="tower_con">
    <div class="serial-card">
      <div class="book-info-container">
        <div class="book-info-header-back" @click="goBack">
          <svg
            class="serial-icon serial-icon-general_arrow1_left icon-left"
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.3076 26.6066C20.9171 26.9971 20.2839 26.9971 19.8934 26.6066L9.99387 16.7071C9.60335 16.3166 9.60335 15.6834 9.99387 15.2929L19.8934 5.3934C20.2839 5.00287 20.9171 5.00287 21.3076 5.3934C21.6981 5.78392 21.6981 6.41709 21.3076 6.80761L12.1152 16L21.3076 25.1924C21.6981 25.5829 21.6981 26.2161 21.3076 26.6066Z"
            ></path>
          </svg>
          修改作品信息
        </div>
      </div>

      <div class="noveledit">
        <!-- 封面上传 -->
        <div class="pic">
          <img :src="coverPreview" alt="封面图" />
          <span>
            选择封面
            <input type="file" accept="image/*" @change="handleCoverChange" />
          </span>
        </div>

        <!-- 书名 -->
        <div class="item">
          <div class="span"><em>*</em>书本名称</div>
          <input class="txt" type="text" v-model="name" />
        </div>

        <!-- 读者频道 -->
        <div class="item">
          <div class="span">目标读者</div>
          <label>
            <input
              name="pictype"
              type="radio"
              class="choes_dan"
              value="男生"
              v-model="readerType"
            />男频
          </label>
          <label>
            <input
              name="pictype"
              type="radio"
              class="choes_dan"
              value="女生"
              v-model="readerType"
            />女频
          </label>
        </div>

        <!-- 标签选择 -->
        <div class="item">
          <div class="span">作品标签</div>
          <select class="txt" v-model="tag">
            <option value="科幻末世">科幻末世</option>
            <option value="玄幻仙侠">玄幻仙侠</option>
            <option value="都市生活">都市生活</option>
            <option value="悬疑推理">悬疑推理</option>
          </select>
        </div>

        <!-- 主角名 -->
        <div class="item">
          <div class="span">主角名</div>
          <input type="text" class="txt txt2" placeholder="请输入主角名1" v-model="hero1" />
          <input type="text" class="txt txt2 txt3" placeholder="请输入主角名2" v-model="hero2" />
        </div>

        <!-- 简介 -->
        <div class="item">
          <div class="span">作品简介</div>
          <textarea placeholder="请输入作品简介" v-model="introduction"></textarea>
        </div>

        <!-- 按钮 -->
        <div class="btn">
          <span class="btn1" @click="goBack">取消</span>
          <span class="btn2" @click="submitUpdate">立即修改</span>
        </div>
      </div>
    </div>

    <FooterCopyright />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FooterCopyright from '@/views/WorkspaceWriter/components/FooterCopyright.vue'
import { ElMessage } from 'element-plus'
import { updateBookInfo, getBookDetail } from '@/apis/workspace'
import { useGoTo } from '@/composables/useGoTo'
import { useUserStore } from '@/stores/useUserStore'

const route = useRoute()
const userStore = useUserStore()
const { goTo } = useGoTo()

const bookId = Number(route.params.bookId)

const coverPreview = ref<string>('/src/assets/images/workspace/writer/default_cover.png')
const coverFile = ref<File | null>(null)

const name = ref('')
const readerType = ref<'男生' | '女生'>('男生')
const tag = ref('科幻末世')
const hero1 = ref('')
const hero2 = ref('')
const introduction = ref('')

// ① 页面加载：根据 bookId 获取书籍详情
const fetchBook = async () => {
  try {
    const res = await getBookDetail(bookId)
    const data = res.data
    name.value = data.title
    readerType.value = data.target_readers as '男生' | '女生'
    tag.value = data.tags
    const roles = (data.main_roles || '').split(' / ')
    hero1.value = roles[0] || ''
    hero2.value = roles[1] || ''
    introduction.value = data.intro
    if (data.cover_url) coverPreview.value = data.cover_url
  } catch (err) {
    console.error(err)
    ElMessage.error('加载作品信息失败')
  }
}

// ② 上传封面
const handleCoverChange = (e: Event) => {
  const file = (e.target as HTMLInputElement)?.files?.[0]
  if (!file) return
  coverFile.value = file

  const reader = new FileReader()
  reader.onload = () => {
    coverPreview.value = reader.result as string
  }
  reader.readAsDataURL(file)
}

// ③ 提交更新
const submitUpdate = async () => {
  if (!name.value.trim()) return ElMessage.warning('请输入书名')
  if (!introduction.value.trim()) return ElMessage.warning('请输入简介')

  const formData = new FormData()
  formData.append('book_id', String(bookId))
  formData.append('name', name.value.trim())
  formData.append('reader_type', readerType.value)
  formData.append('tag', tag.value)
  formData.append('hero', `${hero1.value.trim()} / ${hero2.value.trim()}`)
  formData.append('introduction', introduction.value.trim())

  if (coverFile.value) {
    formData.append('cover', coverFile.value)
  }

  try {
    await updateBookInfo(formData)
    ElMessage.success('修改成功！')
    goTo('/workspace/writer')
  } catch (err) {
    console.error(err)
    ElMessage.error('修改失败，请稍后重试')
  }
}

const goBack = () => {
  window.history.back()
}

onMounted(() => {
  fetchBook()
})
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
  display: flex;
  align-items: center;
  color: var(--Color_gray_100, #000);
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
  margin-bottom: 12px;
  position: relative;
}

.book-info-container .book-info-header-back:hover {
  color: var(--Color_brand, #ff5f00);
  cursor: pointer;
}

.book-info-container .book-info-header-back .icon-left {
  font-size: 24px;
  margin-right: 8px;
}

.noveledit {
  margin-top: 50px;
  padding-left: 152px;
  position: relative;
}

.noveledit .pic {
  position: absolute;
  left: 0;
  top: 0;
  width: 116px;
  text-align: center;
}

.noveledit .pic img {
  width: 116px;
  height: 156px;
  border-radius: 5px;
}

.noveledit .pic span {
  display: inline-block;
  width: 96px;
  height: 36px;
  margin-top: 15px;
  font-size: 14px;
  color: #000;
  background-color: #f5f5f5;
  line-height: 36px;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
}

.noveledit .pic span:hover {
  background-color: #ddd;
}

.noveledit .pic span input {
  position: absolute;
  opacity: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.noveledit .item {
  margin-bottom: 30px;
  padding-left: 116px;
  position: relative;
}

.noveledit .item .span {
  position: absolute;
  left: 0;
  top: 11px;
  font-size: 14px;
  color: #333;
}

.noveledit .item .span em {
  color: #ff0000;
  font-style: normal;
  font-weight: bold;
  margin-right: 3px;
}

.noveledit .item .txt {
  width: 100%;
  height: 40px;
  padding: 0 8px;
  border: none;
  outline: none;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.noveledit .item label {
  display: inline-block;
  height: 40px;
  line-height: 48px;
  margin-right: 20px;
}

.noveledit .item label input {
  margin-right: 8px;
}

.noveledit .item .txt2 {
  width: 320px;
}

.noveledit .item .txt3 {
  margin-left: 18px;
}

.noveledit .item textarea {
  width: 100%;
  height: 170px;
  padding: 8px;
  resize: none;
  border: none;
  outline: none;
  font-family: '微软雅黑';
  background-color: #f5f5f5;
}

.noveledit .btn {
  text-align: right;
}

.noveledit .btn span {
  display: inline-block;
  width: 96px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  margin-left: 20px;
  border-radius: 50px;
  cursor: pointer;
}

.noveledit .btn .btn1 {
  background-color: #ddd;
  color: #333;
}

.noveledit .btn .btn2 {
  color: #fff;
  background: linear-gradient(96deg, #ff9a62, #ff5f00), #ff5f00;
}

.noveledit .btn .btn2:hover {
  background: #ff5f00;
}
</style>
