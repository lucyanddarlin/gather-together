<template>
  <view
    class="w-700rpx h-100rpx flex items-center justify-center bg-#DFDFDF text-white font-bold text-32rpx rounded-24rpx"
  >
    {{ props.value }}
  </view>
</template>
<script setup lang="ts">
const props = defineProps({
  value: { type: [String, Number], default: '' },
})
</script>

<style lang="less" scoped></style>
