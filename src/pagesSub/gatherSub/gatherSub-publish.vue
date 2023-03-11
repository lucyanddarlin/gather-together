<template>
  <view class="gather-publish">
    <u-navbar :is-back="true" :border-bottom="true" :title="'发布项目'">
    </u-navbar>
    <view class="bg-#F7F8FA min-h-1600rpx pt-40rpx px-26rpx pb-100rpx">
      <FormItem
        v-model="publishProject.project_name"
        title="标题"
        placeholder="请输入项目标题"
        input
        max-length="30"
      />

      <FormItem
        v-model="publishProject.project_mode"
        project-mode
        title="项目模式"
        placeholder="请选择项目模式"
        arrow
      />
      <FormItem
        v-model="publishProject.project_type"
        project-type
        title="项目类型"
        placeholder="请选择项目类型"
        arrow
      />
      <FormItem
        v-model="publishProject.contact"
        title="联系方式"
        placeholder="请输入联系方式，如微信等..."
        textarea
        max-length="50"
      />
      <FormItem
        v-model="publishProject.needs"
        title="项目需求"
        placeholder="请输入您的需求(没有可填无)"
        textarea
        max-length="200"
        intro
      />
      <!-- 留言 -->
      <view mb-48rpx relative
        ><view class="text-#8C99A0 mb-28rpx font-bold">项目详情</view>
        <view class="text-#BDBDBD">
          <textarea
            v-model="publishProject.introduce"
            :auto-height="true"
            placeholder="请输入项目介绍内容"
            w-700rpx
            min-h-240rpx
            rounded-12rpx
            h-full
            p-24rpx
            text-32rpx
            bg-white
            class="text-#23272E"
            placeholder-style="color:#BDBDBD"
            :maxlength="3000"
          />
          <view mt-12rpx :class="wordCount === 3000 ? 'text-red' : ''"
            >{{ wordCount }} / 3000</view
          ></view
        ></view
      >
      <!-- 上传图片 -->
      <view p-24rpx flex items-center flex-wrap>
        <view
          v-for="(image, index) in imageList"
          :key="image"
          relative
          mr-10rpx
        >
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
      <!-- <GatherSubUpload /> -->

      <MannerButton
        :value="'发布'"
        :publish-data="publishProject"
        :form-status="formDataFulled"
        :publish-image="imageList"
      />
    </view>
  </view>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
// todo 隐藏发布图片的组件，后续接入接口
// import GatherSubUpload from '@/pagesSub/gatherSub/components/gatherSub-upload.vue'
import MannerButton from '@/components/manner-button.vue'
import { chooseImages } from '@/utils/common'
const formDataFulled = ref(false)
const maxImageCount = 3
const imageList = ref<string[]>([])
const wordCount = computed(() => {
  return publishProject.introduce.length
})
const freeLength = computed(() => {
  const length = maxImageCount - imageList.value.length
  return length
})

const publishProject = reactive({
  contact: '',
  introduce: '',
  needs: '',
  pic_count: '0',
  project_mode: '',
  project_name: '',
  project_type: '',
  zone_id: '1',
})

watch(publishProject, (newValue) => {
  if (
    newValue.project_name &&
    newValue.contact &&
    newValue.project_mode !== '' &&
    newValue.project_type !== '' &&
    newValue.needs &&
    newValue.introduce
  ) {
    formDataFulled.value = true
  } else {
    formDataFulled.value = false
  }
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
</script>

<style lang="scss">
.gather-publish {
  textarea {
    box-sizing: border-box;
  }
  .image {
    $img-wid-he: 200rpx;
    width: $img-wid-he;
    height: $img-wid-he;
    border-radius: 18rpx;
  }
}
</style>
