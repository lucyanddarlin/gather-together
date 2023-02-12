<template>
  <u-navbar :border-bottom="false"></u-navbar>
  <view v-for="item in UserVita" :key="item.user_id" pt-40rpx>
    <!-- 顶部名字 和 学校信息 -->
    <view pl-60rpx flex>
      <view w-124rpx h-124rpx bg-red rounded-50% mr-30rpx></view>
      <view>
        <view class="text-#534E4E text-40rpx mb-12rpx font-bold">{{
          item.name
        }}</view>
        <view flex mb-12rpx
          ><GatherContentBlock
            :content="item.school"
            class="text-#598DF9 text-24rpx" />
          <GatherContentBlock
            :content="item.profession"
            class="text-#598DF9 text-24rpx" /><GatherContentBlock
            :content="item.grade + '级'"
            class="text-#598DF9 text-24rpx"
        /></view>
        <view flex
          ><GatherContentBlock
            v-for="tag in item.class"
            :key="tag"
            :content="tag"
            class="text-#FFAF50 text-24rpx"
          />
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import GatherContentBlock from '@/pages/gather/components/gather-contentBlock.vue'
import { currentUserVitaStore } from '@/store/UserVitaStore'

const userStore = currentUserVitaStore()
// todo 后续接口接入，需要换接口的id请求数据
const { UserVita } = storeToRefs(userStore)
</script>

<style scoped></style>
