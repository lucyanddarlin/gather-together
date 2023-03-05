<template>
  <view class="profile">
    <ProfileHeader />
    <ProfileCard />
    <scroll-view
      class="main-page"
      :scroll-y="true"
      :style="{ height: `calc(100% - ${headerHeight + cardHeight - 30}px)` }"
      :scroll-with-animation="true"
      :refresher-enabled="true"
      :refresher-triggered="isTriggered"
      @scrolltolower="handleScrollToLower"
      @refresherrefresh="handleRefresh"
      @refresherabort="handleRefresherAbort"
    >
      <TabSection :default-active="activeIndex" @tab-switch="handleTabSwitch">
        <TabItem
          v-for="item in topSectionList"
          :key="item.index"
          :index="item.index"
        >
          <text>{{ item.title }}</text>
        </TabItem>
      </TabSection>
      <view v-show="activeIndex === OWN_TOPIC">
        <PaperItem
          v-for="item in profileData['topic'].dataList"
          :key="item.topic_id"
          :paper-item="item"
          :type="HOME"
        >
          <template #title>{{ item.title }}</template>
          <template #content>{{ item.content }}</template>
        </PaperItem>
      </view>
      <view v-show="activeIndex === OWN_PROJECT">
        <PaperItem
          v-for="item in profileData['project'].dataList"
          :key="item.project_id"
          :type="GATHER"
          :paper-item="item"
        >
          <template #title>{{ item.project_name }}</template>
          <template #label>
            <view flex flex-wrap>
              <view
                v-for="(key, index) in projectLabelList.labelKey"
                :key="key"
                class="label-item text-#FFAF50"
              >
                #{{
                  projectLabelList.map[index].list.find(
                    (i) => i.index === item[key]
                  )?.value || '未知字段'
                }}
              </view>
            </view>
          </template>
        </PaperItem>
      </view>
      <LoadMore :status="profileData[apiKeyMap[activeIndex][0]].status" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {
  DEFAULT_PAGE,
  DEFAULT_SIZE,
  GATHER,
  HOME,
  OWN_PROJECT,
  OWN_TOPIC,
  PROJECTMODE_LIST,
  PROJECTTYPE_LIST,
} from '@/utils/constant'
import { reqGetOwnProject, reqGetOwnTopic } from '@/api/user'
import { isNull } from '@/utils/common'
import ProfileHeader from './profile-header.vue'
import ProfileCard from './profile-card.vue'
import type { FilterPopupDataItem, ListMap, TopSection } from '@/typings/home'

const headerHeight = ref(uni.getStorageSync('PROFILE_HEADER_HEIGHT'))
const cardHeight = ref(uni.getStorageSync('PROFILE_CARD_HEIGHT'))
const activeIndex = ref<number>(OWN_TOPIC)
const isTriggered = ref<boolean>(false)
const topSectionList: TopSection[] = [
  { index: OWN_TOPIC, title: '帖子' },
  { index: OWN_PROJECT, title: '项目' },
]
type RequestReturnData<T> = {
  code: 200 | 500 | number
  data: T
}
const apiKeyMap: Array<
  [
    string,
    (page: number, size: number) => Promise<RequestReturnData<AnyObject>>
  ]
> = [
  ['topic', reqGetOwnTopic],
  ['project', reqGetOwnProject],
]
const profileData = reactive<{ [key: string]: ListMap }>({
  topic: {
    dataList: [],
    dataMap: {},
    page: DEFAULT_PAGE,
    size: DEFAULT_SIZE,
    status: 'more',
    key: 'topic_id',
  },
  project: {
    dataList: [],
    dataMap: {},
    page: DEFAULT_PAGE,
    size: DEFAULT_SIZE,
    status: 'more',
    key: 'project_id',
  },
})
interface ProjectLabelList {
  labelKey: Array<string>
  map: Array<FilterPopupDataItem>
}
const projectLabelList: ProjectLabelList = {
  map: [
    { title: '项目模式', list: PROJECTMODE_LIST },
    { title: '项目类型', list: PROJECTTYPE_LIST },
  ],
  labelKey: ['project_mode', 'project_type'],
}

onLoad(() => {
  getDataList()
})
watch(
  activeIndex,
  () => {
    if (activeIndex.value === OWN_PROJECT && profileData['project'].page === 0)
      getDataList()
  },
  { deep: true }
)

const getDataList = async (isClear?: boolean) => {
  const type = apiKeyMap[activeIndex.value][0]
  const requestApi = apiKeyMap[activeIndex.value][1]
  if (isClear) {
    profileData[type].status = 'more'
    profileData[type].page = DEFAULT_PAGE
  }
  if (profileData[type].status === 'noMore') return
  if (profileData[type].status === 'loading' && profileData[type].page) return
  profileData[type].status = 'loading'
  const { data } = await requestApi(
    profileData[type].page++,
    profileData[type].size
  )
  if (isClear) {
    profileData[type].dataList = []
    profileData[type].dataMap = {}
  }
  if (!isNull(data)) {
    profileData[type].status =
      data.body.result.length < profileData[type].size ? 'noMore' : 'more'
    data.body.result.forEach((item: any) => {
      if (!profileData[type].dataMap[item[profileData[type].key]]) {
        profileData[type].dataMap[item[profileData[type].key]] = item
        profileData[type].dataList.push(item)
      }
    })
    return
  }
  profileData[type].page--
  profileData[type].status = 'more'
}
const handleTabSwitch = (value: number) => {
  activeIndex.value = value
}
const handleScrollToLower = async () => {
  await getDataList()
}
const handleRefresh = async () => {
  isTriggered.value = true
  await getDataList(true)
  isTriggered.value = false
}
const handleRefresherAbort = () => {
  isTriggered.value = false
}
</script>

<style lang="scss">
.profile {
  height: 100vh;
  background-color: #f6f7f9;
  .main-page {
    background-color: #f7f7f7;
    .tab-section {
      position: sticky;
      display: flex;
      padding: 24rpx 12rpx;
      top: 0;
      z-index: 99;
      background-color: #f7f7f7;
      .tab-item {
        margin: 0 60rpx;
        color: #c3c3c3;
        font-size: 28rpx;
        padding-bottom: 8rpx;
        font-weight: bold;
        &.active {
          color: #578df7;
          border-bottom: 4rpx solid #578df7;
        }
      }
    }
  }
}
</style>
