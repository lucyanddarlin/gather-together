<template>
  <!-- 技能 能力 -->
  <view class="p-32rpx text-28rpx text-#4D4D4D">
    <!-- 种类 -->
    <view flex items-center justify-between mb-32rpx>
      <view class="text-32rpx font-bold">{{ props.type }}</view>
      <view
        class="px-24rpx py-6rpx flex-center rounded-8rpx bg-#f7f7f7 text-#4380FF"
        @click="copy(props.title)"
        >复制</view
      >
    </view>
    <!-- tag 类型 -->
    <view v-show="props.title !== ''" flex mb-20rpx>
      <GatherContentBlock :content="props.title" class="text-#598DF9" />
    </view>
  </view>
</template>
<script setup lang="ts">
import GatherContentBlock from '@/pages/gather/components/gather-contentBlock.vue'
const props = defineProps({
  type: { type: String, default: '' },
  title: { type: String, default: '' },
})
const copy = (value: string) => {
  uni.setClipboardData({
    data: value,
    success() {
      uni.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 1000,
      })
    },
  })
}
</script>

<style scoped></style>
