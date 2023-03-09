<template>
  <view
    class="paper-item"
    px-28rpx
    py-28rpx
    mt-20rpx
    bg-white
    w-full
    relative
    @click="handleClickItem"
  >
    <view text-40rpx font-bold class="text-#534E4E">
      <slot name="title"></slot>
    </view>
    <span
      v-if="props.dots"
      absolute
      w-50rpx
      h-50rpx
      right-24rpx
      top-36rpx
      class="iconfont icon-gengduo"
      @click.stop="handleShowOptions"
    ></span>
    <view mt-20rpx>
      <slot name="label"></slot>
    </view>
    <view class="content-wrap ellipsis">
      {{ commonObj.content }}
    </view>
    <view
      v-if="type === HOME && !isNull(paperItem.picture_urls)"
      class="images-wrap"
    >
      <view
        v-for="item in paperItem.picture_urls"
        :key="item"
        class="image-wrap wrap-3"
      >
        <image
          class="image"
          :src="item"
          mode="aspectFill"
          @click.stop="handleClickImage(item)"
          @load="handleLoad"
        />
      </view>
    </view>
    <view v-if="type === HOME" flex items-center>
      <view h-60rpx w-60rpx rounded-full mr-12rpx overflow-hidden>
        <image h-60rpx w-60rpx rounded-full :src="paperItem.creator_head_url" />
      </view>
      <view flex-1>
        <view text-28rpx>{{ paperItem.creator_name }}</view>
        <view text-20rpx class="text-#979797">
          {{ paperItem.created_at?.toDate().formatDate() }}
        </view>
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
        <span class="iconfont icon-weizhi"></span>
        <span text-22rpx ml-8rpx>广州大学</span>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { ACTIVITY, GATHER, HOME, LECTURE, RACE } from '@/utils/constant'
import { isNull } from '@/utils/common'

interface PaperItem {
  topic_id: string
  creator_id: string
  title: string
  content: string
  created_at: string
  last_reply_time: string
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

interface OtherListItem {
  post_id: string
  post_type: number
  race_level: number
  state: number
  time_state: number
  second_type: number
  zone_id: string
  detail: string
  sponsor_type: number
  sponsor_name: string
  start_time: string
  end_time: string
  title: string
  regist_info: string
  location: string
  creator_id: string
}
const props = defineProps<{
  from?: string
  type?: number
  dots?: boolean
  paperItem: Partial<PaperItem & IGatherItem & OtherListItem>
}>()
const emit = defineEmits(['moreOptions'])
const overflowLength = 100
const commonObj = reactive<{ content: string; url: string }>({
  content: '',
  url: '',
})
const imageCount = computed(() => props.paperItem.picture_urls?.length)
const imageFigure = ref<boolean>(false)
watch(
  () => props.paperItem,
  () => {
    let newContent = ''
    let url = ''
    if (props.type === HOME) {
      newContent = props.paperItem.content!
      url = `/pagesSub/paperDetail/index?topic_id=${props.paperItem.topic_id}`
    } else if (props.type === GATHER) {
      newContent = props.paperItem.introduce!
      url = `/pagesSub/gatherSub/gatherSub-project?project_id=${props.paperItem.project_id}`
    } else if (
      props.type === RACE ||
      props.type === LECTURE ||
      props.type === ACTIVITY
    ) {
      newContent = props.paperItem.detail!
      // 用来鉴定用户是否由管理员模式进入
      const fromWhere = props.from ? `&from=${props.from}` : ''
      url = `/pagesSub/publisherSub/publisher-detail?id=${props.paperItem.post_id}${fromWhere}`
    }
    commonObj.content =
      newContent.length > overflowLength
        ? `${newContent.slice(0, overflowLength)}......`
        : newContent
    commonObj.url = url
  },
  { immediate: true, deep: true }
)

const handleClickItem = () => {
  uni.navigateTo({
    url: commonObj.url,
  })
}
const handleShowOptions = () => {
  emit('moreOptions', props.paperItem)
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
</script>

<style lang="scss">
.paper-item {
  .images-wrap {
    margin: 16rpx 0;
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
  .content-wrap {
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    margin-bottom: 20rpx;
    padding: 16rpx;
    border-radius: 16rpx;
    font-size: 28rpx;
    text-align: justify;
    background-color: #f5f5f5;
    color: #a4a4a4;
    &.ellipsis {
      @include text-ellipsis-multi(3);
    }
  }
}
</style>
