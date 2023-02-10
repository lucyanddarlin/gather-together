<template>
  <div>sub-test是的冯绍峰dasdasdd</div>
  <u-calendar v-model="show" :mode="mode"></u-calendar>
  <u-button @click="show = true">打开</u-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
const mode = ref('date')
</script>

<style scoped></style>
