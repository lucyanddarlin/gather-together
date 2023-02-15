<template>
  <view
    class="w-100rpx h-100rpx bg-white rounded-64rpx flex items-center justify-center text-60rpx text-#4380FF buttonShadow"
    @click="toGatherPublish"
    ><i class="iconfont icon-fasong"></i
  ></view>
</template>
<script setup lang="ts">
const toGatherPublish = () => {
  uni.navigateTo({
    url: '../../pagesSub/gatherSub/gatherSub-publish',
  })
}
</script>

<style scoped>
.iconfont {
  font-size: 28px;
}
.buttonShadow {
  box-shadow: 0px 2px 7px 2px rgba(67, 128, 255, 0.14);
}
</style>
