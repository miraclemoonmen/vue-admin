<template>
  <el-form :model="from" :rules="rules" label-width="auto" label-position="top" ref="ruleFormRef">
    <el-form-item label="类型">
      <el-radio-group v-model="from.type" @click="resetFields">
        <el-radio-button label="menu">菜单</el-radio-button>
        <el-radio-button label="button">按钮</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="父级" prop="previous">
      <el-cascader
      v-model="from.previous"
      :options="props.menuList"
      :props="{
        mitPath: false,
        checkStrictly: !isButton
      }" />
    </el-form-item>
    <template v-if="!isButton">
      <el-form-item prop="path">
        <template #label>
          <LabelInfo lable="路由地址" content="以 / 开头并遵循 Vue Router 文档规范" />
        </template>
        <el-input v-model="from.path" />
      </el-form-item>
      <el-form-item prop="name">
        <template #label>
          <LabelInfo lable="组件名称" content="请遵循 Vue Router 文档规范" />
        </template>
        <el-input v-model="from.name" />
      </el-form-item>
      <el-form-item label="图标样式" prop="icon">
        <el-popover placement="bottom" :width="'15%'" trigger="click" :hide-after="0">
          <template #reference>
            <el-avatar :icon="from.icon" :style="{ 'cursor': 'pointer' }" />
          </template>
          <template #default>
            <div class="popover_default">
              <el-icon v-for="(item, index) in Object.keys(Icons)" :key="index" @click="changeIcon(item)">
                <component :is="item"></component>
              </el-icon>
            </div>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item prop="state">
        <template #label>
          <LabelInfo lable="显示" content="是否在左侧菜单栏显示" />
        </template>
        <el-switch v-model="from.state" />
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item label="按钮标识" prop="buttonName">
        <el-input v-model="from.buttonName" />
      </el-form-item>
      <el-form-item label="goodDog">
        <image-component :src="src" :src-list="[src]" />
      </el-form-item>
    </template>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue'
import { trim } from 'lodash'
import * as Icons from '@element-plus/icons-vue'
import type { ElForm } from 'element-plus'
import { getShibes } from '@/api/index'
import LabelInfo from '@/components/LabelInfo.vue'
import imageComponent from '@/components/image-component.vue'

// eslint-disable-next-line no-undef
const props = defineProps<{
  menuList: any[],
  data?: Record<string, unknown>
}>()
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const from: { [key: string]: unknown } = reactive({
  type: 'button',
  previous: [],
  path: '',
  name: '',
  buttonName: '',
  icon: '',
  state: true
})
const src = ref()
getShibes().then(res => {
  src.value = res
})

watch(() => props.data, data => {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const element = data[key]
      from[key] = element
    }
  }
})

const isButton = computed(() => from.type === 'button')
const buttonRules = (rule: any, value: any, callback: any) => {
  if (isButton.value && trim(value) === '') {
    callback(new Error('请输入按钮标识'))
  } else {
    callback()
  }
}
const menuRules = (rule: any, value: any, callback: any) => {
  if (!isButton.value && trim(value) === '') {
    callback(new Error())
  } else {
    callback()
  }
}
const rules = reactive({
  previous: [
    { required: true, message: '请选择父级', trigger: 'change' }
  ],
  path: [
    { required: true, message: '请输入路由路径', validator: menuRules, trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入组件名称', validator: menuRules, trigger: 'blur' }
  ],
  buttonName: [
    { required: true, validator: buttonRules, trigger: 'blur' }
  ]
})

const changeIcon = (icon: string) => {
  from.icon = icon
}

const submitForm = (submit: (from: any) => void) => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      submit(from)
    } else {
      // console.log('error submit!', fields)
    }
  })
}
const resetFields = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields()
    console.log(from)
  }
}
// eslint-disable-next-line no-undef
defineExpose({
  submitForm
})
</script>

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
