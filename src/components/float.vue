<template>
  <view fixed bottom-150rpx right-70rpx class="float">
    <view
      opacity-0
      transition-opacity
      duration-300
      class="float-button"
      :class="{
        'opacity-100': !isShowPopup && (type === HOME || type === GATHER),
      }"
      @click.stop="handleLinkToPublish"
    >
      <text class="iconfont icon-fabuanniu1" />
    </view>
    <view
      opacity-0
      transition-all
      duration-300
      :class="{ 'opacity-100': scrollValue > SHOW_TOP && !isShowPopup }"
      class="float-button"
      @click.stop="handleBackToTop"
    >
      <view class="iconfont icon-shouqi" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import { GATHER, HOME, SHOW_TOP } from '@/utils/constant'

const { isLogin } = storeToRefs(useUserStore())
const { userLogin } = useUserStore()

const props = defineProps<{
  type: number
  home?: boolean
  gather?: boolean
  scrollValue: number
  isShowPopup?: boolean
  url?: string
}>()
const emit = defineEmits(['backToTop'])
const handleLinkToPublish = async () => {
  if (!isLogin.value) {
    await userLogin()
    return
  }
  if (props.home) {
    uni.navigateTo({
      url: '/pagesSub/publishPage/index',
    })
  } else if (props.gather) {
    uni.navigateTo({ url: '/pagesSub/gatherSub/gatherSub-publish' })
    return
  }
  if (props.url) {
    uni.navigateTo({
      url: props.url,
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
