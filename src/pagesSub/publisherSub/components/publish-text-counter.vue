<template>
  <view class="count">{{ props.cur }}/{{ props.max }}</view>
</template>

<script setup lang="ts">
const props = defineProps<{
  cur: number
  max: number
}>()
</script>

<style scoped>
.count {
  color: #858585;
  font-size: 24rpx;
}
</style>
