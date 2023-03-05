<template>
  <view w-full bg-white>
    <view class="area-1 relative">
      <TabSection
        :default-active="activeIndex"
        @tab-switch="handleNavBarSwitch"
      >
        <TabItem
          v-for="item in topNavList"
          :key="item.index"
          :index="item.index"
        >
          <text>{{ item.title }}</text>
        </TabItem>
      </TabSection>
    </view>
    <view class="area-2 relative">
      <TabSection
        v-show="activeIndex === PROJECT_LIBRARY"
        :default-active="filterActiveIndex"
        @tab-switch="handleFilterSwitch"
      >
        <TabItem
          v-for="item in filterNavList"
          :key="item.index"
          :index="item.index"
        >
          <text>{{ item.title }}</text>
        </TabItem>
      </TabSection>
      <view v-show="activeIndex === PEOPLE_LIBRARY" text-black pl-26rpx
        >综合</view
      >
      <view class="text-#598DF9 font-400 flex items-center" @click="handlePopup"
        ><view mr-8rpx>筛选</view><span class="iconfont icon-shaixuan"></span>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
// 引入 gather 主页 的数据
import { gatherIndexStore } from '@/store/gatherIndex'
import { PEOPLE_LIBRARY, PROJECT_LIBRARY } from '@/utils/gatherPage'
import { filterNavList, topNavList } from '@/utils/gatherConstant'
const useGatherIndexStore = gatherIndexStore()
const { activeIndex, filterActiveIndex, showPopup } =
  storeToRefs(useGatherIndexStore)

// 切换 页面
const handleNavBarSwitch = (index: number) => {
  activeIndex.value = index
}
const handleFilterSwitch = (index: number) => {
  filterActiveIndex.value = index
}

// 判断 横幅 是否显示
const handlePopup = () => {
  if (activeIndex.value === PEOPLE_LIBRARY) {
    showPopup.value = !showPopup.value
  } else if (activeIndex.value === PROJECT_LIBRARY) {
    showPopup.value = !showPopup.value
  }
}
</script>

<style scoped></style>
