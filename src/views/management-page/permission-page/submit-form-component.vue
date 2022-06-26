<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { ElMessageBox } from 'element-plus'
import { submitFormData } from './options'
import type { ElForm, FormInstance } from 'element-plus'
defineProps<{
  isopen: boolean
}>()
const emit = defineEmits<{(e: 'update:isopen', isopen: boolean): void, (e: 'search'): void }>()

const toast = useToast()
const ruleFormRef = ref<InstanceType<typeof ElForm>>()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      toast.success('提交成功')
      close()
      emit('search')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetFields = () => {
  ruleFormRef.value && ruleFormRef.value.resetFields()
}

const handleClose = () => {
  ElMessageBox.confirm('确定要关闭吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(close)
    .catch(() => {
      // catch error
    })
}
const close = () => {
  emit('update:isopen', false)
  resetFields()
}
const options = [
  {
    value: '首页1',
    label: '首页'
  },
  {
    value: '关于1',
    label: '关于'
  },
  {
    value: '系统管理1',
    label: '系统管理',
    children: [{
      value: '用户管理1',
      label: '用户管理'
    }, {
      value: '权限管理',
      label: '权限管理'
    }]
  }
]
</script>

<template>
  <el-drawer size="25%" :before-close="handleClose" :model-value="isopen">
    <el-form ref="ruleFormRef" :model="submitFormData" label-width="auto" label-position="top">
      <el-form-item label="菜单" prop="permissionList">
        <el-cascader v-model="submitFormData.permissionList" :options="options"
          :props="{ emitPath: false, multiple: true }" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
    </template>
  </el-drawer>
</template>
