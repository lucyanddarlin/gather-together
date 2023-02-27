<template>
  <view class="cv-header" px-50rpx py-20rpx flex>
    <view class="image-wrap"></view>
    <view flex-1>
      <view text-40rpx font-bold>{{ userCV.name }}</view>
      <view flex flex-wrap>
        <view class="common-label blue">{{ userCV.school }}</view>
        <view class="common-label blue">{{ userCV.profession }}</view>
        <view class="common-label blue">{{ userCV.year }}级</view>
        <view class="common-label orange"> #{{ currentProfession }} </view>
        <view class="common-label orange"> #{{ currentAbility }} </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

defineProps<{ currentProfession: string; currentAbility: string }>()

const { userCV } = storeToRefs(useUserStore())
</script>

<style lang="scss">
.cv-header {
  border-bottom: 1px solid #f6f6f6;
  .image-wrap {
    $pic-w-h: 120rpx;
    width: $pic-w-h;
    height: $pic-w-h;
    border-radius: 50%;
    background-color: pink;
    margin-right: 24rpx;
    .image {
      width: $pic-w-h;
      height: $pic-w-h;
      border-radius: 50%;
    }
  }
  .common-label {
    padding: 8rpx 12rpx;
    font-size: 24rpx;
    margin-right: 12rpx;
    margin-bottom: 12rpx;
    border-radius: 8rpx;
    background-color: #f5f5f5;
    &.blue {
      color: #598df9;
    }
    &.orange {
      color: #ffaf50;
    }
  }
}
</style>
