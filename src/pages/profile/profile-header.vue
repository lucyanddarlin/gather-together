<template>
  <view
    w-full
    h-360rpx
    px-32rpx
    flex
    items-center
    text-40rpx
    text-white
    font-medium
    class="profile-header bg-#4380FF"
  >
    <template v-if="!isLogin">
      <view
        bg-white
        flex-center
        text-32rpx
        class="avatar text-#4380FF"
        @click="handleLogin"
      >
        登录
      </view>
      <view>请先登录</view>
    </template>
    <template v-else>
      <view bg-white flex-center text-32rpx class="avatar text-#4380FF">
        <image :src="userProfile.head_url" class="image" />
      </view>
      <view>{{ userProfile.name }}</view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

const { isLogin, userProfile } = storeToRefs(useUserStore())
const { userLogin } = useUserStore()
const handleLogin = async () => {
  await userLogin()
}
</script>

<style lang="scss">
.profile-header {
  .avatar {
    $pic-wid-he: 120rpx;
    width: $pic-wid-he;
    height: $pic-wid-he;
    border-radius: 50%;
    margin-right: 30rpx;
    .image {
      width: $pic-wid-he;
      height: $pic-wid-he;
      border: 50%;
    }
  }
  // .username {

  // }
}
</style>
