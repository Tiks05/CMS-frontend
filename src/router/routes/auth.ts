import type { RouteRecordRaw } from 'vue-router'

const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'LoginLayout',
    component: () => import('@/views/Auth/Index.vue'), // 容器组件
    meta: {
      title: '登录',
      requiresAuth: false // 不需要权限校验
    },
    redirect: '/login/sms', // 默认重定向到验证码登录
    children: [
      {
        path: 'sms',
        name: 'LoginSms',
        component: () => import('@/views/Auth/components/LoginSmsForm.vue'),
        meta: {
          title: '验证码登录'
        }
      },
      {
        path: 'pwd',
        name: 'LoginPwd',
        component: () => import('@/views/Auth/components/LoginPwdForm.vue'),
        meta: {
          title: '密码登录'
        }
      },
      {
        path: 'reset',
        name: 'ResetPassword',
        component: () => import('@/views/Auth/components/ResetPwdForm.vue'),
        meta: {
          title: '重置密码'
        }
      }
    ]
  }
]

export default loginRoutes
