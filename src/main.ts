import { createApp } from 'vue'
import '@/style/tailwind.css'
import '@/style/dark.scss'
import '@/style/remake.scss'
import 'vue-toastification/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as Icons from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import Toast from 'vue-toastification'
import App from './App.vue'
import router from './router'
import './router/beforeEach'
import { createPinia } from 'pinia'

const app = createApp(App)

app.directive('permission', {
  mounted (el, binding) {
    const { value, arg } = binding
    const show = value.some((item: string | undefined) => arg === item)
    !show && el.remove()
  }
})

for (const key in Icons) {
  app.component(key, (Icons as Record<string, any>)[key])
}

app.use(ElementPlus, {
  locale: zhCn
}).use(Toast, {
  timeout: 3000,
  closeOnClick: false,
  showCloseButtonOnHover: true,
  draggable: false
}).use(createPinia()).use(router).mount('#app')
