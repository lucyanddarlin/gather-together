<template>
  <NavBar></NavBar>
  <view fixed z-9 w-full bg-white>
    <view class="area-1 relative">
      <TabSection
        :default-active="navActiveIndex"
        @tab-switch="handleNavBarSwitch"
      >
        <TabItem
          v-for="item in topNavList"
          :key="item.index"
          :index="item.index"
        >
          <text>{{ item.title }}</text>
        </TabItem>
      </TabSection>
    </view>
    <view class="area-2 relative">
      <TabSection
        :default-active="filterActiveIndex"
        @tab-switch="handleFilterSwitch"
      >
        <TabItem
          v-for="item in filterNavList"
          :key="item.index"
          :index="item.index"
        >
          <text>{{ item.title }}</text>
        </TabItem>
      </TabSection>
      <view class="text-#598DF9 font-400 flex items-center"
        ><view mr-8rpx>筛选</view><span class="iconfont icon-shaixuan"></span>
      </view>
    </view>
  </view>
  <view class="bg-#f7f7f7 w-full min-h-1400rpx pt-196rpx">
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
          ><i class="iconfont icon-gengduo" @click="test"></i
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
        :tags="item.class"
        :school="item.school"
        :profession="item.profession"
        :content="item.profile"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  PROJECT_LIBRARY,
  PEOPLE_LIBRARY,
  SOURCE_LIBRARY,
} from '@/store/gatherPage'

import GatherPeople from './components/gather-people.vue'
const test = () => {
  console.log(1)
}
// 顶部栏 列表
const topNavList = [
  { title: '项目库', index: 0 },
  { title: '人才库', index: 1 },
  { title: '资源库', index: 2 },
]
// 筛选列表
const filterNavList = [
  { title: '本校', index: 0 },
  { title: '综合', index: 1 },
]
// 项目库
const gatherProject = reactive([
  {
    // 学院 id
    college_id: 1,
    // 学院名称
    college_name: '广州大学',
    // 创建项目时间
    create_time: '2022-10-11',
    //  创建者 id
    creator_id: 1111321312,
    // 团队介绍
    introduce:
      '依托于核心管弦乐课程搭建音乐教育产业链，建立音乐学习数据库，涵盖音乐后蒙、水平认证、研学、升学咨询等',
    // 团队人数
    member_num: 12321321312,
    // 团队成员信息
    members: [],
    // 招募需求
    needs: 'dasdas',
    // 项目唯一 id
    project_id: 321312321,
    // 项目名称
    project_name: '好旋律音乐教育大数据平台',
    // 比赛唯一 id
    race_id: 231312,
    // 姓名
    race_name: 'ldasdajsl',
    // tag 标签 todo(后期更换新接口的时候要替换，这里仅是测试用)
    tagList: ['互联网+', '创新创业', '广州大学'],
    // 招募状态
    state: 1,
  },
  {
    // 学院 id
    college_id: 1,
    // 学院名称
    college_name: '广州大学',
    // 创建项目时间
    create_time: '2022-10-11',
    //  创建者 id
    creator_id: 1111321312,
    // 团队介绍
    introduce:
      '依托于核心管弦乐课程搭建音乐教育产业链，建立音乐学习数据库，涵盖音乐后蒙、水平认证、研学、升学咨询等',
    // 团队人数
    member_num: 12321321312,
    // 团队成员信息
    members: [],
    // 招募需求
    needs: 'dasdas',
    // 项目唯一 id
    project_id: 321312321,
    // 项目名称
    project_name: '好旋律音乐教育大数据平台',
    // 比赛唯一 id
    race_id: 231312,
    // 姓名
    race_name: 'ldasdajsl',
    // tag 标签 todo(后期更换新接口的时候要替换，这里仅是测试用)
    tagList: ['互联网+', '创新创业', '广州大学'],
    // 招募状态
    state: 1,
  },
])
// 人才库 简历
const UserVita = reactive([
  {
    //todo 类别，tag，后续需要针对后端进行更改
    class: ['软件/硬件', '理工类'],
    certs: [
      { cert_id: 123, cert_name: '了赛打', date: '2022-10', user_id: 123321 },
    ],
    college: 'dasdas',
    college_id: 3213123,
    contact: '193291321',
    good_at: '能迅速准确的完成领导布置的工作，工作认真负责，经验丰富',
    grade: 1,
    head_url: 'dsaljdla',
    name: '用户名称',
    profession: '软件工程专业',
    profile: '能迅速准确的完成领导布置的工作，工作认真负责，经验丰富',
    races: [
      {
        award: 'dsadas',
        description: 'dsadas',
        race_id: 123321,
        race_name: 'cjlkasd',
        user_id: 123321,
      },
    ],
    school: '广州大学',
    sex: 0,
    skills: [
      {
        description: 'ldjaskdajsk',
        skill_id: 12321,
        skill_name: 'ldiasjdals',
        user_id: 123321,
      },
    ],
    user_id: 123321,
  },
])
const navActiveIndex = ref<number>(0)
const filterActiveIndex = ref<number>(0)
const handleNavBarSwitch = (index: number) => {
  navActiveIndex.value = index
}
const handleFilterSwitch = (index: number) => {
  filterActiveIndex.value = index
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
</style>
