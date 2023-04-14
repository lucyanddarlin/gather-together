<template>
  <view px-28rpx py-60rpx>
    <view px-26rpx class="text-#979797" text-24rpx>选择举报类型</view>
    <view class="divider"></view>
    <view px-26rpx>
      <view
        v-for="item in report_types"
        :key="item.key"
        flex
        justify-initial
        items-center
        py-20rpx
        @tap="handleSelect(item.key)"
      >
        <view class="circle">
          <view v-if="item.key === isSelected" class="circle-inner"> </view>
        </view>
        <view text-28rpx pl-24rpx fw-500>
          {{ item.value }}
        </view>
      </view>
      <view py-32rpx class="text-#828282" text-24rpx>
        可补充详细信息以协助核实该违规情况
      </view>
    </view>
    <view relative>
      <textarea
        :value="reason"
        placeholder="请输入内容，100字以内"
        placeholder-style="font-weight: 400;font-size: 24rpx;color: #CDCDCD;"
        class="input-textarea"
        :maxlength="100"
        @input="handleInput($event)"
      ></textarea>
      <PublishTextCounter
        absolute
        right-18rpx
        bottom-12rpx
        :cur="reason.length"
        :max="100"
      />
    </view>
  </view>
  <view px-36rpx>
    <view class="submit-button" @tap="handleSubmit"> 提交 </view>
  </view>
  <view h-40rpx> </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { reqReport } from '@/api/admin'
import { showMsg } from '@/utils/common'
import PublishTextCounter from '../publisherSub/components/publish-text-counter.vue'
import type { ReportType } from '@/utils/adminConstant'
// 初始不选中任何项
const isSelected = ref<number>(-1)
const reason = ref<string>('')
const report_type = ref<ReportType>(0) // 0是未定义，不属于任何一种类型
const business_id = ref<string>('')
const report_types = [
  {
    key: 0,
    value: '灌水',
  },
  {
    key: 1,
    value: '引战',
  },
  {
    key: 2,
    value: '违法违禁',
  },
  {
    key: 3,
    value: '色情低俗',
  },
  {
    key: 4,
    value: '赌博诈骗',
  },
  {
    key: 5,
    value: '血腥暴力',
  },
  {
    key: 6,
    value: '人身攻击',
  },
  {
    key: 7,
    value: '其他',
  },
]

onLoad((options) => {
  if (options) {
    report_type.value = options.report_type
    business_id.value = options.business_id
  }
  // 为undefined或0均为不合法
  if (!report_type.value || !business_id.value) uni.navigateBack()
})
const handleSelect = (key: number) => {
  isSelected.value = key
}
const handleInput = (event: any) => {
  if (event.target && event.target.value) {
    reason.value = event.target.value.trim()
  }
}
const handleSubmit = () => {
  // 原因前缀（类型）
  let prefix = report_types.find((item) => item.key === isSelected.value)?.value
  if (prefix) prefix += '/'
  reqReport(
    business_id.value,
    `${prefix}${reason.value}`,
    report_type.value
  ).then((res) => {
    if (res.data.code === '200') {
      console.log('举报成功')
      uni.navigateBack()
      showMsg('举报成功', 'success', 2000)
    } else {
      showMsg('举报失败', 'error', 2000)
    }
  })
}
</script>

<style scoped>
.divider {
  /* opacity: 0.3; */
  height: 2rpx;
  margin-top: 12rpx;
  margin-bottom: 20rpx;
  background-color: #f4f4f4;
}
.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44rpx;
  height: 44rpx;
  background-color: #fff;
  border-radius: 22rpx;
  border: 2rpx solid #d6d6d6;
}
.circle-inner {
  width: 24rpx;
  height: 24rpx;
  background-color: #feaf53;
  border-radius: 22rpx;
}
.input-textarea {
  width: 640rpx;
  height: 346rpx;
  border-radius: 12rpx;
  font-size: 24rpx;
  font-weight: 400;
  background-color: #f6f6f6;
  line-height: 30rpx;
  padding: 24rpx;
  padding-bottom: 48rpx;
}
.submit-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 664rpx;
  height: 100rpx;
  border-radius: 16rpx;
  background-color: #feaf53;
  color: #fff;
  font-size: 28rpx;
  font-weight: 600;
}
</style>
