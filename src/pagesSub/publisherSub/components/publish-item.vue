<template>
  <view
    pl-36rpx
    pr-24rpx
    py-24rpx
    flex
    items-center
    :style="{
      width: isNull(props.width) ? '100%' : props.width,
      height: isNull(props.height) ? '100%' : props.height,
      backgroundColor: isNull(props.bgColor) ? '#fff' : props.bgColor,
      borderRadius: isNull(props.borderRadius) ? '0' : props.borderRadius,
      fontSize: isNull(props.fontSize) ? '28rpx' : props.fontSize,
      fontWeight: isNull(props.fontWeight) ? '400' : props.fontWeight,
      color: props.color,
    }"
  >
    <view flex-1 flex justify-between items-center>
      <view>{{ props.title }}</view>
    </view>
    <view
      ml-28rpx
      :style="{ color: '#CBCBCB' }"
      class="iconfont icon-qianwang"
    />
  </view>
</template>

<script setup lang="ts">
import { isNull } from '@/utils/common'

const props = defineProps<{
  title: string
  color: string
  width?: string
  height?: string
  borderRadius?: string
  bgColor?: string
  fontSize?: string
  fontWeight?: string
}>()
</script>

<style scoped></style>
