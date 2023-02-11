<template>
  <view>
    <NavBar></NavBar>
    <TopSelectpage :page-select-list="gatherSelectList" />
    <view></view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const gatherSelectList = reactive([
  { id: 0, title: '首页' },
  { id: 1, title: '比赛' },
  { id: 2, title: '讲座' },
  { id: 3, title: '活动' },
])
</script>

<style scoped></style>
