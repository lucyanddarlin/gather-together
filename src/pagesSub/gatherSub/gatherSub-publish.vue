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
      placeholder="请输入项目需求"
      input
    />

    <!-- 留言 -->
    <view mb-48rpx relative
      ><view class="text-#8C99A0 mb-28rpx font-bold">项目详情</view>
      <view class="text-#BDBDBD">
        <textarea
          v-model="publishProject.introduce"
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

    <MannerButton :value="'发布'" :publish-data="publishProject" />
  </view>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue'
import GatherSubUpload from '@/pagesSub/gatherSub/components/gatherSub-upload.vue'
import MannerButton from '@/components/manner-button.vue'

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
</script>

<style scoped>
textarea {
  box-sizing: border-box;
}
</style>
