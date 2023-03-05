<template>
  <view class="bg" pt-12rpx>
    <PublisherFilter
      :cur_area="cur_area"
      @show-filter="handleFilter"
    ></PublisherFilter>
    <scroll-view
      class="main-page"
      :scroll-y="true"
      :refresher-enabled="true"
      :refresher-triggered="isTriggered"
      :scroll-with-animation="true"
      :scroll-top="scrollTop"
      @scroll="handleScroll"
      @scrolltolower="handleScrollToLower"
      @refresherrefresh="handleRefresh"
      @refresherabort="handleRefresherAbort"
    >
      <view>
        <PublishManageCardItem
          v-for="item in list.value"
          :key="item.post_id"
          :description="item"
          cursor-pointer
          @tap="handleClick(item.post_id)"
      /></view>
    </scroll-view>
    <Float
      :is-show-popup="isShowPopup"
      :type="4"
      :scroll-value="oldScrollTop"
      url="./publisher-publish?id=0"
      @back-to-top="handleBackToTop"
    >
    </Float>
    <!-- <GatherPublishButton fixed top-1000rpx right-40rpx @tap="handleCreate" /> -->
  </view>

  <u-popup v-model="show" mode="bottom" height="836rpx" border-radius="20">
    <div mx-32rpx relative>
      <div v-for="option in filterData.map" :key="hash(option.title)">
        <PublishRadioGroup
          :title="option.title"
          :options="option.list"
        ></PublishRadioGroup>
      </div>
    </div>
    <!-- 占位 -->
    <div h-134rpx></div>
    <div fixed bottom-26rpx left-40rpx>
      <div grid grid-cols-2 gap-x-22rpx>
        <PublishButton
          w-324rpx
          height="72rpx"
          text-36rpx
          title="确认筛选"
          color="#fff"
          bg-color="#73B297"
          rounded="12rpx"
          @tap="handleConfirmFilter"
        ></PublishButton>
        <PublishButton
          w-324rpx
          height="72rpx"
          text-36rpx
          title="重置"
          color="#fff"
          bg-color="#FF6969"
          rounded="12rpx"
          @tap="handleResetFilter"
        ></PublishButton>
      </div>
    </div>
  </u-popup>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { deepClone, hash } from '@/utils/common'
import { usePublisherStore } from '@/store/modules/publisher'
import {
  EVENT_OPTION,
  LECTURE_OPTION,
  RACE_OPTION,
  TYPE_LIST,
} from '@/utils/publishConstant'
import PublishManageCardItem from './components/publish-manage-card-item.vue'
import PublishButton from './components/publish-button.vue'
import PublishRadioGroup from './components/publish-radio-group.vue'
import PublisherFilter from './components/publisher-filter.vue'
import type { BodyFilter, FilterPopupData, Type } from '@/typings/publisher'

const isTriggered = ref<boolean>(false)
const isShowPopup = ref<boolean>(false)
const scrollTop = ref<number>(0)
const oldScrollTop = ref<number>(0)
const publisherStore = usePublisherStore()
const type: Type = publisherStore.cur_type
const post_type: string = TYPE_LIST[type]
const list = reactive({
  value: publisherStore.descriptions[type],
})
const filterData = reactive<FilterPopupData>({
  map: getFilter(post_type).map((group) => {
    return {
      title: group.name,
      list: deepClone(
        group.value.map((item) => {
          return { value: item }
        })
      ),
    }
  }),
  resultKey: getKeys(),
  result: {},
})
console.log('description', publisherStore.descriptions[publisherStore.cur_type])
console.log('list', list.value)
console.log('publish', publisherStore.publish[publisherStore.cur_type])

onLoad(() => {
  // 设置标题
  uni.setNavigationBarTitle({
    title: `${post_type}管理`,
  })
  publisherStore.loadPage(getBody())
})

onUnload(() => {
  publisherStore.resetPage(post_type)
})

const cur_area = ref('广州大学分区')

const handleClick = (id: number) => {
  uni.navigateTo({ url: `./publisher-detail?id=${id}` })
}

const show = ref(false)

const handleFilter = () => {
  show.value = true
}

// 遍历收集result的逻辑单独抽离
function getBody(): BodyFilter {
  // 清空
  filterData.result = {}
  // 收集
  filterData.map.forEach((group, group_index) => {
    // 单选逻辑，如果多选需定义数组
    const index: number = group.list.findIndex((item) => item.isSelected)
    if (index === -1) return
    const key: string = filterData.resultKey[group_index]
    filterData.result[key] = index
  })
  return filterData.result
}

function getFilter(post_type: string) {
  switch (post_type) {
    case '比赛':
      return RACE_OPTION
    case '讲座':
      return LECTURE_OPTION
    case '活动':
      return EVENT_OPTION
    default:
      return []
  }
}

// 获取后端需要的键值
function getKeys(): Array<string> {
  switch (post_type) {
    case '比赛':
      return ['sponsor_type', 'race_level', 'race_type']
    case '讲座':
      return ['sponsor_type', 'lecture_type']
    case '活动':
      return ['sponsor_type', 'event_type']
    default:
      return []
  }
}

function handleConfirmFilter() {
  publisherStore.resetPage(post_type)
  publisherStore.loadPage(getBody())
  show.value = false
}

function handleResetFilter() {
  list.value = publisherStore.descriptions[type]
  filterData.map.forEach((group) => {
    group.list.forEach((item) => (item.isSelected = false))
  })
  // 以防万一后来维护没有调用getBody
  filterData.result = {}
}

function handleScroll(options: any) {
  oldScrollTop.value = options.target.scrollTop as number
}

function handleScrollToLower() {
  console.log('handleScrollToLower')
  publisherStore.loadPage(getBody())
}

async function handleRefresh() {
  console.log('handleRefresh')
  isTriggered.value = true
  publisherStore.resetPage(post_type)
  await publisherStore.loadPage(getBody())
  isTriggered.value = false
}

function handleRefresherAbort() {
  isTriggered.value = false
}

function handleBackToTop() {
  console.log('handleBackToTop')
  scrollTop.value = oldScrollTop.value
  nextTick(() => {
    scrollTop.value = 0
  })
}
</script>

<style scoped lang="scss">
.radio {
  + .label {
    background-color: #f5f5f5;
    color: #a4a4a4;
    font-size: 28rpx;
    width: 188.5rpx;
    height: 74rpx;
  }
}

.publish {
  position: fixed;
  background-color: white;
  bottom: 428rpx;
  right: 66rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 2rpx solid #e5e5e5;
  box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.25);
}

.bg {
  background-color: #f7f7f7;
  min-height: 96rpx;
}

.main-page {
  position: absolute;
  top: 96rpx;
  bottom: 0;
}
</style>
