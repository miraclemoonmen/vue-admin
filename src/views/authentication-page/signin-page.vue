
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
const setKeepPassword = () => {
  store.dispatch('SET_KEEPASSWORD')
}

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
    <h2 class="login_content_title">Welcome 👋🏻</h2>
    <div class="login_content_input">
      <form-component :formOptions="formOptions" ref="form" size="large" status-icon />
      <el-button @click="getLogin" :loading="loading" class="login_content_input_button">登 录</el-button>
    </div>
    <div class="login_content_about">
      <el-checkbox @click.prevent="setKeepPassword" :model-value="keepPassword" label="记住密码" size="large"></el-checkbox>
      <el-button type="text">忘记密码？</el-button>
    </div>
    <p class="login_content_register">
      还没有账号？
      <el-link type="primary" @click="changeComponent">点此注册</el-link>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.login_content {
  &_title {
    color: $color;
    padding-bottom: 57px;
  }

  &_input {
    &_button {
      width: 100%;
      height: 40px;
      color: #fff;
      font-size: 15px;
      border: none;
      background-color: $color;
      box-shadow: var(--el-box-shadow-light);
      border-radius: var(--el-border-radius-base);
    }
  }

  &_about {
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
  }

  &_register {
    margin-top: 20px;
    font-size: 14px;
    display: flex;
    color: var(--el-text-color-regular);
  }
}
</style>
