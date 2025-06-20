<template>
	<div class="home-book-container">
		<div class="serial-card serial-card-normal home-book-expand">
			<div class="home-book">
				<div class="home-book-header">
					<span class="header-tab header-tab_right" :class="type == 1 ? 'active' : ''" @click="type = 1">小说</span>
					<span class="header-tab header-tab_right" :class="type == 2 ? 'active' : ''" @click="type = 2">短故事</span>
					<div class="header-label header-label_right" v-if="type == 1">
						<div class="hoverup">查看全部<span class="header-label-icon tomato-circle-right"></span></div>
					</div>
					<div class="header-label header-label_left" v-if="type == 1">
						<span class="write-button">
							<div class="hoverup write-btn-entry" @click="goTo('/workspace/writer/create-book')">
								创建新书
								<span class="header-label-icon tomato-circle-add"></span>
							</div>
						</span>
					</div>
					<div class="header-label header-label_left" v-if="type == 2">
						<span class="write-button">
							<div class="hoverup">创作短故事<span class="header-label-icon tomato-circle-add"></span></div>
						</span>
					</div>
				</div>

				<!-- 小说列表或空状态 -->
				<div class="home-book-list" v-if="type == 1">
					<div v-if="booklist.length === 0" class="home-book-empty">
						<div class="author-empty author-empty-default">
							<img class="author-empty-img" src="@/assets/images/workspace/writer/empty.png" alt="" style="width: 129px; height: 93px;" />
							<span class="author-empty-description">记录灵感和创意，开启属于你写作世界，并持之以恒。</span>
							<div class="author-empty-footer">
								<div class="home-book-empty__button-group">
									<div class="btn">查看热门故事</div>
									<div class="btn btn2" @click="goTo('/workspace/writer/create-book')">去写作</div>
								</div>
							</div>
						</div>
					</div>

					<div v-else>
						<div class="home-book-item home-book-item-home" v-for="(item, i) in booklist" :key="i">
							<div class="book-item-info">
								<div class="book-cover" @click="goTo(item.path)">
									<img :src="item.pic" />
								</div>
								<div class="info-content">
									<div class="info-content-title" @click="goTo(item.path)">{{ item.title }}</div>
									<div class="info-left">
										<div class="desc"><span>最近更新：<span class="hoverup">{{ item.now }}</span></span></div>
										<div class="detail">
											<div class="detail-chapter">
												<span class="right-info-number">{{ item.chapter }}</span> 章
											</div>
											<span class="detail-divider"></span>
											<div class="detail-wordcount">
												<span class="right-info-number">{{ item.words }} 字</span>
											</div>
											<span class="detail-divider"></span>
											<div class="property">{{ item.status }}</div>
										</div>
									</div>
									<div class="right-btns">
										<button type="button">
											<span>作品相关</span>
											<img src="@/assets/images/workspace/writer/x.png" alt="" />
											<div class="down_link">
												<em @click="goTo(`/workspace/writer/book-overview/${item.id}`)">作品设置</em>
												<em @click="goTo(`/workspace/writer/contract/${item.id}`)">作品签约</em>
											</div>
										</button>
										<button type="button" @click="goTo(`/workspace/writer/manage-chapter/${item.id}`)"><span>章节管理</span></button>
										<button type="button" class="add" @click="goTo(`/workspace/writer/create-chapter/${item.id}`)"><span>创建章节</span></button>
									</div>
								</div>
							</div>

							<div class="book-tip-step-outer book-tip-step-outer-compact book-tip-step-expand">
								<div class="book-tip-step">
									<div class="book-tip-step-content" style="display: flex; width: auto; opacity: 1;">
										<div class="tip-step tip-step-done">
											<div class="tip-step-line"><span class="tip-step-line-dot-wrapper"><span class="tip-step-line-dot"></span></span></div>
											<div class="tip-step-text">创建作品</div>
										</div>
										<div class="tip-step tip-step-current">
											<div class="tip-step-line">
												<span class="tip-step-line-dot-wrapper">
													<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22" class="tip-step-line-icon">
														<path fill="#FF5F00" stroke="#fff" stroke-width="1.5" d="M16.657 13.435Zm0 0-.003-.004m.003.004-.003-.004m0 0ZM5.869 12.9l-.108.11.108-.11a7.03 7.03 0 0 1 0-10.06C8.701.053 13.3.053 16.131 2.84a7.03 7.03 0 0 1 0 10.06l.133.135-.133-.135L11 17.948 5.87 12.9z"></path>
														<circle cx="11" cy="8" r="2" fill="#FBFBFB"></circle>
													</svg>
												</span>
											</div>
											<div class="tip-step-text">作品可搜<span class="tip-step-tag">实名认证</span></div>
										</div>
										<div class="tip-step tip-step-future">
											<div class="tip-step-line"><span class="tip-step-line-dot-wrapper"><span class="tip-step-line-dot"></span></span></div>
											<div class="tip-step-text">作品签约</div>
										</div>
										<div class="tip-step tip-step-future">
											<div class="tip-step-line"><span class="tip-step-line-dot-wrapper"><span class="tip-step-line-dot"></span></span></div>
											<div class="tip-step-text">作品推荐</div>
										</div>
										<div class="tip-step tip-step-future">
											<div class="tip-step-line"><span class="tip-step-line-dot-wrapper"><span class="tip-step-line-dot"></span></span></div>
											<div class="tip-step-text">作品完结</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 短故事始终为空状态 -->
				<div class="home-book-list" v-if="type == 2">
					<div class="home-book-empty">
						<div class="author-empty author-empty-default">
							<img class="author-empty-img" src="@/assets/images/workspace/writer/empty.png" alt="" style="width: 129px; height: 93px;" />
							<span class="author-empty-description">记录灵感和创意，开启属于你写作世界，并持之以恒。</span>
							<div class="author-empty-footer">
								<div class="home-book-empty__button-group">
									<div class="btn">查看热门故事</div>
									<div class="btn btn2">去写作</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGoTo } from '@/composables/useGoTo'
