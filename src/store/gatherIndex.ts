import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { PROJECT } from '@/utils/constant'

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

  const activeIndex = ref<number>(PROJECT)
  const filterActiveIndex = ref<number>(0)

  const showPopup = ref<boolean>(false)

  const scrollTop = ref(0)
  const oldScrollTop = ref(0)
  return {
    activeIndex,
    filterActiveIndex,
    topNavList,
    filterNavList,
    scrollTop,
    oldScrollTop,
    showPopup,
  }
})
