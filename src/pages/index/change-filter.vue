<template>
  <view px-36rpx py-18rpx w-full bg-white flex class="change-filter">
    <view flex-1></view>
    <view flex-center text-main class="filter" @click="handleClickFilter">
      <view text-32rpx mr-6rpx>筛选</view>
      <view class="iconfont icon-shaixuan !text-44rpx" />
    </view>
  </view>
</template>

<script setup lang="ts">
const emit = defineEmits(['filter'])
const handleClickFilter = () => {
  emit('filter', true)
}
</script>

<style lang="scss"></style>
