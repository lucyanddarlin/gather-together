<template>
  <!-- 荟聚 内容模块 -->
  <view class="gather-project-content p-12rpx mr-12rpx rounded-8rpx bg-#F5F5F5">
    <view class="content-wrap" :class="{ ellipsis: ellipsis }">
      {{ props.content }}
    </view>
  </view>
</template>
<script setup lang="ts">
const props = defineProps({
  content: { type: [String, Number], default: '' },
  ellipsis: Boolean,
})
</script>

<style lang="scss" scoped>
.gather-project-content {
  .content-wrap {
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    &.ellipsis {
      @include text-ellipsis-multi(3);
    }
  }
}
</style>
