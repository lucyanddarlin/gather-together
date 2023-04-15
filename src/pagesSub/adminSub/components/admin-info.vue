<template>
  <!-- 举报信息：待处理 -->
  <view
    v-if="item.state === ReportState.PENDING"
    pl-54rpx
    pr-20rpx
    py-20rpx
    class="text-28rpx text-#808080"
  >
    <view flex justify-between py-10rpx>
      <view>举报原因:</view>
      <view>{{ item.reason.split('/')[0] }}</view>
    </view>
    <view flex justify-between py-10rpx>
      <view>举报人:</view>
      <view>{{ item.reporter_name }}</view>
    </view>
    <view flex justify-between py-10rpx>
      <view>举报时间:</view>
      <view
        >{{
          new Date(item.date)
            .toLocaleString('zh-CN', {
              timeZone: 'Asia/Shanghai', // 时区UTC+8
              hour12: false, // 24小时制
            })
            .replace(/\//g, '-')
        }}
      </view>
    </view>
    <view>
      <view pt-10rpx pb-20rpx>举报说明:</view>
      <view class="text-#272727"> {{ item.reason.split('/')[1] }}</view>
    </view>
  </view>
  <!-- 处理信息：已删除 -->
  <view
    v-else-if="item.state === ReportState.PASS"
    pl-54rpx
    pr-20rpx
    py-20rpx
    class="text-28rpx text-#808080"
  >
    <view flex justify-between py-10rpx>
      <view>处理原因:</view>
      <view>{{ item.reason.split('/')[0] }}</view>
    </view>
    <view flex justify-between py-10rpx>
      <view>处理人:</view>
      <view>{{ item.admin_name }}</view>
    </view>
    <view flex justify-between py-10rpx>
      <view>处理时间:</view>
      <view>{{
        new Date(item.date)
          .toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
          .replace(/\//g, '-')
      }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ReportState } from '@/utils/adminConstant'
import type { ReportItem } from '@/typings/admin'

const props = defineProps<{
  info: ReportItem
}>()
const item = reactive(props.info)
</script>

<style scoped></style>
