<template>
  <view class="empty-page">
    <view class="empty-image">
      <image
        v-show="type === 'empty'"
        class="image"
        src="https://cdn-team.gzjcth.com/image/comment_empty.jpg"
      />
    </view>
    <view class="empty-text"> {{ text }}</view>
  </view>
</template>

<script setup lang="ts">
defineProps<{ type: string; text: string }>()
</script>

<style lang="scss">
.empty-page {
  height: 600rpx;
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
