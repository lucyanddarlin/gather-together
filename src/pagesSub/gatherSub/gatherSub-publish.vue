<template>
  <u-navbar :is-back="true" :border-bottom="true" :title="'发布项目'">
  </u-navbar>
  <view class="bg-#F7F8FA min-h-1600rpx pt-40rpx flex flex-col items-center">
    <GatherSubPublishInput
      v-for="question in publishProjectList"
      :key="question.id"
      v-model="question.value"
      :placeholder="question.placeholder"
      :title="question.title"
      :is-select="question.isSelect"
    />
    <!-- 留言 -->
    <view mb-48rpx relative
      ><view class="text-#8C99A0 mb-28rpx">项目详情</view>
      <view class="text-#BDBDBD">
        <textarea
          v-model="textAreaValue"
          auto-height
          placeholder="'请输入项目介绍内容'"
          w-700rpx
          min-h-200rpx
          rounded-12rpx
          p-24rpx
          bg-white
          placeholder-style="color:#BDBDBD"
          :maxlength="3000"
        />
        <view absolute right-24rpx>{{ wordCount }} / 3000</view></view
      ></view
    >
    <!-- 上传图片 -->
    <GatherSubUpload />

    <MannerButton :value="'发布'" class="bg-#DFDFDF" mb-200rpx />
  </view>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import GatherSubPublishInput from '@/pagesSub/gatherSub/components/gatherSub-publishInput.vue'
import GatherSubUpload from '@/pagesSub/gatherSub/components/gatherSub-upload.vue'
import MannerButton from '@/components/manner-button.vue'
// 导入 静态渲染资源
import { publishProjectList } from '@/utils/gatherConstant'

const textAreaValue = ref('')
const wordCount = computed(() => {
  return textAreaValue.value.length
})
</script>

<style scoped>
textarea {
  box-sizing: border-box;
}
</style>
