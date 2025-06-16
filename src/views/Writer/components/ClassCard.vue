<template>
  <div class="classcard" @click="goTo(classitem.path)">
    <div class="pic">
      <img :src="classitem.cover_url" alt="cover" />
      <div class="btn" v-if="classitem.is_include_video">
        <img src="/src/assets/images/writer/classroom/play-icon.png" alt="play" />
      </div>
    </div>
    <div class="text">
      <div class="name">{{ classitem.title }}</div>
      <div class="content">{{ classitem.intro }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGoTo } from '@/composables/useGoTo'
const { goTo } = useGoTo()

interface ClassroomItem {
  title: string
  intro: string
  cover_url: string
  path: string
  is_include_video: boolean
}

const props = defineProps<{
  classitem: ClassroomItem
}>()
</script>

<style scoped>
.classcard {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.classcard .pic {
  border-radius: 8px;
  height: 225px;
  mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMzIiIGhlaWdodD0iMjI3IiBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjMDAwIiBkPSJNMjMyIDE3OS4xMDlhMjQ2LjggMjQ2LjggMCAwIDEtNjcuNzkyIDM0LjcyMkEyNDYuOTYgMjQ2Ljk2IDAgMCAxIDAgMjEwLjQ2M1YwaDIzMnoiLz48L3N2Zz4=);
  overflow: hidden;
  width: 232px;
  position: relative;
}

.classcard .pic > img {
  height: 225px;
  width: 232px;
  transition: 0.3s;
  vertical-align: middle;
}

.classcard .pic .btn {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 56px;
  height: 56px;
  opacity: 0.6;
  transform: translate(-50%, -50%);
}
.classcard .pic .btn:hover {
  opacity: 1;
}
.classcard .pic .btn img {
  width: 56px;
  vertical-align: middle;
}

.classcard:hover .pic > img {
  transform: scale(1.1);
  transition: 0.3s;
}

.classcard .text {
  padding: 15px 12px;
}

.classcard .text .name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 208px;
	line-clamp: 2; 
}

.classcard .text .content {
  color: #0006;
  font-size: 12px;
  font-weight: 400;
  height: 39px;
  overflow: hidden;
  margin-top: 4px;
}
</style>
