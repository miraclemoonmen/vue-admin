import router from './index'
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { routerList, notdefined } from './list'
import { useUserStore, useMenuStore, useTabsStore } from '@/stores'

const add404 = () => {
  router.addRoute(notdefined)
}

const addRoute = async (data: any) => {
  const eachAddRoute = (item: RouteRecordRaw[], parentName = 'LayoutViewAdmin') => {
    item.forEach(item => {
      const componentName = item.component as unknown as string
      const component = Reflect.get(routerList, componentName)
      if (!component) {
        throw new Error(`Not Find ${componentName} Page`)
      }
      Reflect.set(item, 'component', component)
      router.addRoute(parentName, item)
      item.children && eachAddRoute(item.children, item.name as string)
    })
  }
  eachAddRoute(data)
}

router.beforeEach(async to => {
  const userStore = useUserStore()
  const userTabs = useTabsStore()
  const useMenu = useMenuStore()
  const jwt = computed(() => userStore.token)
  const menuList = computed(() => useMenu.list)
  const fullPath = to.fullPath
  const isAuthenticated = to.meta?.isAuthenticated
  if (isAuthenticated !== false && !jwt.value) {
    return '/authentication'
  } else {
    if (!menuList.value.length && isAuthenticated !== false) {
      add404()
      const data = await useMenu.SET_MENULIST()
      addRoute(data)
      return fullPath
    }
    isAuthenticated !== false && userTabs.ADD_TABS({ name: to.name, url: fullPath })
    if (jwt.value && isAuthenticated === false) {
      router.go(-1)
      return false
    }
    return true
  }
})
