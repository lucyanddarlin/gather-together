<template>
  <view class="discovery-page">
    <NavBar />
    <scroll-view
      class="main-page"
      :scroll-y="true"
      :scroll-with-animation="true"
      :scroll-top="scrollTop"
      :refresher-enabled="true"
      :refresher-triggered="isTriggered"
      @scroll="handleScroll"
      @scrolltolower="handleScrollToLower"
      @refresherrefresh="handleRefresh"
      @refresherabort="handleRefresherAbort"
    >
      <view>
        <TabSection :default-active="activeIndex" @tab-switch="handleTabSwitch">
          <TabItem
            v-for="item in topSectionList"
            :key="item.index"
            :index="item.index"
          >
            <text>{{ item.title }}</text>
          </TabItem>
        </TabSection>
        <Empty v-if="!isLogin" type="login" text="登陆查看更多~" />
        <template v-else>
          <view v-show="activeIndex === HOME">
            <Home @more="handleShowMoreOptions" />
          </view>
          <view v-show="activeIndex === RACE">
            <ChangeFilter @filter="handleShowFilter" />
            <Empty
              v-if="isNull(homeOtherListMap['race'].dataList)"
              type="empty"
              text="暂无数据"
            />
            <view v-else>
              <PaperItem
                v-for="item in homeOtherListMap['race'].dataList"
                :key="item.post_id"
                :paper-item="item"
                :type="RACE"
                :dots="true"
              >
                <template #title>{{ item.title }}</template>
                <template #label>
                  <view class="label-item text-main">
                    {{
                      format(
                        Number(toDate(item.start_time)),
                        'yyyy-MM-dd HH:mm'
                      )
                    }}
                    至
                    {{
                      format(Number(toDate(item.end_time)), 'yyyy-MM-dd HH:mm')
                    }}
                  </view>
                  <view class="label-item text-main">{{ item.location }}</view>
                  <view flex flex-wrap>
                    <view
                      class="label-item"
                      :style="{ color: TIME_STATE[item.time_state].color }"
                      >{{ TIME_STATE[item.time_state].value }}</view
                    >
                    <view
                      v-for="(key, index) in filterPopupData['race'].resultKey"
                      :key="key"
                      class="label-item text-#FFAF50"
                    >
                      #{{
                        filterPopupData['race'].map[index].list.find(
                          (i) => i.index === item[key]
                        )?.value || '未知字段'
                      }}
                    </view>
                  </view>
                </template>
              </PaperItem>
            </view>
          </view>
          <view v-show="activeIndex === LECTURE">
            <ChangeFilter @filter="handleShowFilter" />
            <Empty
              v-if="isNull(homeOtherListMap['lecture'].dataList)"
              type="empty"
              text="暂无数据"
            />
            <view v-else>
              <PaperItem
                v-for="item in homeOtherListMap['lecture'].dataList"
                :key="item.post_id"
                :paper-item="item"
                :type="LECTURE"
              >
                <template #title>{{ item.title }}</template>
                <template #label>
                  <view class="label-item text-main">
                    {{
                      format(
                        Number(toDate(item.start_time)),
                        'yyyy-MM-dd HH:mm'
                      )
                    }}
                    至
                    {{
                      format(Number(toDate(item.end_time)), 'yyyy-MM-dd HH:mm')
                    }}
                  </view>
                  <view class="label-item text-main">{{ item.location }}</view>
                  <view flex flex-wrap>
                    <view
                      class="label-item"
                      :style="{ color: TIME_STATE[item.time_state].color }"
                      >{{ TIME_STATE[item.time_state].value }}</view
                    >
                    <view
                      v-for="(key, index) in filterPopupData['lecture']
                        .resultKey"
                      :key="key"
                      class="label-item text-#FFAF50"
                    >
                      #{{
                        filterPopupData['lecture'].map[index].list.find(
                          (i) => i.index === item[key]
                        )?.value || '未知字段'
                      }}
                    </view>
                  </view>
                </template>
              </PaperItem>
            </view>
          </view>
          <view v-show="activeIndex === ACTIVITY">
            <ChangeFilter @filter="handleShowFilter" />
            <Empty
              v-if="isNull(homeOtherListMap['activity'].dataList)"
              type="empty"
              text="暂无数据"
            />
            <view v-else>
              <PaperItem
                v-for="item in homeOtherListMap['activity'].dataList"
                :key="item.post_id"
                :paper-item="item"
                :type="ACTIVITY"
              >
                <template #title>{{ item.title }}</template>
                <template #label>
                  <view class="label-item text-main">
                    {{
                      format(
                        Number(toDate(item.start_time)),
                        'yyyy-MM-dd HH:mm'
                      )
                    }}
                    至
                    {{
                      format(Number(toDate(item.end_time)), 'yyyy-MM-dd HH:mm')
                    }}
                  </view>
                  <view class="label-item text-main">{{ item.location }}</view>
                  <view flex flex-wrap>
                    <view
                      class="label-item"
                      :style="{ color: TIME_STATE[item.time_state].color }"
                      >{{ TIME_STATE[item.time_state].value }}</view
                    >
                    <view
                      v-for="(key, index) in filterPopupData['activity']
                        .resultKey"
                      :key="key"
                      class="label-item text-#FFAF50"
                    >
                      #{{
                        filterPopupData['activity'].map[index].list.find(
                          (i) => i.index === item[key]
                        )?.value || '未知字段'
                      }}
                    </view>
                  </view>
                </template>
              </PaperItem>
            </view>
          </view>
        </template>
      </view>
    </scroll-view>
    <Float
      :type="activeIndex"
      home
      :scroll-value="oldScrollTop"
      :is-show-popup="isShowPopup"
      @back-to-top="handleBackToTop"
    />
    <Popup ref="popup" :select-item="selectItem" @popup="handlePopup" />
    <u-popup
      v-model="isShowFilter"
      mode="bottom"
      height="70%"
      border-radius="30"
    >
      <view v-if="activeIndex !== HOME" px-32rpx py-52rpx>
        <view
          v-for="item in filterPopupData[currentListKey].map"
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
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import {
  onLoad,
  onShareAppMessage,
  onShareTimeline,
  onUnload,
} from '@dcloudio/uni-app'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import {
  ACTIVITY,
  ACTIVITY_TYPE_LIST,
  DEFAULT_PAGE,
  HOME,
  INDEX_LIST,
  INDEX_LIST_KEY,
  LECTURE,
  LECTURE_TYPE_LIST,
  RACE,
  RACE_LEVEL_LIST,
  RACE_TYPE_LIST,
  SPONSOR_LIST,
} from '@/utils/constant'
import { useHomeStore } from '@/store/modules/home'
import { deepClone, isNull, toDate } from '@/utils/common'
import { useUserStore } from '@/store/modules/user'
import { TIME_STATE } from '@/utils/publishConstant'
import ChangeFilter from './change-filter.vue'
import Home from './home.vue'
import type {
  FilterPopupDataItem,
  IPaperItem,
  LabelItem,
  TopSection,
} from '@/typings/home'

