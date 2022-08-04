<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import type { ElForm, FormInstance, FormRules } from 'element-plus'

const emit = defineEmits<{(e: 'changeComponent'): void }>()
const toast = useToast()
const changeComponent = () => {
  emit('changeComponent')
}
const loading = ref(false)
const ruleFormRef = ref<InstanceType<typeof ElForm>>()

const submitFormData = reactive({
  user: '',
  password: '',
  doublePassword: ''
})

const passwordRules = (rule: any, value: string, callback: (action?: Error) => void) => {
  if (value.length === 0) {
    callback(new Error('请再次输入密码'))
  }
  if (submitFormData.password !== submitFormData.doublePassword) {
    callback(new Error('两次输入密码不一致'))
  }
  callback()
}

const rules = reactive<FormRules>({
  user: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  doublePassword: [
    { required: true, validator: passwordRules, trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(valid => {
    if (valid) {
      toast.success('注册成功')
      changeComponent()
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<template>
  <div>
    <p class="flex place-items-center mb-12 dark:text-slate-400" @click="changeComponent">
      <el-icon class="cursor-pointer">
        <back />
      </el-icon>
      <span class="pl-1 register_content_back_text cursor-pointer">返回</span>
    </p>
    <h2 class="text-el-base dark:text-el-dark-base text-3xl font-bold pb-12">Register</h2>
    <div>
      <el-form ref="ruleFormRef" :rules="rules" :model="submitFormData" status-icon size="large" label-width="auto">
          <el-space fill>

        <el-alert type="info" show-icon :closable="false">
          <p>"Full Name" label is </p>
        </el-alert>
        <el-form-item prop="user">
          <el-input v-model="submitFormData.user" prefix-icon="user" placeholder="请输入账号" />
        </el-form-item>
        </el-space>
        <el-form-item prop="password">
          <el-input v-model.trim="submitFormData.password" type="password" show-password prefix-icon="lock"
            placeholder="请输入密码" />
        </el-form-item>
        <el-form-item prop="doublePassword">
          <el-input v-model.trim="submitFormData.doublePassword" type="password" show-password prefix-icon="lock"
            placeholder="请再次输入密码" />
        </el-form-item>
      </el-form>
      <el-button class="w-full !h-10" type="primary" @click="submitForm(ruleFormRef)" :loading="loading">注 册</el-button>
    </div>
  </div>
</template>
