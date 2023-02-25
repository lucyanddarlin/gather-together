<template>
  <view w-100vw h-100vh flex-center class="no-cv-page">
    <view flex-center flex-col>
      <view class="tips-text">暂无简历</view>
      <view class="tips-text">可点击下方按扭</view>
      <view
        px-92rpx
        py-20rpx
        my-100rpx
        bg-main
        rounded-10rpx
        flex-center
        text-white
        text-36rpx
        @click="handleLinkToCreateCv"
      >
        创建简历
      </view>
      <view
        text-24rpx
        text-main
        underline
        decoration-main
        @click="handleShowTips"
      >
        已有简历为何消失？
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const handleLinkToCreateCv = () => {
  uni.navigateTo({
    url: '/pagesSub/cv/editing-cv',
  })
}
const handleShowTips = () => {
  uni.showModal({
    title: '已有简历消失的原因',
    content: '· 简历内容存在违规情况时将会被下架\n· 网络加载等问题',
  })
}
</script>

<style lang="scss">
.no-cv-page {
  .tips-text {
    font-size: 60rpx;
    color: #c0c0c0;
    font-weight: 700;
  }
}
</style>
