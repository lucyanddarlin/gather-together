<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <NavBar></NavBar>
  <GatherSelectPage />
  <view class="bg-#f7f7f7 w-full pt-196rpx min-h-1400rpx">
    <!-- 项目库 -->
    <view v-show="navActiveIndex == PROJECT_LIBRARY">
      <view
        v-for="item in gatherProject"
        :key="item.project_id"
        w-full
        p-28rpx
        mb-16rpx
        text-24rpx
        min-h-200rpx
        bg-white
        @click="toProjectDetail"
      >
        <!-- 项目名 -->
        <view
          text-32rpx
          mb-20rpx
          font-bold
          flex
          items-center
          justify-between
          class="text-#534E4E"
          ><view font-bold>{{ item.project_name }}</view
          ><i class="iconfont icon-gengduo"></i
        ></view>
        <!-- 标签tag todo 后期要更换新的数据 -->
        <view flex mb-20rpx>
          <view
            v-for="(tag, index) in item.tagList"
            :key="index"
            class="p-12rpx mr-12rpx rounded-8rpx text-#FFAF50 bg-#F5F5F5"
          >
            # {{ tag }}
          </view>
        </view>
        <view class="bg-#F5F5F5 text-#A4A4A4 p-16rpx rounded-12rpx">
          {{ item.introduce }}
        </view>
      </view></view
    >
    <!-- 人才库 -->
    <view v-show="navActiveIndex == PEOPLE_LIBRARY">
      <GatherPeople
        v-for="item in UserVita"
        :key="item.user_id"
        :name="item.name"
        :tags="item.tags"
        :school="item.school"
        :profession="item.profession"
        :content="item.profile"
        @toPeopleDetail="toPeopleDetail(item.user_id)"
      />
    </view>
  </view>

  <!-- 项目库筛选 -->
  <u-popup
    v-model="showProjectLibraryPopup"
    mode="bottom"
    length="50%"
    border-radius="30"
  >
    <view pt-44rpx flex flex-col items-center
      ><GatherProjectModeFilter /><GatherProjectTypeFilter /><GatherButton />
    </view>
  </u-popup>

  <!-- 人才库筛选 -->
  <u-popup
    v-model="showPeopleLibraryPopup"
    mode="bottom"
    length="60%"
    border-radius="30"
  >
    <view pt-44rpx flex flex-col items-center
      ><GatherMannerFilter /><GatherLearnDirection /><GatherButton />
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
// 人才库 和 项目库数据
import { currentUserVitaStore } from '@/store/UserVitaStore'
// 切换页面
import { PEOPLE_LIBRARY, PROJECT_LIBRARY } from '@/utils/gatherPage'
// 导入 gatherIndex 的 pinia
import { gatherIndexStore } from '@/store/gatherIndex'
// 引入组件
import GatherSelectPage from '@/pages/gather/components/gather-pageSelect.vue'
import GatherMannerFilter from '@/pages/gather/components/gather-mannerFilter.vue'
import GatherLearnDirection from '@/pages/gather/components/gather-learnDirection.vue'
import GatherButton from '@/pages/gather/components/gather-button.vue'
import GatherProjectTypeFilter from '@/pages/gather/components/gather-projectTypeFilter.vue'
import { gatherProjectStore } from '@/store/UserProjectStore'
import GatherPeople from './components/gather-people.vue'
import GatherProjectModeFilter from './components/gather-projectModeFilter.vue'
// 实例化 gatherIndex pinia
const useGatherIndexStore = gatherIndexStore()
// 实例化 当前页面的 数据
const userStore = currentUserVitaStore()
// 导入 nav 栏 活动的值 ； 导入是否展示 筛选
const { navActiveIndex, showPeopleLibraryPopup, showProjectLibraryPopup } =
  storeToRefs(useGatherIndexStore)
// 导入选中的 人才库 id；人才库数据
const { currentUserVitaId, UserVita } = storeToRefs(userStore)
const userGatherProjectStore = gatherProjectStore()
// todo 后续接口接入，需要换接口的id请求数据
const { gatherProject } = storeToRefs(userGatherProjectStore)
// 跳转到 人才库 详情页
const toPeopleDetail = (id: number) => {
  currentUserVitaId.value = id
  uni.navigateTo({ url: '../../pagesSub/gatherSub/gatherSub-person' })
}
// 跳转到 项目库 详情页
const toProjectDetail = () => {
  uni.navigateTo({ url: '../../pagesSub/gatherSub/gatherSub-project' })
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
</style>
