import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { getRouter } from '@/api'
import { routesMenu } from '@/router/list'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    list: [] as RouteRecordRaw[]
  }),
  actions: {
    async SET_MENULIST () {
      const data = await getRouter()
      this.list = [...routesMenu, ...data]
      return data
    }
  }
})
