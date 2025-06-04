<template>
  <!-- 返回箭头 + 标题 -->
  <div class="back-tab" @click="goTo('/login/pwd')">
    <img src="@/assets/icons/arrow-left.svg" class="back-icon" />
    密码重置
  </div>

  <el-form :model="form" :rules="rules" ref="formRef" class="reset-form">
    <!-- 账号 -->
    <el-form-item prop="account">
      <el-input
        v-model="form.account"
        placeholder="请输入手机号/邮箱"
        size="large"
        class="input-rounded"
      />
    </el-form-item>

    <!-- 新密码 -->
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        placeholder="请输入新密码"
        size="large"
        class="input-rounded"
        type="password"
      />
    </el-form-item>

    <!-- 确认密码 -->
    <el-form-item prop="confirm">
      <el-input
        v-model="form.confirm"
        placeholder="密码确认"
        size="large"
        class="input-rounded"
        type="password"
      />
    </el-form-item>

    <!-- 验证码 + 按钮 -->
    <el-form-item prop="code">
      <div class="code-line">
        <el-input
          v-model="form.code"
          placeholder="请输入验证码"
          size="large"
          class="input-rounded code-input"
        />
        <el-button
          size="large"
          class="code-btn"
          :disabled="!canSendCode"
          @click="handleSendCode"
        >
          获取验证码
        </el-button>
      </div>
    </el-form-item>

    <!-- 提交按钮 -->
    <el-button
      class="submit-btn"
      :class="{ active: canSubmit }"
      :disabled="false"
      :style="{
        cursor: canSubmit ? 'pointer' : 'not-allowed',
        pointerEvents: canSubmit ? 'auto' : 'none'
      }"
      @click="canSubmit ? handleSubmit() : null"
    >
      提交
    </el-button>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useGoTo } from '@/composables/useGoTo'

const { goTo } = useGoTo()

const formRef = ref<FormInstance>()
const form = reactive({
  account: '',
  password: '',
  confirm: '',
  code: ''
})

const canSendCode = computed(() => form.account.trim() !== '')
const canSubmit = computed(() =>
  form.account && form.password && form.confirm && form.code &&
  form.password === form.confirm
)

const handleSendCode = () => {
  if (!canSendCode.value) return
  console.log('📨 发送验证码：', form.account)
}

const handleSubmit = () => {
  console.log('✅ 重置密码提交：', form)
}

const rules: FormRules = {
  account: [{ required: true, message: '请输入手机号/邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirm: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator(rule, value, callback) {
        if (value !== form.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
</script>

<style scoped>
.back-tab {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin-bottom: 24px;
  cursor: pointer;
}

.back-icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
  object-fit: contain;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reset-form :global(.el-form-item) {
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
  gap: 8px;
  align-items: center;
}

.code-line .code-input {
  flex: 1;
}

.code-line .code-btn {
  width: 120px;
  height: 48px;
  background: #f2f2f2;
  color: #999;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  padding: 0 20px;
  cursor: pointer;
}

.submit-btn {
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

.submit-btn.active {
  background: linear-gradient(to right, #ff8140, #ffa56f);
}
</style>
