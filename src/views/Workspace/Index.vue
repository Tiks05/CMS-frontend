<template>
  <div class="workspace-loading">
    <img src="@/assets/images/workspace/Dual-Ring.gif" alt="加载中" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { onMounted } from 'vue'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  const role = userStore.role || 'guest'

  if (role === 'author') {
    router.replace('/workspace/writer')
  } else {
    router.replace('/workspace/apply')
  }
})
</script>

<style scoped>
.workspace-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
}
.workspace-loading img {
  width: 80px;
  height: 80px;
}
</style>
