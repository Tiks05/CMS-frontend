<template>
  <div class="workspace-loading">
    <img src="@/assets/images/workspace/Dual-Ring.gif" alt="加载中" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  router.replace('/workspace/apply')
})
</script>

<style scoped>
.workspace-loading {
  position: fixed;
  left: 0; top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;           /* 比页面其它内容高 */
}
.workspace-loading img {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
}
</style>
