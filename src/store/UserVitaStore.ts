import { ref } from 'vue'
import { defineStore } from 'pinia'

// 使用setup模式定义
export const currentUserVitaStore = defineStore('vita', () => {
  const currentPerson = ref()
  return { currentPerson }
})
