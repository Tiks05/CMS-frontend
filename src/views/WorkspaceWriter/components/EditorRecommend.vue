<template>
	<div class="home-activity">
		<div class="serial-card">
			<div class="home-activity-title">
				<h4>主编力签</h4>
				<span class="author-title-extra">
					<span class="home-activity-title-more">查看全部 
					<svg class="serial-icon serial-icon-general_arrow_circle label-icon" width="1em" height="1em"
							viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M14.7071 10.359C14.3166 9.96849 13.6835 9.96849 13.2929 10.359C12.9024 10.7495 12.9024 11.3827 13.2929 11.7732L17.5356 16.0159L13.2929 20.2585C12.9024 20.649 12.9024 21.2822 13.2929 21.6727C13.6835 22.0632 14.3166 22.0632 14.7071 21.6727L19.6569 16.723C20.0474 16.3325 20.0474 15.6993 19.6569 15.3088L14.7071 10.359Z">
							</path>
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3ZM5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16Z">
							</path>
						</svg></span></span></div>
						
			<div class="editor_swiper">
				<swiper :modules="[Pagination,Autoplay]" :pagination="{ clickable: true }" @swiper="onSwiper" :effect="'fade'" :loop="true" :autoplay="{delay: 3000}">
					<swiper-slide v-for="(slide, index) in list" :key="index">
						<div class="slide-content">
							<div class="h5">{{slide.title}}</div>
							<div class="p">{{slide.desc}}</div>
							<div class="mass">
								<div class="pic">
									<img :src="slide.pic" alt="">
									
								</div>
								<p>{{slide.desc2}}</p>
							</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount } from 'vue'
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { Pagination, EffectFade ,Autoplay } from 'swiper/modules';
	
	import 'swiper/css';
	import 'swiper/css/pagination';
	import 'swiper/css/effect-fade';
	import 'swiper/css/autoplay';
	
	const onSwiper = (swiper : any) => {
		setTimeout(() => swiper.update(), 100);
	};
	
	const list=[{
		title:'黑科技文，让科幻不再遥远',
		desc:'一直以来，科幻似乎都只是出版物的领域，三体、智子、流浪地球、球状闪电，一个个脑洞大开奇美瑰丽的设想，和网文显得那么遥远。可是网文真的不能拥有科幻吗？老套的末日之外网文作者的脑洞不能释放吗？并非如此！黑科技文，让科幻不再遥远。可控核聚变，光学隐身，航母，太空站，太空电梯，机甲，无人机，各种各样的科技一样可以在网文中发光发热，最有科幻风格的升级变强，当然就是爬科技树，不论是末日前带领国家一起肝科技拯救世界，还是架空背景下帮助国家打破科技封锁，还是帮助人类走进太空，走进宇宙，在系统的帮助下，黑科技文变得不再难写，爽点十足，首秀有量，快来试试吧。',
		desc2:'黑科技文，最脑洞大开的升级之路，好写有量，爽点十足',
		pic:'/src/assets/images/workspace/writer/profile1.png'
	},{
		title:'竞技类游戏文！映照潮汐的起伏，以免迷失战',
		desc:'所有的星星眼，都在等一颗星。 而我们在等你。 你曾少年义气，与三五好友通宵闯关； 你曾怀揣梦想，对战场策略指点江河； 你曾心似骄阳，在决斗场上分秒必争； 你也曾与梦中穿梭，赞叹于自己无数次回眸的幻想国度。 掉色的键盘、卡顿的电脑、遗失于角落里的老账号与游戏卡带. 是承载着我们记忆的青春。 来这里吧， 在游戏竞技的征途中，追忆和期盼，都可以书写下来。',
		desc2:'竞技类游戏文空间广潜力大，各类游戏均收，审稿迅速',
		pic:'/src/assets/images/workspace/writer/profile2.png'
	},{
		title:'恐怖末世题材，读者最爱的诡异世界神豪文！',
		desc:'惊悚灵异背景的神豪文！末世降临诡异复苏的时代里，财产可能失去了意义，但主角还是可以当神豪！只不过主角的万亿资产不再是钱，而是诡异世界里的冥符、阴兵……神豪变成诡豪，读者喜闻乐见的神豪套路，换成惊悚元素，就能带来全新的新鲜感刺激感，成为有辨识度和的新类型',
		desc2:'末世降临万诡横行，诡豪套路助你成就大神！',
		pic:'/src/assets/images/workspace/writer/profile3.png'
	},{
		title:'我问燕子你为啥来，燕子说，现言脑洞好赚钱',
		desc:'以现代为基站，以时光为媒介，直播星际，求生末世，逆袭娱乐圈，养成小萌宝，带着空间囤地球，绑定系统踏宇宙，为国家出战，为女性高歌，在脑洞中遨游，写出你的脑内须弥！',
		desc2:'门槛低，上限高，脑洞大于文笔，快来尝试！',
		pic:'/src/assets/images/workspace/writer/profile4.png'
	}]
</script>

<style scoped>

.home-activity {
	background-color: #fff;
	padding: 15px;
	border-radius: 10px;
	margin-top: 15px;
}

.home-activity-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.home-activity-title h4{
	font-size: 20px;
	font-weight: normal;
}

.home-activity-title-more{
    align-items: center;
    color: #0006;
    cursor: pointer;
    display: flex;
    flex: 1;
    font-size: 14px;
    font-weight: 400;
    justify-content: flex-end;
    line-height: 20px;
}

</style>


<style>
	.editor_swiper {
		background-color: rgba(0, 0, 0, 0.02);
		margin-top: 6px;
		padding: 20px;
		border-radius: 12px;
		position: relative;
	}
	
	.editor_swiper .slide-content {
		height: 150px;
	}
	
	.editor_swiper .slide-content .h5 {
		font-size: 16px;
		font-weight: normal;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.editor_swiper .slide-content .p {
		color: #999;
		cursor: pointer;
		height: 45px;
		overflow: hidden;
		font-size: 14px;
		margin-top: 8px;
	}
	
	.editor_swiper .slide-content .mass {
		height: 46px;
		border-radius: 5px;
		line-height: 46px;
		margin-top: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		position: relative;
		background-color: rgba(0, 0, 0, 0.05);
		padding-left: 32px;
		padding-right: 10px;
	}
	
	.editor_swiper .slide-content .mass p {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.editor_swiper .slide-content .mass .pic {
		position: absolute;
		width: 18px;
		height: 18px;
		position: absolute;
		line-height: 1;
		left: 8px;
		top: 50%;
		transform: translateY(-50%);
	
	}
	
	.editor_swiper .slide-content .mass .pic img {
		width: 18px;
		height: 18px;
		vertical-align: middle;
		border-radius: 50px;
	}
	
	
	.editor_swiper .swiper-pagination {
		bottom: -6px !important;
	}
	
	.editor_swiper .swiper-pagination-bullet {
		width: 12px;
		cursor: pointer;
		height: 1px;
		opacity: 1;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 0;
	}
	
	.editor_swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
		background-color: rgba(0, 0, 0, 1);
	}
</style>