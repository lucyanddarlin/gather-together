<template>
  <view>
    <view mt-38rpx mb-24rpx text-36rpx :style="{ color: `#4F82F3` }"
      >{{ props.title }}
      <span text-36rpx :style="{ color: `#A4A4A4` }"> 单选 </span>
    </view>
    <view grid grid-cols-3 gap-x-40rpx gap-y-12rpx>
      <view v-for="option in options" :key="props.title + option.name" ml-20rpx>
        <view
          w-188rpx
          h-74rpx
          text-28rpx
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
import { ref, watch } from 'vue'

const props = defineProps<{
  title: string
  options: Array<{ name: string; value: number }>
  func: Function
  checkedAll: boolean
}>()
const selected = ref()

// 响应重置
watch(
  () => props.checkedAll,
  (newVal: boolean) => {
    if (!newVal) {
      selected.value = undefined
    }
  }
)

const handleClick = (title: string, value: number) => {
  if (value === selected.value) {
    // 取消选择
    selected.value = undefined
    props.func(title, '')
    console.log('取消选择')
  } else {
    // 选中
    selected.value = value
    props.func(title, value)
  }
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
