<template>
  <view fixed z-9 w-full bg-white>
    <view class="area-1 relative">
      <TabSection
        :default-active="navActiveIndex"
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
      <view class="text-#598DF9 font-400 flex items-center" @click="handlePopup"
        ><view mr-8rpx>筛选</view><span class="iconfont icon-shaixuan"></span>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { gatherIndexStore } from '@/store/gatherIndex'
const useGatherIndexStore = gatherIndexStore()
const {
  navActiveIndex,
  filterActiveIndex,
  topNavList,
  filterNavList,
  showPeopleLibraryPopup,
  showProjectLibraryPopup,
} = storeToRefs(useGatherIndexStore)
const handleNavBarSwitch = (index: number) => {
  navActiveIndex.value = index
}
const handleFilterSwitch = (index: number) => {
  filterActiveIndex.value = index
}
const handlePopup = () => {
  if (navActiveIndex.value === 1) {
    showPeopleLibraryPopup.value = !showPeopleLibraryPopup.value
  } else if (navActiveIndex.value === 0) {
    showProjectLibraryPopup.value = !showProjectLibraryPopup.value
  }
}
</script>

<style scoped></style>
