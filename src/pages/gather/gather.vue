<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <view class="discovery-page bg-#f7f7f7">
    <NavBar />
    <GatherSelectPage w-full />
    <scroll-view
      class="main-page"
      :scroll-y="true"
      :scroll-with-animation="true"
      :scroll-top="scrollTop"
      :refresher-enabled="true"
      :refresher-triggered="isTriggered"
      @scroll="handleScroll"
      @scrolltolower="handleScrollToLower"
      @refresherrefresh="handleRefresh"
      @refresherabort="handleRefresherAbort"
    >
      <view v-show="activeIndex == PROJECT_LIBRARY">
        <PaperItem
          v-for="item in gatherPaperListMap['project'].dataList"
          :key="item.project_id"
          :type="GATHER"
          :paper-item="item"
          dots
        >
          <template #title>{{ item.project_name }}</template>
          <template #label>
            <view flex flex-wrap>
              <view
                v-for="(key, index) in projectLabelList.labelKey"
                :key="key"
                class="label-item text-#FFAF50"
              >
                #{{
                  projectLabelList.map[index].list.find(
                    (i) => i.index === item[key]
                  )?.value || '未知字段'
                }}
              </view>
            </view>
          </template>
        </PaperItem></view
      >
      <view v-show="activeIndex == PEOPLE_LIBRARY" pt-20rpx>
        <GatherPeople
          v-for="item in gatherPaperListMap['people'].dataList"
          :key="item.user_id"
          :name="item.name"
          :school="item.school"
          :profession="item.profession"
          :content="item.profile"
          @toPeopleDetail="toPeopleDetail(item.user_id)"
        >
          <template #tags>
            <view flex flex-wrap>
              <view
                v-for="(key, index) in peopleLabelList.labelKey"
                :key="key"
                class="label-item text-#FFAF50"
              >
                #{{
                  peopleLabelList.map[index].list.find(
                    (i) => i.index === item[key]
                  )?.value || '未知能力'
                }}
              </view>
            </view></template
          >
        </GatherPeople>
      </view>
    </scroll-view>
  </view>
  <!-- 发布 和 返回顶部的按钮 -->
  <Float
    :type="activeIndex"
    :scroll-value="oldScrollTop"
    gather
    @back-to-top="handleBackToTop"
  />
  <u-popup v-model="showPopup" mode="bottom" height="60%" border-radius="30">
    <view px-32rpx py-52rpx>
      <view
        v-for="item in ProjectFilterPopupData[currentListKey].map"
        :key="item.title"
        mb-56rpx
      >
        <view text-32rpx text-main mb-24rpx>
          {{ item.title }} <text class="text-#A4A4A4 ml-12rpx">单选</text>
        </view>
        <view grid grid-cols-3 gap-20rpx>
          <view
            v-for="label in item.list"
            :key="label.value"
            w-190rpx
            h-74rpx
            flex-center
            rounded-18rpx
            transition-color
            duration-300
            class="bg-#F5F5F5 text-#A4A4A4"
            :class="{ '!bg-main text-white': label.isSelected }"
            @click="handleClickLabel(label, item.list)"
          >
            {{ label.value }}
          </view>
        </view>
      </view>
      <view flex-center>
        <view
          class="filter-btn bg-#278C5C mr-22rpx"
          @click="handleConfirmFilter"
        >
          确认
        </view>
        <view class="filter-btn bg-#FF6969" @click="handleResetFilter">
          重置
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
// 人才库 和 项目库数据
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 切换页面
import { PEOPLE_LIBRARY, PROJECT_LIBRARY } from '@/utils/gatherPage'
import {
  DEFAULT_PAGE,
  DEFAULT_SIZE,
  GATHER,
  GATHER_LIST_KEY,
  LEARNING_DIRECTION_LIST,
  MANNERp_TYPE_LIST,
  PROJECT_MODE_LIST,
  PROJECT_TYPE_LIST,
} from '@/utils/constant'
// 导入 gatherIndex 的 pinia
import { gatherIndexStore } from '@/store/gatherIndex'
// 引入组件
import GatherSelectPage from '@/pages/gather/components/gather-pageSelect.vue'
import GatherPeople from '@/pages/gather/components/gather-people.vue'
import {
  reqGatherPersonList,
  reqGatherProjectList,
  reqOtherGatherPersonList,
  reqOtherGatherProjectList,
} from '@/api/gather'
import { isNull } from '@/utils/common'
import type { FilterPopupDataItem, ListMap } from '@/typings/home'
interface ProjectLabelList {
  labelKey: Array<string>
  map: Array<FilterPopupDataItem>
}

const isTriggered = ref<boolean>(false)
const projectLabelList: ProjectLabelList = {
  map: [
    { title: '项目模式', list: PROJECT_MODE_LIST },
    { title: '项目类型', list: PROJECT_TYPE_LIST },
  ],
  labelKey: ['project_mode', 'project_type'],
}

