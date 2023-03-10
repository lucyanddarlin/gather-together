<template>
  <view class="editing-page">
    <view v-if="type === MODIFY_PROFILE.username">
      <view class="text-#8C99A0 text-28rpx font-bold">输入新的昵称</view>
      <view class="edit-wrap">
        <input
          :value="content"
          type="nickname"
          class="input"
          placeholder="请输入昵称"
          @blur="handleUpdateContent"
        />
        <view class="delete-wrap" @click="handleClearContent">
          <view class="iconfont icon-cancel" />
        </view>
      </view>
      <view
        mt-10rpx
        text-24rpx
        text-red
        opacity-0
        transition
        :class="{ 'opacity-100': showContentTips }"
      >
        不能超过{{ maxContentLength }}个字
      </view>
    </view>
    <view v-if="type === MODIFY_PROFILE.avatar">
      <view class="image-wrap">
        <view>
          <image class="image" :src="avatarImagePath" mode="aspectFill"></image>
        </view>
      </view>
    </view>
    <button
      v-if="type === MODIFY_PROFILE.avatar"
      class="button-wrap bg-favour transition"
      open-type="chooseAvatar"
      @chooseavatar="handleSelectImage"
    >
      选择照片
    </button>
    <view class="button-wrap bg-main" @click="handleClickConfirm"> 保存 </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { isNull } from '@/utils/common'
import { MODIFY_PROFILE, type ModifyUserProfile } from '@/typings/user'
import { useUserStore } from '@/store/modules/user'

const type = ref<number>()
const content = ref<string>('')
const imageUrl = ref<string>('')
const maxContentLength = 8
const { userProfile } = storeToRefs(useUserStore())
const showContentTips = computed(() => content.value.length > maxContentLength)
const checkContent = computed(
  () => !isNull(content.value) && !showContentTips.value
)
const avatarImagePath = computed(() =>
  isNull(imageUrl.value) ? userProfile.value.head_url : imageUrl.value
)
const { modifyUserProfile, modifyUserAvatar } = useUserStore()
onLoad((options) => {
  if (isNull(options)) return
  type.value = Number(options!.type)
  if (type.value === MODIFY_PROFILE.username) {
    content.value = userProfile.value.name
  }
})

const handleClearContent = () => {
  content.value = ''
}
const handleUpdateContent = (e: any) => {
  content.value = e.detail.value as string
}
const handleClickConfirm = async () => {
  let query: Partial<ModifyUserProfile> = {}
  if (type.value === MODIFY_PROFILE.avatar) {
    if (isNull(imageUrl.value)) return
    await modifyUserAvatar(imageUrl.value)
  } else if (type.value === MODIFY_PROFILE.username) {
    if (!checkContent.value) return
    query = { name: content.value }
    modifyUserProfile(query)
  }
}
const handleSelectImage = (e: any) => {
  imageUrl.value = e.detail.avatarUrl
}
</script>

<style lang="scss">
.editing-page {
  padding: 40rpx;
  height: 100vh;
  .edit-wrap {
    display: flex;
    height: 100%;
    justify-content: space-between;
    background-color: #f9f9f8;
    align-items: center;
    margin-top: 20rpx;
    .input {
      width: 80%;
      height: 90rpx;
      line-height: 90rpx;
      padding: 0 40rpx;
      font-size: 35rpx;
    }
    .delete-wrap {
      display: flex;
      justify-content: center;
      width: 20%;
      font-size: 50rpx;
    }
  }
  .button-wrap {
    margin-bottom: 30rpx;
    width: 674rpx;
    height: 96rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .image-wrap {
    margin: 0 auto;
    width: 674rpx;
    height: 674rpx;
    background-color: #fff;
    margin-bottom: 100rpx;
    .image {
      width: 674rpx;
      height: 674rpx;
    }
  }
}
</style>
