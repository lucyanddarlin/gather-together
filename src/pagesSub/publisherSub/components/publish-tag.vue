<template>
  <view
    :style="{
      color: tag.color,
      backgroundColor: '#F5F5F5',
      height: tag.singleLine ? '48rpx' : 'auto',
      marginTop: '8rpx',
      marginRight: tag.inline ? '12rpx' : '36rpx',
      paddingLeft: '12rpx',
      paddingRight: '12rpx',
      paddingTop: '6rpx',
      paddingBottom: '4rpx',
      width: tag.longTag ? 'auto' : 'fit-content',
      display: tag.inline ? 'inline-block' : 'block',
      borderRadius: '8rpx',
      fontSize: tag.fontSize ? tag.fontSize : '32rpx',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }"
  >
    <view v-if="tag.date">
      {{ format(Number(tag.date.start), 'yyyy-MM-dd HH:mm') }} 至
      {{ format(Number(tag.date.end), 'yyyy-MM-dd HH:mm') }}
    </view>
    <view v-else-if="tag.filter"># {{ tag.title }}</view>
    <view
      v-else
      :class="{
        'text-ellipsis': tag.longTag,
      }"
    >
      {{ tag.title }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
const tag = defineProps<{
  title?: string
  color: string
  inline?: boolean // 是否转为行级元素，多个标签可在一行内显示
  longTag?: boolean // 是否长标签（不管文字长度，tag背景颜色将填充这一行）
  date?: { start: Date; end: Date }
  filter?: boolean
  fontSize?: string
  singleLine?: boolean
}>()
</script>

<style scoped>
.text-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