interface FilterPopupData {
  [key: string]: {
    resultKey: Array<string>
    result: any
    post_type: number
    map: Array<FilterPopupDataItem>
  }
}
type ISelectItem = Partial<IPaperItem>
let selectItem = reactive<ISelectItem>({})
const popup = ref<any>()
const topSectionList: TopSection[] = [
  { index: HOME, title: '首页' },
  { index: RACE, title: '比赛' },
  { index: LECTURE, title: '讲座' },
  { index: ACTIVITY, title: '活动' },
]
const activeIndex = ref<number>(HOME)
const { getHomePaperList, getHomeOtherList } = useHomeStore()
const { homeOtherListMap } = storeToRefs(useHomeStore())
const { isLogin } = storeToRefs(useUserStore())
const scrollTop = ref<number>(0)
const oldScrollTop = ref<number>(0)
const isTriggered = ref<boolean>(false)
const isShowPopup = ref<boolean>(false)
const isShowFilter = ref<boolean>(false)
const filterPopupData = reactive<FilterPopupData>({
  race: {
    map: [
      { title: '主办方', list: deepClone(SPONSOR_LIST) },
      { title: '比赛类型', list: deepClone(RACE_TYPE_LIST) },
      { title: '比赛级别', list: deepClone(RACE_LEVEL_LIST) },
    ],
    resultKey: ['sponsor_type', 'race_type', 'race_level'],
    result: {},
    post_type: INDEX_LIST.RACE,
  },
  lecture: {
    map: [
      { title: '讲座类型', list: deepClone(LECTURE_TYPE_LIST) },
      { title: '主办方类型', list: deepClone(SPONSOR_LIST) },
    ],
    resultKey: ['lecture_type', 'sponsor_type'],
    result: {},
    post_type: INDEX_LIST.LECTURE,
  },
  activity: {
    map: [
      { title: '主办方', list: deepClone(SPONSOR_LIST) },
      { title: '活动类型', list: deepClone(ACTIVITY_TYPE_LIST) },
    ],
    resultKey: ['sponsor_type', 'event_type'],
    result: {},
    post_type: INDEX_LIST.ACTIVITY,
  },
})
const currentListKey = computed<string>(() => INDEX_LIST_KEY[activeIndex.value])

