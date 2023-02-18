<template>
  <view mb-48rpx
    ><view class="text-#8C99A0 mb-28rpx">{{ title }}</view>
    <view class="relative text-#BDBDBD">
      <input
        w-700rpx
        h-86rpx
        bg-white
        pl-24rpx
        rounded-12rpx
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="isSelect"
        placeholder-style="color:#BDBDBD"
        @input="onInput"
      />
      <i
        v-show="isSelect"
        class="iconfont icon-qianwang absolute top-26rpx right-28rpx"
      ></i> </view
  ></view>
</template>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['modelValue', 'title', 'placeholder', 'isSelect'],
  emits: ['update:modelValue'],
  setup(props, context) {
    function onInput(e: any) {
      return context.emit('update:modelValue', e.target.value)
    }
    return {
      onInput,
    }
  },
}
</script>

<style lang="less" scoped></style>
