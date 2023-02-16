<template>
  <button
    :style="{
      lineHeight: height ? height : 'inherit',
      borderRadius: borderRadius,
      color: isReversed ? bgColor : color,
      backgroundColor: isReversed ? color : bgColor,
      border: '2rpx solid ' + (isReversed ? bgColor : 'transparent'),
      boxShadow: `0rpx ${boxShadow} 4rpx rgba(0, 0, 0, 0.2)`,
    }"
  >
    <u-icon v-if="icon" :name="icon" size="32rpx" />
    <span>{{ title }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isNull } from '@/utils/common'
const { title, rounded, reverse, color, bgColor, boxShadow, icon, height } =
  defineProps<{
    title?: string
    rounded?: string
    reverse?: Boolean
    color?: string
    bgColor?: string
    boxShadow?: string
    icon?: string
    height?: string
  }>()
const isReversed = computed(() => (isNull(reverse) ? false : true))
const borderRadius = computed(() => (isNull(rounded) ? 0 : rounded))
</script>

<style lang="scss" scoped>
button {
  z-index: 10;
  vertical-align: middle;
  text-align: center;
}
</style>
