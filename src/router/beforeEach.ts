import router from './index'
import { computed } from 'vue'
import { notdefined } from './list'
import { useUserStore, useMenuStore, useTabsStore } from '@/stores'
import type { routerList } from './list'

const add404 = () => {
  router.addRoute(notdefined)
}

const addRoute = (data: routerList[]) => {
  const eachAddRoute = (item: routerList[], parentName = 'LayoutViewAdmin') => {
    item.forEach(item => {
      Reflect.set(item, 'component', () => import(`@/views${item.filepath}`))
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
    return {
      path: '/authentication',
      query: { redirect: to.fullPath }
    }
  } else {
    if (!menuList.value.length && isAuthenticated !== false) {
      add404()
      const data = await useMenu.SET_MENULIST()
      addRoute(data)
      return fullPath
    }
    isAuthenticated !== false && userTabs.ADD_TABS({ name: (to.name as string), url: fullPath })
    if (jwt.value && isAuthenticated === false) {
      router.go(-1)
      return false
    }
    return true
  }
})
