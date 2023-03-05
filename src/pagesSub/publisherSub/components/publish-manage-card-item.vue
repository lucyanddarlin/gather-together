<template>
  <div bg-white relative mt-12rpx min-h-346rpx>
    <PaperItem
      :type="props.description.post_type + 1"
      :url="`/pagesSub/publisherSub/publisher-detail?id=${props.description.post_id}`"
      :desc="props.description.description"
    >
      <template #title> {{ props.description.title }} </template>
      <template #label>
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
          :title="
            TYPE_NAMES[props.description.post_type][
              props.description.score_type
            ]
          "
          color="#FFAF50"
        ></PublishTag>
        <!-- 主办方类型 -->
        <PublishTag
          filter
          inline
          :title="HOST[props.description.host_type]"
          color="#FFAF50"
        ></PublishTag>
        <!-- 比赛级别（比赛特有） -->
        <PublishTag
          v-if="props.description.post_type === Type.比赛"
          filter
          inline
          :title="
            props.description.race_level !== undefined
              ? LEVEL[props.description.race_level]
              : '未分级'
          "
          color="#FFAF50"
        ></PublishTag>

        <!-- 详情描述 -->
      </template>
    </PaperItem>
  </div>
</template>

<script setup lang="ts">
import {
  type IDescription,
  type State,
  StateMap,
  Type,
} from '@/typings/publisher'
import { HOST, LEVEL, TYPE_NAMES } from '@/utils/publishConstant'
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
