<template>
  <div flex h-84rpx pt-12px justify-around text-16px class="text-#ABABAB">
    <div
      v-for="option in props.pageSelectList"
      :key="option.id"
      :class="option.id == selected ? 'selected' : ''"
      @click="toSelectedPage(option.id)"
    >
      {{ option.title }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props: any = defineProps({
  pageSelectList: {
    type: Array,
    default() {
      return { id: Number, title: String }
    },
  },
})

const selected = ref<number>(0)
const toSelectedPage = (id: number) => {
  selected.value = id
}
</script>

<style scoped>
.selected {
  color: #2d2d2d;
  border-bottom: 2px solid #2d2d2d;
}
</style>