const peopleLabelList: ProjectLabelList = {
  map: [
    { title: '能力类型', list: MANNERp_TYPE_LIST },
    { title: '学习方向', list: LEARNING_DIRECTION_LIST },
  ],
  labelKey: ['manner_type', 'learning_direction'],
}
// 实例化 gatherIndex pinia
const useGatherIndexStore = gatherIndexStore()

// 导入 nav 栏 活动的值 ； 导入是否展示 筛选
const { activeIndex, scrollTop, oldScrollTop, showPopup } =
  storeToRefs(useGatherIndexStore)

// 跳转到 人才库 详情页
const toPeopleDetail = (id: any) => {
  uni.navigateTo({
    url: `/pagesSub/gatherSub/gatherSub-person?user_id=${id}`,
  })
}

type RequestReturnData<T> = {
  code: 200 | 500 | number
  data: T
}
const apiKeyMap: Array<
  [
    string,
    (page: number, size: number) => Promise<RequestReturnData<AnyObject>>
  ]
> = [
  ['project', reqGatherProjectList],
  ['people', reqGatherPersonList],
]

const gatherPaperListMap = reactive<{ [key: string]: ListMap }>({
  project: {
    dataList: [],
    dataMap: {},
    page: DEFAULT_PAGE,
    size: DEFAULT_SIZE,
    status: 'more',
    key: 'project_id',
  },
  people: {
    dataList: [],
    dataMap: {},
    page: DEFAULT_PAGE,
    size: DEFAULT_SIZE,
    status: 'more',
    key: 'people_id',
  },
})

const getDataList = async (isClear?: boolean) => {
  const type = apiKeyMap[activeIndex.value][0]
  const requestApi = apiKeyMap[activeIndex.value][1]
  if (isClear) {
    gatherPaperListMap[type].status = 'more'
    gatherPaperListMap[type].page = DEFAULT_PAGE
  }
  if (gatherPaperListMap[type].status === 'noMore') return
  if (
    gatherPaperListMap[type].status === 'loading' &&
    gatherPaperListMap[type].page
  )
    return
  gatherPaperListMap[type].status = 'loading'
  const { data } = await requestApi(
    gatherPaperListMap[type].page++,
    gatherPaperListMap[type].size
  )

  if (isClear) {
    gatherPaperListMap[type].dataList = []
    gatherPaperListMap[type].dataMap = {}
  }
  if (!isNull(data)) {
    gatherPaperListMap[type].status =
      data.body.result.length < gatherPaperListMap[type].size
        ? 'noMore'
        : 'more'
    data.body.result.forEach((item: any) => {
      if (
        !gatherPaperListMap[type].dataMap[item[gatherPaperListMap[type].key]]
      ) {
        gatherPaperListMap[type].dataList.push(item)
      }
    })
    return
  }
  gatherPaperListMap[type].page--
  gatherPaperListMap[type].status = 'more'
}

const getProjectOtherList = async (isClear?: boolean) => {
  const type = apiKeyMap[activeIndex.value][0]

  if (isClear) {
    gatherPaperListMap[type].status = 'more'
    gatherPaperListMap[type].page = DEFAULT_PAGE
  }
  if (gatherPaperListMap[type].status === 'noMore') return
  if (
    gatherPaperListMap[type].status === 'loading' &&
    gatherPaperListMap[type].page
  )
    return
  gatherPaperListMap[type].status = 'loading'
  const { data } = await reqOtherGatherProjectList(
    gatherPaperListMap[type].page++,
    gatherPaperListMap[type].size,
    ProjectFilterPopupData[currentListKey.value].result.project_mode,
    ProjectFilterPopupData[currentListKey.value].result.project_type
  )

  if (isClear) {
    gatherPaperListMap[type].dataList = []
    gatherPaperListMap[type].dataMap = {}
  }
  if (!isNull(data)) {
    gatherPaperListMap[type].status =
      data.body.result.length < gatherPaperListMap[type].size
        ? 'noMore'
        : 'more'
    data.body.result.forEach((item: any) => {
      if (
        !gatherPaperListMap[type].dataMap[item[gatherPaperListMap[type].key]]
      ) {
        gatherPaperListMap[type].dataList.push(item)
      }
    })
    return
  }
  gatherPaperListMap[type].page--
  gatherPaperListMap[type].status = 'more'
}
const getPeopleOtherList = async (isClear?: boolean) => {
  const type = apiKeyMap[activeIndex.value][0]

  if (isClear) {
    gatherPaperListMap[type].status = 'more'
    gatherPaperListMap[type].page = DEFAULT_PAGE
  }
  if (gatherPaperListMap[type].status === 'noMore') return
  if (
    gatherPaperListMap[type].status === 'loading' &&
    gatherPaperListMap[type].page
  )
    return
  gatherPaperListMap[type].status = 'loading'
  const { data } = await reqOtherGatherPersonList(
    gatherPaperListMap[type].page++,
    gatherPaperListMap[type].size,
    ProjectFilterPopupData[currentListKey.value].result.manner_type,
    ProjectFilterPopupData[currentListKey.value].result.learning_direction
  )

  if (isClear) {
    gatherPaperListMap[type].dataList = []
    gatherPaperListMap[type].dataMap = {}
  }
  if (!isNull(data)) {
    gatherPaperListMap[type].status =
      data.body.result.length < gatherPaperListMap[type].size
        ? 'noMore'
        : 'more'
    data.body.result.forEach((item: any) => {
      if (
        !gatherPaperListMap[type].dataMap[item[gatherPaperListMap[type].key]]
      ) {
        gatherPaperListMap[type].dataList.push(item)
      }
    })
    return
  }
  gatherPaperListMap[type].page--
  gatherPaperListMap[type].status = 'more'
}

