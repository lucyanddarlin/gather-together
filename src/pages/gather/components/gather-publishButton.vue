<template>
  <view
    class="w-100rpx h-100rpx bg-white rounded-64rpx flex items-center justify-center text-60rpx text-#4380FF buttonShadow"
    @tap="handleTap"
    ><i class="iconfont icon-fabuanniu1"></i
  ></view>
</template>
<script setup lang="ts">
import { isNull } from '@/utils/common'

const props = defineProps<{
  url?: string
}>()
// ext: 全局通用（首页、荟聚、发布者模式）
const handleTap = () => {
  if (isNull(props.url)) return
  uni.navigateTo({
    url: props.url as string,
  })
}
</script>

<style scoped>
.iconfont {
  font-size: 42rpx;
}
.buttonShadow {
  box-shadow: 0rpx 4rpx 14rpx 4rpx rgba(67, 128, 255, 0.14);
}
</style>
