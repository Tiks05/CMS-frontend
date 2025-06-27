<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
userStore.loadUserFromStorage()
</script>

<template>
  <router-view />
</template>

<style scoped></style>
