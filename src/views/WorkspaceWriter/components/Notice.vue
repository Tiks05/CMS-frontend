<template>
  <div class="home-activity">
    <div class="serial-card">
      <div class="home-activity-title">
        <h4>公告</h4>
        <span class="author-title-extra">
          <span class="home-activity-title-more">
            查看全部
            <svg
              class="serial-icon serial-icon-general_arrow_circle label-icon"
              width="1em"
              height="1em"
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7071 10.359C14.3166 9.96849 13.6835 9.96849 13.2929 10.359C12.9024 10.7495 12.9024 11.3827 13.2929 11.7732L17.5356 16.0159L13.2929 20.2585C12.9024 20.649 12.9024 21.2822 13.2929 21.6727C13.6835 22.0632 14.3166 22.0632 14.7071 21.6727L19.6569 16.723C20.0474 16.3325 20.0474 15.6993 19.6569 15.3088L14.7071 10.359Z"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3ZM5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16Z"
              />
            </svg>
          </span>
        </span>
      </div>

      <div class="list">
        <div class="item" v-for="(item, i) in newslist" :key="i" @click="goTo(item.path)">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGoTo } from '@/composables/useGoTo'
import { getNewsList } from '@/apis/workspace'

const { goTo } = useGoTo()

interface NewsItem {
  title: string
  path: string
}

const newslist = ref<NewsItem[]>([])

const fetchNewsList = async () => {
  const res = await getNewsList()
  newslist.value = res.data
}

onMounted(fetchNewsList)
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

.home-activity-title h4 {
  font-size: 20px;
  font-weight: normal;
}

.home-activity-title-more {
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

.home-activity .list {
  margin-top: 6px;
}
.home-activity .list .item {
  line-height: 42px;
  cursor: pointer;
  padding-right: 25px;
  background-image: url('/src/assets/icons/arrow-right/icons8-arrow-100.png');
  background-repeat: no-repeat;
  background-size: 12px auto;
  background-position: right center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.home-activity .list .item:hover {
  color: #ff5f00;
  background-image: url('/src/assets/icons/arrow-right/icons9-arrow-100.png');
}
</style>
