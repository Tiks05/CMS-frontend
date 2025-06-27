<template>
  <div class="login-tabs">
    <span class="tab active">验证码登录</span>
  </div>

  <el-form :model="form" :rules="rules" ref="formRef" class="login-form">
    <!-- 手机号 -->
    <el-form-item prop="phone">
      <el-input v-model="form.phone" placeholder="手机号" size="large" class="input-rounded" />
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item prop="code">
      <div class="code-line">
        <el-input
          v-model="form.code"
          placeholder="请输入验证码"
          size="large"
          class="input-rounded code-input"
        />
        <el-button size="large" class="code-btn" :disabled="!canSendCode" @click="handleSendCode">
          获取验证码
        </el-button>
      </div>
    </el-form-item>

    <!-- 协议 -->
    <div class="agree-line">
      <el-checkbox v-model="form.agree" size="small" />
      <span class="agree-text"> 我已阅读并同意 <a>用户协议</a> 和 <a>隐私政策</a> </span>
    </div>

    <!-- 登录按钮 -->
    <el-button
      :class="['login-btn', { active: canSubmit }]"
      :style="{
        cursor: canSubmit ? 'pointer' : 'not-allowed',
        pointerEvents: canSubmit ? 'auto' : 'none'
      }"
      :disabled="false"
      @click="canSubmit ? handleLogin() : null"
    >
      登录/注册
    </el-button>

    <!-- 切换密码登录 -->
    <div class="switch-text" @click="goTo('/login/pwd')">密码登录</div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { sendCode, loginByCode } from '@/apis/auth'
import { useGoTo } from '@/composables/useGoTo'

const { goTo } = useGoTo()

const formRef = ref<FormInstance>()
const form = reactive({
  phone: '',
  code: '',
  agree: false
})

const countdown = ref(0)
const isPhoneValid = computed(() => /^1[3-9]\d{9}$/.test(form.phone))

const canSubmit = computed(() => isPhoneValid.value && form.code.trim() !== '' && form.agree)

const canSendCode = computed(() => isPhoneValid.value && form.agree && countdown.value === 0)

const handleSendCode = async () => {
  if (!canSendCode.value) return
  try {
    await sendCode(form.phone)
    ElMessage.success('验证码已发送')
    startCountdown()
  } catch (error: any) {
    ElMessage.error(error?.message || '发送失败')
  }
}

const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}

const handleLogin = async () => {
  try {
    const res = await loginByCode(form.phone, form.code)
    localStorage.setItem('token', res.data.token)
    ElMessage.success('登录成功！')
    goTo('/home')
  } catch (error: any) {
    ElMessage.error(error?.message || '登录失败')
  }
}

const rules: FormRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号格式不正确',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  agree: [{ required: true, message: '请勾选协议', trigger: 'change' }]
}
</script>

<style scoped lang="css">
.login-tabs {
  display: flex;
  font-size: 16px;
  font-weight: 400;
  color: #999;
  margin-bottom: 24px;
}

.login-tabs .tab {
  margin-right: 24px;
  cursor: default;
}

.login-tabs .active {
  color: #000;
  font-weight: 500;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-form :global(.el-form-item) {
  margin-bottom: 0;
}

.input-rounded :global(.el-input__wrapper) {
  background: #f7f7f7;
  border: none;
  border-radius: 10px;
  height: 48px;
  padding: 0 18px;
  font-size: 14px;
  box-shadow: none;
}

.code-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.code-line .code-input {
  flex: 1;
  min-width: 0;
}

.code-line .code-btn {
  width: 120px;
  flex-shrink: 0;
  height: 48px;
  background: #f2f2f2;
  color: #999;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  padding: 0 12px;
  cursor: pointer;
}

.agree-line {
  display: flex;
  align-items: flex-start;
  font-size: 12px;
  color: #999;
  margin-top: 20px;
}

.agree-line .agree-text {
  margin-left: 6px;
  margin-top: 3px;
  line-height: 18px;
}

.agree-line .agree-text a {
  color: #999;
  text-decoration: none;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1px;
  transition: color 0.2s ease;
  cursor: pointer;
}

.agree-line .agree-text a:hover {
  color: #ff8140;
  border-bottom-color: #ccc;
  background-color: transparent;
}

.login-btn {
  width: 100%;
  height: 48px;
  background: linear-gradient(to right, #ffd8c2, #ffe9df);
  border-radius: 999px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border: none;
  transition: all 0.2s ease;
}

.login-btn.active {
  background: linear-gradient(to right, #ff8140, #ffa56f);
}

.switch-text {
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.switch-text:hover {
  color: #ff8140;
}
</style>
