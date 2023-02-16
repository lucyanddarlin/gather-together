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
              {{ homeTopicInfo.created_at }}
            </span>
          </view>
        </view>
        <view class="iconfont icon-sousuo" />
      </view>
      <view class="mt-26rpx text-28rpx text-#575757 leading-40rpx text-justify">
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
          <view flex items-center mr-56rpx>
            <view class="bottom-wrap">
              <view class="iconfont icon-sousuo" />
            </view>
            <view> {{ homeTopicInfo.like_count }}</view>
          </view>
          <view flex items-center class="text-#4380FF">
            <view class="bottom-wrap">
              <view class="iconfont icon-sousuo" />
            </view>
            <view>分享</view>
          </view>
        </view>
      </view>
    </view>
    <view class="w-full h-20rpx bg-#f5f5f5" />
    <view pb-150rpx>
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
          v-for="comment in commentList"
          :key="comment.comment_id"
          :comment-item="comment"
        />
      </view>
    </view>
    <view class="input-wrap">
      <view flex-1 pr-24rpx>
        <textarea
          v-model="content"
          class="textarea"
          placeholder="test"
          placeholder-class="textarea-placeholder"
          :auto-height="true"
          :show-confirm-bar="false"
          :cursor-spacing="30"
          :maxlength="maxCommentLength"
          :focus="isFocus"
          @blur="handleBlur"
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
      >
        发送
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { reqGetHomeTopicInfo, reqGetTopicComments } from '@/api'
import { isNull } from '@/utils/common'
import CommentItem from './comment-item.vue'
import type { HomeTopicInfo, ICommentItem } from '@/typings/home'
const topic_id = ref<string | number>('')
const homeTopicInfo = ref<HomeTopicInfo>({
  topic_id: '',
  creator_id: '',
  title: '',
  content: '',
  created_at: new Date(),
  last_reply_time: new Date(),
  picture_urls: [],
  creator_name: '',
  creator_head_url: '',
  like_count: 0,
  reply_count: 0,
  forward_count: 0,
  like: false,
})
const page = ref(0)
const size = 10
const status = ref<'loading' | 'noMore' | 'more'>('loading')
const commentList = ref<ICommentItem[]>([])
const commentListMap: any = {}
const content = ref<string>('')
const isFocus = ref<boolean>(false)
const maxCommentLength = 500
const imageFigure = ref<boolean>(false)
const imageCount = computed(() => homeTopicInfo.value.picture_urls.length)

onLoad(async (options) => {
  topic_id.value = options!.topic_id
  await getPaper()
  getComment()
})

const getPaper = async () => {
  const { data } = await reqGetHomeTopicInfo(topic_id.value)
  if (!isNull(data)) {
    homeTopicInfo.value = data.body
  }
}
const getComment = async () => {
  if (isNull(homeTopicInfo.value.topic_id)) return
  if (status.value === 'noMore') return
  if (status.value === 'loading' && page.value) return
  const { data } = await reqGetTopicComments(
    page.value,
    size,
    homeTopicInfo.value.topic_id
  )
  if (!isNull(data)) {
    status.value = data.body.length < size ? 'noMore' : 'more'
    data.body.forEach((comment) => {
      if (!commentListMap[comment.comment_id]) {
        commentListMap[comment.comment_id] = comment
        commentList.value.push(comment)
      }
    })
    page.value++
    return
  }
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
  // TODO: preview image
  console.log(url)
}
const handleBlur = () => {
  console.log('blur', content.value)
  isFocus.value = false
}
</script>

<style lang="scss">
.paper-detail {
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
