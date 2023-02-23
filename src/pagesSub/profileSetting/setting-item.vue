<template>
  <view pl-48rpx pr-24rpx py-24rpx flex items-center class="setting-item">
    <view flex-1 flex justify-between items-center>
      <view>{{ item.title }}</view>
      <slot></slot>
    </view>
    <view ml-28rpx class="iconfont icon-qianwang" />
  </view>
</template>

<script setup lang="ts">
import { SETTING } from '@/utils/constant'

interface SettingItem {
  type: number
  url: string
  title: string
}

const props = defineProps<{ item: SettingItem }>()
</script>

<style lang="scss">
.setting-item {
  border-top: 2rpx solid rgba(195, 195, 195, 0.17);
}
</style>
