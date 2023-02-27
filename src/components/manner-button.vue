<template>
  <!-- 功能按钮，用在页面最后，确认 、 删除用 -->
  <view
    class="w-700rpx h-100rpx flex items-center justify-center text-white font-bold text-32rpx rounded-24rpx"
    :class="formDataFulled ? 'buttonSel' : 'buttonUnSel'"
    @click="toPublishApi"
  >
    {{ props.value }}
  </view>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { reqPublishProject } from '@/api/gather'

const props = defineProps<{
  value: String | Number
  url?: String
  publishData?: any
}>()

const formDataFulled = ref<boolean>(false)

const toPublishApi = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const index in props.publishData) {
    // eslint-disable-next-line no-constant-condition
    if (props.publishData[index] !== '') {
      formDataFulled.value = true
    } else {
      formDataFulled.value = false
      uni.showToast({
        title: '需填写全部信息',
        icon: 'error',
        duration: 2000,
      })
      return
    }
  }
  reqPublishProject({
    contact: props.publishData.contact,
    introduce: props.publishData.introduce,
    needs: props.publishData.needs,
    pic_count: '99',
    project_mode: props.publishData.project_mode,
    project_name: props.publishData.project_name,
    project_type: props.publishData.project_type,
  })
}

watch(props.publishData, () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const index in props.publishData) {
    if (props.publishData[index] !== '') {
      formDataFulled.value = true
    }
  }
})
</script>

<style scoped>
.buttonSel {
  background-color: #4380ff;
}
.buttonUnSel {
  background-color: #dfdfdf;
}
</style>
