<template>
  <view>
    <view class="title"
      >{{ props.title }}
      <span class="sub-title"> 单选 </span>
    </view>
    <view grid grid-cols-3 gap-x-40rpx gap-y-12rpx>
      <view v-for="(name, index) in options" :key="props.title + name" ml-20rpx>
        <view
          class="btn"
          :class="index === selected ? 'selected' : 'unselected'"
          transition-color
          duration-300
          @tap="handleClick(props.title, index)"
        >
          <view>
            {{ name }}
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
  options: Array<string>
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
