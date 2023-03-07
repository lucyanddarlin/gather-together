<template>
  <!-- 功能按钮，用在页面最后，确认 、 删除用 -->
  <view
    class="w-700rpx h-100rpx flex items-center justify-center text-white font-bold text-32rpx rounded-24rpx"
    :class="props.formStatus ? 'buttonSel' : 'buttonUnSel'"
    @click="toPublishApi"
  >
    {{ props.value }}
  </view>
</template>
<script setup lang="ts">
import { reqPublishProject } from '@/api/gather'
import { isNull } from '@/utils/common'

const props = defineProps<{
  value: String | Number
  url?: String
  publishData?: any
  formStatus?: boolean
  publishImage?: Array<string>
}>()

const toPublishApi = async () => {
  if (props.formStatus) {
    const { data } = await reqPublishProject({
      contact: props.publishData.contact,
      introduce: props.publishData.introduce,
      needs: props.publishData.needs,
      pic_count: '0',
      project_mode: props.publishData.project_mode,
      project_name: props.publishData.project_name,
      project_type: props.publishData.project_type,
    })
    if (!isNull(data)) {
      if (!isNull(props.publishImage)) {
        // TODO: upload images
        console.log(props.publishImage)
      }
      uni.showToast({
        title: '发布成功！',
        icon: 'success',
        duration: 2000,
      })
      uni.navigateBack()
    }
  } else {
    uni.showToast({
      title: '您还未填写完整',
      icon: 'error',
      duration: 2000,
    })
    return
  }
}
</script>

<style scoped>
.buttonSel {
  background-color: #4380ff;
}
.buttonUnSel {
  background-color: #dfdfdf;
}
</style>
