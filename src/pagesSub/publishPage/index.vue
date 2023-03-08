<template>
  <view py-46rpx class="publish-page">
    <view px-32rpx w-full flex justify-end>
      <view
        px-28rpx
        py-10rpx
        flex-center
        rounded-30rpx
        text-white
        text-24rpx
        transition-colors
        duration-300
        class="bg-#CFCFCF"
        :class="{ '!bg-#699AFF': sendFlag }"
        @click="handlePostTopic"
      >
        <view mr-4rpx class="iconfont icon-fasong !text-40rpx" />
        <text>发送</text>
      </view>
    </view>
    <view
      p-20rpx
      border-b-solid
      border-b-8rpx
      class="border-b-#F5F5F5"
      text-36rpx
      font-bold
    >
      <input
        v-model="title"
        type="text"
        placeholder="在这里写下标题吧"
        placeholder-class="input-placeholder"
      />
    </view>
    <view px-20rpx>
      <textarea
        v-model="content"
        placeholder="在这里写下你想说的吧..."
        placeholder-class="textarea-placeholder"
        :maxlength="maxlength"
        w-full
        h-480rpx
        py-28rpx
        text-32rpx
      />
    </view>
    <view
      px-32rpx
      w-full
      flex
      justify-end
      text-20rpx
      transition-colors
      duration-300
      class="text-#858585"
      :class="{ '!text-red': content.length === maxlength }"
    >
      {{ `${content.length}/${maxlength}` }}
    </view>
    <view p-24rpx flex items-center flex-wrap>
      <view v-for="(image, index) in imageList" :key="image" relative mr-10rpx>
        <image
          border-dotted
          border-transparent
          class="image"
          :src="image"
          mode="aspectFill"
          @click="handlePreviewImage(index, imageList)"
        />
        <view
          absolute
          top-20rpx
          right-20rpx
          w-40rpx
          h-40rpx
          rounded-full
          flex-center
          text-20rpx
          border-solid
          border-2rpx
          class="bg-#D9D9D9"
          @click.stop="handleRemoveImage(index)"
        >
          <view font-bold class="iconfont icon-qianwang" />
        </view>
      </view>
      <view
        v-show="freeLength"
        flex-center
        border-dotted
        transition-opacity
        class="image border-#000000/15"
        @click="handleChooseImage"
      >
        <view
          font-bold
          class="iconfont icon-qianwang !text-60rpx text-#C9C9C9/50"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { chooseImages, isNull, showMsg } from '@/utils/common'
import { reqPostTopic } from '@/api'
import { reqUploadTopicImage } from '@/api/imageUpload'
import type { PostTopicResult } from '@/typings/home'

const maxlength = 2000
const maxImageCount = 3
const imageList = ref<string[]>([])
const title = ref<string>('')
const content = ref<string>('')
const isUploading = ref<boolean>(false)
const sendFlag = computed(() => !isNull(title.value) && !isNull(content.value))
const freeLength = computed(() => {
  const length = maxImageCount - imageList.value.length
  return length
})

const handleChooseImage = async () => {
  imageList.value.push(...(await chooseImages(freeLength.value)))
}
const handleRemoveImage = (index: number) => {
  imageList.value.splice(index, 1)
}
const handlePreviewImage = (index: number, imageList: string[]) => {
  uni.previewImage({
    current: index,
    urls: imageList,
    longPressActions: {
      itemList: ['发送给朋友', '保存图片', '收藏'],
    },
  })
}
const uploadImage = async (data: PostTopicResult) => {
  const { error } = await reqUploadTopicImage(imageList.value, data)
  if (!error) return true
  return false
}
const handlePostTopic = async () => {
  if (isUploading.value) return
  if (!sendFlag.value) return
  isUploading.value = true
  const { data } = await reqPostTopic({
    title: title.value,
    content: content.value,
    pic_count: imageList.value.length,
  })
  if (!isNull(data)) {
    if (imageList.value.length > 0) {
      const result = await uploadImage(data.body)
      if (!result) {
        isUploading.value = false
        return
      }
    }
    // content.value = ''
    // title.value = ''
    // imageList.value = []
    // isUploading.value = false
    setTimeout(() => {
      showMsg('发布成功~')
    }, 100)
    uni.$emit('updateHomeTopic')
    uni.$emit('updateProfileListData')
    setTimeout(() => {
      uni.switchTab({ url: '/pages/index/index' })
    }, 800)
  }
}
</script>

<style lang="scss">
.publish-page {
  width: 100%;
  .input-placeholder {
    color: #bdbdbd;
  }
  .textarea-placeholder {
    color: #bdbdbd;
  }
  .image {
    $img-wid-he: 200rpx;
    width: $img-wid-he;
    height: $img-wid-he;
    border-radius: 18rpx;
  }
}
</style>
