import type { RouteRecordRaw } from 'vue-router'

const WorkspaceRoutes: RouteRecordRaw[] = [
  {
    path: '/workspace/apply',
    name: 'WorkspaceApply',
    component: () => import('@/views/WorkspaceApply/components/Apply.vue'),
    meta: { title: '申请作家', requiresAuth: true }
  },
  {
    path: '/workspace/writer/create-chapter/:bookId',
    name: 'CreateBookChapter',
    component: () => import('@/views/WorkspaceWriter/components/CreateChapter.vue'),
    meta: { title: '创建章节', requiresAuth: true }
  },
  {
  path: '/workspace/writer/edit-chapter/:bookId/:chapterId',
  name: 'UpdateChapter',
  component: () => import('@/views/WorkspaceWriter/components/UpdateChapter.vue'),
  meta: { title: '编辑章节' }
  },
  {
    path: '/workspace/writer',
    name: 'WorkspaceWriter',
    component: () => import('@/views/WorkspaceWriter/Index.vue'),
    meta: { title: '作家工作台', requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AuthorWorkbench',
        component: () => import('@/views/WorkspaceWriter/components/AuthorSummary.vue'),
        meta: { title: '工作台首页' }
      },
      {
        path: 'create-book',
        name: 'CreateBook',
        component: () => import('@/views/WorkspaceWriter/components/CreateBook.vue'),
        meta: { title: '创建新书' }
      },
      {
        path: 'book-overview/:bookId',
        name: 'BookOverview',
        component: () => import('@/views/WorkspaceWriter/components/BookOverview.vue'),
        meta: { title: '作品总览' }
      },
      {
        path: 'update-book/:bookId',
        name: 'UpdateBook',
        component: () => import('@/views/WorkspaceWriter/components/UpdateBook.vue'),
        meta: { title: '修改书籍' }
      },
      {
        path: '/workspace/writer/manage-chapter/:bookId',
        name: 'ManageBookChapter',
        component: () => import('@/views/WorkspaceWriter/components/ChapterManage.vue'),
        meta: { title: '章节管理' }
      }
      // {
      //   path: 'novel',
      //   name: 'NovelManage',
      //   component: () => import('@/views/WorkspaceWriter/components/Novel.vue'),
      //   meta: { title: '小说管理' }
      // },
      // {
      //   path: 'story',
      //   name: 'StoryManage',
      //   component: () => import('@/views/WorkspaceWriter/components/Story.vue'),
      //   meta: { title: '短故事管理' }
      // },
      // {
      //   path: 'noveldata',
      //   name: 'NovelData',
      //   component: () => import('@/views/WorkspaceWriter/components/NovelData.vue'),
      //   meta: { title: '小说数据' }
      // },
      // {
      //   path: 'storydata',
      //   name: 'StoryData',
      //   component: () => import('@/views/WorkspaceWriter/components/StoryData.vue'),
      //   meta: { title: '短故事数据' }
      // },
      // {
      //   path: 'novelincome',
      //   name: 'NovelIncome',
      //   component: () => import('@/views/WorkspaceWriter/components/NovelIncome.vue'),
      //   meta: { title: '小说收益' }
      // },
      // {
      //   path: 'storyincome',
      //   name: 'StoryIncome',
      //   component: () => import('@/views/WorkspaceWriter/components/StoryIncome.vue'),
      //   meta: { title: '短故事稿费' }
      // },
      // {
      //   path: 'comment',
      //   name: 'CommentManage',
      //   component: () => import('@/views/WorkspaceWriter/components/Comment.vue'),
      //   meta: { title: '评论管理' }
      // },
      // {
      //   path: 'reward',
      //   name: 'RewardManage',
      //   component: () => import('@/views/WorkspaceWriter/components/Reward.vue'),
      //   meta: { title: '打赏管理' }
      // },
      // {
      //   path: 'say',
      //   name: 'SayManage',
      //   component: () => import('@/views/WorkspaceWriter/components/Say.vue'),
      //   meta: { title: '有话说管理' }
      // },
      // {
      //   path: 'fans',
      //   name: 'FansManage',
      //   component: () => import('@/views/WorkspaceWriter/components/Fans.vue'),
      //   meta: { title: '粉丝管理' }
      // },
      // {
      //   path: 'inspiration',
      //   name: 'Inspiration',
      //   component: () => import('@/views/WorkspaceWriter/components/Inspiration.vue'),
      //   meta: { title: '开书灵感' }
      // },
      // {
      //   path: 'source',
      //   name: 'SourceMaterial',
      //   component: () => import('@/views/WorkspaceWriter/components/Source.vue'),
      //   meta: { title: '推荐素材' }
      // },
      // {
      //   path: 'newbook',
      //   name: 'NewBook',
      //   component: () => import('@/views/WorkspaceWriter/components/NewBook.vue'),
      //   meta: { title: '新书预热' }
      // },
      // {
      //   path: 'booktitle',
      //   name: 'BookTitle',
      //   component: () => import('@/views/WorkspaceWriter/components/BookTitle.vue'),
      //   meta: { title: '口碑书名' }
      // },
      // {
      //   path: 'benefit',
      //   name: 'BenefitManage',
      //   component: () => import('@/views/WorkspaceWriter/components/Benefit.vue'),
      //   meta: { title: '福利管理' }
      // },
      // {
      //   path: 'level',
      //   name: 'AuthorLevel',
      //   component: () => import('@/views/WorkspaceWriter/components/Level.vue'),
      //   meta: { title: '作家等级' }
      // }
    ]
  }
]

export default WorkspaceRoutes
