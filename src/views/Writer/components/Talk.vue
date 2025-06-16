<template>
	<div class="author_talk">
		<div class="talk_title">
			<span>作家有话说 <img :src="tit1" alt=""></span>			
		</div>
		<div class="item item_one">
			<div class="con">
				<div class="pic">
					<img :src="t1" alt="">
				</div>
				<div class="text">
					<p>从落笔写下这个故事开始，便感觉自己随时面临挑战，想要将沉重的牺牲与少年的热血结合并不是一件容易的事情。我想写的并非只是一个人，而是一群在逆境中敢于挺身而出，秉持各自信念，向未知挑战的故事。</p>
					<img :src="t2" alt="">
				</div>
			</div>
		</div>
		
		<div class="item item_two">
			<div class="con">
				<div class="text">
					<p>创作一定要为难自己，作者有多苛求自己，作品就有多精彩，读者就有多喜爱。</p>
					<img :src="t4" alt="">
				</div>
				<div class="pic">
					<img :src="t3" alt="">
				</div>
			</div>
		</div>
		
		<div class="item item_three">
			<div class="con">
				<div class="pic">
					<img :src="t5" alt="">
				</div>
				<div class="text">
					<p>用文字书写心中的故事，倾注全部的感情与热爱，创造一个不同于现实，但又多姿多彩的崭新的小说世界。在小说这个世界里，有你有我有他，有我们一群志同道合的人，一起奔赴。</p>
					<img :src="t6" alt="">
				</div>
			</div>
		</div>
		
		<div class="item_pic">
			<img :src="t7" alt="">
		</div>
	</div>
</template>

<script setup lang="ts">
const tit1 = new URL('@/assets/images/writer/talk/tit-1.png', import.meta.url).href
const t1 = new URL('@/assets/images/writer/talk/talk-1.png', import.meta.url).href
const t2 = new URL('@/assets/images/writer/talk/talk-2.png', import.meta.url).href
const t3 = new URL('@/assets/images/writer/talk/talk-3.png', import.meta.url).href
const t4 = new URL('@/assets/images/writer/talk/talk-4.png', import.meta.url).href
const t5 = new URL('@/assets/images/writer/talk/talk-5.png', import.meta.url).href
const t6 = new URL('@/assets/images/writer/talk/talk-6.png', import.meta.url).href
const t7 = new URL('@/assets/images/writer/talk/talk-7.png', import.meta.url).href
</script>

<style scoped>
.talk_title {
	text-align: center;
	background-color: #fff;
	height: 620px;
	justify-content: center;
	display: flex;
	align-items: center;
}

.talk_title span {
	display: inline-block;
	width: 1em;
	position: relative;
	font-size: 38px;
	line-height: 1.1;
}

.talk_title span img {
	position: absolute;
	width: 62px;
	vertical-align: middle;
	left: 102%;
	bottom: 0;
}

.author_talk .con {
	margin: 0 auto;
	width: 1240px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.author_talk .con .pic img {
	height: 507px;
	width: 380px;
}

.author_talk .con .text {
	width: 660px;
}

.author_talk .con .text p {
	font-size: 18px;
	color: #000;
	line-height: 1.6;
}

.author_talk .item {
	height: 760px;
	margin-top: -200px;
}

.author_talk .item_one {
	mask: url('@/assets/images/writer/talk/talk-bkg-2.svg');
	background-color: #dad6cc;
	padding-top: 150px;
}

.author_talk .item .text img {
	width: 131px;
	vertical-align: middle;
	margin-top: 30px;
	float: right;
}

.author_talk .item_two {
	mask: url('@/assets/images/writer/talk/talk-bkg-3.svg');
	background-color: #ff5f00;
	padding-top: 100px;
}

.author_talk .item_two .con .text p {
	color: #fff;
}

.author_talk .item_three {
	mask: url('@/assets/images/writer/talk/talk-bkg-2.svg');
	background-color: #dad6cc;
	padding-top: 100px;
	margin-top: -330px;
}

.author_talk .item_three .text img {
	width: 95px;
	margin-top: 60px;
}

.author_talk .item_pic {
	margin-top: -230px;
	position: relative;
	z-index: 9;
}

.author_talk .item_pic img {
	width: 100%;
	vertical-align: middle;
}
</style>
