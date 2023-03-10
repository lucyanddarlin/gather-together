<template>
  <view class="empty-page">
    <template v-if="type === 'empty'">
      <view class="empty-image">
        <image
          class="image"
          src="https://cdn-team.gzjcth.com/image/comment_empty.jpg"
        />
      </view>
      <view class="empty-text"> {{ text }}</view>
    </template>
    <template v-if="type === 'login'">
      <view flex-center flex-col justify-center>
        <view class="tips-text">登陆</view>
        <view class="tips-text">查看更多</view>
        <view flex-center text-main @click="handleLinkToLogin">
          <view>前往登陆</view>
          <view class="iconfont icon-qianwang" />
        </view>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

defineProps<{ type: 'empty' | 'login'; text: string }>()

const { userLogin } = useUserStore()

const handleLinkToLogin = async () => {
  uni.switchTab({
    url: '/pages/profile/profile',
  })
  await userLogin()
}
</script>

<style lang="scss">
.empty-page {
  padding-top: 100rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .empty-image {
    $pic-wid-he: 300rpx;
    .image {
      width: $pic-wid-he;
      height: $pic-wid-he;
    }
  }
  .empty-text {
    font-weight: 400;
    font-size: 22rpx;
    color: rgba(0, 0, 0, 0.34);
  }
}
</style>
