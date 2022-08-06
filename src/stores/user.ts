import { defineStore } from 'pinia'
import { login } from '@/api/index'
import { useDark } from '@vueuse/core'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: window.localStorage.getItem('token'),
    keepPassword: true,
    isDark: useDark()
  }),
  actions: {
    async SET_TOKEN () {
      const { token } = await login()
      this.token = token
      if (!this.keepPassword) return
      window.localStorage.setItem('token', token)
    },
    CLEAR_TOKEN () {
      window.localStorage.removeItem('token')
    },
    SET_KEEPASSWORD () {
      this.keepPassword = !this.keepPassword
    },
    SET_ISDARK (value: boolean) {
      this.isDark = value
    }
  }
})
