import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { reqGetHomeOtherList, reqGetHomePaperList } from '@/api'
import { isNull } from '@/utils/common'
import {
  DEFAULT_PAGE,
  DEFAULT_SIZE,
  INDEX_LIST,
  INDEX_LIST_KEY,
} from '@/utils/constant'
import type { FilterParams, IPaperItem, ListMap } from '@/typings/home'

export const useHomeStore = defineStore('home', () => {
  const homePaperListMap = reactive<ListMap<IPaperItem>>({
    dataList: [],
    dataMap: {},
    page: DEFAULT_PAGE,
    size: DEFAULT_SIZE,
    status: 'loading',
    key: 'topic_id',
  })

  const homeOtherListMap = reactive<{ [key: string]: ListMap }>({
    race: {
      dataList: [],
      dataMap: {},
      page: DEFAULT_PAGE,
      size: DEFAULT_SIZE,
      status: 'loading',
      key: 'post_id',
      type: INDEX_LIST.RACE,
    },
    lecture: {
      dataList: [],
      dataMap: {},
      page: DEFAULT_PAGE,
      size: DEFAULT_SIZE,
      status: 'loading',
      key: 'post_id',
      type: INDEX_LIST.LECTURE,
    },
    activity: {
      dataList: [],
      dataMap: {},
      page: DEFAULT_PAGE,
      size: DEFAULT_SIZE,
      status: 'loading',
      key: 'post_id',
      type: INDEX_LIST.ACTIVITY,
    },
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
      homePaperListMap.page = DEFAULT_PAGE
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

  const getHomeOtherList = async (
    index: number,
    filterParams: FilterParams = {},
    isClear?: boolean
  ) => {
    const key = INDEX_LIST_KEY[index]
    const size = homeOtherListMap[key].size
    const postType = homeOtherListMap[key].type!
    if (isClear) {
      homeOtherListMap[key].status = 'more'
      homeOtherListMap[key].page = DEFAULT_PAGE
    }
    if (homeOtherListMap[key].status === 'noMore') return
    if (
      homeOtherListMap[key].status === 'loading' &&
      homeOtherListMap[key].page
    )
      return
    homeOtherListMap[key].status === 'loading'
    const { data } = await reqGetHomeOtherList(
      homeOtherListMap[key].page++,
      size,
      postType,
      filterParams
    )
    if (isClear) {
      homeOtherListMap[key].dataList = []
      homeOtherListMap[key].dataMap = {}
    }
    if (!isNull(data)) {
      homeOtherListMap[key].status =
        data.body.result.length < homeOtherListMap[key].size ? 'noMore' : 'more'
      data.body.result.forEach((item: any) => {
        if (!homeOtherListMap[key].dataMap[item[homeOtherListMap[key].key]]) {
          homeOtherListMap[key].dataMap[item[homeOtherListMap[key].key]] = item
          homeOtherListMap[key].dataList.push(item)
        }
      })
      console.log(homeOtherListMap)
      return
    }
    homeOtherListMap[key].page--
    homeOtherListMap[key].status = 'more'
  }
  return {
    homePaperList,
    homePaperListMap,
    homeOtherListMap,
    getHomePaperList,
    getHomeOtherList,
  }
})
