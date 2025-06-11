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
	import { useGoTo } from '@/composables/useGoTo'
	const list = [
		{type:'年代', title: '姜老太重生支棱了！踹渣夫打逆子', path: "/bookinfo" ,chapter:'第42章 天生当兵的料子',author:'赤小焱',time:'06-07 17:15'},
		{type:'玄幻言情', title: '被黑月光师姐偷走天魂后', path: "/bookinfo" ,chapter:'第15章 初啼之卵与万眸盛宴',author:'喃风吟',time:'06-07 17:15'},
		{type:'男频衍生', title: '四合院不养闲人', path: "/bookinfo" ,chapter:'第9章 利益同盟',author:'一个个的红豆子',time:'06-07 17:15'},
		{type:'玄幻脑洞', title: '我在娘胎能斩神，出生为何变废物', path: "/bookinfo" ,chapter:'第34章 菩提神树 惊天造化',author:'灵台县男神',time:'06-07 17:15'},
		{type:'历史脑洞', title: '开局随机召唤，我在古代争霸天下', path: "/bookinfo" ,chapter:'第43章 神谕归途遇惊变，狼庭深处暗流涌',author:'谚歌辉屿',time:'06-07 17:15'},
		{type:'都市日常', title: '打工路上的情爱往事', path: "/bookinfo" ,chapter:'425 夫妻对战	笔端有风月',author:'谚歌辉屿',time:'06-07 17:15'},
		{type:'男频衍生', title: '雪线牧歌', path: "/bookinfo" ,chapter:'第61章 内部排查保安全',author:'琉球的凯瑟琳',time:'06-07 17:15'},
		{type:'女频衍生', title: '被雷劈后，我拯救了李莲花', path: "/bookinfo" ,chapter:'第129章 李莲花反穿修仙界',author:'周停',time:'06-07 17:15'},
		{type:'动漫衍生', title: '咸阳宫阙三万里', path: "/bookinfo" ,chapter:'120章 机关城小住',author:'墨香犹在',time:'06-07 17:15'},
		{type:'历史脑洞', title: '我在三国当厨神', path: "/bookinfo" ,chapter:'第十四章 担担面破符与龙爪云',author:'七洲陶哥',time:'06-07 17:15'},
		{type:'悬疑脑洞', title: '诡域猎杀，当恐惧降临之时', path: "/bookinfo" ,chapter:'第26章 海雾中的低语',author:'歆歆大人',time:'06-07 17:15'}
	]
	const { goTo } = useGoTo()
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
	.recently_list table tr{}
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