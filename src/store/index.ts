import { createStore } from 'vuex'
import menuList, { MenuList } from './menuList'
import user, { User } from './user'
import tabs, { Tabs } from './viewsTabs'

export interface GlobalDataProps {
  user: User,
  menuList: MenuList,
  tabs: Tabs
}

export default createStore({
  modules: {
    user,
    menuList,
    tabs
  }
})
