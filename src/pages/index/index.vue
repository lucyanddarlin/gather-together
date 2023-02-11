<template>
  <NavBar></NavBar>
  <TabSection :default-active="activeIndex" @tab-switch="handleTabSwitch">
    <TabItem v-for="item in topNavList" :key="item.index" :index="item.index">
      <text>{{ item.title }}</text>
    </TabItem>
  </TabSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const topNavList = [
  { title: '综合', index: 0 },
  { title: '关注', index: 1 },
  { title: '广场', index: 2 },
]
const activeIndex = ref<number>(1)
const handleTabSwitch = (index: number) => {
  activeIndex.value = index
}
</script>

<style lang="scss">
.tab-section {
  padding: 0 120rpx;
  padding-bottom: 32rpx;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgba(195, 195, 195, 0.17);
  .tab-item {
    color: #c3c3c3;
    font-size: 32rpx;
    font-weight: bold;
    padding-bottom: 8rpx;
    &.active {
      color: #000000;
      border-bottom: 2px solid #361d1e;
    }
  }
}
</style>
