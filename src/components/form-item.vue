<template>
  <view mb-30rpx class="form-item">
    <view flex items-center justify-between>
      <view v-if="title" text-28rpx font-bold class="text-#8C99A0">
        {{ title }}
      </view>
      <slot></slot>
    </view>
    <view
      w-full
      flex
      items-center
      justify-between
      bg-white
      font-bold
      rounded-12rpx
      mt-20rpx
      px-30rpx
      py-20rpx
    >
      <view w-80% :class="{ 'w-full': add }">
        <template v-if="input">
          <input
            type="text"
            :value="modelValue as string"
            :maxlength="maxLength"
            :placeholder="placeholder"
            placeholder-class="placeholder"
            @input="emit('update:modelValue', $event.detail?.value)"
          />
        </template>
        <template v-else-if="gender">
          <picker
            mode="selector"
            :range="genderList"
            range-key="value"
            @change="emit('update:modelValue', $event.detail.value)"
          >
            <view
              v-if="!genderList[modelValue as number]?.value"
              class="placeholder"
            >
              {{ placeholder }}
            </view>
            <view v-else>{{ genderList[modelValue as number].value }}</view>
          </picker>
        </template>
        <template v-else-if="date">
          <picker
            class="picker"
            mode="date"
            fields="year"
            :start="startDate"
            :end="endDate"
            @change="emit('update:modelValue', $event.detail.value)"
          >
            <view v-if="!modelValue" class="placeholder">{{
              placeholder
            }}</view>
            <view>{{ modelValue }} <text v-if="modelValue"> 年</text></view>
          </picker>
        </template>
        <template v-else-if="textarea">
          <textarea
            :value="modelValue as string"
            :placeholder="placeholder"
            placeholder-class="placeholder"
            :auto-height="!intro"
            :maxlength="maxLength"
            @input="emit('update:modelValue', $event.detail?.value)"
          />
        </template>
        <template v-else-if="add">
          <view flex-center text-main @click="handleLinkToAdd">
            <view class="iconfont icon-add mr-20rpx" />
            <view>添加内容</view>
          </view>
        </template>
        <template v-else-if="projectMode">
          <picker
            mode="selector"
            :range="PROJECT_MODE_LIST"
            range-key="value"
            @change="
              emit('update:modelValue', Number.parseInt($event.detail.value))
            "
          >
            <view
              v-if="!PROJECT_MODE_LIST[modelValue as number]?.value"
              class="placeholder"
            >
              {{ placeholder }}
            </view>
            <view v-else>{{
              PROJECT_MODE_LIST[modelValue as number].value
            }}</view>
          </picker>
        </template>
        <template v-else-if="projectType">
          <picker
            mode="selector"
            :range="PROJECT_TYPE_LIST"
            range-key="value"
            @change="
              emit('update:modelValue', Number.parseInt($event.detail.value))
            "
          >
            <view
              v-if="!PROJECT_TYPE_LIST[modelValue as number]?.value"
              class="placeholder"
            >
              {{ placeholder }}
            </view>
            <view v-else>{{
              PROJECT_TYPE_LIST[modelValue as number].value
            }}</view>
          </picker>
        </template>
      </view>
      <view v-if="arrow" class="iconfont icon-qianwang" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GENDER, PROJECT_MODE_LIST, PROJECT_TYPE_LIST } from '@/utils/constant'

interface Props {
  modelValue: string | number
  title?: string
  placeholder?: string
  arrow?: boolean
  input?: boolean
  gender?: boolean
  date?: boolean
  projectMode?: boolean
  projectType?: boolean
  textarea?: boolean
  intro?: boolean
  add?: boolean
  addType?: number
  maxLength: number
}
const props = withDefaults(defineProps<Props>(), {
  maxLength: 10,
  title: '',
  placeholder: '',
  addType: 0,
})

const emit = defineEmits(['update:modelValue'])
const startDate = computed(() => getDate('start'))
const endDate = computed(() => getDate())
const genderList = [
  { index: GENDER.woman, value: '女' },
  { index: GENDER.man, value: '男' },
]

const getDate = (type?: string) => {
  if (!props.date) return false
  const date = new Date()
  let year = date.getFullYear()
  let month: string | number = date.getMonth() + 1
  let day: string | number = date.getDate()

  if (type === 'start') {
    year = year - 10
  }
  month = month > 9 ? month : `0${month}`
  day = day > 9 ? day : `0${day}`
  return `${year}-${month}-${day}`
}
const handleLinkToAdd = () => {
  console.log('add')
  uni.navigateTo({
    url: `/pagesSub/cv/add-page?addType=${props.addType}`,
  })
}
</script>

<style lang="scss">
.form-item {
  .placeholder {
    color: #c8c9cc;
  }
}
</style>