onLoad(() => {
  getDataList()
})
watch(
  activeIndex,
  () => {
    getDataList()
  },
  { deep: true, immediate: true }
)
const handleScrollToLower = async () => {
  await getDataList()
}

// 检测滚动
const handleScroll = (options: any) => {
  oldScrollTop.value = options.target.scrollTop as number
}
const handleBackToTop = () => {
  scrollTop.value = oldScrollTop.value
  nextTick(() => {
    scrollTop.value = 0
  })
}
// 项目筛选菜单
const ProjectFilterPopupData: any = reactive({
  project: {
    map: [
      { title: '项目模式', list: PROJECT_MODE_LIST },
      { title: '项目类型', list: PROJECT_TYPE_LIST },
    ],
    resultKey: ['project_mode', 'project_type'],
    result: {},
  },
  people: {
    map: [
      { title: '能力类型', list: MANNERp_TYPE_LIST },
      { title: '学习方向', list: LEARNING_DIRECTION_LIST },
    ],
    resultKey: ['manner_type', 'learning_direction'],
    result: {},
  },
})

const currentListKey: any = computed(() => GATHER_LIST_KEY[activeIndex.value])

const handleClickLabel = (
  label: { isSelected: boolean },
  list: { isSelected: boolean }[]
) => {
  if (label.isSelected) {
    label.isSelected = false
    return
  }
  list.forEach((item: { isSelected: boolean }) => (item.isSelected = false))
  label.isSelected = true
}
const handleResetFilter = () => {
  ProjectFilterPopupData[currentListKey.value].map.forEach(
    (item: { list: any[] }) => {
      item.list.forEach((i) => {
        i.isSelected = false
      })
    }
  )
}
const handleConfirmFilter = async () => {
  ProjectFilterPopupData[currentListKey.value].result = {}
  for (
    let i = 0;
    i < ProjectFilterPopupData[currentListKey.value].map.length;
    i++
  ) {
    for (
      let j = 0;
      j < ProjectFilterPopupData[currentListKey.value].map[i].list.length;
      j++
    ) {
      if (
        ProjectFilterPopupData[currentListKey.value].map[i].list[j].isSelected
      ) {
        ProjectFilterPopupData[currentListKey.value].result[
          ProjectFilterPopupData[currentListKey.value].resultKey[i]
        ] = ProjectFilterPopupData[currentListKey.value].map[i].list[j].index
        break
      }
    }
  }
  console.log(ProjectFilterPopupData[currentListKey.value].result)
  showPopup.value = false
  if (activeIndex.value === PROJECT_LIBRARY) {
    await getProjectOtherList(true)
  } else {
    await getPeopleOtherList(true)
  }
}
const handleRefresh = async () => {
  isTriggered.value = true
  await getDataList(true)
  isTriggered.value = false
}
const handleRefresherAbort = () => {
  isTriggered.value = false
}
</script>

<style lang="scss">
.area-1 {
  .tab-section {
    padding-top: 24rpx;
    display: flex;
    justify-content: space-around;
    .tab-item {
      color: #c3c3c3;
      font-weight: 500;
      font-size: 32rpx;
      padding-bottom: 8rpx;
      &.active {
        color: #2d2d2d;
        border-bottom: 4rpx solid #2d2d2d;
      }
    }
  }
}
.area-2 {
  padding: 36rpx 32rpx 24rpx 12rpx;
  font-size: 32rpx;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #c3c3c3;
  .tab-section {
    width: 240rpx;
    display: flex;
    justify-content: space-around;
    .tab-item {
      &.active {
        color: #2d2d2d;
      }
    }
  }
}
.icon-shaixuan {
  font-size: 36rpx;
}
.icon-gengduo {
  font-size: 48rpx;
}
.filterList {
  grid-template-columns: 188rpx;
  grid-template-rows: 80rpx;
  row-gap: 16rpx;
  column-gap: 40rpx;
}
.activeFilterOption {
  background-color: #598df9;
  color: white;
}
.icon-fasong,
.icon-shouqi {
  font-size: 56rpx;
}
.buttonShadow {
  box-shadow: 0rpx 4rpx 14rpx 4rpx rgba(67, 128, 255, 0.14);
}
.discovery-page {
  height: 100vh;
}
.main-page {
  height: calc(100% - 372rpx);
  background-color: #f7f7f7;
}
.filter-btn {
  width: 324rpx;
  height: 72rpx;
  border-radius: 12rpx;
  font-size: 32rpx;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
