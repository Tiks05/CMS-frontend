<template>
  <div class="index_booklist">
    <div class="booklist_con" ref="container" @mousemove="handleMouseMove" :style="contentStyle">
      <div class="dong_list" v-for="(i, iIndex) in 6" :key="iIndex" :class="i % 2 == 0 ? '' : 'dong_list_on'">
        <div class="item" v-for="(j, jIndex) in 3" :key="jIndex + 100">
          <div class="pic" @click="goTo(adaptlist[i * 3 + j]?.path)">
            <img :src="adaptlist[i * 3 + j]?.pic" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGoTo } from '@/composables/useGoTo'
import { getAdaptList } from '@/apis/home'  // 你已有的后端接口封装

// 后端返回的数据类型
interface AdaptItem {
  id: number;
  pic: string;
  path: string;
}

const adaptlist = ref<AdaptItem[]>([])
const { goTo } = useGoTo()

// 动态获取后端数据
const fetchData = async () => {
  const res = await getAdaptList(22)  // 每次要 22 条
  adaptlist.value = res.data.data as AdaptItem[]
}

onMounted(() => {
  fetchData()
})

// 视差逻辑部分
const container = ref<HTMLElement | null>(null)
const mouseX = ref(0.5)
const mouseY = ref(0.5)
const moveStrength = 180
const smoothness = 60

const contentStyle = computed(() => {
  const offsetX = (mouseX.value - 0.5) * -moveStrength
  const offsetY = (mouseY.value - 0.5) * -moveStrength
  return {
    transform: `translate(${offsetX}px, ${offsetY}px)`,
    transition: `transform ${smoothness}ms ease-out`
  }
})

const handleMouseMove = (e: MouseEvent) => {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  mouseX.value = (e.clientX - rect.left) / rect.width
  mouseY.value = (e.clientY - rect.top) / rect.height
}
</script>

<style scoped>
	.index_booklist {
		overflow: hidden;
		padding: 0 50px;
		width: 100%;
		height: 850px;
		/* 关键：添加明确高度 */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.booklist_con {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		gap: 100px;
		justify-content: center;
	}

	.index_booklist .dong_list {
		width: 318px;
		display: flex;
		flex-direction: column;
	}

	.index_booklist .dong_list .item {
		margin: 40px 0;
		text-align: center;
	}

	.index_booklist .dong_list .item:first-child {
		margin-top: 0;
	}

	.index_booklist .dong_list .item:last-child {
		margin-bottom: 0;
	}

	.index_booklist .dong_list .item .pic {
		width: 215px;
		height: 290px;
		cursor: pointer;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
		display: inline-block;
		overflow: hidden;
		position: relative;
		border-radius: 5px;
	}

	.index_booklist .dong_list .item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease-out;
	}

	.index_booklist .dong_list .item:hover img {
		transform: scale(1.08);
	}

	.index_booklist .dong_list.dong_list_on {
		transform: translateY(-73px);
	}

	.index_booklist .dong_list {
		transform: translateY(73px);
	}
</style>