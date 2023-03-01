import { ref } from 'vue'
import { defineStore } from 'pinia'

// 使用setup模式定义
export const gatherProjectStore = defineStore('project', () => {
  // 项目库
  const GatherProjectList: any = ref([])
  const GatherPersonList: any = ref([])

  return { GatherProjectList, GatherPersonList }
})
