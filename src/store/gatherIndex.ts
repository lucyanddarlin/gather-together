import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

// 使用setup模式定义
export const gatherIndexStore = defineStore('gather', () => {
  // 顶部栏 列表
  const topNavList = reactive([
    { title: '项目库', index: 0 },
    { title: '人才库', index: 1 },
  ])
  // 筛选列表
  const filterNavList = reactive([
    { title: '本校', index: 0 },
    { title: '综合', index: 1 },
  ])
  // 顶部 页面切换 操作
  const navActiveIndex = ref<number>(0)
  const filterActiveIndex = ref<number>(0)

  const showPopup = ref<boolean>(false)

  return {
    showPopup,
    navActiveIndex,
    filterActiveIndex,
    topNavList,
    filterNavList,
  }
})
