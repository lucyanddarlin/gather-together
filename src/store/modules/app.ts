import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app-store',
  state: () => ({
    hello: '仓库测试值',
  }),

  getters: {
    getHello(): string {
      return this.hello
    },
  },
  actions: {
    changeVal() {
      this.hello = '改变值为：14'
    },
  },
})
