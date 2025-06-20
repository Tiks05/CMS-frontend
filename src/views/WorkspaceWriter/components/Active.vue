<template>
	<div class="home-activity">
		<div class="serial-card">
			<div class="home-activity-title">
				<h4>创作活动</h4>
				<span class="author-title-extra">
					<span class="home-activity-title-more">
						查看全部 
						<svg class="serial-icon serial-icon-general_arrow_circle label-icon" width="1em" height="1em"
							viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M14.7071 10.359C14.3166 9.96849 13.6835 9.96849 13.2929 10.359C12.9024 10.7495 12.9024 11.3827 13.2929 11.7732L17.5356 16.0159L13.2929 20.2585C12.9024 20.649 12.9024 21.2822 13.2929 21.6727C13.6835 22.0632 14.3166 22.0632 14.7071 21.6727L19.6569 16.723C20.0474 16.3325 20.0474 15.6993 19.6569 15.3088L14.7071 10.359Z" />
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3ZM5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16Z" />
						</svg>
					</span>
				</span>
			</div>

			<div
				class="home-activity-card"
				v-for="(item, i) in activelist"
				:key="i"
				@click="goTo(item.path)"
			>
				<div class="card-img">
					<img :src="item.notice_url" alt="cover" />
				</div>
				<div class="card-content">
					<div class="card-content-title">{{ item.title }}</div>
					<div class="card-content-date">活动时间：{{ item.time }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getActiveList } from '@/apis/workspace'
import { useGoTo } from '@/composables/useGoTo'

const { goTo } = useGoTo()

interface ActiveItem {
  notice_url: string
  title: string
  time: string
  path: string
}

const activelist = ref<ActiveItem[]>([])

const fetchActives = async () => {
  const res = await getActiveList(3)
  activelist.value = res.data
}

onMounted(fetchActives)
</script>

<style scoped>
.home-activity {
	background-color: #fff;
	padding: 15px;
	border-radius: 10px;
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


.home-activity-card {
    align-items: center;
    cursor: pointer;
    display: flex
}

.home-activity-card:not(:last-child) {
    margin-bottom: 12px
}

.home-activity-card:hover .card-img img {
    transform: scale(1.2)
}

.home-activity-card:hover .card-content-title {
    color: #ff5f00;
}

.home-activity-card .card-img {
    border-radius: 8px;
    display: block;
    flex: 0 0 72px;
    height: 72px;
    overflow: hidden;
    pointer-events: none;
    width: 72px
}

.home-activity-card .card-img img {
    height: 100%;
    object-fit: cover;
    transition: transform .3s;
    width: 100%
}

.home-activity-card .card-content {
    align-self: stretch;
    flex: 1;
    margin-left: 16px;
    position: relative
}

.home-activity-card .card-content-title {
    overflow-wrap: anywhere;
    text-overflow: ellipsis;
    white-space: normal;
    line-clamp: 2;
    color: var(--Color_gray_100,#000);
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-size: 14px;
    line-height: 22px;
    overflow: hidden
}

.home-activity-card .card-content-date {
    bottom: 0;
    color: var(--Color_gray_40,#0006);
    font-size: 12px;
    left: 0;
    line-height: 20px;
    position: absolute;
    white-space: nowrap
}

.home-activity-card .card-content-date-counter {
    align-items: center;
    color: var(--Color_brand,#ff5f00);
    display: flex
}

.home-activity-card .card-content-date-counter .counter-icon {
    font-size: 14px;
    line-height: 14px;
    margin-right: 2px;
    overflow: visible
}

.home-activity-card .card-content-date-counter .counter-label {
    color: var(--Color_brand,#ff5f00);
    font-size: 12px;
    line-height: 20px;
    margin-right: 4px
}

.home-activity-card .card-content-date-counter .counter-time {
    align-items: center;
    background: var(--Color_brand_alpha_8,#ff5f0014);
    border-radius: 2px;
    color: var(--Color_brand,#ff5f00);
    display: flex;
    font-size: 12px;
    font-weight: 500;
    height: 18px;
    justify-content: center;
    line-height: 20px;
    width: 18px
}

.home-activity-card .card-content-date-counter .counter-sep {
    padding: 0 3px
}

.home-activity-title {
    margin-bottom: 15px
}

.home-activity-title-more {
    align-items: center;
    color: var(--Color_gray_40,#0006);
    cursor: pointer;
    display: flex;
    font-size: 14px;
    line-height: 22px
}

.home-activity-title-more .label-icon {
    font-size: 16px;
    margin-left: 4px
}

.home-activity .home-activity-card:not(:last-child) {
    margin-bottom: 10px
}
</style>