import { useUserStore } from '@/stores/useUserStore'
import { getMyBookList } from '@/apis/workspace'

const { goTo } = useGoTo()
const userStore = useUserStore()
const type = ref(1)

interface BookItem {
	id: number
  title: string
  pic: string
  now: string
  chapter: number
  words: number
  status: string
  path: string
}

const booklist = ref<BookItem[]>([])

onMounted(async () => {
  if (!userStore.user?.id) return
  const res = await getMyBookList({ user_id: userStore.user.id })
  booklist.value = res.data
})
</script>

<style scoped>
	.home-book-container {
		height: auto;
		background-color: #fff;
		margin-top: 15px;
		border-radius: 10px;
		padding: 20px;
		width: 100%;
	}

	.home-book-header {
		width: 100%;
		font-size: 16px;
		height: 32px;
		line-height: 32px
	}

	.home-book-header .header-tab {
		color: #0006;
		cursor: pointer;
		display: inline-block;
		font-size: 20px;
		line-height: 32px;
		margin: 0 14px;
		position: relative
	}

	.home-book-header .header-tab.active {
		color: #000;
		font-weight: 500
	}

	.home-book-header .header-tab:first-of-type {
		margin-left: 0
	}

	.home-book-header .header-tab-new {
		background: #ff5f00;
		border-radius: 12px 14px 14px 0;
		color: #fff;
		display: inline-block;
		font-size: 18px;
		font-weight: 500;
		height: 27px;
		line-height: 27px;
		position: absolute;
		right: -42px;
		text-align: center;
		top: -15px;
		transform: scale(.66);
		transform-origin: 100% 0;
		width: 63px
	}

	.home-book-header .header-tab_right {
		position: relative
	}

	.home-book-header .header-label {
		float: right;
		font-size: 14px;
		margin-left: 40px;
		cursor: pointer;
		color: #999;
	}

	.home-book-header .header-label-icon {
		float: right;
		font-size: 12px;
		margin-left: 4px
	}

	.home-book-header .header-label_right {
		border: none;
		position: relative
	}

	.home-book-header .header-label_right:after {
		border-radius: 0;
		border-right: 1px solid #0000003d;
		box-sizing: border-box;
		content: "";
		height: 10px;
		left: -20px;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 11px;
		transform-origin: 100% 0;
		width: 1px
	}

	.home-book-list {
		margin-top: 36px
	}

	.home-book-list .short-article-item-wrapper {
		position: relative
	}

	.home-book-list .short-article-item-subright {
		bottom: 0;
		right: 0
	}

	.home-book-list-placeholder {
		align-items: center;
		display: flex;
		margin-top: 20px
	}

	.home-book-list-placeholder-cover {
		align-items: center;
		border: 1px dashed #0003;
		border-radius: 8px;
		color: #0000003d;
		cursor: pointer;
		display: flex;
		font-size: 18px;
		height: 120px;
		justify-content: center;
		margin-right: 20px;
		transition: all .3s;
		width: 90px
	}

	.home-book-list-placeholder:hover .home-book-list-placeholder-desc {
		color: #ff5f00
	}

	.home-book-list-placeholder:hover .home-book-list-placeholder-cover {
		border-color: #ff5f00;
		color: #ff5f00
	}

	.home-book-list-placeholder-desc {
		color: #0000003d;
		font-size: 16px;
		line-height: 26px;
		transition: all .3s
	}

	.home-book .right-btn-group {
		align-items: center;
		display: flex;
		float: right
	}

	.home-book .right-btn-item {
		align-items: center;
		display: flex;
		float: unset;
		margin: 0
	}

	.home-book .right-btn-divider {
		background: #0000003d;
		height: 10px;
		margin: 0 20px;
		width: 1px
	}

	.home-book .playlet-panel {
		margin-top: 36px
	}

	.home-book-item:after {
		clear: both;
		content: "";
		display: block;
		height: 0;
		line-height: 0;
		visibility: hidden
	}

	.book-item-info .book-cover {
		height: 160px;
		position: absolute;
		width: 120px;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.book-item-info .book-cover img {
		height: 160px;
		width: 120px;
		vertical-align: middle;
	}


	.book-item-info .book-cover .text {
		background: #00000052;
		border-radius: 4px;
		bottom: 4px;
		color: #fff;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
		position: absolute;
		right: 6px;
		text-align: center;
		width: 60px;
	}



	.home-book-item .book-item-info .info-content-title {
		color: #000;
		font-size: 20px;
		line-height: 32px;
		margin-left: 20px;
	}

	.home-book-item .book-item-info .info-content .info-left .detail {
		margin-top: 67px;
		color: #999;
	}

	.home-book-item .book-item-info .info-content .info-left .shrink {
		margin-top: 8px
	}

	.home-book-item .book-item-info .info-content .info-left .desc {
		margin-top: 10px;
		color: #999;
	}



	.home-book-item .book-item-info {
		position: relative;
		padding-left: 120px;
		height: 160px;
	}

	.home-book-item .book-item-info .info-cover {
		float: left;
		height: 120px;
		width: 90px
	}

	.home-book-item .book-item-info .info-alias {
		background: #00000052;
		border-radius: 4px;
		color: #fff;
		cursor: pointer;
		font-size: 12px;
		height: 20px;
		left: 66px;
		line-height: 20px;
		position: absolute;
		text-align: center;
		top: 116px;
		width: 36px
	}

	.home-book-item .book-item-info .info-content .title-tag-content {
		align-items: center;
		display: flex
	}

	.home-book-item .book-item-info .info-content .title-tag-content .tomato-arrow-right-normal {
		margin-right: -4px
	}

	.home-book-item .book-item-info .info-content:after {
		clear: both;
		content: "";
		display: block;
		height: 0;
		line-height: 0;
		visibility: hidden
	}

	.home-book-item .book-item-info .info-content-title span.title-tag {
		background-color: #0000000a;
		border-radius: 4px;
		cursor: auto;
		display: inline-block;
		font-size: 12px;
		line-height: 12px;
		margin-left: 8px;
		padding: 6px 8px;
		text-align: center
	}

	.home-book-item .book-item-info .info-content-title span.title-tag.title-not-cp {
		background: #fa67251a
	}

	.home-book-item .book-item-info .info-content-title span.title-tag.title-set-activity {
		background: linear-gradient(90deg, #d5bd90 -4.55%, #c8ac66 104.55%);
		color: #fff
	}

	.home-book-item .book-item-info .info-content-title span.title-tag.title-set-top {
		color: #0006
	}

	.home-book-item .book-item-info .info-content-title span.title-tag.title-tag-alias {
		color: #0006;
		cursor: pointer
	}

	.home-book-item .book-item-info .info-content-title span.title-tag.title-set-hide {
		background: #f6f6f6;
		color: #a4a4a4
	}

	.home-book-item .book-item-info .info-content .info-left {
		float: left;
		margin-left: 20px;
		max-width: 360px
	}

	.home-book-item .book-item-info .info-content .info-left .desc {
		margin-top: 4px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}

	.home-book-item .book-item-info .info-content .info-left .desc,
	.home-book-item .book-item-info .info-content .info-left .detail,
	.home-book-item .book-item-info .info-content .info-left .time,
	.home-book-item .book-item-info .info-content .info-left p {
		font-size: 14px;
		line-height: 22px
	}

	.home-book-item .book-item-info .info-content .info-left .detail {
		align-items: center;
		display: flex;
		margin-top: 70px
	}

	.home-book-item .book-item-info .info-content .info-left .detail-divider {
		background-color: #00000014;
		height: 13px;
		margin: 0 12px;
		width: 1px
	}

	.home-book-item .book-item-info .info-content .info-left .detail-wordcount {
		align-items: center;
		display: flex
	}

	.home-book-item .book-item-info .info-content .info-left .detail-wordcount-icon {
		align-items: center;
		display: flex;
		font-size: 14px;
		margin-left: 6px
	}

	.home-book-item .book-item-info .info-content .info-left .detail-wordcount-hover {
		font-size: 14px;
		line-height: 22px
	}

	.home-book-item .book-item-info .info-content .info-left .detail-wordcount-hover-line {
		align-items: center;
		display: flex;
		width: 100%
	}

	.home-book-item .book-item-info .info-content .info-left .time {
		margin-top: 42px
	}

	.home-book-item .book-item-info .info-content .info-left p {
		margin-top: 10px
	}

	.home-book-item .book-item-info .info-content .info-right {
		float: right;
		max-width: 500px;
		padding-right: 10px;
		padding-top: 26px;
		position: relative
	}

	.home-book-item .book-item-info .info-content .info-right .right-infos {
		overflow: hidden
	}

	.home-book-item .book-item-info .info-content .info-right .right-info {
		float: right;
		font-size: 14px;
		line-height: 20px
	}

	.home-book-item .book-item-info .info-content .info-right .right-info .tomato-guide {
		cursor: pointer;
		font-size: 16px;
		margin-left: 8px;
		position: relative;
		top: 3px
	}

	.home-book-item .book-item-info .info-content .info-right .right-info .tomato-guide.hover {
		color: #ff5f00
	}

	.home-book-item .book-item-info .info-content .info-right .right-info-number {
		font-family: SFProText, sans-serif;
		font-size: 22px;
		font-weight: 500;
		line-height: 26px;
		margin-right: 10px;
		position: relative;
		top: 1px
	}

	.home-book-item .book-item-info .info-content .info-right .right-info:last-child {
		border: none;
		margin-right: 39px;
		position: relative
	}

	.home-book-item .book-item-info .info-content .info-right .right-info:last-child:after {
		border-radius: 0;
		border-right: 1px solid #f5f5f5;
		box-sizing: border-box;
		content: "";
		height: 12px;
		pointer-events: none;
		position: absolute;
		right: -20px;
		top: 7px;
		transform-origin: 100% 0;
		width: 1px
	}

	.home-book-item .right-btns {
		position: absolute;
		right: 10px;
		bottom: 5px;
	}

	.home-book-item .right-btns button {
		width: 96px;
		margin-left: 18px;
		height: 36px;
		border-radius: 50px;
		border: none;
		font-size: 14px;
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.05);
		position: relative;
	}

	.home-book-item .right-btns button:hover {
		background-color: rgba(0, 0, 0, 0.08);
	}

	.home-book-item .right-btns button img {
		width: 12px;
		margin-left: 4px;
		transition: transform 0.3s ease;
	}

	.home-book-item .right-btns button:hover img {
		transform: rotate(180deg);
	}

	.home-book-item .right-btns .down_link {
		position: absolute;z-index: 99;
		width: 100%;
		padding-top: 5px;
		display: none;
		top: 100%;
		left: 0;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.08);
	}

	.home-book-item .right-btns .down_link em {
		display: block;
		font-style: normal;
		height: 36px;
		background-color: #fff;
		text-align: center;
		line-height: 36px;
	}

	.home-book-item .right-btns .down_link em:hover {
		background-color: rgba(0, 0, 0, 0.03);
	}

	.home-book-item .right-btns button:hover .down_link {
		display: block;
	}

	.home-book-item .right-btns button.add {
		background-image: linear-gradient(96deg, #ff9a62 0, #ff5f00 100%);
		color: #fff;
	}

	.home-book-item .right-btns button.add:hover {
		background: #ff5f00;
	}



	.home-book-item .book-item-alert {
		border-radius: 6px;
		clear: both;
		margin-bottom: -10px;
		margin-top: 19px
	}

	.home-book-item .book-item-alert .byte-alert {
		background: #fafafa
	}

	.home-book-item .book-item-alert .byte-alert-icon-wrapper {
		display: none
	}

	.home-book-item .book-item-alert .byte-alert-content-wrapper .hover-content-tip-img {
		left: 3px;
		position: absolute;
		top: 2px;
		width: 17px
	}

	.home-book-item .book-item-alert .byte-alert-content-wrapper .hover-content-tip-text {
		color: #000000a3;
		display: inline-block;
		font-size: 12px;
		margin-left: 28px;
		margin-top: 0
	}

	.home-book-item .book-item-alert .byte-alert-content-wrapper .hover-content-tip-text-more {
		border-bottom: 1px solid #000000a3;
		cursor: pointer;
		display: inline-block;
		line-height: 13px
	}

	.home-book-item .book-item-alert .byte-alert-content-wrapper .hover-content-tip-text-more:hover {
		border-bottom: 1px solid #ff5f00;
		color: #ff5f00
	}

	.home-book-item .book-item-alert .byte-alert-close-btn {
		font-size: 14px;
		right: 16px;
		top: 3px
	}

	.home-book-item-create-chapter-tooltip {
		max-width: unset !important;
		min-width: 353px;
		width: auto !important
	}

	.home-book-item-create-chapter-tooltip.arco-tooltip.serial-tooltip .arco-tooltip-content {
		border-radius: 8px
	}

	.home-book-item-create-chapter-tips {
		align-items: center;
		display: flex;
		padding: 8px 2px
	}

	.home-book-item-create-chapter-tips .tomato-close {
		color: #0006;
		cursor: pointer;
		font-size: 16px;
		margin-left: 12px
	}


	.book-tip-step {
		overflow: hidden;
		padding: 16px 24px 12px;
		position: relative;
		transition: height .2s cubic-bezier(.4, 0, .2, 1)
	}

	.book-tip-step-outer {
		background-color: #00000005;
		border-radius: 8px;
		margin-bottom: 0;
		margin-top: 19px
	}

	.book-tip-step-outer-compact {
		margin-bottom: 0;
		margin-top: 24px
	}

	.book-tip-step-outer-compact .book-tip-step {
		padding: 4px 0 12px
	}

	.book-tip-step-tooltip.arco-tooltip.serial-tooltip .arco-tooltip-content {
		padding: 16px
	}

	.book-tip-step-tooltip-content {
		align-items: center;
		color: #000;
		display: flex;
		font-size: 14px;
		line-height: 22px;
		white-space: pre-wrap
	}

	.book-tip-step-tooltip-content a {
		color: inherit;
		cursor: pointer;
		text-decoration: underline !important
	}

	.book-tip-step-tooltip-content a:focus,
	.book-tip-step-tooltip-content a:hover {
		color: #ff5000
	}

	.book-tip-step-tooltip-content .serial-icon {
		color: #0006;
		cursor: pointer;
		flex: 0 0 14px;
		font-size: 14px;
		margin-left: 16px
	}

	.book-tip-step-tooltip-content .serial-icon:hover {
		color: #000000a3;
	}

	.book-tip-step-title {
		display: flex
	}

	.book-tip-step-title-img {
		height: 20px;
		margin-right: 8px;
		margin-top: 2px;
		width: 20px
	}

	.book-tip-step-content {
		display: flex;
		transition: opacity .2s cubic-bezier(.4, 0, .2, 1)
	}

	.book-tip-step-message {
		color: #000000a3;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		line-height: 24px;
		overflow: hidden
	}

	.book-tip-step-message a {
		color: inherit;
		cursor: pointer;
		text-decoration: underline !important
	}

	.book-tip-step-message a:focus,
	.book-tip-step-message a:hover {
		color: #ff5000
	}

	.book-tip-step-expander {
		align-items: center;
		color: #0006;
		cursor: pointer;
		display: flex;
		line-height: 24px;
		position: absolute;
		right: 26px;
		top: 50%;
		transform: translateY(-50%);
		transition: all .3s cubic-bezier(.4, 0, .2, 1);
		z-index: 9
	}

	.book-tip-step-expander-collapse {
		top: 16px;
		transform: none
	}

	.book-tip-step-expander-text {
		margin-right: 4px
	}

	.book-tip-step-expander:hover {
		color: #ff5f00
	}

	.book-tip-step .tip-step {
		align-items: center;
		display: flex;
		flex: 1;
		flex-direction: column;
		margin-top: 24px
	}

	.book-tip-step .tip-step-line {
		height: 1px;
		position: relative;
		width: 100%
	}

	.book-tip-step .tip-step-line:after {
		border-top-style: dashed;
		border-top-width: 1px;
		content: "";
		display: block;
		left: 50%;
		position: absolute;
		width: 100%
	}

	.book-tip-step .tip-step-line-dot-wrapper {
		left: 50%;
		position: absolute;
		top: 0;
		transform: translateX(-50%)translateY(-50%);
		z-index: 1
	}

	.book-tip-step .tip-step-line-icon {
		display: block
	}

	.book-tip-step .tip-step-line-dot {
		background-color: #e5e5e5;
		border: 1.5px solid #fff;
		border-radius: 50%;
		box-sizing: initial;
		display: block;
		height: 6px;
		width: 6px
	}

	.book-tip-step .tip-step-done {
		color: #0006
	}

	.book-tip-step .tip-step-done .tip-step-line:after,
	.book-tip-step .tip-step-done .tip-step-line:before {
		border-color: #ffa773
	}

	.book-tip-step .tip-step-done .tip-step-line-dot {
		background-color: #ffa773
	}

	.book-tip-step .tip-step-current {
		color: #000c
	}

	.book-tip-step .tip-step-current .tip-step-line:before {
		border-color: #ffa773
	}

	.book-tip-step .tip-step-current .tip-step-line:after {
		border-color: #0000001a
	}

	.book-tip-step .tip-step-current:last-of-type .tip-step-line:after {
		border-color: #ffa773
	}

	.book-tip-step .tip-step-future {
		color: #0006
	}

	.book-tip-step .tip-step-future .tip-step-line:after,
	.book-tip-step .tip-step-future .tip-step-line:before {
		border-color: #0000001a
	}

	.book-tip-step .tip-step:first-of-type .tip-step-line:before {
		border-top-style: dashed;
		border-top-width: 1px;
		content: "";
		display: block;
		-webkit-mask-image: linear-gradient(270deg, #000, #0000), linear-gradient(90deg, #000, #0000);
		mask-image: linear-gradient(270deg, #000, #0000), linear-gradient(90deg, #000, #0000);
		position: absolute
	}

	.book-tip-step .tip-step:first-of-type .tip-step-line:before,
	.book-tip-step .tip-step:last-of-type .tip-step-line:after {
		height: 1px;
		-webkit-mask-position: 0 0, 0 100%;
		mask-position: 0 0, 0 100%;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 50%;
		mask-size: 100% 50%;
		width: 50%
	}

	.book-tip-step .tip-step:last-of-type .tip-step-line:after {
		mask-image: linear-gradient(90deg, #000, #0000), linear-gradient(270deg, #000, #0000)
	}

	.book-tip-step .tip-step-text {
		font-size: 14px;
		line-height: 24px;
		margin-top: 11px
	}

	.tip-step-tag {
		background-color: #0000000a;
		border-radius: 4px;
		color: #0006;
		display: inline-block;
		font-size: 12px;
		line-height: 12px;
		margin-left: 6px;
		padding: 5px 6px;
	}


	.home-book-empty {
		margin: 40px 0 50px
	}


	.author-empty {
		align-items: center;
		display: flex;
		flex-direction: column
	}

	.author-empty-lottie {
		margin-bottom: 4px
	}

	.dark .author-empty-lottie {
		-webkit-filter: invert();
		filter: invert()
	}

	.author-empty-img {
		margin-bottom: 25px;
		width: 129px
	}

	.author-empty-not-enabled .author-empty-img {
		width: 140px
	}

	.author-empty-net-error .author-empty-img {
		width: 87px
	}

	.author-empty-description {
		font-size: 14px;
		line-height: 22px;
		max-width: 400px;
		text-align: center;
		color: #999;
	}





	.author-empty-footer {
		margin-top: 16px
	}

	.author-empty-footer .btn {
		display: inline-block;
		height: 36px;
		line-height: 36px;
		border-radius: 50px;
		font-size: 14px;
		color: #333;
		padding: 0 22px;
		margin: 0 5px;
		background-color: rgba(0, 0, 0, 0.05);
		cursor: pointer;
	}

	.author-empty-footer .btn:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.author-empty-footer .btn.btn2 {
		background-image: linear-gradient(96deg, #ff9a62 0, #ff5f00 100%);
		color: #fff;
	}

	.author-empty-footer .btn.btn2:hover {
		background: #ff5f00;
	}
</style>