<template>
  <view>
    <!-- 顶部名字 和 学校信息 -->
    <GatherSubAvaterSection :name="currentProject.project_name" />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <GatherSubContentSection :type="'项目需求'" :title="currentProject.needs" />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 项目/实践 -->
    <GatherSubImageContentSection
      :type="'项目详情'"
      :content="currentProject.introduce"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 联系方式 -->
    <GatherSubContact :type="'联系方式'" :title="currentProject.contact" />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <!-- 功能 按钮 -->
    <GatherSubFucntionButton />
  </view>
</template>
<script setup lang="ts">
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { ref } from 'vue'
import GatherSubImageContentSection from '@/pagesSub/gatherSub/components/gatherSub-ImageContentSection.vue'
import GatherSubContentSection from '@/pagesSub/gatherSub/components/gatherSub-ContentSection.vue'
import GatherSubAvaterSection from '@/pagesSub/gatherSub/components/gatherSub-AvaterSection.vue'
import GatherSubFucntionButton from '@/pagesSub/gatherSub/components/gatherSub-fucntionButton.vue'
import { reqGatherProjectSingle } from '@/api/gather'
import GatherSubContact from '@/pagesSub/gatherSub/components/gatherSub-Contact.vue'

const currentProject: any = ref([])
onLoad((option: any) => {
  const getCurrentPageProject = async () => {
    const { data } = await reqGatherProjectSingle(String(option.project_id))
    currentProject.value = data.body
  }
  getCurrentPageProject()
})
onShareTimeline(() => {
  return {
    title: currentProject.value.project_name,
    path: `/pagesSub/gatherSub/gatherSub-project?project_id=${currentProject.value.project_id}`,
  }
})
onShareAppMessage(() => {
  return {
    title: currentProject.value.project_name,
    path: `/pagesSub/gatherSub/gatherSub-project?project_id=${currentProject.value.project_id}`,
  }
})
</script>

<style scoped>
.iconfont {
  font-size: 40rpx;
  margin-right: 8rpx;
}
</style>
