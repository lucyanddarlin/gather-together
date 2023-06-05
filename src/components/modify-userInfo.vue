<template>
  <view class="modify-userInfo">
    <u-popup
      v-model="openPopup"
      mode="bottom"
      border-radius="15"
      :mask-close-able="maskCloseAble"
    >
      <view class="modify-popup">
        <view class="popup-header">
          <view class="title"> 设置您的头像、昵称 </view>
          <view class="desc">
            设置用户头像、昵称，主要用于想用户提供具有辨识度的用户中心界面以及交流界面
          </view>
        </view>
        <view class="popup-body">
          <view class="modify-avatar common-wrap">
            <view class="wrap-title">头像</view>
            <view class="avatar-wrap">
              <img :src="avatar" class="image" />
            </view>
            <button
              class="button-wrap"
              plain="true"
              open-type="chooseAvatar"
              @chooseavatar="handleSelectImage"
            >
              <u-icon name="arrow-right" color="#c5c5c5" size="40"></u-icon>
            </button>
          </view>
          <view class="modify-username common-wrap">
            <view class="wrap-title">昵称</view>
            <input
              :value="username"
              type="nickname"
              class="input"
              placeholder="请输入昵称"
              @blur="handleUpdateContent"
            />
          </view>
        </view>
        <view class="confirm-wrap">
          <view
            class="confirm-btn"
            :class="{ 'active-btn': confirmActive }"
            @click="handleConfirm"
          >
            保存
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { isNull } from '@/utils/common'
import { useUserStore } from '@/store/modules/user'

const { modifyUserProfile, modifyUserAvatar } = useUserStore()
const openPopup = ref<boolean>(false)
const maskCloseAble = ref<boolean>(true)
const avatar = ref<string>('')
const username = ref<string>('')
const confirmActive = computed(
  () => !isNull(avatar.value) && !isNull(username.value)
)

const handleClosePopup = () => {
  openPopup.value = false
}
const handleSelectImage = (e: any) => {
  avatar.value = e.detail.avatarUrl
  console.log(avatar.value)
}
const handleUpdateContent = (event: any) => {
  username.value = event.detail.value
}
const handleConfirm = async () => {
  if (!confirmActive.value) return
  if (avatar.value) {
    await modifyUserAvatar(avatar.value, () => true)
  }
  if (username.value) {
    const query = { name: username.value }
    modifyUserProfile(query, () => {
      handleClosePopup()
    })
  }
  console.log('avatar:', avatar.value)
  console.log('username:', username.value)
}
</script>

<style lang="scss">
.modify-userInfo {
  color: #333;
  font-size: 32rpx;
  .modify-popup {
    button[plain] {
      outline: none;
      border: none;
      padding-right: 30rpx;
      display: flex;
      justify-content: flex-end;
      margin: 0 !important;
    }
    padding: 30rpx;
    .popup-header {
      margin-bottom: 60rpx;
      .title {
        font-size: 32rpx;
        color: cornflowerblue;
        font-weight: 700;
        margin-bottom: 20rpx;
      }
      .desc {
        font-size: 26rpx;
        color: darkgray;
        line-height: 32rpx;
      }
    }
    .popup-body {
      $pic-wid-he: 90rpx;
      .common-wrap {
        display: flex;
        align-items: center;
        padding: 12rpx 0;
        width: 100%;
        border: 1px solid #e7e7e7;
        border-width: 1px 0 1px 0;
        .wrap-title {
          font-weight: 700;
          margin-right: 40rpx;
        }
      }
      .modify-avatar {
        .avatar-wrap {
          width: $pic-wid-he;
          height: $pic-wid-he;
          background-color: #e7e7e7;
          border-radius: 8rpx;
          overflow: hidden;
          .image {
            width: $pic-wid-he;
            height: $pic-wid-he;
          }
        }
        .button-wrap {
          flex: 1;
        }
      }
      .modify-username {
        border-top-width: 0;
        .input {
          height: 90rpx;
          line-height: 90rpx;
          font-size: 32rpx;
        }
      }
    }
    .confirm-wrap {
      margin-top: 30rpx;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .confirm-btn {
        width: 270rpx;
        height: 70rpx;
        border-radius: 8rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #e7e7e7;
        color: white;
        transition-property: color, background-color, border-color,
          outline-color, text-decoration-color, fill, stroke, opacity,
          box-shadow, transform, filter, backdrop-filter;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
      .active-btn {
        background-color: cornflowerblue;
      }
    }
  }
}
</style>
