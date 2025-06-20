<template>
  <div class="bookinfo_catalogue" v-if="bookContent">
    <div class="bookindex_wp">
      <div class="page-body">
        <div class="page-abstract-header">
          <h2>作品简介</h2>
        </div>
        <div class="page-abstract-content">
          <p>{{ bookContent.intro }}</p>
        </div>
        <div class="page-directory-header">
          <h3>目录<span class="directory-dot"></span>{{ totalChapters }}章</h3>
        </div>
        <div class="page-directory-content">
          <div v-for="(volume, i) in bookContent.volumes" :key="i">
            <div class="volume volume_first">
              {{ volume.title }}<span class="volume-dot"></span>共{{ volume.chapter_count }}章
            </div>
            <div class="chapter">
              <div
                class="chapter-item"
                v-for="(chapter, j) in volume.chapters"
                :key="j"
                @click="goTo(chapter.path)"
                style="cursor: pointer;"
              >
                第{{ j + 1 }}章 {{ chapter.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useGoTo } from '@/composables/useGoTo'

const { goTo } = useGoTo()

interface Chapter {
  title: string
  path: string
}

interface Volume {
  title: string
  chapter_count: number
  chapters: Chapter[]
}

interface BookContentData {
  intro: string
  volumes: Volume[]
}

const props = defineProps<{ bookContent: BookContentData | null }>()

const totalChapters = computed(() => {
  if (!props.bookContent) return 0
  return props.bookContent.volumes.reduce((sum, vol) => sum + vol.chapter_count, 0)
})
</script>

<style scoped>
	.bookinfo_catalogue {
		background-color: #f6f6f6;
		padding: 30px 0;
	}

	.bookindex_wp {
		width: 1240px;
		margin: 0 auto;
	}

	.page-body {
		padding: 40px 30px 122px;
		border-radius: 2px;
		box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .08);
		background-color: #fff;
		position: relative;
		z-index: 10
	}

	.page-body .page-abstract-header,
	.page-body .page-directory-header {
		font-size: 24px;
		color: rgba(0, 0, 0, .85);
		height: 33px;
		line-height: 33px;
		position: relative;
		font-weight: 500
	}

	.page-body .page-abstract-header h2,
	.page-body .page-directory-header h2 {
		font-size: 24px;
		font-weight: bold;
	}

	.page-body .page-abstract-header:after {
		content: " ";
		position: absolute;
		top: 45px;
		left: 0;
		height: 1px;
		width: 100%;
		background-color: rgba(0, 0, 0, .1)
	}

	.page-body .page-abstract-content {
		margin: 63px auto 56px;
		padding: 0 30px;
		font-size: 16px;
		line-height: 24px;
		max-height: 72px;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		line-clamp: 3;
		-webkit-box-orient: vertical
	}

	.page-body .page-directory-header {
		font-size: 24px;
		line-height: 33px;
		color: rgba(0, 0, 0, .85)
	}

	.page-body .page-directory-header h3 {
		font-size: 24px;
		font-weight: bold;
	}

	.page-body .page-directory-header .directory-dot {
		display: inline-block;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		margin: 0 10px;
		background-color: rgba(0, 0, 0, .85);
		position: relative;
		top: -4px
	}

	.page-body .page-directory-header:after {
		content: " ";
		position: absolute;
		top: 45px;
		left: 0;
		height: 1px;
		width: 1120px;
		background-color: rgba(0, 0, 0, .1)
	}

	.page-body .page-directory-content {
		margin-top: 44px;
		padding: 0 30px
	}

	.page-body .page-directory-content .volume_first {
		margin-top: 0
	}

	.page-body .page-directory-content .volume {
		height: 28px;
		line-height: 28px;
		font-size: 20px;
		margin-top: 56px
	}

	.page-body .page-directory-content .volume-dot {
		display: inline-block;
		width: 2px;
		height: 2px;
		border-radius: 50%;
		margin: 0 8px;
		background-color: #333;
		position: relative;
		top: -4px
	}

	.page-body .page-directory-content .chapter {
		font-size: 0
	}

	.page-body .page-directory-content .chapter-item {
		position: relative;
		margin-top: 20px;
		width: 294px;
		height: 20px;
		line-height: 20px;
		display: inline-block;
		margin-right: 88px;
		font-size: 14px;
		color: #000;
		cursor: pointer;
	}

	.page-body .page-directory-content .chapter-item:hover {
		color: #fa6725
	}

	.page-body .page-directory-content .lock {
		position: absolute;
		right: 0;
		top: 0;
		color: #000;
		background-image: url(@/assets/images/i2.png);
		width: 14px;height: 14px;background-size: cover;
	}

	.page-body .page-directory-content .chapter-item:nth-child(3n) {
		margin-right: 0
	}

	.page-body .page-directory-content .chapter-item__visited {
		opacity: .6
	}
</style>