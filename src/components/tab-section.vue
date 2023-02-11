<template>
  <view class="tab-section">
    <slot></slot>
    <slot name="absolute"></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, watch } from 'vue'

const props = defineProps<{
  defaultActive: number
  router?: boolean
}>()
const emit = defineEmits(['tabSwitch'])
const items = reactive<any>({})
const activeIndex = ref<number>(0)

const updateActiveIndex = (index: number) => {
  if (items[index]) {
    activeIndex.value = index
  } else if (items[props.defaultActive]) {
    activeIndex.value = props.defaultActive
  } else {
    activeIndex.value = 0
  }
}
const handleItemClick = (index: number) => {
  if (activeIndex.value === index) return
  activeIndex.value = index
  if (props.router) uni.navigateTo({ url: String(index) })
  emit('tabSwitch', index)
}
const addItem = (index: string | number) => {
  items[index] = true
}
const removeItem = (index: string | number) => {
  delete items[index]
}
watch(
  () => props.defaultActive,
  (value) => {
    if (value === activeIndex.value) {
      return
    }
    updateActiveIndex(value)
  },
  { immediate: true, deep: true }
)
provide('handleItemClick', handleItemClick)
provide('addItem', addItem)
provide('removeItem', removeItem)
provide(
  'activeIndex',
  computed(() => activeIndex.value)
)
</script>
