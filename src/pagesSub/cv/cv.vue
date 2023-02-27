<template>
  <view class="cv-detail">
    <CVHeader
      :current-ability="currentAbility?.value!"
      :current-profession="currentProfession?.value!"
    />
    <view class="common-wrap">
      <view class="title">技能/能力</view>
      <text class="common-label blue">{{ currentAbility?.value }}</text>
      <view class="desc">{{ userCV.skill_des }}</view>
    </view>
    <view class="common-wrap">
      <view class="title">项目/实践</view>
      <view v-for="project in userCV.projects" :key="project.project_id">
        <text class="common-label blue">{{ project.project_name }}</text>
        <view class="desc">{{ project.project_exp }}</view>
      </view>
    </view>
    <view class="common-wrap">
      <view class="title">证书/荣誉</view>
      <view v-for="cert in userCV.certs" :key="cert.cert_id">
        <text class="common-label blue">{{ cert.cert_name }}</text>
      </view>
    </view>
    <view class="common-wrap">
      <view class="title">个人介绍</view>
      <view class="desc">{{ userCV.profile }}</view>
    </view>
    <view class="common-wrap">
      <view class="title">联系方式</view>
      <view class="desc">{{ userCV.contact }}</view>
    </view>
    <view px-40rpx flex items-center justify-between mt-30rpx>
      <view class="button green" @click="handleLinkToEditCV">编辑简历</view>
      <view class="button red" @click="showMsg('即将开放')">分享</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import { ABILITY_LIST, PROFESSION_LIST } from '@/utils/constant'
import { showMsg } from '@/utils/common'
import CVHeader from './cv-header.vue'

const { userCV } = storeToRefs(useUserStore())

const currentProfession = computed(() => {
  return PROFESSION_LIST.find((item) => item.index === userCV.value.direction)
})
const currentAbility = computed(() => {
  return ABILITY_LIST.find((item) => item.index === userCV.value.skill_id)
})
const handleLinkToEditCV = () => {
  uni.navigateTo({
    url: '/pagesSub/cv/editing-cv',
  })
}
</script>

<style lang="scss">
.cv-detail {
  padding-bottom: 40rpx;
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
  .common-wrap {
    padding: 24rpx 44rpx;
    border-bottom: 2rpx solid #f6f6f6;
    .title {
      font-size: 32rpx;
      font-weight: 700;
    }
    .common-label {
      display: inline-block;
      margin-top: 20rpx;
    }
    .desc {
      margin-top: 20rpx;
      font-size: 24rpx;
    }
  }
  .button {
    width: 320rpx;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 32rpx;
    border-radius: 12rpx;
    &.green {
      background-color: #73b297;
    }
    &.red {
      background-color: #ff6969;
    }
  }
}
</style>
