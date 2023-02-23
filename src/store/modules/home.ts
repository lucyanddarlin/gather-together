import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { reqGetHomePaperList } from '@/api'
import { isNull } from '@/utils/common'
import type { IPaperItem, ListMap } from '@/typings/home'

export const useHomeStore = defineStore('home', () => {
  const commentH = ref<number>(0)
  const homePaperListMap = reactive<ListMap<IPaperItem>>({
    dataList: [],
    dataMap: {},
    page: 0,
    size: 10,
    status: 'loading',
    key: 'topic_id',
  })
  // const homePaperListMap: ListMap<IPaperItem> = {
  //   dataList: [],
  //   dataMap: {},
  //   page: 0,
  //   size: 10,
  //   status: 'loading',
  //   key: 'topic_id',
  // }

  const homePaperList = ref<IPaperItem[]>([])
  const getHomePaperList = async (isClear?: boolean) => {
    if (isClear) {
      homePaperListMap.status = 'more'
      homePaperListMap.page = 0
    }
    if (homePaperListMap.status === 'noMore') return
    if (homePaperListMap.status === 'loading' && homePaperListMap.page) return
    homePaperListMap.status = 'loading'
    const { data } = await reqGetHomePaperList(
      homePaperListMap.page++,
      homePaperListMap.size
    )
    if (isClear) {
      homePaperListMap.dataMap = {}
      homePaperListMap.dataList = []
    }
    if (!isNull(data)) {
      homePaperListMap.status =
        data.body.length < homePaperListMap.size ? 'noMore' : 'more'
      data.body.forEach((item) => {
        if (!homePaperListMap.dataMap[item.topic_id]) {
          homePaperListMap.dataMap[item.topic_id] = item
          homePaperListMap.dataList.push(item)
        }
      })
      return
    }
    homePaperListMap.page--
    homePaperListMap.status = 'more'
  }
  return { commentH, homePaperList, getHomePaperList, homePaperListMap }
})
