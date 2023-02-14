<template>
  <!-- 技能 能力 -->
  <view class="p-32rpx text-28rpx text-#4D4D4D">
    <!-- 种类 -->
    <view class="text-32rpx font-bold mb-32rpx">{{ props.type }}</view>
    <!-- 标题 -->
    <view v-show="props.title !== ''" flex mb-20rpx>
      <GatherContentBlock :content="props.title" class="text-#598DF9" />
    </view>

    <view flex flex-nowrap mb-36rpx
      ><view
        v-for="item in imgList"
        :key="item"
        class="w-212rpx h-212rpx bg-#D9D9D9 rounded-12rpx mr-20rpx"
      ></view
    ></view>
    <!-- 简介介绍 -->
    <view v-show="props.content !== ''"> {{ props.content }}</view>
  </view>
</template>
<script setup lang="ts">
import GatherContentBlock from '@/pages/gather/components/gather-contentBlock.vue'
const props = defineProps({
  type: { type: String, default: '' },
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  imgList: { type: Array<any>, default: () => [] },
})
</script>

<style scoped></style>
