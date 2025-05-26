import type { RouteRecordRaw } from 'vue-router'

const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'LoginLayout',
    component: () => import('@/views/Login/Index.vue'), // 容器组件
    meta: {
      title: '登录',
      requiresAuth: false
    },
    redirect: '/login/sms', // 默认重定向到验证码登录
    children: [
      {
        path: 'sms',
        name: 'LoginSms',
        component: () => import('@/views/Login/components/LoginForm.vue → LoginSmsForm.vue'),
        meta: {
          title: '验证码登录'
        }
      },
      {
        path: 'pwd',
        name: 'LoginPwd',
        component: () => import('@/views/Login/components/LoginPwdForm.vue'),
        meta: {
          title: '密码登录'
        }
      },
      {
        path: '/login/reset',
        name: 'ResetPassword',
        component: () => import('@/views/Login/components/ResetPwdForm.vue'),
        meta: {
          title: '重置密码'
        }
      }
    ]
  }
]

export default loginRoutes
