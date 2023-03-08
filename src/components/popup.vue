<template>
  <view class="bottom-popup">
    <view
      v-show="showPopup"
      fixed
      w-100vw
      h-100vh
      left-0
      bottom-0
      z-99
      class="bg-black/20"
      @click="handleClickBackground"
    />
    <view class="popup" :class="{ hide: !showPopup }">
      <view flex-center pt-20rpx text-28rpx class="text-#707070">
        <text>我想....</text>
      </view>
      <view flex p-30rpx>
        <view
          v-if="isNull(props.selectItem.comment_id)"
          class="button-wrap"
          @click="handleClickCopy(TITLE)"
        >
          <view class="button">
            <text class="iconfont icon-copy"></text>
          </view>
          <view class="notice">复制标题</view>
        </view>
        <view class="button-wrap" @click="handleClickCopy(CONTENT)">
          <view class="button">
            <text class="iconfont icon-copy"></text>
          </view>
          <view class="notice">复制内容</view>
        </view>
        <view v-if="isOwn" class="button-wrap" @click="handleDelete">
          <view class="button">
            <text class="iconfont icon-delete"></text>
          </view>
          <view class="notice">删除</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { CONTENT, TITLE } from '@/utils/constant'
import { isNull, showMsg } from '@/utils/common'
import { useUserStore } from '@/store/modules/user'
import { reqRemoveComment, reqRemoveReply, reqRemoveTopic } from '@/api/user'
interface IPaperItem {
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
interface IGatherItem {
  college_id: Number
  college_name: string
  create_time: string
  creator_id: string
  introduce: string
  member_num: Number
  members: any
  needs: string
  project_id: string
  project_name: string
  race_id: Number
  race_name: any
  state: Number
}

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
  selectItem: Partial<IPaperItem & IGatherItem & ICommentItem>
}>()
const emit = defineEmits(['popup', 'delete'])
const { userProfile } = storeToRefs(useUserStore())
const isOwn = computed(
  () => userProfile.value.user_id === props.selectItem.creator_id
)

const showPopup = ref<boolean>(false)
const shouldHide = ref<boolean>(true)

watch(
  shouldHide,
  (value) => {
    if (value) {
      nextTick(() => {
        emit('popup', !value)
      })
      showPopup.value = !value
    } else {
      emit('popup', !value)
      nextTick(() => {
        showPopup.value = !value
      })
    }
  },
  { deep: true }
)

const show = () => {
  shouldHide.value = false
}
const hide = () => {
  shouldHide.value = true
}
const handleClickBackground = () => {
  shouldHide.value = true
}
const handleClickCopy = (type: number) => {
  let copyContent = null
  if (type === TITLE) {
    copyContent = props.selectItem.title || props.selectItem.project_name
  } else if (type === CONTENT) {
    copyContent = props.selectItem.content || props.selectItem.introduce
  }
  uni.setClipboardData({
    data: copyContent as string,
    success: () => {
      showMsg('复制成功')
    },
  })
}
const handleDelete = async () => {
  if (props.selectItem.topic_id && !props.selectItem.comment_id) {
    const { data } = await reqRemoveTopic(props.selectItem.topic_id!)
    if (!isNull(data)) {
      uni.$emit('updateHomeTopic')
      uni.$emit('updateProfileListData')
      await showMsg('删除成功')
      emit('delete', { topic: true })
    }
  } else if (props.selectItem.comment_id && !props.selectItem.reply_id) {
    const { data } = await reqRemoveComment(props.selectItem.comment_id)
    if (!isNull(data)) {
      await showMsg('删除成功')
      uni.$emit('refreshComment')
      emit('delete', { comment: true })
    }
  } else if (props.selectItem.reply_id) {
    const { data } = await reqRemoveReply(props.selectItem.reply_id)
    if (!isNull(data)) {
      await showMsg('删除成功')
      uni.$emit('refreshReply')
      emit('delete', { comment: true })
    }
  }
  hide()
}
defineExpose({
  show,
  hide,
})
</script>

<style lang="scss">
.bottom-popup {
  .popup {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 400rpx;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    background-color: #f8f8f8;
    transition: all 0.2s linear;
    z-index: 9999;
    &.hide {
      height: 0;
    }
    .button-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-right: 72rpx;
      .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120rpx;
        height: 120rpx;
        background-color: #fff;
        border-radius: 20rpx;
        .iconfont {
          font-size: 80rpx;
        }
      }
      .notice {
        padding-top: 20rpx;
        color: #707070;
        font-size: 28rpx;
      }
    }
  }
}
</style>
