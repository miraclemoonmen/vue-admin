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
      item.component = routerList[item.name as string]
      router.addRoute(parentName, item)
      item.children && eachAddRoute(item.children, item.name as string)
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
