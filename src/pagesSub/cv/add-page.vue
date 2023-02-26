<template>
  <view class="add-item-page">
    <FormItem
      v-if="dataMap[currentKey[currentType!]]?.mainTitle"
      v-model="dataMap[currentKey[currentType!]].name"
      :title="dataMap[currentKey[currentType!]]?.mainTitle"
      input
    />
    <formItem
      v-if="dataMap[currentKey[currentType!]]?.title"
      v-model="dataMap[currentKey[currentType!]].desc"
      :title="dataMap[currentKey[currentType!]].title"
      textarea
      intro
    />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
interface DataMap {
  [key: string]: {
    mainTitle: string
    title?: string
    name: string
    desc?: string
  }
}

onLoad((options) => {
  if (!options) return
  currentType.value = options.addType
})

const currentType = ref<number>()
const currentKey = ['projects', 'certs']
const dataMap = reactive<DataMap>({
  projects: {
    mainTitle: '项目/实践 名称',
    title: '项目/实践 经历',
    name: '43243',
    desc: '',
  },
  certs: {
    mainTitle: '证书荣誉 名称',
    title: '证书荣誉 经历',
    name: '432',
  },
})
</script>

<style lang="scss">
.add-item-page {
  padding: 30rpx;
  min-height: 100vh;
  background-color: #f7f8fa;
}
</style>
