<template>
  <u-navbar :border-bottom="false"></u-navbar>

  <view v-for="item in UserVita" :key="item.user_id">
    <!-- 顶部名字 和 学校信息 -->
    <GatherSubAvaterSection
      :name="item.name"
      :tags="item.tags"
      :grade="item.grade"
      :school="item.school"
      :profession="item.profession"
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
      :content="'我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们 五动十方工都'"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 联系方式 -->
    <GatherSubContentSection :type="'联系方式'" :title="'19300231123'" />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 功能 按钮 -->
    <GatherSubFucntionButton />
  </view>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { currentUserVitaStore } from '@/store/UserVitaStore'
import GatherSubContentSection from '@/pagesSub/gatherSub/components/gatherSub-ContentSection.vue'
import GatherSubAvaterSection from '@/pagesSub/gatherSub/components/gatherSub-AvaterSection.vue'
import GatherSubFucntionButton from '@/pagesSub/gatherSub/components/gatherSub-fucntionButton.vue'
const userStore = currentUserVitaStore()
// todo 后续接口接入，需要换接口的id请求数据
const { UserVita } = storeToRefs(userStore)
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
