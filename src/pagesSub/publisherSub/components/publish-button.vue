<template>
  <button
    :style="{
      lineHeight: props.height ? props.height : 'inherit',
      borderRadius: borderRadius,
      color: isReversed ? props.bgColor : props.color,
      backgroundColor: isReversed ? props.color : props.bgColor,
      border: '2rpx solid ' + (isReversed ? props.bgColor : 'transparent'),
      boxShadow: `0rpx ${props.boxShadow} 4rpx rgba(0, 0, 0, 0.2)`,
    }"
  >
    <u-icon v-if="props.icon" :name="props.icon" size="32rpx" />
    <span>{{ props.title }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isNull } from '@/utils/common'
const props = defineProps<{
  title?: string
  rounded?: string
  reverse?: Boolean
  color?: string
  bgColor?: string
  boxShadow?: string
  icon?: string
  height?: string
}>()
const isReversed = computed(() => (isNull(props.reverse) ? false : true))
const borderRadius = computed(() => (isNull(props.rounded) ? 0 : props.rounded))
</script>

<style lang="scss" scoped>
button {
  z-index: 10;
  vertical-align: middle;
  text-align: center;
}
</style>
