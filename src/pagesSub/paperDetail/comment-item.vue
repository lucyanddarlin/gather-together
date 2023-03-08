<template>
  <view id="commentEl" flex p-24rpx pb-8rpx class="comment-item">
    <view w-72rpx h-72rpx rounded-full mr-20rpx overflow-hidden>
      <image w-72rpx h-72rpx :src="commentItem.head_url" />
    </view>
    <view
      flex-1
      pb-16rpx
      border-b-solid
      border-b-2rpx
      class="border-#C3C3C3/17"
      :class="{ '!border-0': top }"
    >
      <view text-24rpx font-medium>{{ commentItem.username }}</view>
      <view text-20rpx class="text-#797979">
        {{ commentItem.create_at?.toDate().formatDate() }}
      </view>
      <view my-24rpx text-28rpx flex flex-col class="text-#4D4D4D">
        <view
          v-if="commentItem.to_reply_username"
          text-26rpx
          class="text-#699AFF"
        >
          回复
          <span>@{{ commentItem.to_reply_username }}</span>
        </view>
        {{ commentItem.content }}
      </view>
      <view
        v-if="!top"
        w-120rpx
        h-40rpx
        text-20rpx
        rounded-20rpx
        flex
        justify-center
        items-center
        class="bg-#f5f5f5 text-#4380FF"
        @click="handleClickReply"
      >
        <!-- <span v-if="!child">2</span> -->
        <span>回复</span>
        <view class="iconfont icon-qianwang !text-24rpx" />
      </view>
    </view>
    <view>
      <view class="iconfont icon-gengduo" @click.stop="handleShowMore"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface ICommentItem {
  comment_id: string
  topic_id: string
  user_id: string
  content: string
  create_at: string
  last_reply_time: string
  head_url: string
  username: string
  reply_head?: Array<any>
  reply_id?: string
  to_reply_username?: string
  to_reply_id: string
}
const props = defineProps<{
  commentItem: ICommentItem
  index?: number
  child?: boolean
  top?: boolean
}>()

const emit = defineEmits(['showReply', 'sendHeight', 'setReplyTarget', 'more'])
const handleClickReply = () => {
  if (!props.child) {
    emit('showReply', true, props.index)
  } else {
    emit('setReplyTarget', {
      to_reply_username: props.commentItem.username,
      reply_id: props.commentItem.reply_id,
    })
  }
}
const handleShowMore = () => {
  emit('more')
}
</script>

<style scoped></style>
