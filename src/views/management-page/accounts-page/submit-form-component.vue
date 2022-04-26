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
</script>

<template>
  <el-drawer size="20%" :before-close="handleClose" :model-value="isopen">
    <el-form ref="ruleFormRef" :model="submitFormData" label-width="auto" label-position="top">
      <el-form-item label="ID" prop="name">
        <el-input v-model="submitFormData.name" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="submitFormData.age" />
      </el-form-item>
      <el-form-item label="创建时间" prop="gmtCreate">
        <el-date-picker v-model="submitFormData.gmtCreate" type="date" value-format="YYYY-MM-DD" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
    </template>
  </el-drawer>
</template>
