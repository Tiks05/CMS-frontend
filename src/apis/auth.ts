import request from '@/utils/request'

// 发送验证码
export const sendCode = (phone: string) => {
  return request.post('/auth/login_or_register/sms', { phone })
}

// 验证码登录
export const loginByCode = (phone: string, code: string) => {
  return request.post('/auth/login_or_register/code', { phone, code })
}

// 密码登录（自动注册）
export const loginByPassword = (phone: string, password: string) => {
  return request.post('/auth/login_or_register/pwd', { phone, password })
}
