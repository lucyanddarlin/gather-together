<template>
  <view>
    <view flex px-28rpx pt-20rpx bg-white>
      <view flex-1>
        <span block mb-6rpx class="text-#FFAF50 text-32rpx">荟聚论坛</span>
        <span px-10rpx py-6rpx text-20rpx class="text-#F28300/66 bg-#F28300/9">
          添加爱好以获得更适合的推送
        </span>
      </view>
      <view class="home_section">
        <TabSection :default-active="homeIndex" @tab-switch="handleHomeSection">
          <TabItem
            v-for="item in homeSectionList"
            :key="item.index"
            :index="item.index"
          >
            <text>{{ item.title }}</text>
          </TabItem>
        </TabSection>
      </view>
    </view>
    <view v-if="homePaperListMap.dataList.length > 0">
      <PaperItem
        v-for="item in homePaperListMap.dataList"
        :key="item.topic_id"
        :paper-item="item"
        :type="HOME"
        dots
        @more-options="handleShowMoreOptions"
      >
        <template #title>{{ item.title }}</template>
        <!-- <template #content>{{ item.content }}</template> -->
      </PaperItem>
    </view>
    <LoadMore :status="homePaperListMap.status" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/store/modules/home'
import { HOME } from '@/utils/constant'

import type { IPaperItem, TopSection } from '@/typings/home'

const emit = defineEmits(['more'])
const NORMAL = 0
const MY_ZONE = 1
const homeIndex = ref<number>(NORMAL)
const homeSectionList: TopSection[] = [
  { index: NORMAL, title: '综合' },
  { index: MY_ZONE, title: '我的分区' },
]
const { homePaperListMap } = storeToRefs(useHomeStore())
const handleHomeSection = (index: number) => {
  homeIndex.value = index
}
const handleShowMoreOptions = (value: IPaperItem) => {
  emit('more', value)
}
</script>

<style lang="scss"></style>
