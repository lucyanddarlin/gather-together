import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_PAGE, DEFAULT_SIZE, PROJECT } from '@/utils/constant'

// 使用setup模式定义
export const gatherIndexStore = defineStore('gather', () => {
  // 顶部 页面切换 操作

  const activeIndex = ref<number>(PROJECT)
  const filterActiveIndex = ref<number>(0)

  const showPopup = ref<boolean>(false)

  const scrollTop = ref(0)
  const oldScrollTop = ref(0)

  const gatherPaperListMap = reactive({
    dataList: [],
    dataMap: {},
    page: DEFAULT_PAGE,
    size: DEFAULT_SIZE,
    status: 'loading',
    key: 'project_id',
  })
  return {
    activeIndex,
    filterActiveIndex,
    scrollTop,
    oldScrollTop,
    showPopup,
    gatherPaperListMap,
  }
})
