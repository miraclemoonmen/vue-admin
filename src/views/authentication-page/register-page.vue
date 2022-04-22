<template>
  <div>
    <p class="register_content_back" @click="changeComponent">
      <el-icon>
        <back />
      </el-icon>
      <span class="register_content_back_text">返回</span>
    </p>
    <h2 class="register_content_title">Register</h2>
    <div class="register_content_input">
      <form-component :formOptions="formOptions" ref="form" size="large" status-icon />
      <el-button @click="getRegister" :loading="loading" class="register_content_input_button">注 册</el-button>
    </div>
    <div class="register_content_about"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import formComponent from '@/components/form-component.vue'

// eslint-disable-next-line no-undef
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

<style lang="scss" scoped>
.register_content {
  &_back {
    display: flex;
    width: 50px;
    cursor: pointer;
    font-size: 15px;
    color: var(--el-text-color-regular);
    &_text {
      margin-left: 5px;
    }
  }
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
}
</style>
