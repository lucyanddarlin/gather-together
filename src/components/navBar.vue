<template>
  <u-navbar :is-back="false" :background="navBarBg" :border-bottom="false">
    <view class="slot-wrap" relative>
      <input
        type="text"
        w-360rpx
        h-64rpx
        pl-86rpx
        rounded-32rpx
        bg-white
        placeholder-style="color:#B8B8B8"
        placeholder="搜索比赛组队信息"
      />
      <i
        class="iconfont icon-sousuo text-44rpx text-#B8B8B8"
        absolute
        top-8rpx
        left-52rpx
      ></i>
    </view>
  </u-navbar>
</template>
<script setup lang="ts">
const navBarBg = {
  backgroundColor: '#598DF9',
}
</script>

<style scoped>
.slot-wrap {
  padding-left: 28rpx;
}
</style>
