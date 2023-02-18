<template>
  <u-cell-group>
    <u-cell-item :arrow="false" color="#598DF9">
      <template #title>
        <div text-32rpx color="#598DF9">广州大学分区</div>
      </template>
      <template #right-icon>
        <div text-32rpx>
          <span class="iconfont icon-shaixuan" color="#598DF9">筛选</span>
        </div>
      </template>
      <template #icon>
        <u-icon name="map" size="36rpx" color="#598DF9" />
      </template>
    </u-cell-item>
  </u-cell-group>
</template>

<script setup lang="ts"></script>

<style scoped>
.iconfont {
  font-size: 36rpx;
  color: #598df9;
}
</style>
