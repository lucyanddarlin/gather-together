<template>
  <u-cell-group>
    <u-cell-item
      v-for="item in types"
      :key="item.id"
      :title="`${item.type}管理`"
      is-link
      @click="handleClick(item)"
    />
  </u-cell-group>
</template>

<script setup lang="ts">
import { usePublisherStore } from '@/store/modules/publisher'
const publisherStore = usePublisherStore()
const types = publisherStore.types

const handleClick = (item: any) => {
  publisherStore.cur_type = item.type
  uni.navigateTo({ url: `./publisher-manage` })
}
</script>

<style scoped></style>
