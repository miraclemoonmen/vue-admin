import { defineStore } from 'pinia'
import router from '../router'

interface listItem {
  name: string,
  url: string
}

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    list: [] as listItem[],
    active: ''
  }),
  actions: {
    SET_TABS (data: listItem[]) {
      this.list = data
    },
    ADD_TABS ({ name, url }: listItem) {
      this.active = url
      if (this.list.some(item => item.url === url)) return true
      this.list.push({
        name,
        url
      })
    },
    DEL_TABS (targetName: string) {
      if (this.active === targetName) {
        this.list.forEach((item, index: number) => {
          if (item.url === targetName) {
            const nextTab = this.list[index + 1] || this.list[index - 1]
            if (nextTab) {
              this.active = nextTab.url
              router.push(nextTab.url)
            }
          }
        })
      }
      this.list = this.list.filter(item => item.url !== targetName)
    },
    SET_ACTIVE (targetName: string) {
      this.active = targetName
    }
  }
})
