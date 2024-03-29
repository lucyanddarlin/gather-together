<template>
  <view class="paper-detail">
    <view px-36rpx pt-24rpx pb-70rpx>
      <view class="text-#4D4D4D text-40rpx font-bold">
        {{ homeTopicInfo.title }}
      </view>
      <view flex mt-32rpx>
        <view flex-1 flex items-center>
          <view h-72rpx w-72rpx mr-16rpx rounded-full overflow-hidden>
            <image
              h-72rpx
              w-72rpx
              rounded-full
              :src="homeTopicInfo.creator_head_url"
            />
          </view>
          <view flex flex-col>
            <span class="text-28rpx font-medium text-#4D4D4D">
              {{ homeTopicInfo.creator_name }}
            </span>
            <span class="text-20rpx text-#979797">
              {{ homeTopicInfo?.created_at?.toDate().formatDate() }}
            </span>
          </view>
        </view>
        <view
          class="iconfont icon-gengduo"
          @click="handleShowMoreOptions(homeTopicInfo)"
        />
      </view>
      <view class="content-wrap">
        <span>{{ homeTopicInfo.content }}</span>
      </view>
      <view>
        <view v-if="imageCount" class="images-wrap">
          <view
            v-for="item in homeTopicInfo.picture_urls"
            :key="item"
            class="image-wrap"
            :class="{
              'wrap-0': imageCount === 1 && imageFigure,
              'wrap-1': imageCount === 1 && !imageFigure,
              'wrap-2': imageCount === 2,
              'wrap-3': imageCount > 2,
            }"
          >
            <image
              class="image"
              :src="item"
              mode="aspectFill"
              @click="handleClickImage(item)"
              @load="handleLoad"
            />
          </view>
        </view>
      </view>
      <view mt-54rpx flex items-center>
        <view class="bottoms-wrap">
          <view flex items-center mr-56rpx @click="handleLikeTopic">
            <view class="bottom-wrap">
              <view
                transition
                duration-300
                class="iconfont icon-shoucang"
                :class="{ '!text-pink': homeTopicInfo.like }"
              />
            </view>
            <view> {{ homeTopicInfo.like_count }}</view>
          </view>
          <view
            flex
            items-center
            class="text-#4380FF"
            @click="handleOpenSharePopup"
          >
            <view class="bottom-wrap">
              <view class="iconfont icon-fenxiang" />
            </view>
            <view>分享</view>
          </view>
        </view>
      </view>
    </view>
    <view class="w-full h-20rpx bg-#f5f5f5" />
    <view pb-180rpx>
      <view
        w-full
        px-36rpx
        py-30rpx
        border-b-solid
        border-2rpx
        text-black
        font-medium
        class="border-#C3C3C3/17"
      >
        {{ homeTopicInfo.reply_count }}条评论
      </view>
      <view v-if="homeTopicInfo.reply_count > 0">
        <CommentItem
          v-for="(comment, index) in commentList"
          id="commentEl"
          :key="comment.comment_id"
          :index="index"
          :comment-item="comment"
          @show-reply="handleShowReply"
          @more="handleShowMoreOptions(comment)"
        />
      </view>
      <LoadMore :status="commentStatus" @load-more="getComment()" />
    </view>
    <view id="inputEl" class="input-wrap">
      <view flex-1 pr-24rpx>
        <textarea
          v-model="content"
          class="textarea"
          placeholder="发表你的想法吧"
          placeholder-class="textarea-placeholder"
          :auto-height="true"
          :show-confirm-bar="false"
          :cursor-spacing="30"
          :maxlength="maxCommentLength"
          :focus="isFocus"
          @blur="handleBlur(0)"
        />
      </view>
      <view
        w-86rpx
        h-66rpx
        flex
        justify-center
        items-center
        text-white
        text-24rpx
        rounded-32rpx
        class="bg-#699AFF"
        @click="handleSendReply"
      >
        发送
      </view>
    </view>
    <u-popup
      v-model="replyFlag"
      mode="bottom"
      height="80%"
      border-radius="30"
      z-index="998"
      @close="handlePopupClose"
    >
      <scroll-view
        class="reply-wrap"
        scroll-y
        :style="{ height: `calc(100% - ${inputH}px)` }"
        @click="popup.hide()"
      >
        <CommentItem :comment-item="currentComment" top />
        <view class="w-full h-20rpx bg-#f5f5f5" />
        <CommentItem
          v-for="reply in replyList"
          :key="reply.reply_id"
          :comment-item="reply"
          child
          @set-reply-target="handleSetReplyTarget"
          @more="handleShowMoreOptions(reply)"
        />
        <LoadMore :status="replyStatus" @load-more="getReply()" />
      </scroll-view>
      <view class="input-wrap">
        <view flex-1 pr-24rpx>
          <textarea
            v-model="content"
            class="textarea"
            :placeholder="placeholder"
            placeholder-class="textarea-placeholder"
            :auto-height="true"
            :show-confirm-bar="false"
            :cursor-spacing="30"
            :maxlength="maxCommentLength"
            :focus="replyFocus"
            @blur="handleBlur(1)"
          />
        </view>
        <view
          w-86rpx
          h-66rpx
          flex
          justify-center
          items-center
          text-white
          text-24rpx
          rounded-32rpx
          class="bg-#699AFF"
          @click.stop="handleSendReply"
        >
          发送
        </view>
      </view>
    </u-popup>
    <Popup
      ref="popup"
      :select-item="selectItem"
      :show-share="showShare"
      :type="
        isNull(selectItem?.comment_id)
          ? ReportType.FORUM_POST
          : ReportType.FORUM_COMMENT
      "
      @delete="handleDelete"
    />
  </view>
