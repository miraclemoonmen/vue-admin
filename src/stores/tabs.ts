import { defineStore } from 'pinia'
import router from '../router'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    list: [] as any,
    active: ''
  }),
  actions: {
    SET_TABS (data: any) {
      this.list = data
    },
    ADD_TABS ({ name, url }: { name: unknown, url: string }) {
      this.active = url
      if (this.list.some((item: { url: any }) => item.url === url)) return true
      this.list.push({
        name,
        url
      })
    },
    DEL_TABS (targetName: any) {
      if (this.list.length === 1) return true
      if (this.active === targetName) {
        this.list.forEach((item: { url: any }, index: number) => {
          if (item.url === targetName) {
            const nextTab = this.list[index + 1] || this.list[index - 1]
            if (nextTab) {
              this.active = nextTab.url
              router.push(nextTab.url)
            }
          }
        })
      }
      this.list = this.list.filter((item: { url: any }) => item.url !== targetName)
    },
    SET_ACTIVE (data: string) {
      this.active = data
    }
  }
})
