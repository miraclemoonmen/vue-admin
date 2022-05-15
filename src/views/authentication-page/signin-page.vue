
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import { useRouter } from 'vue-router'
import formComponent from '@/components/form-component.vue'
const emit = defineEmits<{(e: 'changeComponent'): void }>()
const changeComponent = () => {
  emit('changeComponent')
}
const store = useStore<GlobalDataProps>()
const router = useRouter()

const form = ref()
const formOptions = reactive([
  {
    type: 'input',
    prop: 'user',
    value: '',
    attrs: {
      placeholder: '请输入用户账号',
      prefixIcon: 'user'
    },
    rules: [
      {
        required: true,
        message: '请输入用户账号',
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
      placeholder: '请输入用户密码',
      prefixIcon: 'Lock'
    },
    rules: [
      {
        required: true,
        message: '请输入用户密码',
        trigger: 'blur'
      }
    ]
  }
])

const keepPassword = computed(() => store.state.user.keepPassword)

const loading = ref(false)
const getLogin = () => {
  form.value.submitForm(
    async () => {
      loading.value = true
      await store.dispatch('SET_TOKEN')
      router.push({ name: 'Home' })
    },
    () => {
      console.log('失败')
    }
  )
}
</script>

<template>
  <div>
    <h2 class="text-el-base text-3xl font-bold pb-12">Welcome 👋🏻</h2>
    <div>
      <form-component :formOptions="formOptions" ref="form" size="large" status-icon />
      <el-button class="w-full !h-10" @click="getLogin" type="primary" :loading="loading">登 录</el-button>
    </div>
    <div class="flex justify-between">
      <el-checkbox @click.prevent="store.dispatch('SET_KEEPASSWORD')" :model-value="keepPassword" label="记住密码" size="large"></el-checkbox>
      <el-link :underline="false">忘记密码？</el-link>
    </div>
    <p class="flex text-xs mt-4 text-slate-600">
      <span>还没有账号？</span>
      <el-link type="primary" @click="changeComponent">点此注册</el-link>
    </p>
  </div>
</template>
