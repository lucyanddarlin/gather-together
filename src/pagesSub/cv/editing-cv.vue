<template>
  <view class="editing-cv-page">
    <FormItem
      v-model="userCV.name"
      title="称呼"
      placeholder="请输入您的称呼"
      input
    />
    <FormItem
      v-model="userCV.sex"
      title="性别"
      placeholder="选择性别"
      gender
      arrow
    />
    <FormItem
      v-model="userCV.school"
      title="您的学校"
      placeholder="请输入您的学校"
      input
    />
    <FormItem
      v-model="userCV.year"
      title="入学年份"
      placeholder="请选择入学年份"
      date
      arrow
    />
    <FormItem
      v-model="userCV.profession"
      title="学习方向"
      placeholder="请输入您的所学专业"
      input
    >
      <view class="select-button-wrap" @click="handleOpenPopup('profession')">
        <view>{{ currentProfession?.value || '选择方向' }}</view>
        <view class="iconfont icon-qianwang" />
      </view>
    </FormItem>
    <FormItem
      v-model="userCV.skill_des"
      title="能力/技能"
      placeholder="请列举您的能力/技能"
      textarea
    >
      <view class="select-button-wrap" @click="handleOpenPopup('ability')">
        <view>{{ currentAbility?.value || '能力类型' }}</view>
        <view class="iconfont icon-qianwang" />
      </view>
    </FormItem>
    <FormItem title="项目/实践 (可添加)" add :add-type="ADD.PROJECTS" />
    <FormItem title="证书/荣誉 (可添加)" add :add-type="ADD.CERTS" />
    <FormItem
      v-model="userCV.contact"
      title="联系方式"
      placeholder="输入您的联系方式"
      input
    />
    <FormItem
      v-model="userCV.profile"
      title="个人介绍"
      placeholder="请输入您的个人介绍"
      textarea
      intro
    />
    <view
      class="confirm-button-wrap transition"
      :class="{ '!bg-main': checkCV }"
      @click="handleClickConfirm"
    >
      保存
    </view>
    <view
      class="confirm-button-wrap transition"
      :class="{ '!bg-#FF6969': checkCV }"
      @click="removeUserCV"
      >删除该简历</view
    >
    <u-popup v-model="showPopup" mode="bottom" height="70%" border-radius="30">
      <view p-30rpx>
        <view>
          <text text-main text-36rpx mr-10rpx>
            {{ popupData[popupDataKey]?.title }}
          </text>
          <text text-gray text-32rpx>单选</text>
        </view>
        <view
          v-if="popupData[popupDataKey]?.list.length > 0"
          flex
          items-center
          justify-around
          flex-wrap
          mt-20rpx
        >
          <view
            v-for="(item, i) in popupData[popupDataKey].list"
            :key="item.index"
            class="bg-#F5F5F5 w-200rpx h-80rpx rounded-16rpx flex-center text-#A4A4A4 text-28rpx font-medium mb-20rpx transition-color"
            :class="{ '!bg-main text-white': item.isSelected }"
            @click="handleSelectPopupItem(i)"
          >
            {{ item.value }}
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { deepClone, showMsg } from '@/utils/common'
import { ABILITY_LIST, ADD, PROFESSION_LIST } from '@/utils/constant'

interface PopupData {
  [key: string]: {
    title: string
    list: Array<{ index: number; value: string; isSelected: boolean }>
  }
}
type PopupDataKey = 'profession' | 'ability' | ''
const popupDataKey = ref<PopupDataKey>('')
const popupData = reactive<PopupData>({
  profession: { title: '学习方向', list: deepClone(PROFESSION_LIST) },
  ability: { title: '能力类型', list: deepClone(ABILITY_LIST) },
})

const { userCV, removeUserCV, createUserCV } = useUserStore()
const showPopup = ref<boolean>(false)
const currentProfession = computed(() => {
  return popupData['profession']?.list.find((item) => item.isSelected)
})
const currentAbility = computed(() => {
  return popupData['ability']?.list.find((item) => item.isSelected)
})
const checkCV = computed(() => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in userCV) {
    if (!userCV[key as keyof typeof userCV]) return false
  }
  return true
})
watch(
  currentProfession,
  () => {
    userCV.direction = currentProfession.value?.index
  },
  { deep: true }
)
watch(
  currentAbility,
  () => {
    userCV.skill_id = currentAbility.value?.index
  },
  { deep: true }
)

const handleOpenPopup = (key: PopupDataKey) => {
  popupDataKey.value = key
  showPopup.value = true
}
const handleSelectPopupItem = (index: number) => {
  popupData[popupDataKey.value].list.forEach((item) => {
    item.isSelected = false
  })
  popupData[popupDataKey.value].list[index].isSelected = true
}
const handleClickConfirm = () => {
  if (!checkCV.value) {
    showMsg('请填写完整表单')
    return
  }
  createUserCV()
}
</script>

<style lang="scss">
.editing-cv-page {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding: 30rpx 26rpx;
  .select-button-wrap {
    width: 210rpx;
    height: 54rpx;
    background-color: #598df9;
    color: #fff;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8rpx;
    .iconfont {
      margin-left: 6rpx;
    }
  }
  .confirm-button-wrap {
    width: 100%;
    padding: 34rpx 0;
    background-color: #dfdfdf;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 32rpx;
    border-radius: 24rpx;
    margin-bottom: 48rpx;
  }
}
</style>
