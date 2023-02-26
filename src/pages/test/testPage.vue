<template>
  <view class="test-page">
    <view text-52rpx font-bold>青年大学习</view>
    <view mt-20rpx text-main>时间:</view>
    <view flex mb-20rpx>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-main"
      >
        2022-12-20 10:00 至 2023-01-06 10:00
      </view>
    </view>
    <view flex my-20rpx>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-#56C28E"
      >
        进行中
      </view>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-#FFAF50"
      >
        #政府
      </view>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-#FFAF50"
      >
        #科技学术
      </view>
    </view>
    <view mt-20rpx text-main>地点:</view>
    <view flex mb-20rpx>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-main"
      >
        广州大学大学城校区文新503
      </view>
    </view>
    <view class="common-wrap">
      <view class="title">详情</view>
      <view class="desc">
        我们的小队只有四个人，可以说是临危受命了小队里的所有人都不是负责自己相关专业的可以说是非常的难过可我就是用这样的队伍获得了第七届互联网比赛的国家金奖……
      </view>
    </view>
    <view class="common-wrap">
      <view class="title">报名方式</view>
      <view class="desc">
        前往广州大学团委公众号即可报名推文链接：
        <view>www.gzhuqndxx.weixin.qq.com</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.test-page {
  padding: 36rpx;

  .common-wrap {
    padding: 24rpx 0;
    border-bottom: 2rpx solid #f6f6f6;
    .title {
      font-size: 32rpx;
      font-weight: 700;
    }
    .common-label {
      display: inline-block;
      margin-top: 20rpx;
    }
    .desc {
      margin-top: 20rpx;
      font-size: 24rpx;
    }
  }
}
</style>
