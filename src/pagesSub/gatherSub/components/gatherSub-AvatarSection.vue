<template>
  <!-- 顶部名字 和 学校信息 -->
  <view flex mb-24rpx pl-40rpx>
    <img
      v-if="activeIndex === 1"
      :src="
        props.sex
          ? '../../../static/avater_default.png'
          : '../../../static/avater_woman.jpg'
      "
      w-130rpx
      h-130rpx
      mr-30rpx
      mt-12rpx
    />
    <view>
      <view class="text-#534E4E text-52rpx mb-12rpx font-bold">
        {{ props.name }}
      </view>
      <view v-show="activeIndex == 1" flex mb-12rpx
        ><GatherContentBlock
          :content="!props.school ? '未知学校' : props.school"
          class="text-#598DF9 text-24rpx" />
        <GatherContentBlock
          :content="!props.profession ? '未知专业' : props.profession"
          class="text-#598DF9 text-24rpx" /><GatherContentBlock
          :content="!props.year ? '未知年级' : props.year + '级'"
          class="text-#598DF9 text-24rpx"
      /></view>
      <view flex
        ><GatherContentBlock
          v-for="(tag, index) in props.tags as Array<any>"
          :key="index"
          :content="tag"
          class="text-#FFAF50 text-24rpx"
        />
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import GatherContentBlock from '@/pages/gather/components/gather-contentBlock.vue'
// 导入 gatherIndex 的 pinia
import { gatherIndexStore } from '@/store/gatherIndex'
// 实例化 gatherIndex pinia
const useGatherIndexStore = gatherIndexStore()
// 导入 nav 栏 活动的值 ； 导入是否展示 筛选
const { activeIndex } = storeToRefs(useGatherIndexStore)

const props = defineProps({
  name: { type: String, default: '' },
  school: { type: String, default: '' },
  profession: { type: String, default: '' },
  sex: { type: Number, default: 0 },
  year: { type: [String, Number], default: '' },
  tags: { type: Array, default: () => [] },
})
</script>

<style lang="less" scoped></style>
