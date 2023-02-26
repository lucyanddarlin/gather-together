<template>
  <view class="cv-index">
    <template v-if="!hasCV">
      <NoCV />
    </template>
    <template v-else>
      <CV />
    </template>
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import NoCV from './no-cv.vue'
import CV from './cv.vue'

const { hasCV } = storeToRefs(useUserStore())
</script>

<style lang="scss"></style>
