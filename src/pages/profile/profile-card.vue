<template>
  <view class="profile-card" px-30rpx overflow-hidden -mt-60rpx>
    <view
      rounded-t-14rpx
      p-30rpx
      flex
      justify-between
      text-28rpx
      text-white
      bg-gradient-to-r
      class="from-#88A2FF to-#2E72FF"
    >
      <text font-medium>荟聚通</text>
      <text class="text-white/60">荟萃人才，共创未来</text>
    </view>
    <view
      p-34rpx
      flex
      items-center
      justify-around
      rounded-b-14rpx
      class="bg-#fff"
    >
      <view
        v-for="btn in buttonList"
        :key="btn.index"
        :class="btn.class"
        class="button-wrap"
        @click="handleClickBtn(btn.url, btn.index)"
      >
        <view mb-10rpx class="iconfont !text-50rpx" :class="btn.icon" />
        <view>{{ btn.title }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { showMsg } from '@/utils/common'
import { PROFILE } from '@/utils/constant'

interface IButton {
  icon: string
  url: string
  title: string
  index: number
  class: string
}
const buttonList: IButton[] = [
  {
    index: PROFILE.CV,
    url: '/pagesSub/cv/index',
    title: '个人简历',
    icon: 'icon-sousuo',
    class: 'bg-main',
  },
  {
    index: PROFILE.FOLLOW,
    url: '',
    title: '关注列表',
    icon: 'icon-sousuo',
    class: 'bg-follow',
  },
  {
    index: PROFILE.FAVOUR,
    url: '',
    title: '我的收藏',
    icon: 'icon-sousuo',
    class: 'bg-favour',
  },
  {
    index: PROFILE.SETTING,
    url: '/pagesSub/profileSetting/index',
    title: '设置',
    icon: 'icon-sousuo',
    class: 'bg-setting',
  },
]
const handleClickBtn = (url: string, index: number) => {
  const blackList = [PROFILE.FOLLOW, PROFILE.FAVOUR]
  if (blackList.includes(index)) {
    showMsg('即将开放')
    return
  }
  uni.navigateTo({
    url,
  })
}
</script>

<style lang="scss">
.profile-card {
  .button-wrap {
    $btn-w-h: 136rpx;
    width: $btn-w-h;
    height: $btn-w-h;
    color: white;
    font-size: 24rpx;
    font-weight: 600;
    border-radius: 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
