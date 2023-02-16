<template>
  <view class="discovery-page">
    <div h-178rpx bg-pink>aa</div>
    <scroll-view
      class="main-page"
      :scroll-y="true"
      :scroll-with-animation="true"
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
        <view v-show="activeIndex === HOME"> <Home /> </view>
        <view v-show="activeIndex === RACE">race</view>
        <view v-show="activeIndex === LECTURE">lec</view>
        <view v-show="activeIndex === ACTIVITY">act</view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { ACTIVITY, HOME, LECTURE, RACE } from '@/utils/constant'
import { useHomeStore } from '@/store/modules/home'
import Home from './home.vue'
import type { TopSection } from '@/typings/home'

const topSectionList: TopSection[] = [
  { index: HOME, title: '首页' },
  { index: RACE, title: '比赛' },
  { index: LECTURE, title: '讲座' },
  { index: ACTIVITY, title: '活动' },
]
const activeIndex = ref<number>(HOME)
// const tabMap: any = [['home', reqGetHomePaperList]]
const { getHomePaperList } = useHomeStore()

// interface ListMap {
//   [key: string]: {
//     dataList: Array<any>
//     dataMap: object
//     key: string
//     page: number
//     size: number
//     status: 'loading' | 'more' | 'noMore'
//   }
// }
// const listMap = reactive<ListMap>({
//   home: {
//     dataList: [],
//     dataMap: {},
//     key: 'topic_id',
//     page: 0,
//     size: 10,
//     status: 'loading',
//   },
// })

const handleTabSwitch = (index: number) => {
  activeIndex.value = index
}
// const getDataList = async (
//   isClear?: boolean,
//   index: number = activeIndex.value
// ) => {
//   const type = tabMap[index][0] as string
//   const requestApi = tabMap[index][1]
//   if (isClear) {
//     listMap[type].status = 'more'
//     listMap[type].page = 0
//   }
//   if (listMap[type].status === 'noMore') return
//   if (listMap[type].status === 'loading' && listMap[type].page) return
//   listMap[type].status = 'loading'
//   const { data } = await requestApi(listMap[type].page++, listMap[type].size)
//   listMap[type].dataList = data.body
// }
onLoad(() => {
  getHomePaperList()
})
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
          border-bottom: 2px solid #361d1e;
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
