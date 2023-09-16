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
      <view
        bg-white
        flex-center
        text-32rpx
        class="avatar text-#4380FF"
        @click="handleModifyUserInfo"
      >
        <image :src="userProfile.head_url" class="image" />
      </view>
      <view>{{ userProfile.name }}</view>
    </template>
    <ModifyUserInfo ref="modifyUserInfoRef" />
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { type Ref, ref, watchEffect, watch } from 'vue'
import { onReady, onLoad } from '@dcloudio/uni-app'
import ModifyUserInfo from '@/components/modify-userInfo.vue'
import { useUserStore } from '@/store/modules/user'
import { useScrollHeight } from '@/utils/common'
import { reqGetUserLoginStatus } from '@/api/user'
import { UserStatus } from '@/typings/user'

const { isLogin, userProfile } = storeToRefs(useUserStore())
const { userLogin } = useUserStore()
const modifyUserInfoRef = ref<any>(null)

onLoad(() => {
  checkIsFirstLogin()
})

const checkIsFirstLogin =async () => {
  const {data} = await reqGetUserLoginStatus()
  const nextStatus = data.body.status
  if(nextStatus !== UserStatus.GO) {
    setTimeout(() => {
     modifyUserInfoRef.value.$children[0].open()
    }, 600);
  }
}

const handleLogin = async () => {
  await userLogin()
}
const handleModifyUserInfo = () => {
  modifyUserInfoRef.value.$children[0].open()
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

watch(() => isLogin.value, () => {
  checkIsFirstLogin()
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
