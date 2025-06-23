<template>
	<div class="bg_hui">
		<div class="recently_wrapper">

			<div class="tit">
				<h2>最近更新</h2>
			</div>
			<div class="recently_list">
				<table>
					<tr>
						<th>类型</th>
						<th>书名</th>
						<th>最新章节</th>
						<th>作者</th>
						<th>更新时间</th>
					</tr>
					<tr v-for="(item, index) in list" :key="index" @click="goTo(item.path)">
						<td class="one">{{item.type}}</td>
						<td>{{item.title}}</td>
						<td>{{item.chapter}}</td>
						<td>{{item.author}}</td>
						<td>{{item.time}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGoTo } from '@/composables/useGoTo'
import { getRecentUpdates } from '@/apis/home'

interface UpdateItem {
  type: string
  title: string
  chapter: string
  author: string
  time: string
  path: string
}

const list = ref<UpdateItem[]>([])

const { goTo } = useGoTo()

const fetchRecentUpdates = async () => {
  try {
    const res = await getRecentUpdates()
    list.value = res.data
  } catch (err) {
    console.error('获取最近更新失败', err)
  }
}

onMounted(fetchRecentUpdates)
</script>

<style scoped>
	.bg_hui {
		background-color: #fbfbfb;
		padding: 85px 0;
	}

	.recently_wrapper {
		width: 1240px;
		margin-left: auto;
		margin-right: auto;
	}

	.recently_wrapper .tit {
		text-align: center;
	}

	.recently_wrapper h2 {
		font-size: 24px;
		color: #000;
		position: relative;
		display: inline-block;
		padding-right: 35px;
		line-height: 1;
	}

	.recently_wrapper h2:after {
		content: "";
		display: block;
		right: 0;
		top: 50%;
		transform: translateY(-60%);
		position: absolute;
		width: 31px;
		height: 32px;
		background-image: url('@/assets/images/tit1.png');
		background-size: 100% 100%;
	}
	
	.recently_list{margin-top: 42px;}
	.recently_list table{width: 100%;}
	.recently_list table th{height: 68px;border-bottom: 1px solid #e4e4e4;
		text-align: left;font-size: 16px;color: #999;
	}
	.recently_list table td{height: 68px;border-bottom: 1px solid #e4e4e4;
		font-size: 16px;color: #333;cursor: pointer;
	}
	
	.recently_list table td.one{color: #999;}
	.recently_list table td.one:hover{color: #999;}
	.recently_list table td:hover{color: #ff5f00;}
	
</style>