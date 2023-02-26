<template>
  <!-- 功能按钮，用在页面最后，确认 、 删除用 -->
  <view
    class="w-700rpx h-100rpx flex items-center justify-center bg-#4380FF text-white font-bold text-32rpx rounded-24rpx"
    @click="toPublishApi"
  >
    {{ props.value }}
  </view>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { reqPublishProject } from '@/api/gather'

const props = defineProps<{
  value: String | Number
  url?: String
  publishData?: any
}>()
const publistList = computed(() => {
  return props.publishData
})
const toPublishApi = () => {
  console.log(publistList.value)

  reqPublishProject(
    publistList.value.contact,
    publistList.value.project_introduce,
    publistList.value.needs,
    publistList.value.pic_count,
    publistList.value.project_mode,
    publistList.value.project_name,
    publistList.value.project_type,
    publistList.value.zone_id
  )
}
</script>

<style lang="less" scoped></style>