onLoad(() => {
  if (isLogin.value) {
    getHomePaperList()
  }
  uni.$on('updateHomeTopic', handleRefresh)
})
onShareTimeline(() => {
  return {
    title: '荟聚通',
    path: '/pages/index/index',
  }
})
onShareAppMessage(() => {
  return {
    title: '荟聚通',
    path: '/pages/index/index',
  }
})
onUnload(() => {
  uni.$off('updateHomeTopic')
})
watch(
  activeIndex,
  (value) => {
    if (!isLogin.value) return
    if (
      value &&
      homeOtherListMap.value[currentListKey.value].page === DEFAULT_PAGE
    )
      getHomeOtherList(
        activeIndex.value,
        filterPopupData[currentListKey.value].result
      )
  },
  { deep: true, immediate: true }
)
watch(
  isLogin,
  () => {
    if (isLogin.value) {
      activeIndex.value = HOME
      handleRefresh()
    }
  },
  { deep: true }
)
const handleTabSwitch = (index: number) => {
  activeIndex.value = index
}
const handleRefresh = async () => {
  isTriggered.value = true
  if (activeIndex.value === HOME) {
    await getHomePaperList(true)
  } else {
    await getHomeOtherList(
      activeIndex.value,
      filterPopupData[currentListKey.value].result,
      true
    )
  }
  isTriggered.value = false
}
const handleRefresherAbort = () => {
  isTriggered.value = false
}
const handleScrollToLower = async () => {
  if (activeIndex.value === HOME) {
    await getHomePaperList()
  } else {
    await getHomeOtherList(
      activeIndex.value,
      filterPopupData[currentListKey.value].result
    )
  }
}

const handleScroll = (options: any) => {
  oldScrollTop.value = options.target.scrollTop as number
}
const handleBackToTop = () => {
  scrollTop.value = oldScrollTop.value
  nextTick(() => {
    scrollTop.value = 0
  })
}
const handleShowMoreOptions = (value: ISelectItem) => {
  selectItem = value
  popup.value.show()
}
const handlePopup = (value: boolean) => {
  isShowPopup.value = value
}
const handleShowFilter = (value: boolean) => {
  isShowFilter.value = value
}
const handleClickLabel = (label: LabelItem, list: LabelItem[]) => {
  if (label.isSelected) {
    label.isSelected = false
    return
  }
  list.forEach((item) => (item.isSelected = false))
  label.isSelected = true
}
const handleConfirmFilter = async () => {
  filterPopupData[currentListKey.value].result = {}
  for (let i = 0; i < filterPopupData[currentListKey.value].map.length; i++) {
    for (
      let j = 0;
      j < filterPopupData[currentListKey.value].map[i].list.length;
      j++
    ) {
      if (filterPopupData[currentListKey.value].map[i].list[j].isSelected) {
        filterPopupData[currentListKey.value].result[
          filterPopupData[currentListKey.value].resultKey[i]
        ] = filterPopupData[currentListKey.value].map[i].list[j].index
        break
      }
    }
  }
  await getHomeOtherList(
    activeIndex.value,
    filterPopupData[currentListKey.value].result,
    true
  )
  isShowFilter.value = false
}
const handleResetFilter = async () => {
  filterPopupData[currentListKey.value].result = {}
  filterPopupData[currentListKey.value].map.forEach((item) => {
    item.list.forEach((i) => {
      i.isSelected = false
    })
  })
  await getHomeOtherList(
    activeIndex.value,
    filterPopupData[currentListKey.value].result,
    true
  )
  isShowFilter.value = false
}
</script>

<style lang="scss">
.discovery-page {
  height: 100vh;
  .main-page {
    height: calc(100% - 200rpx);
    background-color: #f7f7f7;
    .tab-section {
      position: sticky;
      display: flex;
      padding: 24rpx 12rpx;
      top: 0rpx;
      z-index: 9;
      justify-content: space-around;
      background-color: #fff;
      .tab-item {
        color: #c3c3c3;
        font-size: 32rpx;
        font-weight: bold;
        padding-bottom: 8rpx;
        &.active {
          color: #000000;
          border-bottom: 4rpx solid #361d1e;
        }
      }
    }
  }
  .home_section {
    padding-top: 28rpx;
    .tab-section {
      z-index: 1 !important;
      .tab-item {
        padding-left: 18rpx;
        color: #c3c3c3;
        font-size: 26rpx;
        font-weight: 500 !important;
        &.active {
          color: #2d2d2d;
          border-bottom: 0rpx;
        }
        &.first {
          padding: 0 18rpx 0 0;
          border-right: 3rpx solid #eeeeee;
        }
      }
    }
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
}
</style>
