<template>
	<!-- 返回箭头 + 标题 -->
	<div class="back-tab" @click="goTo('/login/sms')">
		<img :src="arrowLeft" class="back-icon" />
		密码登录
	</div>

	<el-form :model="form" :rules="rules" ref="formRef" class="login-form">
		<!-- 用户名/邮箱 -->
		<el-form-item prop="account">
			<el-input v-model="form.account" placeholder="请输入手机号" size="large" class="input-rounded" />
		</el-form-item>

		<!-- 密码输入 -->
		<el-form-item prop="password">
			<el-input v-model="form.password" placeholder="请输入密码" size="large" class="input-rounded">
				<template #suffix> <!-- v-slot:suffix -->
					<span class="forgot-text" @click="goTo('/login/reset')">忘记密码</span>
				</template>
			</el-input>
		</el-form-item>

		<!-- 协议 -->
		<div class="agree-line">
			<el-checkbox v-model="form.agree" size="small" />
			<span class="agree-text">
				我已阅读并同意 <a>用户协议</a> 和 <a>隐私政策</a>
			</span>
		</div>

		<!-- 登录按钮 -->
		<el-button class="login-btn" :class="{ active: canSubmit }" :disabled="false" :style="{
			cursor: canSubmit ? 'pointer' : 'not-allowed',
			pointerEvents: canSubmit ? 'auto' : 'none'
		}" @click="canSubmit ? handleLogin() : null">
			登录
		</el-button>
	</el-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/useUserStore'
import { loginByPassword } from '@/apis/auth'
import { useGoTo } from '@/composables/useGoTo'

const { goTo } = useGoTo()
const userStore = useUserStore()
const arrowLeft = new URL('@/assets/icons/arrow-left/icons8-arrow-50.png', import.meta.url).href

const formRef = ref<FormInstance>()
const form = reactive({
	account: '',
	password: '',
	agree: false
})

const canSubmit = computed(() =>
	form.account.trim() !== '' &&
	form.password.trim() !== '' &&
	form.agree
)

const handleLogin = async () => {
	await formRef.value?.validate()
	try {
		const res = await loginByPassword(form.account, form.password)

		userStore.setUser({
			id: res.data.user.id,
			username: res.data.user.nickname,
			avatar: res.data.user.avatar,
			role: res.data.user.role,
			token: res.data.token
		})

		ElMessage.success('登录成功')
		goTo('/home')
	} catch (err: any) {
		ElMessage.error(err?.message || '登录失败')
		console.log('登录错误:', err)
	}
}

const rules: FormRules = {
	account: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	agree: [{ required: true, message: '请勾选协议', trigger: 'change' }]
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
	transition: color 0.2s ease;
}

.back-icon {
	width: 16px;
	height: 16px;
	margin-right: 6px;
	display: inline-block;
	vertical-align: middle;
	object-fit: contain;
}

.arrow {
	font-size: 18px;
	margin-right: 6px;
	font-weight: 600;
	transform: translateY(-1px);
	/* 微调对齐 */
}

.arrow {
	font-size: 18px;
	margin-right: 6px;
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

/* 密码行内“忘记密码” */
.password-wrapper {
	position: relative;
}

.forgot-text {
	font-size: 12px;
	color: #999;
	margin-right: 8px;
	cursor: pointer;
	transition: color 0.2s ease;
}

.forgot-text:hover {
	color: #ff8140;
}

/* 协议部分 */
.agree-line {
	display: flex;
	align-items: flex-start;
	font-size: 12px;
	color: #999;
	margin-top: 20px;
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
	background-color: transparent; /* 避免背景色干扰 */
}

/* 登录按钮样式 */
.login-btn {
	width: 100%;
	height: 48px;
	background: linear-gradient(to right, #ffd8c2, #ffe9df); /* linear-gradient(...) 使用线性渐变填充背景 */
	border-radius: 999px;
	color: #fff;
	font-size: 16px;
	font-weight: 500;
	border: none;
	transition: all 0.2s ease; /* 让元素的所有属性变化（如 color、background、transform、opacity 等） */
}

.login-btn.active {
	background: linear-gradient(to right, #ff8140, #ffa56f);
}
</style>