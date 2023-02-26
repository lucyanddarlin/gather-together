<template>
  <view>
    <view mt-38rpx mb-24rpx text-32rpx :style="{ color: `#4F82F3` }"
      >{{ props.title }}
      <span text-32rpx :style="{ color: `#A4A4A4` }"> 单选 </span>
    </view>
    <view grid grid-cols-3 gap-x-40rpx gap-y-12rpx>
      <view v-for="option in options" :key="props.title + option.name" ml-20rpx>
        <view
          w-188rpx
          h-74rpx
          text-24rpx
          flex-center
          :class="option.value === selected ? 'selected' : 'unselected'"
          @tap="handleClick(props.title, option.value)"
        >
          <view>
            {{ option.name }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  options: Array<{ name: string; value: number }>
  func: Function
}>()
const selected = ref()

const handleClick = (title: string, value: number) => {
  selected.value = value
  props.func(title, value)
}
</script>

<style scoped>
.selected {
  color: #f5f5f5;
  background-color: #4f82f3;
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
