<template>
  <view
    w-full
    p-28rpx
    mb-16rpx
    text-24rpx
    min-h-200rpx
    bg-white
    @click="$emit('toPeopleDetail')"
  >
    <!-- 项目名 学校 头像 -->
    <view
      text-32rpx
      mb-40rpx
      flex
      justify-between
      items-center
      class="text-#534E4E"
    >
      <!-- 名称和 专业 -->
      <view>
        <view font-bold mb-12rpx>{{ props.name }}</view>
        <view flex>
          <GatherContentBlock
            :content="props.school"
            class="text-#598DF9 text-24rpx"
          />
          <GatherContentBlock
            :content="props.profession"
            class="text-#598DF9 text-24rpx"
          />
        </view>
      </view>
      <!-- 头绪 -->
      <view bg-blue rounded-50% w-124rpx h-124rpx mr-60rpx></view>
    </view>
    <!-- tag 类 -->
    <view flex mb-12rpx>
      <!-- todo 后期更换 tag源头 和key 源 -->
      <GatherContentBlock
        v-for="(tag, index) in props.tags"
        :key="index"
        :content="'# ' + tag"
        class="text-#FFAF50"
      />
    </view>
    <!-- 简介类 -->
    <view>
      <GatherContentBlock :content="props.content" class="text-#A4A4A4" />
    </view>
  </view>
</template>
<script setup lang="ts">
import GatherContentBlock from '@/pages/gather/components/gather-contentBlock.vue'
defineEmits(['toPeopleDetail'])

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  school: {
    type: String,
    default: '',
  },
  profession: {
    type: String,
    default: '',
  },
  tags: {
    type: Array,
    default: () => [],
  },
  content: {
    type: String,
    default: '',
  },
})
</script>

<style lang="less" scoped></style>
