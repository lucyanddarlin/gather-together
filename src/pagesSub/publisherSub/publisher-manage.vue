<template>
  <view class="bg" pt-12rpx>
    <view flex items-center justify-between>
      <view flex justify-start h-72rpx w-584rpx pl-28rpx class="bar">
        <view h-72rpx>
          <u-icon mt-16rpx name="map" size="46rpx" color="#598DF9" />
        </view>
        <view h-72rpx>
          <div mt-12rpx ml-24rpx>{{ cur_area }}</div>
        </view>
      </view>
      <view class="bar filter" @tap="handleFilter">
        <span mb-4rpx>筛选</span>
        <span
          class="iconfont icon-shaixuan"
          :style="{ fontSize: '44rpx' }"
          color="#598DF9"
        ></span>
      </view>
    </view>
    <PublishManageCardItem
      v-for="item in list.value"
      :key="item.post_id"
      :description="item"
      cursor-pointer
      @tap="handleClick(item.post_id)"
    />
    <Float :is-show-popup="false" :type="4" url="./publisher-publish?id=0">
    </Float>
    <!-- <GatherPublishButton fixed top-1000rpx right-40rpx @tap="handleCreate" /> -->
  </view>

  <u-popup v-model="show" mode="bottom" height="836rpx" border-radius="20">
    <div mx-32rpx relative>
      <div
        v-for="(option, index) in filterData.map"
        :key="index + option.title"
      >
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
import { reactive, ref } from 'vue'
import { onLoad, onReachBottom, onUnload } from '@dcloudio/uni-app'
import { deepClone } from '@/utils/common'
import { usePublisherStore } from '@/store/modules/publisher'
import {
  type BodyFilter,
  type FilterPopupData,
  type Type,
  TypeMap,
} from '@/typings/publisher'
import {
  EVENT_OPTION,
  LECTURE_OPTION,
  RACE_OPTION,
} from '@/utils/publishConstant'
import PublishManageCardItem from './components/publish-manage-card-item.vue'
import PublishButton from './components/publish-button.vue'
import PublishRadioGroup from './components/publish-radio-group.vue'
type PostType = keyof typeof Type

const publisherStore = usePublisherStore()
const post_type = publisherStore.cur_type as PostType
const list = reactive({
  value: publisherStore.descriptions[TypeMap[post_type]],
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
console.log('description', publisherStore.descriptions[TypeMap[post_type]])
console.log('list', list.value)
console.log('publish', publisherStore.publish[TypeMap[post_type]])

// 设置标题
uni.setNavigationBarTitle({
  title: `${publisherStore.cur_type}管理`,
})

onLoad(() => {
  publisherStore.loadPage(post_type, getBody())
})

onUnload(() => {
  publisherStore.resetPage(post_type)
})

onReachBottom(() => {
  console.log('reach bottom')
  publisherStore.loadPage(post_type, getBody())
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
      return ['sponsor_type', 'race_type', 'race_level']
    case '讲座':
      return ['sponsor_type', 'lecture_type']
    case '活动':
      return ['sponsor_type', 'event_type']
  }
}

function handleConfirmFilter() {
  publisherStore.resetPage(post_type)
  publisherStore.loadPage(post_type, getBody())
  show.value = false
}

function handleResetFilter() {
  list.value = publisherStore.descriptions[TypeMap[post_type]]
  filterData.map.forEach((group) => {
    group.list.forEach((item) => (item.isSelected = false))
  })
  // 以防万一后来维护没有调用getBody
  filterData.result = {}
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
.bar {
  background-color: white;
  color: #598df9;
  font-size: 36rpx;
  border-radius: 12rpx;
}

.filter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 72rpx;
  width: 158rpx;
  padding-right: 20rpx;
}
</style>
