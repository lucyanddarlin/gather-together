<template>
  <u-navbar :border-bottom="false"></u-navbar>

  <view v-for="item in gatherProject" :key="item.college_id">
    <!-- 顶部名字 和 学校信息 -->
    <GatherSubAvaterSection :name="item.project_name" :tags="item.tagList" />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>
    <GatherSubContentSection
      :type="'项目需求'"
      :title="'相关法律支持、场地提供、政策咨询支持 十万元资金需求 财务类人才、商业类人才'"
    />
    <!-- 分割线 -->
    <u-divider :use-slot="false" :half-width="'100%'"></u-divider>

    <!-- 项目/实践 -->

    <GatherSubImageContentSection
      :type="'项目详情'"
      :content="'我们的小队只有四个人，可以说是临危受命了小队里的所有人都不是负责自己相关专业的可以说是非常的难过可我就是用这样的队伍获得了第七届互联网比赛的国家金奖………'"
      :img-list="item.imgList"
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

import { gatherProjectStore } from '@/store/UserProjectStore'
import GatherSubImageContentSection from '@/pagesSub/gatherSub/components/gatherSub-ImageContentSection.vue'
import GatherSubContentSection from '@/pagesSub/gatherSub/components/gatherSub-ContentSection.vue'
import GatherSubAvaterSection from '@/pagesSub/gatherSub/components/gatherSub-AvaterSection.vue'
import GatherSubFucntionButton from '@/pagesSub/gatherSub/components/gatherSub-fucntionButton.vue'
const userGatherProjectStore = gatherProjectStore()
// todo 后续接口接入，需要换接口的id请求数据
const { gatherProject } = storeToRefs(userGatherProjectStore)
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
