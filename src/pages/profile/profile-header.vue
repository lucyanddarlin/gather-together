<template>
  <view
    id="profileHeader"
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
import { type Ref, ref, watchEffect } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/modules/user'
import { useScrollHeight } from '@/utils/common'

const { isLogin, userProfile } = storeToRefs(useUserStore())
const { userLogin } = useUserStore()

const handleLogin = async () => {
  await userLogin()
}

const inputH = ref<number>(0)
onReady(() => {
  let inputHeight: Ref<number>
  // eslint-disable-next-line prefer-const
  inputHeight = useScrollHeight('#profileHeader')
  watchEffect(() => {
    inputH.value = inputHeight.value
    uni.setStorageSync('PROFILE_HEADER_HEIGHT', inputH.value)
  })
})
</script>

<style lang="scss">
.profile-header {
  .avatar {
    overflow: hidden;
    $pic-wid-he: 120rpx;
    width: $pic-wid-he;
    height: $pic-wid-he;
    border-radius: 50%;
    margin-right: 30rpx;
    .image {
      width: $pic-wid-he;
      height: $pic-wid-he;
      border-radius: 50%;
    }
  }
  // .username {

  // }
}
</style>
