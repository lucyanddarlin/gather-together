<template>
  <view v-for="(item, index) in types" :key="item.id" class="wrapper">
    <PublishItem
      :title="`${item.type}管理`"
      height="82rpx"
      color="#000"
      font-size="32rpx"
      @tap="handleClick(index)"
    />
  </view>
</template>
<script setup lang="ts">
import { usePublisherStore } from '@/store/modules/publisher'
import PublishItem from './components/publish-item.vue'
const publisherStore = usePublisherStore()
const types = publisherStore.types

const handleClick = (type: number) => {
  publisherStore.cur_type = type
  uni.navigateTo({ url: `./publisher-manage` })
}
</script>

<style scoped>
.wrapper {
  padding-left: 12rpx;
  border-bottom: 2rpx solid rgba(195, 195, 195, 0.17);
  border-top: 2rpx solid rgba(195, 195, 195, 0.17);
}
</style>
