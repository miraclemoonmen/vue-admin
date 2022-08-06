import { reactive } from 'vue'
// import { getEditor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

export const initEditor: any = reactive({
  editorId: `w-e-${Math.random().toString().slice(-5)}`,
  toolbarConfig: {},
  getDefaultContent: null,
  editorConfig: { placeholder: '请输入内容...', autoFocus: false },
  mode: 'default'
})

// export const isEditor = () => {
//   return getEditor(initEditor.editorId)
// }
