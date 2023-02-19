<template>
  <view
    px-28rpx
    py-28rpx
    mt-20rpx
    bg-white
    w-full
    relative
    @click="handleClickItem"
  >
    <view text-32rpx font-bold class="text-#534E4E">{{ paperItem.title }}</view>
    <span absolute right-24rpx top-24rpx class="iconfont icon-sousuo"></span>
    <view
      my-20rpx
      p-16rpx
      rounded-12rpx
      text-28rpx
      text-justify
      class="paper-desc bg-#F5F5F5 text-#A4A4A4"
      >{{ content }}</view
    >
    <view flex items-center>
      <view h-60rpx w-60rpx rounded-full bg-pink mr-12rpx overflow-hidden>
        <image h-60rpx w-60rpx rounded-full :src="paperItem.creator_head_url" />
      </view>
      <view flex-1>
        <view text-28rpx>{{ paperItem.creator_name }}</view>
        <view text-20rpx class="text-#979797">{{ paperItem.created_at }}</view>
      </view>
      <view
        flex
        justify-center
        items-center
        h-50rpx
        w-174rpx
        rounded-24rpx
        text-white
        class="bg-#598DF9"
      >
        <span class="iconfont icon-sousuo"></span>
        <span text-22rpx ml-8rpx>广州大学</span>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface PaperItem {
  topic_id: string
  creator_id: string
  title: string
  content: string
  created_at: Date
  last_reply_time: Date
  picture_urls: string[]
  creator_name: string
  creator_head_url: string
  like_count: number
  reply_count: number
  forward_count: number
  like: boolean
}
const props = defineProps<{ paperItem: PaperItem }>()
const overflowLength = 100

const content = computed(() => {
  return props.paperItem.content.length > overflowLength
    ? `${props.paperItem.content.slice(0, overflowLength)}......`
    : props.paperItem.content
})

const handleClickItem = () => {
  console.log('click', props.paperItem.topic_id)
  uni.navigateTo({
    url: `/pagesSub/paperDetail/index?topic_id=${props.paperItem.topic_id}`,
  })
}
</script>

<style lang="scss"></style>
