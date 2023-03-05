<template>
  <view class="nav-header">
    <view class="top-wrap">
      <view class="title">
        <text class="text">荟聚通</text>
        <!-- <text class="bar"></text> -->
        <!-- <text class="text">Hui Ju Tong</text> -->
      </view>
      <!-- <view class="icon">
        <view class="icon-item"></view>
        <view class="icon-item"></view>
        <view class="icon-item"></view>
      </view> -->
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss">
.nav-header {
  position: relative;
  height: 200rpx;
  background-color: #598df9;
  .top-wrap {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40rpx;
    width: 100vw;
    top: 106rpx;
    left: 0;
    // bottom: 20rpx;
    box-sizing: border-box;
    .title {
      display: flex;
      flex-direction: column;
      color: #fff;
      // font-weight: bold;
      .bar {
        width: 300rpx;
        height: 8rpx;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 255),
          rgba(255, 255, 255, 0)
        );
      }
      .text {
        &:first-child {
          font-size: 40rpx;
        }
        &:last-child {
          font-size: 40rpx;
        }
      }
    }
    .icon {
      position: relative;
      margin-right: 40rpx;
      width: 200rpx;
      height: 200rpx;
      .icon-item {
        position: absolute;
        top: 0;
        right: 0;
        width: 160rpx;
        height: 30rpx;
        background-color: #fff;
        border-radius: 15rpx;
        &:nth-child(1) {
          transform-origin: bottom center;
          transform: rotate(180deg);
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.6)
          );
        }
        &:nth-child(2) {
          top: 23rpx;
          right: 8rpx;
          width: 200rpx;
          transform: rotate(-45deg);
          transform-origin: center right;
          background: linear-gradient(
            270deg,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0)
          );
        }
        &:nth-child(3) {
          transform: rotate(270deg);
          transform-origin: bottom right;
          background: linear-gradient(
            270deg,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.6)
          );
        }
      }
    }
  }
}
</style>
