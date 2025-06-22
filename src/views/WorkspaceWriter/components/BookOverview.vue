<template>
	<div class="tower_con">
		<div class="serial-card">
			<div class="book-info-container">
				<div class="book-info-header-back" @click="goBack">
					<svg class="serial-icon serial-icon-general_arrow1_left icon-left" width="1em" height="1em"
						viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M21.3076 26.6066C20.9171 26.9971 20.2839 26.9971 19.8934 26.6066L9.99387 16.7071C9.60335 16.3166 9.60335 15.6834 9.99387 15.2929L19.8934 5.3934C20.2839 5.00287 20.9171 5.00287 21.3076 5.3934C21.6981 5.78392 21.6981 6.41709 21.3076 6.80761L12.1152 16L21.3076 25.1924C21.6981 25.5829 21.6981 26.2161 21.3076 26.6066Z">
						</path>
					</svg>
					{{ bookDetail.title }}
				</div>

				<div class="arco-tabs arco-tabs-horizontal arco-tabs-line arco-tabs-top arco-tabs-size-default">
					<div class="book-info-tabs">
						<div class="book-info-tabs-item" :class="type==1?'tab-active':''" @click="type=1">作品信息</div>
						<div class="book-info-tabs-item" :class="type==2?'tab-active':''" @click="type=2">签约管理</div>
						<div class="book-info-tabs-item" :class="type==3?'tab-active':''" @click="type=3">福利信息</div>
					</div>

					<!-- 作品信息页 -->
					<div class="arco-tabs-content arco-tabs-content-horizontal" v-if="type==1">
						<div class="arco-tabs-content-inner" style="margin-left: 0%;">
							<div class="arco-tabs-pane">
								<div class="book-detail">
									<!-- 基础信息 -->
									<div class="book-detail-header">
										<span class="weight-1 font-1">基础信息</span>
										<div class="right-btns">
											<button type="button">
												<span>作品相关</span>
												<img src="@/assets/images/workspace/writer/x.png" alt="" />
												<div class="down_link">
													<em>删除</em>
												</div>
											</button>
											<button type="button"><span>申请完结</span></button>
											<button type="button" class="add" @click="goTo(`/workspace/writer/update-book/${bookDetail.id}`)">
												<span>修改</span>
											</button>
										</div>
									</div>

									<div class="book-detail-content">
										<div class="book-info-item">
											<span class="info-label font-2">书籍封面</span>
											<div class="muye-book-cover">
												<img :src="bookDetail.cover_url" alt="封面" />
											</div>
										</div>

										<div class="book-info-item">
											<span class="info-label font-2">书本名称</span>
											<div><span class="info-text font-1">{{ bookDetail.title }}</span></div>
										</div>

										<div class="book-info-item">
											<span class="info-label font-2">目标读者</span>
											<div><span class="info-text font-1">{{ bookDetail.target_readers || '-' }}</span></div>
										</div>

										<div class="book-info-item">
											<span class="info-label font-2">
												<div class="title-label font-2">标签
													<span class="title-label-icon tomato-circle-info"></span>
												</div>
											</span>
											<div><span class="info-text font-1">{{ bookDetail.tags || '-' }}</span></div>
										</div>

										<div class="book-info-item">
											<span class="info-label font-2">
												<div class="title-label font-2">主角名
													<span class="title-label-icon tomato-circle-info"></span>
												</div>
											</span>
											<div><span class="info-text font-1">{{ bookDetail.main_roles || '-' }}</span></div>
										</div>

										<div class="book-info-item">
											<span class="info-label font-2">作品简介</span>
											<div><span class="info-text font-1">{{ bookDetail.intro }}</span></div>
										</div>
									</div>

									<div class="info-bottom-line"></div>

									<!-- 其他信息 -->
									<div class="book-detail-header">
										<span class="weight-1 font-1">其他信息</span>
									</div>
									<div class="book-detail-content book-detail-flex" style="margin-bottom: 148px;">
										<div style="margin-right: 300px;">
											<div class="book-info-item">
												<span class="info-label font-2">书号</span>
												<div><span class="info-text font-1">{{ bookDetail.id }}</span></div>
											</div>
											<div class="book-info-item">
												<span class="info-label font-2">创建时间</span>
												<div><span class="info-text font-1">{{ bookDetail.created_at }}</span></div>
											</div>
											<div class="book-info-item">
												<span class="info-label font-2">安全状态</span>
												<div><span class="info-text font-1">{{ bookDetail.status }}</span></div>
											</div>
										</div>
										<div>
											<div class="book-info-item">
												<span class="info-label font-2">签约状态</span>
												<div><span class="info-text font-1">{{ bookDetail.contract_status }}</span></div>
											</div>
											<div class="book-info-item">
												<span class="info-label font-2">更新状态</span>
												<div><span class="info-text font-1">{{ bookDetail.update_status }}</span></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- 签约管理 -->
					<div class="book-info-sign-manage-new" v-if="type==2">
						<div class="sign-manage-explain">
							<div class="explain-title">签约说明</div>
							<ul class="explain-items">
								<li>作品字数达到2万字或被编辑提签后，将获得申请签约资格；详见<em>《签约问题全解》</em></li>
								<li>签约作品可被用户在CMS等平台查看，在一定字数后获得全平台推荐，并享有广告分成、全勤奖等各种收益，详见<em>《CMS作家福利》</em></li>
							</ul>
						</div>
						<div class="sign-manage-divider"></div>
						<div class="sign-manage-sign-flow">
							<div class="sign-flow-title">签约流程</div>
							<ul class="sign-flow-empty">
								<li>暂未达到签约申请条件</li>
								<li class="empty-sub-text">作品总字数达到2万字后，将获得申请签约资格，优质作品可以更快速地被编辑发现。</li>
							</ul>
						</div>
					</div>

					<!-- 福利信息 -->
					<div class="author-empty" v-if="type==3">
						<img src="/src/assets/images/workspace/writer/empty.png" alt="暂无数据" />
						<span>暂无数据</span>
					</div>
				</div>
			</div>
		</div>
		<FooterCopyright />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGoTo } from '@/composables/useGoTo'
