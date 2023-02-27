<template>
  <!-- 返回顶部 按钮 -->
  <view
    v-if="oldScrollTop > 200"
    class="w-100rpx h-100rpx bg-white rounded-64rpx flex items-center justify-center text-60rpx text-#4380FF buttonShadow"
    @click="backToTop"
    ><i class="iconfont icon-shouqi"></i
  ></view>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
// 导入 gatherIndex 的 pinia
import { nextTick } from 'vue'
import { gatherIndexStore } from '@/store/gatherIndex'
// 实例化 gatherIndex pinia
const useGatherIndexStore = gatherIndexStore()
// 导入 nav 栏 活动的值 ； 导入是否展示 筛选
const { scrollTop, oldScrollTop } = storeToRefs(useGatherIndexStore)
const backToTop = () => {
  scrollTop.value = oldScrollTop.value
  nextTick(() => {
    scrollTop.value = 0
  })
}
</script>

<style scoped></style>
