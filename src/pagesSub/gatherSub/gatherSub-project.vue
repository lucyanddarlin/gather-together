<template>
  <view>
    <!-- 顶部名字 和 学校信息 -->
    <GatherSubAvatarSection :name="currentProject?.project_name" />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <GatherSubContentSection
      :type="'项目需求'"
      :title="currentProject?.needs"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <!-- 项目/实践 -->
    <view class="p-32rpx text-28rpx text-#4D4D4D">
      <view class="text-32rpx font-bold mb-32rpx">项目详情</view>
      <view>
        <text :user-select="true">{{ currentProject?.introduce }}</text>
      </view>
    </view>
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <!-- 联系方式 -->
    <GatherSubContact :type="'联系方式'" :title="currentProject?.contact" />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <!-- 功能 按钮 -->
    <GatherSubFunctionButton />
  </view>
</template>
<script setup lang="ts">
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { ref } from 'vue'
import GatherSubContentSection from '@/pagesSub/gatherSub/components/gatherSub-ContentSection.vue'
import GatherSubAvatarSection from '@/pagesSub/gatherSub/components/gatherSub-AvatarSection.vue'
import GatherSubFunctionButton from '@/pagesSub/gatherSub/components/gatherSub-functionButton.vue'
import { reqGatherProjectSingle } from '@/api/gather'
import GatherSubContact from '@/pagesSub/gatherSub/components/gatherSub-Contact.vue'
import type { IGatherItem } from '@/typings/gather'

const currentProject = ref<IGatherItem>()
onLoad((option: any) => {
  const getCurrentPageProject = async () => {
    const { data } = await reqGatherProjectSingle(String(option.project_id))
    currentProject.value = data.body
  }
  getCurrentPageProject()
})
onShareTimeline(() => {
  return {
    title: currentProject.value!.project_name,
    path: `/pagesSub/gatherSub/gatherSub-project?project_id=${
      currentProject.value!.project_id
    }`,
  }
})
onShareAppMessage(() => {
  return {
    title: currentProject.value!.project_name,
    path: `/pagesSub/gatherSub/gatherSub-project?project_id=${
      currentProject.value!.project_id
    }`,
  }
})
</script>

<style scoped>
.iconfont {
  font-size: 40rpx;
  margin-right: 8rpx;
}
</style>
