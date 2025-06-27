<template>
  <header class="header">
    <div class="header-inner">
      <!-- LOGO + 书名区域 -->
      <div class="logo" @click="goTo(`/bookinfo/${bookId}`)">
        <svg
          class="muyeicon-icon muyeicon-icon-reader-icon-back"
          width="12"
          height="24"
          viewBox="0 0 12 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          style="margin: 2px 8px 2px 0px; vertical-align: top"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.2997 18.978C10.5861 19.2658 10.5824 19.7316 10.2914 20.0148C10.0126 20.2863 9.56952 20.2904 9.28556 20.0243L1.27097 12.5125C0.907127 12.1403 0.907127 11.5368 1.27097 11.1646L9.28205 3.48947C9.56705 3.21642 10.0171 3.2182 10.2999 3.49349C10.5881 3.77396 10.5963 4.23423 10.3185 4.52485L3.32031 11.8437C3.32031 11.8437 7.32726 15.9898 10.2997 18.978Z"
          ></path>
        </svg>
        <span class="logo-text">{{ bookTitle }}</span>
      </div>

      <!-- 右侧区域 -->
      <div class="right">
        <!-- 未登录状态 -->
        <div class="auth-links" v-if="!userStore.isLogin">
          <span class="auth-link" @click="goTo('/login')">登录</span>
        </div>

        <!-- 登录状态 -->
        <div class="auth-dropdown" v-else @mouseenter="showDropdown" @mouseleave="hideDropdown">
          <div class="auth-avatar">
            <img :src="userStore.user?.avatar" class="avatar" />
            <span class="auth-username">{{ displayName }}</span>
          </div>

          <div class="dropdown-panel" v-show="dropdownVisible">
            <div class="dropdown-item" @click="goTo('/profile')">
              <img
                src="/src/assets/icons/update/icons8-update-windows-11-outline-32.png"
                class="dropdown-icon"
              />
              <span>修改信息</span>
            </div>
            <div class="dropdown-item" @click="handleLogout">
              <img
                src="/src/assets/icons/logout/icons8-logout-windows-11-filled-32.png"
                class="dropdown-icon"
              />
              <span>退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { useGoTo } from '@/composables/useGoTo'

// 接收传入的书名
defineProps<{
  bookTitle: string
  bookId: string
}>()

const { goTo } = useGoTo()
const userStore = useUserStore()

// 用户名显示逻辑
const displayName = computed(() => {
  if (userStore.user?.nickname?.trim()) return userStore.user.nickname
  return userStore.user?.id?.toString().slice(0, 3) || '用户'
})

// dropdown 控制
const dropdownVisible = ref(false)
let timer: number | null = null

const showDropdown = () => {
  if (timer) clearTimeout(timer)
  dropdownVisible.value = true
}

const hideDropdown = () => {
  timer = window.setTimeout(() => {
    dropdownVisible.value = false
  }, 300)
}

// 退出
const handleLogout = () => {
  userStore.logout()
  goTo('/login')
}
</script>

<style scoped>
.header {
  width: 100%;
  z-index: 100;
}
.header-inner {
  margin: 0 auto;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: #666;
}

.nav-logo {
  width: 28px;
  height: 28px;
  margin-right: 6px;
}

.logo-text {
  font-size: 18px;
  color: #333;
}

.right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 18px;
  color: #333;
}

.auth-link:hover {
  color: #f85959;
  cursor: pointer;
}

.auth-dropdown {
  position: relative;
}

.auth-avatar {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.auth-username {
  font-size: 14px;
  color: #222;
}

.dropdown-panel {
  position: absolute;
  top: 36px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 6px 0;
  min-width: 140px;
  z-index: 999;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f7f7f7;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  object-fit: contain;
}
</style>
