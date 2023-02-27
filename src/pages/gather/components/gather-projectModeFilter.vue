<template>
  <view v-for="item in projectModeFilterList" :key="item.mainName" mb-40rpx>
    <view class="text-#A4A4A4 text-32rpx flex">
      <view class="text-#4F82F3 mr-12rpx">{{ item.mainName }}</view>
      <view>{{ item.singSelect ? '单选' : '多选' }}</view>
    </view>
    <view grid mt-24rpx class="filterList">
      <view
        v-for="option in item.selectList"
        :key="option.id"
        class="rounded-18rpx flex items-center justify-center text-24rpx bg-#F5F5F5 text-#A4A4A4"
        :class="activeFilterOption == option.id ? 'activeFilterOption' : ''"
        @click="selectOption(option.id)"
      >
        {{ option.value }}</view
      >
    </view></view
  >
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { projectModeFilterList } from '@/utils/gatherConstant'

const activeFilterOption = ref(99)
const selectOption = (id: number) => {
  activeFilterOption.value = id
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
