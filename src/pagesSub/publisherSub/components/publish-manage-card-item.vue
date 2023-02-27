<template>
  <div bg-white relative mt-12rpx min-h-346rpx>
    <div>
      <div ml-24rpx mb-20rpx pt-28rpx text-32rpx fw-600>
        {{ props.description.title }}
      </div>
    </div>
    <div ml-36rpx>
      <PublishTag
        :date="{
          start: props.description.start_time,
          end: props.description.end_time,
        }"
        color="#598DF9"
      ></PublishTag>
      <PublishTag
        color="#598DF9"
        :title="props.description.location"
      ></PublishTag>
      <PublishTag
        inline
        :title="StateMap[props.description.state]"
        :color="getColor(props.description.state)"
      ></PublishTag>
      <!-- 活动类型 -->
      <PublishTag
        filter
        inline
        :title="ScoreTypeMap[props.description.score_type]"
        color="#FFAF50"
      ></PublishTag>
      <!-- 主办方类型 -->
      <PublishTag
        filter
        inline
        :title="HostTypeMap[props.description.host_type]"
        color="#FFAF50"
      ></PublishTag>
      <!-- 比赛级别（比赛特有） -->
      <PublishTag
        v-if="props.description.post_type === Type.比赛"
        filter
        inline
        :title="
          props.description.race_level !== undefined
            ? LevelMap[props.description.race_level]
            : '未分级'
        "
        color="#FFAF50"
      ></PublishTag>

      <!-- 详情描述 -->
      <PublishTag
        long-tag
        single-line
        :title="props.description.description"
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
  type State,
  StateMap,
  Type,
} from '@/typings/publisher'
import PublishTag from './publish-tag.vue'
const props = defineProps<{
  description: IDescription
}>()

const getColor = (state: State) => {
  const colorMap = [
    '#FFAF50',
    '#FFAF50',
    '#56C28E',
    '#FF6969',
    '#FF6969',
    '#FF6969',
  ]

  return colorMap[state]
}
</script>

<style scoped></style>
