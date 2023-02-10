<template>
  <u-navbar :is-back="false" :background="navBarBg" :border-bottom="false">
    <view pl-28rpx>
      <view
        flex
        items-center
        rounded-32rpx
        bg-white
        pl-20rpx
        class="text-#B8B8B8"
      >
        <i class="iconfont icon-sousuo text-44rpx"></i>
        <input
          type="text"
          w-340rpx
          h-64rpx
          pl-24rpx
          placeholder-style="color:#B8B8B8"
          placeholder="搜索比赛组队信息"
        />
      </view>
    </view>
  </u-navbar>
</template>
<script setup lang="ts">
const navBarBg = {
  backgroundColor: '#598DF9',
}
</script>

<style scoped></style>
