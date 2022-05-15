<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import formComponent from '@/components/form-component.vue'

const emit = defineEmits<{(e: 'changeComponent'): void }>()
const toast = useToast()
const changeComponent = () => {
  emit('changeComponent')
}
const loading = ref(false)
const form = ref()
const formOptions = reactive([
  {
    type: 'input',
    prop: 'user',
    value: '',
    attrs: {
      placeholder: '请输入账号',
      prefixIcon: 'user'
    },
    rules: [
      {
        required: true,
        message: '请输入账号',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    prop: 'password',
    value: '',
    attrs: {
      type: 'password',
      placeholder: '请输入密码',
      prefixIcon: 'Lock'
    },
    rules: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }
    ]
  }
])

const getRegister = () => {
  form.value.submitForm(
    async () => {
      loading.value = true
      toast.success('注册成功')
      changeComponent()
    },
    () => {
      console.log('失败')
    }
  )
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
      <form-component :formOptions="formOptions" ref="form" size="large" status-icon />
      <el-button class="w-full !h-10" type="primary" @click="getRegister" :loading="loading">注 册</el-button>
    </div>
  </div>
</template>
