<template>
  <view class="discovery-page">
    <div h-178rpx class="bg-#598DF9"></div>
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
      <view>
        <TabSection :default-active="activeIndex" @tab-switch="handleTabSwitch">
          <TabItem
            v-for="item in topSectionList"
            :key="item.index"
            :index="item.index"
          >
            <text>{{ item.title }}</text>
          </TabItem>
        </TabSection>
        <view v-show="activeIndex === HOME">
          <Home @more="handleShowMoreOptions" />
        </view>
        <view v-show="activeIndex === RACE">
          <ChangeFilter @filter="handleShowFilter" />
        </view>
        <view v-show="activeIndex === LECTURE">
          <ChangeFilter @filter="handleShowFilter" />
        </view>
        <view v-show="activeIndex === ACTIVITY">
          <ChangeFilter @filter="handleShowFilter" />
        </view>
      </view>
    </scroll-view>
    <Float
      :type="activeIndex"
      :scroll-value="oldScrollTop"
      :is-show-popup="isShowPopup"
      @back-to-top="handleBackToTop"
    />
    <Popup ref="popup" :select-item="selectItem" @popup="handlePopup" />
    <u-popup
      v-model="isShowFilter"
      mode="bottom"
      height="70%"
      border-radius="30"
    >
      <view px-32rpx py-52rpx>
        <view
          v-for="item in filterPopupData[currentListKey].map"
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
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import {
  ACTIVITY,
  ACTIVITY_TYPE_LIST,
  HOME,
  INDEX_LIST_KEY,
  LECTURE,
  LECTURE_TYPE_LIST,
  RACE,
  RACE_LEVEL_LIST,
  RACE_TYPE_LIST,
  SPONSOR_LIST,
} from '@/utils/constant'
import { useHomeStore } from '@/store/modules/home'
import { deepClone } from '@/utils/common'
import ChangeFilter from './change-filter.vue'
import Home from './home.vue'
import type {
  FilterPopupDataItem,
  IPaperItem,
  LabelItem,
  TopSection,
} from '@/typings/home'

interface FilterPopupData {
  [key: string]: {
    resultKey: Array<string>
    result: any
    map: Array<FilterPopupDataItem>
  }
}
type ISelectItem = Partial<IPaperItem>
let selectItem = reactive<ISelectItem>({})
const popup = ref<any>()
const topSectionList: TopSection[] = [
  { index: HOME, title: '首页' },
  { index: RACE, title: '比赛' },
  { index: LECTURE, title: '讲座' },
  { index: ACTIVITY, title: '活动' },
]
const activeIndex = ref<number>(RACE)
const { getHomePaperList } = useHomeStore()
const scrollTop = ref<number>(0)
const oldScrollTop = ref<number>(0)
const isTriggered = ref<boolean>(false)
const isShowPopup = ref<boolean>(false)
const isShowFilter = ref<boolean>(false)
const filterPopupData = reactive<FilterPopupData>({
  race: {
    map: [
      { title: '主办方', list: deepClone(SPONSOR_LIST) },
      { title: '比赛类型', list: deepClone(RACE_TYPE_LIST) },
      { title: '比赛级别', list: deepClone(RACE_LEVEL_LIST) },
    ],
    resultKey: ['sponsor_type', 'race_type', 'race_level'],
    result: {},
  },
  lecture: {
    map: [
      { title: '讲座类型', list: deepClone(LECTURE_TYPE_LIST) },
      { title: '主办方类型', list: deepClone(SPONSOR_LIST) },
    ],
    resultKey: ['lecture_type', 'sponsor_type'],
    result: {},
  },
  activity: {
    map: [
      { title: '主办方', list: deepClone(SPONSOR_LIST) },
      { title: '活动类型', list: deepClone(ACTIVITY_TYPE_LIST) },
    ],
    resultKey: ['sponsor_type', 'event_type'],
    result: {},
  },
})
const currentListKey = computed<string>(() => INDEX_LIST_KEY[activeIndex.value])

onLoad(() => {
  uni.$on('postNewTopic', handleRefresh)
})
onUnload(() => {
  uni.$off('postNewTopic')
})
watch(
  activeIndex,
  (value) => {
    if (value === HOME) {
      getHomePaperList()
    } else {
      //TODO: get list
    }
  },
  { deep: true, immediate: true }
)
const handleTabSwitch = (index: number) => {
  activeIndex.value = index
}
const handleRefresh = async () => {
  isTriggered.value = true
  await getHomePaperList(true)
  isTriggered.value = false
}
const handleRefresherAbort = () => {
  isTriggered.value = false
}
const handleScrollToLower = () => {
  getHomePaperList()
}
const handleScroll = (options: any) => {
  console.log(oldScrollTop.value)

  oldScrollTop.value = options.target.scrollTop as number
}
const handleBackToTop = () => {
  scrollTop.value = oldScrollTop.value
  nextTick(() => {
    scrollTop.value = 0
  })
}
const handleShowMoreOptions = (value: ISelectItem) => {
  selectItem = value
  popup.value.show()
}
const handlePopup = (value: boolean) => {
  isShowPopup.value = value
}
const handleShowFilter = (value: boolean) => {
  isShowFilter.value = value
}
const handleClickLabel = (label: LabelItem, list: LabelItem[]) => {
  if (label.isSelected) {
    label.isSelected = false
    return
  }
  list.forEach((item) => (item.isSelected = false))
  label.isSelected = true
}
const handleConfirmFilter = () => {
  filterPopupData[currentListKey.value].result = {}
  for (let i = 0; i < filterPopupData[currentListKey.value].map.length; i++) {
    for (
      let j = 0;
      j < filterPopupData[currentListKey.value].map[i].list.length;
      j++
    ) {
      if (filterPopupData[currentListKey.value].map[i].list[j].isSelected) {
        filterPopupData[currentListKey.value].result[
          filterPopupData[currentListKey.value].resultKey[i]
        ] = filterPopupData[currentListKey.value].map[i].list[j].index
        break
      }
    }
  }
  console.log(filterPopupData[currentListKey.value])
}
const handleResetFilter = () => {
  filterPopupData[currentListKey.value].map.forEach((item) => {
    item.list.forEach((i) => {
      i.isSelected = false
    })
  })
}
</script>

<style lang="scss">
.discovery-page {
  height: 100vh;
  .main-page {
    height: calc(100% - 178rpx);
    background-color: #f7f7f7;
    .tab-section {
      position: sticky;
      display: flex;
      padding: 24rpx 12rpx;
      top: 0rpx;
      // height: 74rpx;
      z-index: 9;
      justify-content: space-around;
      background-color: #fff;
      .tab-item {
        color: #c3c3c3;
        font-size: 32rpx;
        font-weight: bold;
        padding-bottom: 8rpx;
        &.active {
          color: #000000;
          border-bottom: 4rpx solid #361d1e;
        }
      }
    }
  }
  .home_section {
    padding-top: 40rpx;
    .tab-section {
      z-index: 1 !important;
      .tab-item {
        padding-left: 18rpx;
        color: #c3c3c3;
        font-size: 26rpx;
        font-weight: 500 !important;
        &.active {
          color: #2d2d2d;
          border-bottom: 0rpx;
        }
        &.first {
          padding: 0 18rpx 0 0;
          border-right: 3rpx solid #eeeeee;
        }
      }
    }
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
}
</style>
