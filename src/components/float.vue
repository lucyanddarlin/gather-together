<template>
  <view fixed bottom-150rpx right-70rpx class="float">
    <view
      opacity-0
      transition-opacity
      duration-300
      class="float-button"
      :class="{ 'opacity-100': !isShowPopup }"
      @click.stop="handleLinkToPublish"
    >
      <text class="iconfont icon-fasong" />
    </view>
    <view
      opacity-0
      transition-all
      duration-300
      :class="{ 'opacity-100': scrollValue > SHOW_TOP && !isShowPopup }"
      class="float-button"
      @click.stop="handleBackToTop"
    >
      <view class="iconfont icon-sousuo" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { HOME, SHOW_TOP } from '@/utils/constant'

const props = defineProps<{
  type: number
  scrollValue: number
  isShowPopup?: boolean
}>()
const emit = defineEmits(['backToTop'])
const handleLinkToPublish = () => {
  if (props.type === HOME) {
    uni.navigateTo({
      url: '/pagesSub/publishPage/index',
    })
  }
}
const handleBackToTop = () => {
  if (props.scrollValue < SHOW_TOP) return
  emit('backToTop')
}
</script>

<style lang="scss">
.float {
  .float-button {
    $btn-wid-he: 80rpx;
    width: $btn-wid-he;
    height: $btn-wid-he;
    border-radius: 50%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    text-align: center;
    color: #4380ff;
    background-color: #fff;
    box-shadow: 0px 2px 7px 2px rgba(67, 128, 255, 0.14);
    margin-bottom: 28rpx;
    .iconfont {
      line-height: $btn-wid-he;
    }
  }
}
</style>
