<template>
  <u-navbar :border-bottom="false"></u-navbar>
  <view>
    <!-- 顶部名字 和 学校信息 -->
    <GatherSubAvaterSection
      :name="currentPerson.name"
      :profession="currentPerson.profession"
      :school="'广州大学'"
      :grade="currentPerson.grade"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <GatherSubContentSection
      :type="'技能/能力'"
      :title="'软件/硬件'"
      :content="'全栈型，前端VUE2/3,后端JAVA SpringBoot'"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 项目/实践 -->
    <GatherSubContentSection
      :type="'项目/实践'"
      :title="'个人博客项目'"
      :content="'开发了一个个人博客，前端采用VUE3框架，后端采用的是SpringBoot架构，实现博客的创建、编辑、按时间查找的功能.…'"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <!-- 证书/荣誉 -->
    <GatherSubContentSection :type="'证书/荣誉'" :title="'大学英语六级'" />
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
    <GatherSubContentSection
      :type="'联系方式'"
      :title="currentPerson.contact"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 功能 按钮 -->
    <GatherSubFucntionButton />
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { onLoad } from '@dcloudio/uni-app'
import GatherSubContentSection from '@/pagesSub/gatherSub/components/gatherSub-ContentSection.vue'
import GatherSubAvaterSection from '@/pagesSub/gatherSub/components/gatherSub-AvaterSection.vue'
import GatherSubFucntionButton from '@/pagesSub/gatherSub/components/gatherSub-fucntionButton.vue'
import { reqGatherPersonSingle } from '@/api/gather'

const currentPerson = ref()
onLoad((option: any) => {
  const getCurrentPagePerson = async () => {
    const { data } = await reqGatherPersonSingle(String(option.user_id))
    currentPerson.value = data.body
  }

  getCurrentPagePerson()
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
