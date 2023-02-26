<template>
  <view
    px-28rpx
    py-28rpx
    mt-20rpx
    bg-white
    w-full
    relative
    @click="handleClick"
  >
    <view text-32rpx font-bold class="text-#534E4E">{{ title }}</view>
    <span
      absolute
      w-50rpx
      h-50rpx
      right-24rpx
      top-24rpx
      class="iconfont icon-sousuo"
    ></span>
    <view flex my-20rpx>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-main"
      >
        2022-12-20 10:00 至 2023-01-06 10:00
      </view>
    </view>
    <view flex my-20rpx>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-main"
      >
        广州大学大学城校区红棉路
      </view>
    </view>
    <view flex my-20rpx>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-#56C28E"
      >
        进行中
      </view>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-#FFAF50"
      >
        #政府
      </view>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-#FFAF50"
      >
        #科技学术
      </view>
    </view>
    <view
      my-20rpx
      p-16rpx
      rounded-12rpx
      text-28rpx
      text-justify
      class="paper-desc bg-#F5F5F5 text-#A4A4A4"
    >
      {{ content }}
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{ title: string; content: string }>()

const handleClick = () => {
  uni.navigateTo({
    url: '/pages/test/testPage',
  })
}
</script>

<style lang="scss"></style>
