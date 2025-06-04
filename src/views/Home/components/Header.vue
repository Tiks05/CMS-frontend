<template>
  <header class="header">
    <div class="header-inner">
      <!-- LOGO 区域 -->
      <div class="logo">
        <img :src="logo" class="nav-logo" />
        <span class="logo-text">CMS</span>
      </div>

      <!-- 导航菜单 -->
      <nav class="nav-list">
        <span
          v-for="item in menus"
          :key="item.path"
          :class="['nav-item', { active: isActive(item.path) }]"
          @click="goTo(item.path)"
        >
          {{ item.label }}
        </span>
      </nav>

      <!-- 右侧区域 -->
      <div class="right">
        <!-- 搜索框 -->
        <el-input
         v-model="searchText"
         placeholder="请输入书名或作者名"
         class="search-input"
         size="large"
         clearable
       >
         <template #suffix>
           <el-icon><Search /></el-icon>
         </template>
       </el-input>

        <span class="divider">|</span>

        <!-- 未登录状态 -->
        <div class="auth-links" v-if="!userStore.isLogin">
          <span class="auth-link" @click="goTo('/login')">登录</span>
          <span class="auth-link" @click="goTo('/login')">注册</span>
        </div>

        <!-- 登录状态头像区域 -->
        <div
          class="auth-dropdown"
          v-else
          @mouseenter="showDropdown"
          @mouseleave="hideDropdown"
        >
          <div class="auth-avatar">
            <img :src="userStore.user?.avatar || defaultAvatar" class="avatar" />
            <span class="auth-username">{{ displayName }}</span>
          </div>
        
          <div class="dropdown-panel" v-show="dropdownVisible">
            <div class="dropdown-item" @click="goTo('/profile')">
              <img :src="iconUpdate" class="dropdown-icon" />
              <span>修改信息</span>
            </div>
            <div class="dropdown-item" @click="handleLogout">
              <img :src="iconLogout" class="dropdown-icon" />
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
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { useGoTo } from '@/composables/useGoTo'
import { Search } from '@element-plus/icons-vue'

const { goTo } = useGoTo()
const route = useRoute()
const searchText = ref('')
const userStore = useUserStore()

const logo = new URL('@/assets/icons/logo/icons8-firebase-undefined-32.png', import.meta.url).href
const defaultAvatar = new URL('@/assets/icons/Profile/icons8-user-pulsar-color-32.png', import.meta.url).href
const iconUpdate = new URL('@/assets/icons/update/icons8-update-windows-11-outline-32.png', import.meta.url).href
const iconLogout = new URL('@/assets/icons/logout/icons8-logout-windows-11-filled-32.png', import.meta.url).href

const menus = [
  { path: '/home', label: '首页' },
  { path: '/library', label: '书库' },
  { path: '/bookshelf', label: '书架' },
  { path: '/author', label: '作家专区' },
  { path: '/copyright', label: '版权专区' }
]

const isActive = (path: string) => route.path === path

const handleLogout = () => {
  userStore.logout()
  goTo('/login')
}

const displayName = computed(() => {
  if (userStore.user?.username?.trim()) return userStore.user.username
  return userStore.user?.id?.toString().slice(0, 3) || '用户'
})

// 👇 dropdown 显示控制（含延迟隐藏）

const dropdownVisible = ref(false)
let timer: number | null = null

const showDropdown = () => {
  if (timer) clearTimeout(timer)
  dropdownVisible.value = true
}

const hideDropdown = () => {
  timer = window.setTimeout(() => {
    dropdownVisible.value = false
  }, 300) // 延迟300ms再隐藏，避免点不到
}

</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: transparent;
}

.header-inner {
  width: 1240px;
  padding: 0 10px;
  margin: 0 360px 0 320px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.nav-logo {
  width: 28px;
  height: 28px;
  margin-right: 6px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #222;
}

.nav-list {
  display: flex;
  justify-content: center;
  margin: 0 80px 0 280px;
  gap: 68px;
  flex: 1;
  white-space: nowrap;
}

.nav-item {
  font-size: 14px;
  color: #222;
  position: relative;
  cursor: pointer;
  padding: 4px 0;
}

.nav-item:hover::after {
  width: 100%;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #222;
  transition: width 0.3s ease;
}

.nav-item.active {
  color: #000;
  font-weight: bold;
}

.right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 100px;
  flex-shrink: 0;
}

.search-input {
  width: 180px;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255);
  backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-input :deep(.el-input__wrapper) {
  height: 32px;
  padding: 0 10px;
  background-color: transparent;
  border-radius: 999px;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
}

.search-input :deep(.el-input__inner) {
  height: 32px;
  line-height: 32px;
  font-size: 11px;
  padding: 0;
  background-color: transparent;
  border: none;
  box-shadow: none;
  color: #333;
  display: flex;
  align-items: center;
}

.divider {
  color: #ccc;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 14px;
  user-select: none;
  line-height: 1;
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 14px;
  color: #222;
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
  right: 0;
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
