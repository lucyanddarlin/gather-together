<template>
  <view flex p-24rpx pb-8rpx class="comment-item">
    <view w-72rpx h-72rpx rounded-full mr-20rpx overflow-hidden>
      <image w-72rpx h-72rpx :src="commentItem.head_url" />
    </view>
    <view
      flex-1
      pb-16rpx
      border-b-solid
      border-b-2rpx
      class="border-#C3C3C3/17"
    >
      <view text-24rpx font-medium>{{ commentItem.username }}</view>
      <view text-20rpx class="text-#797979">{{ commentItem.create_at }}</view>
      <view my-24rpx text-28rpx class="text-#4D4D4D">
        {{ commentItem.content }}
      </view>
      <view
        w-120rpx
        h-40rpx
        text-20rpx
        rounded-20rpx
        flex
        justify-center
        items-center
        class="bg-#f5f5f5 text-#4380FF"
        @click="handleShowReply"
      >
        <span>2</span>
        <span>回复</span>
        <view class="iconfont icon-sousuo" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface ICommentItem {
  comment_id: string
  topic_id: string
  user_id: string
  content: string
  create_at: Date
  last_reply_time: Date
  head_url: string
  username: string
  reply_head: Array<any>
}
const props = defineProps<{ commentItem: ICommentItem; child?: boolean }>()
const emit = defineEmits(['showReply'])
const handleShowReply = () => {
  emit('showReply', true)
  console.log(props.commentItem.comment_id)
}
</script>

<style scoped></style>