</template>

<script setup lang="ts">
import {
  onLoad,
  onReady,
  onShareAppMessage,
  onShareTimeline,
} from '@dcloudio/uni-app'
import { type Ref, computed, ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import {
  reqGetCommentReply,
  reqGetHomeTopicInfo,
  reqGetTopicComments,
  reqLikeHomeTopic,
  reqSendComment,
  reqSendReply,
} from '@/api'
import { isNull, throttle, useScrollHeight } from '@/utils/common'
import { ReportType } from '@/utils/adminConstant'
import { DEFAULT_PAGE } from '@/utils/constant'
import { useUserStore } from '@/store/modules/user'
import CommentItem from './comment-item.vue'
import type { HomeTopicInfo, ICommentItem } from '@/typings/home'
const topic_id = ref<string | number>('')
const homeTopicInfo = ref<HomeTopicInfo>({
  topic_id: '',
  creator_id: '',
  title: '',
  content: '',
  created_at: '',
  last_reply_time: '',
  picture_urls: [],
  creator_name: '',
  creator_head_url: '',
  like_count: 0,
  reply_count: 0,
  forward_count: 0,
  like: false,
})
const commentPage = ref(0)
const replyPage = ref(0)
const size = 10
const commentStatus = ref<'loading' | 'noMore' | 'more'>('loading')
const replyStatus = ref<'loading' | 'noMore' | 'more'>('loading')
const commentList = ref<ICommentItem[]>([])
const replyList = ref<ICommentItem[]>([])
const commentListMap: any = {}
let replyListMap: any = {}
const content = ref<string>('')
const isFocus = ref<boolean>(false)
const replyFocus = ref<boolean>(false)
const maxCommentLength = 500
const imageFigure = ref<boolean>(false)
const imageCount = computed(() => homeTopicInfo.value.picture_urls.length)
const replyFlag = ref<boolean>(false)
const currentComment = ref<ICommentItem>({} as ICommentItem)
const replyTarget = ref<any>()
const placeholder = computed(() =>
  replyTarget?.value?.to_reply_username
    ? `回复${replyTarget?.value?.to_reply_username}`
    : '发表你都想法吧'
)
const popup = ref<any>()
const selectItem = ref<any>({})
const showShare = ref<boolean>(false)
const { isLogin } = storeToRefs(useUserStore())
const { userLogin } = useUserStore()

watch(
  replyList,
  () => {
    for (let i = 0; i < replyList.value.length; i++) {
      for (let j = 0; j < replyList.value.length; j++) {
        if (!replyList.value[i] || !replyList.value[j]) break
        if (replyList.value[i].to_reply_id === replyList.value[j].reply_id) {
          replyList.value[i].to_reply_username = replyList.value[j].username
          break
        }
      }
    }
  },
  { deep: true }
)
watch(isLogin, () => {
  if (isLogin.value) {
    getPaper()
  }
})

onLoad(async (options) => {
  topic_id.value = options!.topic_id
  await getPaper()
  getComment()
  uni.$on('refreshComment', handleRefreshComment)
  uni.$on('refreshReply', handleRefreshReply)
})
onShareTimeline(() => {
  return {
    title: homeTopicInfo.value.title,
    path: `/pagesSub/paperDetail/index?topic_id=${homeTopicInfo.value.topic_id}`,
  }
})
onShareAppMessage(() => {
  return {
    title: homeTopicInfo.value.title,
    path: `/pagesSub/paperDetail/index?topic_id=${homeTopicInfo.value.topic_id}`,
  }
})
const getPaper = async () => {
  const { data } = await reqGetHomeTopicInfo(topic_id.value)
  if (!isNull(data)) {
    homeTopicInfo.value = data.body
  }
}
// TODO: 合并评论和回复获取
const getComment = async (isClear?: boolean) => {
  if (isNull(homeTopicInfo.value.topic_id)) return
  if (isClear) {
    commentPage.value = DEFAULT_PAGE
    commentStatus.value = 'more'
  }
  if (commentStatus.value === 'noMore') return
  if (commentStatus.value === 'loading' && commentPage.value) return
  const { data } = await reqGetTopicComments(
    commentPage.value,
    size,
    homeTopicInfo.value.topic_id
  )
  if (isClear) {
    commentList.value = []
    commentListMap.value = {}
  }
  if (!isNull(data)) {
    commentStatus.value = data.body.length < size ? 'noMore' : 'more'
    data.body.forEach((comment) => {
      if (!commentListMap[comment.comment_id]) {
        commentListMap[comment.comment_id] = comment
        commentList.value.push(comment)
      }
    })
    commentPage.value++
    return
  }
}
const getReply = async (isClear?: boolean) => {
  if (isNull(currentComment.value.comment_id)) return
  if (isClear) {
    replyPage.value = DEFAULT_PAGE
    replyStatus.value = 'more'
  }
  if (replyStatus.value === 'noMore') return
  if (replyStatus.value === 'loading' && replyPage.value) return
  const { data } = await reqGetCommentReply(
    replyPage.value,
    size,
    currentComment.value.comment_id
  )
  if (isClear) {
    replyList.value = []
    replyListMap.value = {}
  }
  if (!isNull(data)) {
    replyStatus.value = data.body.length < size ? 'noMore' : 'more'
    data.body.forEach((reply) => {
      if (!replyListMap[reply.reply_id!]) {
        commentListMap[reply.reply_id!] = reply
        replyList.value.push(reply)
      }
    })
    replyPage.value++
    return
  }
}
const handleSendReply = async () => {
  if (!isLogin.value) {
    await userLogin()
    return
  }
  if (isNull(content.value)) {
    return
  }
  if (!replyFlag.value) {
    const { data } = await reqSendComment({
      topic_id: homeTopicInfo.value.topic_id,
      content: content.value,
    })
    if (!isNull(data)) {
      homeTopicInfo.value.reply_count++
      commentList.value.unshift(data.body)
    }
  } else {
    const { data } = await reqSendReply({
      comment_id: currentComment.value.comment_id,
      content: content.value,
      to_reply_id: replyTarget.value?.reply_id,
    })
    homeTopicInfo.value.reply_count++
    replyList.value.unshift(data.body)
  }
  content.value = ''
}
const handleLoad = (e: any) => {
  if (imageCount.value === 1) {
    const { width, height } = e.detail
    if (width > height) {
      imageFigure.value = true
    }
  }
}
const handleClickImage = (url: string) => {
  uni.previewImage({
    urls: [url],
  })
}
const handleBlur = (type: number) => {
  if (type === 0) {
    isFocus.value = false
  } else if (type === 1) {
    replyFocus.value = false
  }
  console.log(type, 'blur')
}
const handleShowReply = (value: boolean, index: number) => {
  replyFlag.value = value
  currentComment.value = commentList.value[index]
  getReply()
}
const handleSetReplyTarget = (value: any) => {
  replyTarget.value = value
  replyFocus.value = true
}
const handlePopupClose = () => {
  replyList.value = []
  replyListMap = {}
  replyPage.value = 0
  replyStatus.value = 'loading'
  replyTarget.value = null
  currentComment.value = {} as ICommentItem
}
const inputH = ref<number>(0)
// const commentH = ref<number>(0)
onReady(() => {
  let inputHeight: Ref<number>
  // eslint-disable-next-line prefer-const
  inputHeight = useScrollHeight('#inputEl')
  watchEffect(() => {
    inputH.value = inputHeight.value
  })
})
const handleShowMoreOptions = (item: any) => {
  showShare.value = false
  selectItem.value = item
  console.log(selectItem.value)

  popup.value.show()
}
const handleLikeTopic = throttle(async () => {
  if (!isLogin.value) {
    await userLogin()
    return
  }
  const { data } = await reqLikeHomeTopic(homeTopicInfo.value.topic_id)
  if (!isNull(data)) {
    homeTopicInfo.value.like = !homeTopicInfo.value.like
    if (homeTopicInfo.value.like) {
      homeTopicInfo.value.like_count++
    } else {
      homeTopicInfo.value.like_count--
    }
  }
}, 800)
const handleDelete = (value: any) => {
  if (value.topic) {
    setTimeout(() => {
      uni.navigateBack()
    }, 800)
  } else if (value.comment) {
    homeTopicInfo.value.reply_count--
  }
}
const handleRefreshComment = () => {
  getComment(true)
}
const handleRefreshReply = () => {
  getReply(true)
}
const handleOpenSharePopup = () => {
  showShare.value = true
  popup.value.show()
}
</script>

<style lang="scss">
.paper-detail {
  .content-wrap {
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    margin-top: 26rpx;
    font-size: 32rpx;
    color: #575757;
    line-height: 40rpx;
    text-align: justify;
  }
  .images-wrap {
    margin-top: 16rpx;
    display: flex;
    flex-wrap: wrap;
    .image-wrap {
      position: relative;
      height: 0rpx;
      border: 4rpx solid transparent;
      box-sizing: border-box;
      border-radius: 10rpx;
      overflow: hidden;
      .image {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
      }
      &.wrap-0 {
        width: 57%;
        padding-bottom: calc(47% - 8rpx);
      }
      &.wrap-1 {
        width: 47%;
        padding-bottom: calc(57% - 8rpx);
      }
      &.wrap-2 {
        width: 50%;
        padding-bottom: calc(50% - 8rpx);
      }
      &.wrap-3 {
        width: 33.3%;
        padding-bottom: calc(33.3% - 8rpx);
      }
    }
  }
  .bottoms-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    .bottom-wrap {
      width: 72rpx;
      height: 72rpx;
      margin-right: 28rpx;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      box-shadow: 0px 1px 4px 0px rgba(67, 128, 255, 0.2);
      .iconfont {
        font-size: 40rpx !important;
      }
    }
  }
  .input-wrap {
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 0;
    width: 100%;
    padding: 34rpx 30rpx 40rpx 30rpx;
    background-color: #fff;
    border-top: 2rpx solid #f5f5f5;
    z-index: 99;
    .textarea {
      width: calc(100% - 60rpx);
      padding: 16rpx 34rpx;
      max-height: 120rpx;
      background-color: #f8f8f8;
      border-radius: 32rpx;
    }
  }
}
</style>
