<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import { ElMessageBox } from 'element-plus'
import { submitFormData } from './options'
import type { ElForm, FormInstance, FormRules } from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

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
// const menuRules = (rule: any, value: any, callback: any) => {
//   // if (!isButton.value && trim(value) === '') {
//   //   callback(new Error())
//   // } else {
//   //   callback()
//   // }
//   console.log(rule, value)
// }

const rules = reactive<FormRules>({
  parentNode: [
    { required: true, message: '请选择父级节点', trigger: 'change' }
  ],
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' }
  ],
  path: [
    {
      required: true,
      message: '请输入路由路径',
      // validator: menuRules,
      trigger: 'blur'
    }
  ]
})
</script>

<template>
  <el-drawer size="20%" :before-close="handleClose" :model-value="isopen">
    <el-form ref="ruleFormRef" :rules="rules" :model="submitFormData" label-width="auto" label-position="top">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="submitFormData.type" @click="resetFields">
          <el-radio-button label="list">目录</el-radio-button>
          <el-radio-button label="menu">菜单</el-radio-button>
          <el-radio-button label="button">按钮</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父级节点" prop="parentNode">
        <el-cascader v-model="submitFormData.parentNode" :options="options"
          :props="{ checkStrictly: true, emitPath: false }" clearable />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="submitFormData.name" />
      </el-form-item>
      <template v-if="submitFormData.type !== 'button'">
        <el-form-item label="路径" prop="path">
          <el-input v-model="submitFormData.path" />
        </el-form-item>
        <el-form-item label="隐藏" prop="hide">
          <el-switch v-model="submitFormData.hide" />
        </el-form-item>
        <el-form-item label="图标样式" prop="icon">
          <el-popover placement="bottom" :width="'15%'" trigger="click" :hide-after="0">
            <template #reference>
              <el-avatar class="cursor-pointer" :icon="submitFormData.icon" />
            </template>
            <template #default>
              <div class="popover_default">
                <el-icon v-for="(item, index) in Object.keys(Icons)" :key="index" @click="submitFormData.icon = item">
                  <component :is="item"></component>
                </el-icon>
              </div>
            </template>
          </el-popover>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.icon_button {
  width: 42px;
}

.popover_default {
  height: 200px;
  overflow: auto;

  .el-icon {
    margin: 5px;
    font-size: 25px;
    transition: color 0.2s;

    &:hover {
      cursor: pointer;
      color: $color;
    }

    .svg {
      z-index: 2;
    }
  }
}
</style>
