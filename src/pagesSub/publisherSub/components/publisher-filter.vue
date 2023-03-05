<template>
  <view flex items-center justify-between>
    <view flex justify-start h-72rpx w-584rpx pl-28rpx class="bar">
      <view h-72rpx>
        <u-icon mt-16rpx name="map" size="46rpx" color="#598DF9" />
      </view>
      <view h-72rpx>
        <div mt-12rpx ml-24rpx>{{ props.cur_area }}</div>
      </view>
    </view>
    <view class="bar filter" @tap="handleFilter">
      <span mb-4rpx>筛选</span>
      <span
        class="iconfont icon-shaixuan"
        :style="{ fontSize: '44rpx' }"
        color="#598DF9"
      ></span>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  cur_area: string
}>()
const emit = defineEmits(['showFilter'])
const handleFilter = () => {
  emit('showFilter')
}
</script>

<style scoped>
.bar {
  background-color: white;
  color: #598df9;
  font-size: 36rpx;
  border-radius: 12rpx;
}
.filter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 72rpx;
  width: 158rpx;
  padding-right: 20rpx;
}
</style>
