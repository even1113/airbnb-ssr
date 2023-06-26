import { getCookie } from '@/utils/cookie'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userState: 0, // 登录状态
  }),
  actions: {
    initAuthentication() {
      getCookie('token') && this.setLoggedIn(1)
    },
    setLoggedIn(status: number) {
      this.userState = status
    },
  },
})
