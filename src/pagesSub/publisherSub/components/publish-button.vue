<template>
  <button
    :open-type="share ? 'share' : undefined"
    class="publish-button"
    :style="{
      lineHeight: props.height ? props.height : 'inherit',
      borderRadius: borderRadius,
      color: isReversed ? props.bgColor : props.color,
      backgroundColor: isReversed ? props.color : props.bgColor,
      borderColor: isReversed ? props.bgColor : 'transparent',
      boxShadow: `0rpx ${props.boxShadow} ${props.boxShadow} rgba(0, 0, 0, 0.2)`,
      width: Width,
    }"
  >
    <!-- 内容 -->
    <view flex justify-center items-center>
      <view
        class="iconfont"
        :class="props.icon"
        :style="{ fontSize: '48rpx' }"
        color="#598DF9"
      ></view>
      <view
        :style="{
          fontSize: props.fontSize ? props.fontSize : '36rpx',
          marginLeft: '8rpx',
        }"
        >{{ props.title }}</view
      >
    </view>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isNull } from '@/utils/common'
const props = defineProps<{
  title?: string
  rounded?: string
  reverse?: boolean
  color?: string
  bgColor?: string
  boxShadow?: string
  icon?: string
  height?: string
  width?: string
  fontSize?: string
  share?: boolean
}>()
const isReversed = computed(() => (isNull(props.reverse) ? false : true))
const borderRadius = computed(() => (isNull(props.rounded) ? 0 : props.rounded))
const Width = computed(() => (isNull(props.width) ? 'auto' : props.width))
</script>

<style lang="scss" scoped>
.publish-button {
  z-index: 10;
  vertical-align: middle;
  text-align: center;
}
</style>
