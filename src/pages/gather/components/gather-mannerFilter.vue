<template>
  <view v-for="item in mannerFilterList" :key="item.mainName" mb-40rpx>
    <view class="text-#A4A4A4 text-32rpx flex">
      <view class="text-#4F82F3 mr-12rpx">{{ item.mainName }}</view>
      <view>{{ item.singSelect ? '单选' : '多选' }}</view>
    </view>
    <view grid mt-24rpx class="filterList">
      <view
        v-for="option in item.selectList"
        :key="option.id"
        class="rounded-18rpx flex items-center justify-center text-24rpx bg-#F5F5F5 text-#A4A4A4"
        :class="activeMannerFilterOption == option.id ? 'activeOption' : ''"
        @click="selectOption(option.id)"
      >
        {{ option.value }}</view
      >
    </view></view
  >
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { mannerFilterList } from '@/utils/gatherConstant'
// 导入 gatherIndex 的 pinia
import { gatherIndexStore } from '@/store/gatherIndex'
// 实例化 gatherIndex pinia
const useGatherIndexStore = gatherIndexStore()
// 导入 nav 栏 活动的值 ； 导入是否展示 筛选
const { activeMannerFilterOption } = storeToRefs(useGatherIndexStore)

const selectOption = (id: number) => {
  activeMannerFilterOption.value = id
}
</script>

<style scoped>
.filterList {
  grid-template-columns: 188rpx 188rpx 188rpx;
  grid-template-rows: 80rpx 80rpx;
  row-gap: 16rpx;
  column-gap: 40rpx;
}
</style>
