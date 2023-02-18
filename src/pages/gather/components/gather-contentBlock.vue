<template>
  <!-- 荟聚 内容模块 -->
  <view class="p-12rpx mr-12rpx rounded-8rpx bg-#F5F5F5">{{
    props.content
  }}</view>
</template>
<script setup lang="ts">
const props = defineProps({
  content: { type: [String, Number], default: '' },
})
</script>

<style lang="less" scoped></style>
