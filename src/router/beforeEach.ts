import router from './index'
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { routerList, notdefined } from './list'
import store from '@/store'

const jwt = computed(() => store.state.user.token)
const menuList = computed(() => store.state.menuList.data)

const add404 = () => {
  router.addRoute(notdefined)
}

const addRoute = async () => {
  const data = await store.dispatch('SET_MENULIST')
  const eachAddRoute = (item: RouteRecordRaw[], parentName = 'LayoutViewAdmin') => {
    item.forEach(item => {
      const componentName = item.name as string
      const component = Reflect.get(routerList, componentName)
      if (!component) {
        if ((item.meta as any).list) {
          Reflect.set(item, 'component', Reflect.get(routerList, 'LayoutPage'))
        } else {
          throw new Error(`Not Find ${componentName} Page`)
        }
      } else {
        Reflect.set(item, 'component', component)
      }
      router.addRoute(parentName, item)
      item.children && eachAddRoute(item.children, componentName)
    })
  }
  eachAddRoute(data)
}

router.beforeEach(async to => {
  const fullPath = to.fullPath
  const isAuthenticated = to.meta?.isAuthenticated
  if (isAuthenticated !== false && !jwt.value) {
    return '/authentication'
  } else {
    if (!menuList.value.length && isAuthenticated !== false) {
      add404()
      await addRoute()
    }
    if (to.name == null) {
      return fullPath
    }
    isAuthenticated !== false && store.dispatch('ADD_TABS', { name: to.meta.name, url: fullPath })
    if (jwt.value && isAuthenticated === false) {
      router.go(-1)
      return false
    }
    return true
  }
})