import { getBookDetail } from '@/apis/workspace'
import FooterCopyright from '@/views/WorkspaceWriter/components/FooterCopyright.vue'

export interface BookDetail {
  id: number
  title: string
  cover_url: string
  target_readers: string
  tags: string
  main_roles: string
  intro: string
  created_at: string
  status: string
  contract_status: string
  update_status: string
}

const { goTo } = useGoTo()
const route = useRoute()

const type = ref(1) // 当前 tab：1=作品信息，2=签约管理，3=福利信息
const bookDetail = ref<BookDetail>({} as BookDetail)

const fetchBookDetail = async () => {
  const id = Number(route.params.bookId)
  if (!id) return
  const res = await getBookDetail(id)
  bookDetail.value = res.data
}

const goBack = () => {
  window.history.back()
}

onMounted(() => {
  fetchBookDetail()
})
</script>

<style scoped>
	.tower_con {
		margin-left: 250px;
		padding-top: 15px;
	}

	.serial-card {
		padding: 32px;
		background-color: #fff;
		border-radius: 10px;
	}

	.book-info-container .book-info-header-back {
		align-items: center;
		color: var(--Color_gray_100, #000);
		display: flex;
		font-size: 20px;
		font-weight: 500;
		line-height: 32px;
		margin-bottom: 12px;
		position: relative
	}

	.book-info-container .book-info-header-back:hover {
		color: var(--Color_brand, #ff5f00);
		cursor: pointer
	}

	.book-info-container .book-info-header-back .icon-left {
		font-size: 24px;
		margin-right: 8px
	}

	.book-info-container .book-info-tabs {
		display: flex;
		padding: 32px 0 12px
	}

	.book-info-container .book-info-tabs-item {
		color: var(--Color_gray_40, #0006);
		cursor: pointer;
		font-size: 16px;
		line-height: 26px
	}

	.book-info-container .book-info-tabs-item:not(:last-of-type) {
		margin-right: 40px
	}

	.book-info-container .book-info-tabs-item.tab-active {
		color: var(--Color_gray_100, #000);
		font-weight: 500
	}

	.book-info-container .arco-tabs-content {
		padding-top: 0 !important
	}


	.book-detail-header {
		align-items: center;
		display: flex;
		font-size: 16px;
		height: 32px;
		justify-content: space-between;
		line-height: 32px;
		margin-top: 42px
	}

	.book-detail-header-btns button {
		margin-left: 20px
	}

	.book-detail-alert {
		align-items: center;
		background-color: #0000000a;
		color: #3d85cc;
		display: flex;
		margin-top: 42px
	}

	.book-detail-alert+.book-detail-header {
		margin-top: 24px
	}

	.book-detail-content {
		margin-top: 44px;
		padding-bottom: 18px
	}

	.book-detail-content-tag {
		background: #f6f6f6;
		border-radius: 2px;
		color: #a4a4a4;
		display: inline-block;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
		margin-left: 8px;
		text-align: center;
		width: 44px
	}

	.book-detail-content-tag.top {
		background: #f9f0e5b3;
		color: #d8933f;
		width: 32px
	}

	.book-detail-content-tag.activity {
		background: linear-gradient(90deg, #d5bd90 -4.55%, #c8ac66 104.55%);
		border-radius: 2px;
		color: #fff;
		font-style: normal;
		font-weight: 400;
		line-height: 12px;
		padding: 4px;
		width: auto
	}

	.book-detail-content-extra-span {
		color: #f15132;
		cursor: pointer;
		margin-left: 25px
	}

	.book-detail-flex {
		display: flex
	}

	.book-detail .detail-textarea-warn-label {
		color: #ff5f00;
		font-size: 12px;
		line-height: 16px
	}

	.book-detail .title-label-icon {
		margin-left: 6px;
		vertical-align: bottom
	}

	.book-detail-apply {
		color: #000;
		font-size: 14px;
		line-height: 22px
	}

	.book-detail-apply span {
		color: #ff5f00
	}

	.book-detail-apply-subtitle {
		margin: 28px 0 14px
	}

	.book-detail-apply-item {
		align-items: center;
		background: #00000008;
		border-radius: 8px;
		display: flex;
		height: 48px;
		margin-bottom: 10px;
		position: relative
	}

	.book-detail-apply-index {
		background-repeat: no-repeat;
		background-size: contain;
		height: 16px;
		margin: 0 10px 0 12px;
		width: 16px
	}

	.book-detail-apply-index-1 {
		background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9IiNGRjVGMDAiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNOC4zMDcgNC4xNDZhNC42IDQuNiAwIDAgMS0uOTkuNzgxYy0uMzk2LjIyLS43Ni4zNzQtMS4xMTEuNDYydjEuMTg4Yy43MjYtLjIwOSAxLjMzLS41MzkgMS44MDQtLjk5VjEyaDEuMTk5VjQuMTQ2eiIvPjwvc3ZnPg==)
	}

	.book-detail-apply-index-2 {
		background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9IiNGRjVGMDAiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNOC4xMjMgMy45OTJjLS44MzYgMC0xLjUxOC4yNzUtMi4wMjQuODQ3cS0uNzQzLjc5Mi0uNzU5IDIuMTEyaDEuMmMuMDIxLS42MzguMTUzLTEuMTExLjQxNy0xLjQ0MS4yNTMtLjM0MS42MjctLjUwNiAxLjEyMi0uNTA2LjQ2MiAwIC44MjUuMTEgMS4wNjcuMzNxLjM2My4zMy4zNjMuOTljMCAuNDYyLS4xODcuODkxLS41MzkgMS4yODctLjIyLjIzMS0uNTk0LjUyOC0xLjEyMi45MDItLjg5LjYxNi0xLjQ4NSAxLjA4OS0xLjc3IDEuNDNBMyAzIDAgMCAwIDUuMjk1IDEyaDUuNDEydi0xLjA1Nkg2Ljc4MVE3LjAzIDEwLjMgOC4zIDkuNDU5Yy43ODEtLjUyOCAxLjMyLS45NDYgMS42MjgtMS4yNjUuNTA2LS41NjEuNzctMS4xNzcuNzctMS44NTkgMC0uNjkzLS4yNDItMS4yNTQtLjcxNS0xLjY5NC0uNDg0LS40NC0xLjExLS42NDktMS44NTktLjY0OSIvPjwvc3ZnPg==)
	}

	.book-detail-apply-index-3 {
		background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9IiNGRjVGMDAiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNOC4wOCAzLjk5MmMtLjc3IDAtMS4zOTguMjA5LTEuODgyLjY0OS0uNTE3LjQ0LS44MDMgMS4wNDUtLjg2OSAxLjgyNmgxLjE3N2MuMDQ0LS40ODQuMjEtLjg0Ny40NzMtMS4wODkuMjY0LS4yNDIuNjM4LS4zNjMgMS4xMTEtLjM2My40NjIgMCAuODI1LjA5OSAxLjA2Ny4zMTkuMjIuMjA5LjM0MS41MDYuMzQxLjkwMnMtLjEzMi43MDQtLjM3NC45MTMtLjYwNS4zMTktMS4wODkuMzE5aC0uNTZ2LjkwMmguNTcxYy41MTcgMCAuOTEzLjExIDEuMTc3LjMzcS40My4zMy40MyAxLjAyM2MwIC4zOTYtLjE0NC43MTUtLjQwOC45NzktLjMwOC4yODYtLjcxNS40NC0xLjIyLjQ0cS0uNjk0IDAtMS4xMjMtLjM5NmMtLjMzLS4yODYtLjQ5NS0uNjkzLS41MTctMS4yMjFoLTEuMjFxLjA5OSAxLjMyLjkyNCAyLjAxM2MuNDg0LjQwNyAxLjEzMy42MTYgMS45MzYuNjE2LjgzNiAwIDEuNTMtLjI0MiAyLjA1Ny0uNzA0LjQ5NS0uNDYyLjc0OC0xLjA1Ni43NDgtMS43ODIgMC0uNDYyLS4xMzItLjg0Ny0uMzk2LTEuMTQ0LS4yNDItLjI4Ni0uNTk0LS41MDYtMS4wNTYtLjY0OS44NTgtLjI4NiAxLjI5OC0uODY5IDEuMjk4LTEuNzI3IDAtLjY3MS0uMjQyLTEuMTk5LS43MDQtMS41ODQtLjQ4NC0uMzg1LTEuMTEtLjU3Mi0xLjkwMy0uNTcyIi8+PC9zdmc+)
	}

	.book-detail-apply-confirm span {
		color: #ff5f00
	}

	.book-detail-apply-confirm p {
		color: #000;
		font-size: 14px;
		line-height: 22px;
		margin-bottom: 18px
	}

	.book-detail-apply-confirm .muye-book-cover {
		height: 110px;
		width: 82px
	}

	.book-detail-apply-confirm-content {
		align-items: center;
		background: #00000008;
		border-radius: 8px;
		display: flex;
		height: 134px;
		padding: 12px 16px
	}

	.book-detail-apply-confirm-book {
		height: 56px;
		margin-left: 16px
	}

	.book-detail-apply-confirm-title {
		color: #000c;
		font-size: 14px;
		font-weight: 500;
		line-height: 22px;
		margin-bottom: 14px
	}

	.book-detail-apply-confirm-word {
		color: #0006;
		font-size: 12px;
		line-height: 20px
	}

	.right-btns button {
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

	.right-btns button:hover {
		background-color: rgba(0, 0, 0, 0.08);
	}

	.right-btns button img {
		width: 12px;
		margin-left: 4px;
		transition: transform 0.3s ease;
	}

	.right-btns button:hover img {
		transform: rotate(180deg);
	}

	.right-btns .down_link {
		position: absolute;
		z-index: 99;
		width: 100%;
		padding-top: 5px;
		display: none;
		top: 100%;
		left: 0;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.08);
	}

	.right-btns .down_link em {
		display: block;
		font-style: normal;
		height: 36px;
		background-color: #fff;
		text-align: center;
		line-height: 36px;
	}

	.right-btns .down_link em:hover {
		background-color: #f1f1f1;
	}

	.right-btns button:hover .down_link {
		display: block;
	}

	.font-2 {
		color: #999;
	}







	.right-btns button.add {
		background-image: linear-gradient(96deg, #ff9a62 0, #ff5f00 100%);
		color: #fff;
	}

	.right-btns button.add:hover {
		background: #ff5f00;
	}






	.book-info-item {
		display: flex;
		flex-direction: row;
		font-size: 14px;
		padding-bottom: 24px
	}

	.book-info-item .info-label {
		flex-shrink: 0;
		min-width: 80px;
		padding-right: 24px
	}

	.book-info-item .info-cover {
		float: left;
		height: 107px;
		width: 80px
	}

	.book-info-item .info-text {
		flex-wrap: wrap;
		white-space: pre-wrap
	}

	.book-info-item .info-action {
		color: #ff5f00;
		cursor: pointer;
		margin-left: 24px
	}

	.book-info-item .muye-book-cover img {
		width: 80px;
		height: 107px;
		vertical-align: middle;
	}

	.sign-manage-explain {
		padding: 42px 0
	}

	.sign-manage-explain .explain-title {
		color: #000;
		font-size: 16px;
		font-weight: 500;
		line-height: 26px;
		padding-bottom: 24px
	}

	.sign-manage-explain .explain-items {
		color: #000;
		font-size: 14px;
		line-height: 22px
	}

	.sign-manage-explain .explain-items li {
		list-style: inside
	}

	.sign-manage-explain .explain-items li::marker {
		margin-right: 16px
	}

	.sign-manage-explain .explain-items li:not(:last-child) {
		padding-bottom: 12px
	}

	.sign-manage-explain .explain-items em {
		font-style: normal;
		font-style: normal;
		text-decoration: underline;
		cursor: pointer;
	}

	.sign-manage-explain .explain-items em:hover {
		color: #ff5f00;
	}

	.sign-manage-sign-flow {
		padding: 42px 0 10px;
		position: relative
	}

	.sign-manage-sign-flow .sign-flow-title {
		color: var(--Color_gray_100, #000);
		font-size: 16px;
		font-weight: 500;
		line-height: 26px;
		padding-bottom: 24px
	}

	.sign-manage-sign-flow .sign-flow-container {
		overflow: hidden;
		padding-left: 34px;
		position: relative
	}

	.sign-manage-sign-flow .sign-flow-container:before {
		border-left: 1px dashed var(--Color_gray_24, #0000003d);
		bottom: 0;
		content: "";
		left: 5.5px;
		position: absolute;
		top: 0
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card {
		align-items: stretch;
		background-color: var(--Color_gray_2, #00000005);
		border-radius: 8px;
		display: flex;
		padding: 24px
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card:not(:last-child) {
		margin-bottom: 36px
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card-content {
		color: var(--Color_gray_40, #0006);
		flex: auto;
		font-size: 14px;
		line-height: 22px;
		margin-right: 16px
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card-content a {
		color: inherit;
		font-style: normal;
		text-decoration: underline;
		text-underline-offset: 2.5px
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card-content a:hover {
		color: var(--Color_brand, #ff5f00)
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card-content .content-title {
		color: var(--Color_gray_100, #000);
		font-weight: 500;
		padding-bottom: 4px
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card-content .content-text {
		padding-bottom: 24px
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card-actions {
		align-self: center;
		flex: none
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card-actions button:not(:last-child) {
		margin-right: 16px
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card.status-danger .flow-card-content .content-title {
		color: var(--Color_brand, #ff5f00)
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card.status-expire .flow-card-content,
	.sign-manage-sign-flow .sign-flow-container .flow-card.status-expire .flow-card-content .content-title {
		color: var(--Color_gray_24, #0000003d)
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card,
	.sign-manage-sign-flow .sign-flow-container .flow-placeholder {
		position: relative
	}

	.sign-manage-sign-flow .sign-flow-container .flow-card:after,
	.sign-manage-sign-flow .sign-flow-container .flow-placeholder:after {
		background: var(--Color_bg, #fff);
		border: 1.5px solid var(--Color_brand, #ff5f00);
		border-radius: 50%;
		box-sizing: border-box;
		content: "";
		height: 12px;
		left: -34px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 12px
	}

	.sign-manage-sign-flow .sign-flow-container .flow-placeholder {
		color: var(--Color_gray_100, #000);
		font-size: 14px;
		font-weight: 500;
		line-height: 22px;
		margin-bottom: 14px
	}

	.sign-manage-sign-flow .sign-flow-container .flow-placeholder:after {
		border-color: var(--Color_gray_40, #0006)
	}

	.sign-manage-sign-flow .sign-flow-container .flow-placeholder:not(:last-child) {
		margin-bottom: 50px
	}

	.sign-manage-sign-flow .sign-flow-multi-wrapper:not(.sign-flow-title+.sign-flow-multi-wrapper) {
		border-top: 1px solid var(--Color_gray_4, #0000000a);
		padding-top: 24px
	}

	.sign-manage-sign-flow .sign-flow-multi-wrapper .multi-flow-title {
		align-items: center;
		color: var(--Color_gray_100, #000);
		display: flex;
		font-size: 14px;
		font-weight: 500;
		justify-content: space-between;
		line-height: 22px;
		padding-bottom: 24px
	}

	.sign-manage-sign-flow .sign-flow-multi-wrapper .multi-flow-title button {
		color: var(--Color_gray_100, #000)
	}

	.sign-manage-sign-flow .sign-flow-multi-wrapper .multi-flow-title button .serial-icon {
		transition: transform .2s ease-in-out
	}

	.sign-manage-sign-flow .sign-flow-multi-wrapper .multi-flow-title button .icon-reverse {
		transform: rotate(180deg)
	}

	.sign-manage-sign-flow .sign-flow-multi-wrapper .multi-flow-content {
		padding-bottom: 24px
	}

	.sign-manage-sign-flow .sign-flow-multi-wrapper:last-child .multi-flow-content {
		padding-bottom: 0
	}

	.sign-manage-sign-flow .sign-flow-empty li {
		list-style: inside
	}

	.sign-manage-sign-flow .sign-flow-empty li::marker {
		margin-right: 16px
	}

	.sign-manage-sign-flow .sign-flow-empty .empty-content {
		color: var(--Color_gray_100, #000);
		display: inline-block;
		font-size: 14px;
		line-height: 22px
	}

	.sign-manage-sign-flow .sign-flow-empty .empty-sub-text {
		color: var(--Color_gray_40, #0006);
		font-size: 14px;
		line-height: 22px;
		padding-top: 12px
	}

	.sign-manage-sign-flow .sign-flow-empty .empty-sub-text::marker {
		color: #0000
	}

	.sign-manage-sign-flow .multi-flow-title.next-open-title {
		justify-content: flex-start;
		padding-bottom: 8px
	}

	.sign-manage-sign-flow .multi-flow-title.next-open-title .title-text {
		padding-right: 8px
	}

	.sign-manage-sign-flow .multi-flow-title.next-open-title .arco-tag {
		color: var(--Color_gray_40, #0006);
		padding: 0 6px
	}

	.sign-manage-sign-flow .next-open-text {
		color: var(--Color_gray_24, #0000003d)
	}

	.book-info-sign-manage-new .sign-manage-divider {
		background-color: var(--Color_gray_4, #0000000a);
		height: 1px
	}

	.sign-manage-sign-ok-modal .sign-ok-container {
		padding: 40px 0
	}

	.sign-manage-sign-ok-modal .sign-ok-bg {
		background: url(https://p9-novel.byteimg.com/origin/novel-static/12b59ebeb1e16ff24f57fac7081d6ac1) 50%/contain no-repeat;
		height: 140px;
		margin: 0 auto;
		width: 140px
	}

	.sign-manage-sign-ok-modal .sign-ok-title {
		color: #000;
		font-size: 16px;
		line-height: 26px;
		padding-top: 10px;
		text-align: center
	}

	.sign-manage-sign-ok-modal .sign-ok-subtitle {
		color: #0006;
		font-size: 14px;
		line-height: 22px;
		padding-top: 8px;
		text-align: center
	}

	.sign-manage-sign-ok-modal .sign-ok-button {
		padding-top: 40px;
		text-align: center
	}

	.author-empty {
		align-items: center;
		display: flex;
		flex-direction: column;
		padding-top: 90px;
		padding-bottom: 90px;
	}

	.author-empty img {
		width: 130px;
		vertical-align: middle;
	}

	.author-empty span {
		margin-top: 26px;
		color: #999;
	}
</style>