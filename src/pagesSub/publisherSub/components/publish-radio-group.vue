<template>
  <view>
    <view class="title"
      >{{ props.title }}
      <span class="sub-title"> 单选 </span>
    </view>
    <view grid grid-cols-3 gap-x-40rpx gap-y-12rpx>
      <view v-for="(label, index) in options" :key="index" ml-20rpx>
        <view
          class="btn"
          :class="label.isSelected ? 'selected' : 'unselected'"
          transition-color
          duration-300
          @tap="handleClickLabel(label, options)"
        >
          <view>
            {{ label.value }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { LabelItem } from '@/typings/publisher'

const props = defineProps<{
  title: string
  options: Array<LabelItem>
  multiSelect?: boolean
}>()

const handleClickLabel = (label: LabelItem, list: LabelItem[]) => {
  if (!props.multiSelect) list.forEach((item) => (item.isSelected = false))
  label.isSelected = !label.isSelected
}
</script>

<style lang="scss" scoped>
@import '../style/color';
.title {
  margin-top: 38rpx;
  margin-bottom: 24rpx;
  font-size: 36rpx;
  color: $b-2;
}
.sub-title {
  font-size: 36rpx;
  color: $g-tag;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 188rpx;
  height: 74rpx;
  font-size: 28rpx;
}

.selected {
  color: $bg;
  background-color: $b-2;
  border-radius: 18rpx;
  font-weight: 600;
}

.unselected {
  color: #a4a4a4;
  background-color: #f5f5f5;
  border-radius: 18rpx;
  font-weight: 600;
}
</style>
