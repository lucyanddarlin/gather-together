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
    <view text-32rpx font-bold class="text-#534E4E">
      {{ paperItem.title || paperItem.project_name }}
    </view>
    <span
      absolute
      w-50rpx
      h-50rpx
      right-24rpx
      top-24rpx
      class="iconfont icon-sousuo"
      @click.stop="handleShowOptions"
    ></span>
    <view v-if="type === GATHER" flex my-20rpx>
      <view
        px-12rpx
        py-8rpx
        mr-12rpx
        rounded-8rpx
        text-24rpx
        class="bg-#F5F5F5 text-#FFAF50"
      >
        #互联网+
      </view>
    </view>
    <view
      my-20rpx
      p-16rpx
      rounded-12rpx
      text-28rpx
      text-justify
      class="paper-desc bg-#F5F5F5 text-#A4A4A4"
      >{{ commonObj.content }}</view
    >
    <view v-if="type === HOME" flex items-center>
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
import { reactive, watch } from 'vue'
import { GATHER, HOME } from '@/utils/constant'

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
const props = defineProps<{
  type: number
  paperItem: Partial<PaperItem & IGatherItem>
}>()
const emit = defineEmits(['moreOptions'])
const overflowLength = 100
const commonObj = reactive<{ content: string; url: string }>({
  content: '',
  url: '',
})
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
</script>

<style lang="scss"></style>
