<template>
  <u-navbar :title="publisherStore.cur_type + '管理'" />
  <view class="bg" pt-12rpx>
    <view flex items-center justify-between>
      <view flex justify-start h-72rpx w-584rpx pl-28rpx class="bar">
        <view h-72rpx>
          <u-icon mt-16rpx name="map" size="46rpx" color="#598DF9" />
        </view>
        <view h-72rpx>
          <div mt-16rpx ml-24rpx>{{ cur_area }}</div>
        </view>
      </view>
      <view
        h-72rpx
        w-158rpx
        flex
        items-center
        justify-end
        pr-20rpx
        class="bar"
        @tap="handleFilter"
      >
        <span>筛选</span>
        <span
          class="iconfont icon-shaixuan"
          :style="{ fontSize: '40rpx' }"
          color="#598DF9"
        ></span>
      </view>
    </view>
    <PublishManageCardItem
      v-for="item in list.value"
      :key="item.post_id"
      :description="item"
      cursor-pointer
      @tap="handleClick(item.post_id)" />
    <!-- TODO: 删除状态的帖子，经沟通确认已删除的帖子不显示，后续可以删掉这段代码 -->
    <!-- <PublishManageCardItem
      v-for="item in list.value.filter((item) => item.state === State.Delete)"
      :key="item.post_id"
      :description="item"
      cursor-pointer
      @tap="handleClick(item.post_id)" /> -->
    <div class="publish" flex-center @click="handleCreate">
      <div
        class="iconfont icon-fabuanniu1"
        :style="{ fontSize: '47rpx' }"
      ></div></div
  ></view>

  <u-popup v-model="show" mode="bottom" height="836rpx" border-radius="20">
    <div mx-32rpx relative>
      <div v-for="option in getFilter()" :key="option.name">
        <PublishRadioGroup
          :title="option.name"
          :options="option.options"
          :func="handleRadioChange"
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
          @tap="filt"
        ></PublishButton>
        <PublishButton
          w-324rpx
          height="72rpx"
          text-36rpx
          title="重置"
          color="#fff"
          bg-color="#FF6969"
          rounded="12rpx"
          @tap="resetFilter"
        ></PublishButton>
      </div>
    </div>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad, onReachBottom, onUnload } from '@dcloudio/uni-app'
import { usePublisherStore } from '@/store/modules/publisher'
import {
  HostType,
  HostTypeMap,
  type IDescription,
  Level,
  LevelMap,
  ScoreType,
  State,
  Type,
  TypeMap,
} from '@/typings/publisher'
import PublishManageCardItem from './components/publish-manage-card-item.vue'
import PublishButton from './components/publish-button.vue'
import PublishRadioGroup from './components/publish-radio-group.vue'
type PostType = keyof typeof Type
const publisherStore = usePublisherStore()
const post_type = publisherStore.cur_type as PostType
const list = reactive({
  value: publisherStore.descriptions[TypeMap[post_type]],
})
console.log('description', publisherStore.descriptions[TypeMap[post_type]])
console.log('list', list.value)
console.log('publish', publisherStore.publish[TypeMap[post_type]])

onLoad(() => {
  publisherStore.loadPage(post_type)
})

onUnload(() => {
  publisherStore.resetPage(post_type)
})

onReachBottom(() => {
  console.log('reach bottom')
  publisherStore.loadPage(post_type)
})

const cur_area = ref('广州大学分区')

const checked = ref(false)
const handleClick = (id: number) => {
  uni.navigateTo({ url: `./publisher-detail?id=${id}` })
}

const handleCreate = () => {
  const description: IDescription = {
    post_id: 0,
    title: '',
    start_time: new Date(),
    end_time: new Date(),
    state: State.Create,
    host: '',
    host_type: HostType.学校,
    location: '',
    race_level: Level.院校级,
    post_type: Type.比赛,
    score_type: ScoreType.科技学术,
    access: '',
    description: '',
  }
  publisherStore.current_desc = description
  uni.navigateTo({
    url: `./publisher-publish?id=${description.post_id}`,
  })
}
const show = ref(false)

const selections = {
  host_type: '',
  race_level: '',
  score_type: '',
}
const handleFilter = () => {
  show.value = true
}

function handleRadioChange(title: string, value: number) {
  if (title === '主办方类型') {
    selections.host_type = `${value}`
  }
  if (title === '比赛级别') {
    selections.race_level = `${value}`
  }
  if (title.slice(2, 4) === '类型') {
    selections.score_type = `${value}`
  }
}

function getFilter() {
  const allFilters = [
    {
      name: '主办方类型',
      fit: 'all',
      varname: 'host_type',
      map: HostTypeMap,
      options: [
        {
          name: '政府',
          value: HostType.政府,
        },
        {
          name: '组织机构',
          value: HostType.组织机构,
        },
        {
          name: '学校',
          value: HostType.学校,
        },
      ],
    },
    {
      name: '活动类型',
      fit: '活动',
      varname: 'score_type',
      map: TypeMap,
      options: [
        {
          name: '创新创业类',
          value: ScoreType.创新创业类,
        },
        {
          name: '公益类',
          value: ScoreType.公益类,
        },
        {
          name: '科技类',
          value: ScoreType.科技类,
        },
        {
          name: '文体类',
          value: ScoreType.文体类,
        },
        {
          name: '思政教育类',
          value: ScoreType.思政教育类,
        },
      ],
    },
    {
      name: '比赛类型',
      fit: '比赛',
      varname: 'score_type',
      map: TypeMap,
      options: [
        {
          name: '创新创业',
          value: ScoreType.创新创业,
        },
        {
          name: '科技学术',
          value: ScoreType.科技学术,
        },
        {
          name: '人文社科',
          value: ScoreType.人文社科,
        },
      ],
    },
    {
      name: '讲座类型',
      fit: '讲座',
      varname: 'score_type',
      map: TypeMap,
      options: [
        {
          name: '创新创业',
          value: ScoreType.创新创业,
        },
        {
          name: '艺术人文',
          value: ScoreType.人文社科,
        },
        {
          name: '科技学术',
          value: ScoreType.科技学术,
        },
      ],
    },
    {
      name: '比赛级别',
      fit: '比赛',
      varname: 'race_level',
      map: LevelMap,
      options: [
        {
          name: '院/校级',
          value: Level.院校级,
        },
        {
          name: '地方级',
          value: Level.地方级,
        },
        {
          name: '国家级',
          value: Level.国家级,
        },
      ],
    },
  ]

  return allFilters.filter(
    (item) => item.fit === 'all' || item.fit === post_type
  )
}

function filt() {
  list.value = publisherStore.descriptions[TypeMap[post_type]]
  for (const [key, value] of Object.entries(selections)) {
    if (value) {
      const map = getFilter().find((item) => item.varname === key)?.map
      if (map) {
        list.value = list.value.filter((item) => {
          return item[key as keyof typeof map] === Number.parseInt(value)
        })
      } else {
        console.log('类型映射map 未定义')
      }
    }
  }
  show.value = false
}

function resetFilter() {
  checked.value = false
  list.value = publisherStore.descriptions[TypeMap[post_type]]
  show.value = false
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

.test {
  position: fixed;
  background-color: #f5f5f5;
  bottom: 380rpx;
  right: 66rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 2rpx solid #e5e5e5;
  box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.25);
}

.bg {
  background-color: #f7f7f7;
}
.bar {
  background-color: white;
  color: #598df9;
  font-size: 36rpx;
  border-radius: 12rpx;
}
</style>
