<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <!-- <NavBar></NavBar>  -->
  <view class="discovery-page bg-#f7f7f7">
    <div h-178rpx class="bg-#4380FF"></div>
    <GatherSelectPage w-full />
    <scroll-view
      class="main-page"
      :scroll-y="true"
      :scroll-with-animation="true"
      :scroll-top="scrollTop"
      @scroll="handleScroll"
      @scrolltolower="handleScrollToLower"
    >
      <view v-show="activeIndex == PROJECT_LIBRARY">
        <PaperItem
          v-for="project in GatherProjectList"
          :key="project.project_id"
          :type="GATHER"
          :paper-item="project"
      /></view>
      <view v-show="activeIndex == PEOPLE_LIBRARY" pt-20rpx>
        <GatherPeople
          v-for="item in GatherPersonList"
          :key="item.user_id"
          :name="item.name"
          :tags="item.tags"
          :school="'广州大学'"
          :profession="item.profession"
          :content="item.profile"
          @toPeopleDetail="toPeopleDetail(item.user_id)"
        />
      </view>
    </scroll-view>
  </view>
  <!-- 发布 和 返回顶部的按钮 -->
  <GatherPublishButton
    v-show="activeIndex === PROJECT_LIBRARY"
    fixed
    top-1000rpx
    right-40rpx
  />
  <GatherBackTopButton fixed top-1130rpx right-40rpx />

  <u-popup v-model="showPopup" mode="bottom" height="60%" border-radius="30">
    <view px-32rpx py-52rpx>
      <view
        v-for="item in ProjectFilterPopupData[currentListKey].map"
        :key="item.title"
        mb-56rpx
      >
        <view text-32rpx text-main mb-24rpx>
          {{ item.title }} <text class="text-#A4A4A4 ml-12rpx">单选</text>
        </view>
        <view grid grid-cols-3 gap-20rpx>
          <view
            v-for="label in item.list"
            :key="label.value"
            w-190rpx
            h-74rpx
            flex-center
            rounded-18rpx
            transition-color
            duration-300
            class="bg-#F5F5F5 text-#A4A4A4"
            :class="{ '!bg-main text-white': label.isSelected }"
            @click="handleClickLabel(label, item.list)"
          >
            {{ label.value }}
          </view>
        </view>
      </view>
      <view flex-center>
        <view
          class="filter-btn bg-#278C5C mr-22rpx"
          @click="handleConfirmFilter"
        >
          确认
        </view>
        <view class="filter-btn bg-#FF6969" @click="handleResetFilter">
          重置
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
// 人才库 和 项目库数据
import { computed, reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { currentUserVitaStore } from '@/store/UserVitaStore'
// 切换页面
import { PEOPLE_LIBRARY, PROJECT_LIBRARY } from '@/utils/gatherPage'
import {
  GATHER,
  GATHER_LIST_KEY,
  LEARNINGDIRECTION_LIST,
  MANNERTYPE_LIST,
  PROJECTMODE_LIST,
  PROJECTTYPE_LIST,
} from '@/utils/constant'
// 导入 gatherIndex 的 pinia
import { gatherIndexStore } from '@/store/gatherIndex'
// 引入组件
import GatherSelectPage from '@/pages/gather/components/gather-pageSelect.vue'

import GatherPublishButton from '@/pages/gather/components/gather-publishButton.vue'
import GatherBackTopButton from '@/pages/gather/components/gather-backTopButton.vue'
import { gatherProjectStore } from '@/store/UserProjectStore'
// 引入项目库组件
import PaperItem from '@/components/paper-item.vue'
// 引入 获取项目数据的 请求
import { reqGatherPersonList, reqGatherProjectList } from '@/api/gather'

import GatherPeople from '@/pages/gather/components/gather-people.vue'
// import { deepClone } from '@/utils/common'

// 实例化 gatherIndex pinia
const useGatherIndexStore = gatherIndexStore()
// 实例化 当前页面的 数据
const userStore = currentUserVitaStore()
// 导入 nav 栏 活动的值 ； 导入是否展示 筛选
const { activeIndex, scrollTop, oldScrollTop, showPopup } =
  storeToRefs(useGatherIndexStore)
// 导入选中的 人才库 id；人才库数据
const { currentUserVitaId } = storeToRefs(userStore)
const userGatherProjectStore = gatherProjectStore()
// todo 后续接口接入，需要换接口的id请求数据
const { GatherProjectList, GatherPersonList } = storeToRefs(
  userGatherProjectStore
)
// 跳转到 人才库 详情页
const toPeopleDetail = (id: any) => {
  currentUserVitaId.value = id
  uni.navigateTo({
    url: `/pagesSub/gatherSub/gatherSub-person?user_id=${id}`,
  })
}

// 获取主页板块信息
const startProjectPage = ref(0)

const getProject = async () => {
  const { data } = await reqGatherProjectList(startProjectPage.value, 8)

  for (let i = 0; i < data.body.length; i++) {
    GatherProjectList.value.push(data.body[i])
  }
  startProjectPage.value++
}

const getPerson = async () => {
  const { data } = await reqGatherPersonList(startProjectPage.value, 8)

  for (let i = 0; i < data.body.result.length; i++) {
    GatherPersonList.value.push(data.body.result[i])
  }
  startProjectPage.value++
}

const handleScrollToLower = () => {
  getProject()

  getPerson()
}
onLoad(() => {
  getProject()

  getPerson()
})

// 检测滚动
const handleScroll = (options: any) => {
  oldScrollTop.value = options.target.scrollTop as number
}
// 项目筛选菜单
const ProjectFilterPopupData: any = reactive({
  project: {
    map: [
      { title: '项目模式', list: PROJECTMODE_LIST },
      { title: '项目类型', list: PROJECTTYPE_LIST },
    ],
    resultKey: ['project_mode', 'project_type'],
    result: {},
  },
  people: {
    map: [
      { title: '能力类型', list: MANNERTYPE_LIST },
      { title: '学习方向', list: LEARNINGDIRECTION_LIST },
    ],
    resultKey: ['manner_type', 'learning_direction'],
    result: {},
  },
})

const currentListKey: any = computed(() => GATHER_LIST_KEY[activeIndex.value])

const handleClickLabel = (
  label: { isSelected: boolean },
  list: { isSelected: boolean }[]
) => {
  if (label.isSelected) {
    label.isSelected = false
    return
  }
  list.forEach((item: { isSelected: boolean }) => (item.isSelected = false))
  label.isSelected = true
}
const handleResetFilter = () => {
  ProjectFilterPopupData[currentListKey.value].map.forEach(
    (item: { list: any[] }) => {
      item.list.forEach((i) => {
        i.isSelected = false
      })
    }
  )
}
const handleConfirmFilter = () => {
  ProjectFilterPopupData[currentListKey.value].result = {}
  for (
    let i = 0;
    i < ProjectFilterPopupData[currentListKey.value].map.length;
    i++
  ) {
    for (
      let j = 0;
      j < ProjectFilterPopupData[currentListKey.value].map[i].list.length;
      j++
    ) {
      if (
        ProjectFilterPopupData[currentListKey.value].map[i].list[j].isSelected
      ) {
        ProjectFilterPopupData[currentListKey.value].result[
          ProjectFilterPopupData[currentListKey.value].resultKey[i]
        ] = ProjectFilterPopupData[currentListKey.value].map[i].list[j].index
        break
      }
    }
  }
  console.log(ProjectFilterPopupData[currentListKey.value].result)
}
</script>

<style lang="scss">
.area-1 {
  .tab-section {
    padding-top: 24rpx;
    display: flex;
    justify-content: space-around;
    .tab-item {
      color: #c3c3c3;
      font-weight: 500;
      font-size: 32rpx;
      padding-bottom: 8rpx;
      &.active {
        color: #2d2d2d;
        border-bottom: 4rpx solid #2d2d2d;
      }
    }
  }
}
.area-2 {
  padding: 36rpx 32rpx 24rpx 12rpx;
  font-size: 32rpx;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #c3c3c3;
  .tab-section {
    width: 240rpx;
    display: flex;
    justify-content: space-around;
    .tab-item {
      &.active {
        color: #2d2d2d;
      }
    }
  }
}
.icon-shaixuan {
  font-size: 36rpx;
}
.icon-gengduo {
  font-size: 48rpx;
}
.filterList {
  grid-template-columns: 188rpx;
  grid-template-rows: 80rpx;
  row-gap: 16rpx;
  column-gap: 40rpx;
}
.activeFilterOption {
  background-color: #598df9;
  color: white;
}
.icon-fasong,
.icon-shouqi {
  font-size: 56rpx;
}
.buttonShadow {
  box-shadow: 0rpx 4rpx 14rpx 4rpx rgba(67, 128, 255, 0.14);
}
.discovery-page {
  height: 100vh;
}
.main-page {
  height: calc(100% - 350rpx);
  background-color: #f7f7f7;
}
.filter-btn {
  width: 324rpx;
  height: 72rpx;
  border-radius: 12rpx;
  font-size: 32rpx;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
