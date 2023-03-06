<template>
  <view class="profile-setting">
    <settingItem
      v-for="item in settingListA"
      :key="item.type"
      :item="item"
      @tap="item.url && navigate(item.url)"
    >
      <view v-if="item.type === SETTING.avatar">
        <image w-120rpx h-120rpx rounded-full :src="userProfile.head_url" />
      </view>
      <view v-else-if="item.type === SETTING.username">
        <view class="slot-text"> {{ userProfile.name }}</view>
      </view>
      <view v-else-if="item.type === SETTING.bind">
        <view class="slot-text">未绑定</view>
      </view>
      <view v-else-if="item.type === SETTING.id">
        <view class="slot-text">{{ userProfile.user_id }}</view>
      </view>
    </settingItem>
    <view w-full h-20rpx class="bg-#C3C3C3/17" />
    <view v-if="userProfile.is_admin">
      <settingItem
        v-for="item in settingListB"
        :key="item.type"
        :item="item"
        @tap="item.url && navigate(item.url)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import { SETTING } from '@/utils/constant'
import { MODIFY_PROFILE } from '@/typings/user'
import settingItem from './setting-item.vue'
const { userProfile } = storeToRefs(useUserStore())

interface SettingItem {
  type: number
  url: string
  title: string
}

const settingListA: SettingItem[] = [
  {
    type: SETTING.avatar,
    url: `/pagesSub/editing-page?type=${MODIFY_PROFILE.avatar}`,
    title: '头像',
  },
  {
    type: SETTING.username,
    url: `/pagesSub/editing-page?type=${MODIFY_PROFILE.username}`,
    title: '用户名',
  },
  {
    type: SETTING.bind,
    url: '',
    title: '分区绑定',
  },
  {
    type: SETTING.id,
    url: '',
    title: 'ID',
  },
  {
    type: SETTING.contact,
    url: '',
    title: '联系客服',
  },
  {
    type: SETTING.policy,
    url: '/pagesSub/profileSetting/setting-policy',
    title: '荟聚通用户协议与隐私政策',
  },
  {
    type: SETTING.about,
    url: '',
    title: '关于荟聚通',
  },
]
const settingListB: SettingItem[] = [
  {
    type: SETTING.publish,
    url: '/pagesSub/publisherSub/publisher-type',
    title: '发布者模式',
  },
  {
    type: SETTING.admin,
    url: '',
    title: '管理员模式',
  },
]

const navigate = (url: string) => {
  uni.navigateTo({
    url,
  })
}
</script>

<style lang="scss">
.profile-setting {
  .slot-text {
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 600;
  }
}
</style>
