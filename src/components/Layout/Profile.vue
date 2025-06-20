<template>
  <Header v-if="navMenus" :menus="navMenus" />

  <div class="authorwriter">
    <div class="author">
      <div class="mass">
        <img src="/src/assets/images/layout/profile/bg-1.png" alt="提示图" />
        <div class="text">
          <h5>完善你的个人资料，让更多人了解你</h5>
          <p>1. 昵称、头像和简介将展示在你的个人主页；2. 好的个人资料能让你脱颖而出，吸引更多关注</p>
        </div>
      </div>

      <div class="fill_in">
        <!-- 作家头像 -->
        <div class="item">
          <div class="span"><b>*</b>修改头像</div>
          <div class="up_pic">
            <img :src="previewAvatar || userStore.avatar" alt="用户头像" />
            <div class="btn">
              上传头像
              <input type="file" accept="image/*" @change="handleAvatarChange" />
            </div>
          </div>
        </div>

        <!-- 笔名 -->
        <div class="item">
          <div class="span"><b>*</b>昵称</div>
          <div class="input">
            <input maxlength="10" type="text" placeholder="请勿使用特殊符号或有明显营销推广意图的名称" v-model="name" />
            <div class="num">{{ name.length }} / 10</div>
          </div>
        </div>

        <!-- 简介 -->
        <div class="item">
          <div class="span"><b>*</b>个人简介</div>
          <div class="input">
            <input maxlength="30" type="text" placeholder="10-30字，写点有趣的介绍，让大家更了解你～" v-model="introduction" />
            <div class="num">{{ introduction.length }} / 30</div>
          </div>
        </div>

        <!-- 协议 -->
        <div class="apply" @click="toggleApply">
          <div class="icon" :class="{ on: apply }"></div>
          <p>我已阅读并同意<a href="#">《个人信息保护声明》</a></p>
        </div>

        <p v-if="hasInteracted && !apply" class="error-tip">
          请阅读并同意《个人信息保护声明》
        </p>

        <!-- 提交按钮 -->
        <div class="submit">
          <el-button
            class="submit-btn"
            :class="{ active: canSubmit }"
            :disabled="false"
            :style="{
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              pointerEvents: canSubmit ? 'auto' : 'none'
            }"
            @click="canSubmit ? submitApply() : null"
          >
            确认修改
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Layout/Header.vue'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { ElMessage } from 'element-plus'
import { applyAsAuthor } from '@/apis/layout'
import { useGoTo } from '@/composables/useGoTo'

const { goTo } = useGoTo()
const userStore = useUserStore()

const name = ref(userStore.nickname || '')
const introduction = ref(userStore.signature || '')
const apply = ref(false)
const hasInteracted = ref(false)

const previewAvatar = ref<string>('')        // 头像预览地址
const avatarFile = ref<File | null>(null)    // 上传头像文件

// 头像上传处理
const handleAvatarChange = (e: Event) => {
  const file = (e.target as HTMLInputElement)?.files?.[0]
  if (!file) return

  avatarFile.value = file
  const reader = new FileReader()
  reader.onload = () => {
    previewAvatar.value = reader.result as string
    console.log('头像预览地址:', previewAvatar.value)
  }
  reader.readAsDataURL(file)
}

// 协议勾选
const toggleApply = () => {
  hasInteracted.value = true
  apply.value = !apply.value
}

// 可提交判定逻辑
const canSubmit = computed(() =>
  name.value.trim() !== '' &&
  introduction.value.trim().length >= 10 &&
  apply.value === true
)

const submitApply = async () => {
  const formData = new FormData()
  formData.append('id', String(userStore.user?.id))
  formData.append('avatar', userStore.user?.avatar || '')
  formData.append('name', name.value.trim())
  formData.append('introduction', introduction.value.trim())

  // 如果用户上传了新头像就添加到表单
  if (avatarFile.value) {
    formData.append('avatar', avatarFile.value)
  }

  try {
    const res = await applyAsAuthor(formData)

    userStore.setUser({
      ...userStore.user!,
      avatar: res.data.avatar || userStore.user?.avatar,
      nickname: res.data.nickname || name.value.trim(),
      signature: res.data.signature || introduction.value.trim()
    })

    ElMessage.success('修改个人信息成功！')
    goTo('/home')
  } catch (err: any) {
    console.error('申请失败:', err)
    ElMessage.error('修改失败，请稍后重试')
  }
}

const navMenus:any = []
</script>

<style scoped>
.author {
  width: 864px;
  margin: 65px auto 0;
  border-radius: 15px;
  background-color: #fff;
  padding: 30px 30px 330px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.02);
}

.author .mass {
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 15px 30px 15px 150px;
  margin-bottom: 48px;
  position: relative;
  height: 110px;
}

.author .mass img {
  position: absolute;
  width: 80px;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
}

.author .mass h5 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
}

.author .mass p {
  font-size: 14px;
  color: #999;
  line-height: 1.6;
}

.fill_in .item {
  display: flex;              /* 横向布局 */
  align-items: center;
  margin-bottom: 30px;
}

.fill_in .item .span {
  width: 100px;               /* 固定左边文字宽度 */
  font-size: 14px;
  color: #aaa;
}

.fill_in .item .span b {
  color: #ff5f00;
  margin-right: 3px;
}

.up_pic {
  display: flex;              /* 右侧头像区域横向布局 */
  align-items: center;
  gap: 24px;
}

.up_pic img {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  vertical-align: middle;
  object-fit: cover;
}

.up_pic .btn {
  position: relative;
  width: 96px;
  height: 36px;
  border-radius: 50px;
  background-color: #f5f5f5;
  font-size: 14px;
  color: #333;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.up_pic .btn:hover {
  background-color: #ebebeb;
}

.up_pic input[type='file'] {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.input {
  position: relative;
  width: 100%;
}

.input input {
  width: 100%;
  height: 38px;
  padding: 0 74px 0 15px;
  border-radius: 50px;
  border: 1px solid #ebebeb;
  outline: none;
  font-size: 14px;
  background-color: #fff;
  color: #333;
}

.input input:focus {
  border: 2px solid #ff5f00;
}

.input input:hover {
  border-color: #ff5f00;
}

.input input::placeholder {
  color: #ccc;
}

.num {
  position: absolute;
  top: 50%;
  right: 0;
  width: 74px;
  transform: translateY(-50%);
  font-size: 14px;
  text-align: center;
  color: #c0c0c0;
}

.apply {
  margin-left: 80px;
  font-size: 14px;
  color: #999;
  padding-left: 36px;
  position: relative;
  cursor: pointer;
}

.apply a {
  text-decoration: underline;
  color: #ff5f00;
}

.apply .icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: 1px solid #aaa;
  border-radius: 3px;
}

.apply .icon.on {
  border-color: #ff5f00;
  background-image: url(/src/assets/images/layout/profile/masked.png);
  background-size: 100% 100%;
}

.error-tip {
  color: #ff5f00;
  font-size: 14px;
  margin-left: 90px;
  margin-top: 10px;
  line-height: 1.5;
}

.submit {
  text-align: center;
  margin-top: 60px;
}

.submit-btn {
  width: 120px;
  height: 38px;
  background: linear-gradient(to right, #ffd8c2, #ffe9df);
  border-radius: 999px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  border: none;
  transition: all 0.2s ease;
  text-align: center;
}

.submit-btn.active {
  background: linear-gradient(to right, #ff8140, #ffa56f);
}
</style>