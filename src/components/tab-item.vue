<template>
  <view
    class="tab-item transition"
    :class="[{ active: active }, { first: index === 0 }]"
    @click="handleClick"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { type Ref, computed, inject, onBeforeUnmount, onMounted } from 'vue'

const { index, disabled } = defineProps<{
  index: number
  disabled?: boolean
}>()
const activeIndex: Ref = inject('activeIndex')!
const handleItemClick: Function = inject('handleItemClick')!
const addItem: Function = inject('addItem')!
const removeItem: Function = inject('removeItem')!
const active = computed(() => index === activeIndex.value)
const handleClick = () => {
  if (!disabled) {
    handleItemClick(index)
  }
}

onMounted(() => {
  addItem(index)
})
onBeforeUnmount(() => {
  removeItem(index)
})
</script>
