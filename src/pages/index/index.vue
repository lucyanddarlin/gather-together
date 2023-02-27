<template>
  <view class="discovery-page">
    <div h-178rpx bg-pink>aa</div>
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
        <view v-show="activeIndex === RACE">race</view>
        <view v-show="activeIndex === LECTURE">lec</view>
        <view v-show="activeIndex === ACTIVITY">act</view>
      </view>
    </scroll-view>
    <Float
      :type="HOME"
      :scroll-value="oldScrollTop"
      :is-show-popup="isShowPopup"
      @back-to-top="handleBackToTop"
    />
    <Popup ref="popup" :select-item="selectItem" @popup="handlePopup" />
  </view>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { ACTIVITY, HOME, LECTURE, RACE } from '@/utils/constant'
import { useHomeStore } from '@/store/modules/home'
import Home from './home.vue'
import type { IPaperItem, TopSection } from '@/typings/home'

type ISelectItem = Partial<IPaperItem>
let selectItem = reactive<ISelectItem>({})
const popup = ref<any>()
const topSectionList: TopSection[] = [
  { index: HOME, title: '首页' },
  { index: RACE, title: '比赛' },
  { index: LECTURE, title: '讲座' },
  { index: ACTIVITY, title: '活动' },
]
const activeIndex = ref<number>(HOME)
const { getHomePaperList } = useHomeStore()
const scrollTop = ref<number>(0)
const oldScrollTop = ref<number>(0)
const isTriggered = ref<boolean>(false)
const isShowPopup = ref<boolean>(false)

onLoad(() => {
  getHomePaperList()
  uni.$on('postNewTopic', handleRefresh)
})
onUnload(() => {
  uni.$off('postNewTopic')
})
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
      padding: 12rpx 12rpx;
      top: 0rpx;
      height: 74rpx;
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
}
</style>
