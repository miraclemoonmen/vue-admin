<template>
  <el-form ref="formRef" :model="form" v-bind="$attrs" :rules="rules">
    <template v-for="(item, index) in formOptions" :key="index">
      <el-form-item v-if="!item.options && item.type !== 'editor' && item.type !== 'upload'" :label="item.lable"
        :prop="item.prop">
        <component :is="`el-${item.type}`" v-model="form[item.prop]" v-bind="item.attrs" />
      </el-form-item>
      <el-form-item v-if="item.options" :label="item.lable" :prop="item.prop">
        <component :is="`el-${item.type}`" v-model="form[item.prop]" v-bind="item.attrs">
          <component v-for="options in item.options" :is="`el-${options.type}`" :key="options.value"
            :label="options.label" :value="options.value"></component>
        </component>
      </el-form-item>
      <el-form-item v-if="item.type === 'upload'" :label="item.lable">
        <el-upload v-bind="item.attrs" :before-remove="beforeRemove" :on-success="onSuccess"
          :file-list="form[item.prop]" multiple>
          <slot name="upload"></slot>
          <template #tip>
            <slot name="tip"></slot>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="item.type === 'editor'" :label="item.lable" :prop="item.prop">
        <div class="editor" v-if="fromType === 'created' ? true : initEditor.getDefaultContent">
          <Toolbar class="toolbar" :editorId="initEditor.editorId" :defaultConfig="initEditor.toolbarConfig"
            :mode="initEditor.mode" />
          <Editor class="content" :style="item.style" :editorId="initEditor.editorId"
            :defaultConfig="initEditor.editorConfig" :defaultContent="initEditor.getDefaultContent"
            :mode="initEditor.mode" />
        </div>
        <el-skeleton v-else :rows="skeletonRows(item?.style?.height)" animated />
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  computed
} from 'vue'
import {
  Editor,
  Toolbar
} from '@wangeditor/editor-for-vue'
import { cloneDeep } from 'lodash'
import '@wangeditor/editor/dist/css/style.css'
import { beforeRemove, useOnSuccess } from '@/hooks/useUpload'
import { initEditor } from '@/hooks/useEditor'
import type { ElForm } from 'element-plus'
type FormInstance = InstanceType<typeof ElForm>;

// eslint-disable-next-line no-undef
const props = defineProps<{
  formOptions: any,
  data?: any,
  fromType?: string
}>()
const formRef = ref<FormInstance>()
const form: any = reactive({})
const rules = reactive({})
const skeletonRows = (str: string) => {
  return parseInt(str.substring(0, str.length - 2)) / 100 + 5
}

props.formOptions.forEach((element: Record<string, never>) => {
  if (element.type === 'editor' && props.fromType === 'created') {
    initEditor.getDefaultContent = computed(() => cloneDeep(element.value))
  } else {
    form[element.prop] = element.value
    rules[element.prop] = element.rules
  }
})

watch(() => props.data, (data) => {
  for (const key in data) {
    if (key === 'editor') {
      initEditor.getDefaultContent = computed(() => cloneDeep(data[key]))
    } else {
      form[key] = data[key]
    }
  }
})

const onSuccess = (response: any, file: any) => {
  useOnSuccess(file, response)
}

const submitForm = (
  submit: (form: Record<string, never>) => void,
  error: (form: Record<string, never>) => void
) => {
  if (!formRef.value) return
  formRef.value.validate((valid, object: any) => {
    // const editor = isEditor()
    if (valid) {
      // editor && (form.editor = editor.children)
      submit(form)
    } else {
      formRef.value && formRef.value.scrollToField(Object.keys(object)[0])
      error(form)
    }
  })
}
const resetForm = () => {
  // const editor = isEditor()
  if (!formRef.value) return
  form.upload && (form.upload = [])
  // editor && editor.clear()
  formRef.value.resetFields()
}

// eslint-disable-next-line no-undef
defineExpose({
  submitForm,
  resetForm
})

onMounted(() => {
  // const editor = isEditor()
  onBeforeUnmount(() => {
    // if (editor == null) return
    // editor.destroy()
    // removeEditor(initEditor.editorId)
  })
})
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  border: 1px solid #ccc;

  .toolbar {
    border-bottom: 1px solid #ccc;
  }

  .content {
    overflow-y: hidden;
  }

  &.w-e-full-screen-container {
    z-index: 1;
  }
}
</style>
