<template>
  <div bg-white relative mt-12rpx min-h-346rpx>
    <u-icon absolute top-20rpx right-24rpx name="more-dot-fill"></u-icon>

    <div>
      <div ml-24rpx mb-20rpx pt-28rpx text-32rpx fw-600>
        {{ description.title }}
      </div>
    </div>
    <div ml-36rpx>
      <PublishTag
        :date="{ start: description.start_time, end: description.end_time }"
        color="#598DF9"
      ></PublishTag>
      <PublishTag color="#598DF9" :title="description.location"></PublishTag>
      <PublishTag
        inline
        :title="StateMap[description.state]"
        color="#56C28E"
      ></PublishTag>
      <!-- 活动类型 -->
      <PublishTag
        filter
        inline
        :title="ScoreTypeMap[description.score_type]"
        color="#FFAF50"
      ></PublishTag>
      <!-- 主办方类型 -->
      <PublishTag
        filter
        inline
        :title="HostTypeMap[description.host_type]"
        color="#FFAF50"
      ></PublishTag>
      <!-- 比赛级别（比赛特有） -->
      <PublishTag
        v-if="description.post_type === Type.比赛"
        filter
        inline
        :title="
          description.race_level ? LevelMap[description.race_level] : '未分级'
        "
        color="#FFAF50"
      ></PublishTag>

      <!-- 详情描述 -->
      <PublishTag
        long-tag
        single-line
        :title="description.description"
        color="#A4A4A4"
      ></PublishTag>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HostTypeMap,
  type IDescription,
  LevelMap,
  ScoreTypeMap,
  StateMap,
  Type,
} from '@/typings/publisher'
import PublishTag from './publish-tag.vue'
const { description } = defineProps<{
  description: IDescription
}>()
</script>

<style scoped></style>
