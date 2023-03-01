<template>
  <u-navbar :is-back="true" :border-bottom="true" :title="'发布项目'">
  </u-navbar>
  <view class="bg-#F7F8FA min-h-1600rpx pt-40rpx px-26rpx pb-100rpx">
    <FormItem
      v-model="publishProject.project_name"
      title="标题"
      placeholder="请输入项目标题"
      input
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
      input
    />
    <FormItem
      v-model="publishProject.needs"
      title="项目需求"
      placeholder="请输入您的需求(没有可填无)"
      input
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
          bg-white
          placeholder-style="color:#BDBDBD"
          :maxlength="3000"
        />
        <view mt-12rpx :class="wordCount === 3000 ? 'text-red' : ''"
          >{{ wordCount }} / 3000</view
        ></view
      ></view
    >
    <!-- 上传图片 -->
    <GatherSubUpload />

    <MannerButton
      :value="'发布'"
      :publish-data="publishProject"
      :form-status="formDataFulled"
    />
  </view>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import GatherSubUpload from '@/pagesSub/gatherSub/components/gatherSub-upload.vue'
import MannerButton from '@/components/manner-button.vue'
const formDataFulled = ref(false)
const wordCount = computed(() => {
  return publishProject.introduce.length
})

const publishProject = reactive({
  contact: '',
  introduce: '',
  needs: '',
  pic_count: '1',
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
</script>

<style scoped>
textarea {
  box-sizing: border-box;
}
</style>
