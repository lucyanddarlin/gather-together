<template>
  <view
    px-30rpx
    py-50rpx
    text-center
    bg-white
    class="load-more"
    @click="handleClick"
  >
    <text>{{ contentText }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Status = 'more' | 'loading' | 'noMore'
const props = defineProps<{ status: Status }>()
const contentTexts = {
  more: '点击加载更多',
  loading: '加载中...',
  noMore: '没有更多了...',
}
const emit = defineEmits(['loadMore'])

const contentText = computed(() => contentTexts[props.status])
const handleClick = () => {
  if (props.status === 'more') {
    emit('loadMore')
  }
}
</script>

<style scoped></style>
