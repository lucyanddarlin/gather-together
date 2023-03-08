<template>
  <u-navbar :border-bottom="false"></u-navbar>
  <view v-if="!isNull(currentPerson)">
    <!-- 顶部名字 和 学校信息 -->
    <GatherSubAvaterSection
      :name="currentPerson.name"
      :profession="currentPerson.profession"
      :school="currentPerson.school"
      :grade="currentPerson.grade"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <GatherSubContentSection
      :type="'技能/能力'"
      :title="realMannerType"
      :content="currentPerson.skill_des"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 项目/实践 -->
    <view class="p-32rpx text-28rpx text-#4D4D4D">
      <!-- 种类 -->
      <view class="text-32rpx font-bold mb-24rpx">技能/类型</view>
      <view v-for="project in currentPerson.projects" :key="project" mb-36rpx>
        <!-- tag 类型 -->
        <view flex mb-20rpx>
          <GatherContentBlock
            :content="project.project_name"
            class="text-#598DF9"
          />
        </view>
        <view> {{ project.project_exp }}</view></view
      >
    </view>
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <!-- 证书/荣誉 -->
    <view class="p-32rpx text-28rpx text-#4D4D4D">
      <!-- 种类 -->
      <view class="text-32rpx font-bold mb-24rpx">证书/荣誉</view>
      <view v-for="cert in currentPerson.certs" :key="cert" mb-36rpx>
        <!-- tag 类型 -->
        <view flex mb-20rpx>
          <GatherContentBlock :content="cert.cert_name" class="text-#598DF9" />
        </view>
      </view>
    </view>
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 个人介绍 -->
    <GatherSubContentSection
      :type="'个人介绍'"
      :content="currentPerson.profile"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 联系方式 -->
    <GatherSubContact :type="'联系方式'" :title="currentPerson.contact" />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 功能 按钮 -->
    <GatherSubFucntionButton />
  </view>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

import { onLoad } from '@dcloudio/uni-app'
import { isNull } from '@/utils/common'
import GatherSubContentSection from '@/pagesSub/gatherSub/components/gatherSub-ContentSection.vue'
import GatherContentBlock from '@/pages/gather/components/gather-contentBlock.vue'
import GatherSubAvaterSection from '@/pagesSub/gatherSub/components/gatherSub-AvaterSection.vue'
import GatherSubFucntionButton from '@/pagesSub/gatherSub/components/gatherSub-fucntionButton.vue'
import GatherSubContact from '@/pagesSub/gatherSub/components/gatherSub-Contact.vue'
import { reqGatherPersonSingle } from '@/api/gather'
import { MANNERp_TYPE_LIST } from '@/utils/constant'

const currentPerson = ref()
onLoad((option: any) => {
  const user_id = option.user_id
  const getCurrentPagePerson = async () => {
    const { data } = await reqGatherPersonSingle(String(user_id))
    currentPerson.value = data.body
  }

  getCurrentPagePerson()
})
const realMannerType = computed(() => {
  return (
    MANNERp_TYPE_LIST.find((index) => index === currentPerson.value.skill_id)
      ?.value || '未知能力'
  )
})
</script>

<style scoped>
.icon-shoucang {
  font-size: 40rpx;
  margin-right: 8rpx;
}
.icon-fenxiang {
  font-size: 40rpx;
  margin-right: 8rpx;
}
</style>
