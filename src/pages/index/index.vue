<template>
  <view class="content">
    <navBar></navBar>
    <view text-100px class="text-area text-red">
      <view> sd dasdasdsadasdasd </view>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { get } from '@/api/request'
import { useAppStore } from '@/store/modules/app'
import navBar from '@/components/navBar.vue'

// import request from '@/api/request'
const title = ref('Hello')
const test = () =>
  get<{ code: number; body: any }>('/api/home/get/forum', { page: 0, size: 5 })
const test2 = async () => {
  const res = await test()
  console.log(res.data.body)
}
test2()

const { hello } = useAppStore()
console.log(hello)
</script>

<style></style>
