<template>
  <view class="in-document">
    <view @tap="handleBack">
      <view class="iconfont icon-qianwang back" />
      <view class="custom-nav" :class="props.left ? 'left' : 'center'">
        <view class="nav-title">{{ props.title }}</view>
      </view>
    </view></view
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  left?: boolean
}>()

const handleBack = () => {
  uni.navigateBack()
}
</script>

<style scoped>
.in-document {
  height: 122rpx;
}
.custom-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 122rpx;
  background-color: #fff;
  z-index: 99;
}

.center {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.left {
  margin-left: 74rpx;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.nav-title {
  padding-bottom: 18rpx;
  font-size: 36rpx;
  color: black;
  font-weight: 600;
}
.back {
  position: fixed;
  top: 62rpx;
  left: 28rpx;
  font-size: 46rpx;
  color: black;
  z-index: 100;
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
