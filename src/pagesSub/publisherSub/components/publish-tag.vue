<template>
  <div
    :style="{
      color: tag.color,
      backgroundColor: '#F5F5F5',
      height: tag.singleLine ? '24px' : 'auto',
      marginTop: '4px',
      marginRight: tag.inline ? '6px' : '18px',
      paddingLeft: '6px',
      paddingRight: '6px',
      paddingTop: '3px',
      paddingBottom: '2px',
      width: tag.longTag ? 'auto' : 'fit-content',
      display: tag.inline ? 'inline-block' : 'block',
      borderRadius: '4px',
      fontSize: tag.fontSize ? tag.fontSize : '32rpx',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }"
  >
    <div v-if="tag.date">
      {{ format(Number(tag.date.start), 'yyyy-MM-dd HH:mm') }} 至
      {{ format(Number(tag.date.end), 'yyyy-MM-dd HH:mm') }}
    </div>
    <div v-else-if="tag.filter"># {{ tag.title }}</div>
    <div v-else>{{ tag.title }}</div>
  </div>
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

<style scoped></style>
