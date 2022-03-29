import { createApp } from 'vue'
import 'normalize.css'
import '@/style/remake.scss'
import 'vue-toastification/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as Icons from '@element-plus/icons'
import ElementPlus from 'element-plus'
import Toast from 'vue-toastification'
import App from './App.vue'
import router from './router'
import './router/beforeEach'
import store from './store'

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
}).use(store).use(router).mount('#app')
