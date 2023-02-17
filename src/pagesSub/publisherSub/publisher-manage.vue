<template>
  <u-navbar :title="publisherStore.cur_type + '管理'" />
  <PublishFilter mt-12rpx @tap="handleFilter" />
  <PublishManageCardItem
    v-for="item in list"
    :key="item.post_id"
    :description="item"
    cursor-pointer
    @tap="handleClick(item.post_id)"
  />
  <div class="publish" center @click="handleCreate()">
    <u-icon name="plus" size="40rpx"></u-icon>
  </div>

  <u-popup v-model="show" mode="bottom" height="836rpx" border-radius="20">
    <div mx-32rpx relative>
      <div v-for="option in getFilter()" :key="option.name">
        <div mt-38rpx text-32rpx :style="{ color: `#4F82F3` }">
          {{ option.name }}
          <span text-32rpx :style="{ color: `#A4A4A4` }"> 单选 </span>
        </div>
        <div grid grid-cols-3 mt-24rpx>
          <radio-group @change="handleRadioChange($event, option.name)">
            <div
              v-for="item in option.options"
              ref="radios"
              :key="option.name + item.name"
            >
              <radio
                :id="item.name"
                :value="Number(item.value) + ''"
                :checked="checked"
                class="radio"
              /><label class="label" :for="item.name">{{ item.name }}</label>
            </div>
          </radio-group>
        </div>
      </div>
    </div>
    <!-- 占位 -->
    <div h-134rpx></div>
    <div fixed bottom-26rpx left-40rpx>
      <div grid grid-cols-2 gap-x-22rpx>
        <PublishButton
          w-324rpx
          height="72rpx"
          text-32rpx
          title="确认筛选"
          color="#fff"
          bg-color="#73B297"
          rounded="12rpx"
          @tap="filt"
        ></PublishButton>
        <PublishButton
          w-324rpx
          height="72rpx"
          text-32rpx
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
import { ref } from 'vue'
import uPopup from '@/uni_modules/vk-uview-ui/components/u-popup/u-popup.vue'
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
// import router from '@/router'
import { uuid } from '@/utils/common'
import PublishFilter from './components/publish-filter.vue'
import PublishManageCardItem from './components/publish-manage-card-item.vue'
import PublishButton from './components/publish-button.vue'

type PostType = keyof typeof Type
const publisherStore = usePublisherStore()
const post_type = publisherStore.cur_type as PostType
const list = ref(publisherStore.descriptions[TypeMap[post_type]])
const checked = ref(false)
const handleClick = (id: string) => {
  uni.navigateTo({ url: `./publisher-detail?id=${id}` })
}

const handleCreate = () => {
  const description: IDescription = {
    post_id: uuid(),
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
  publisherStore.descriptions[TypeMap[post_type]].push(description)
  uni.navigateTo({
    url: `./publisher-publish?id=${description.post_id}`,
  })
}
const show = ref(false)

const selections = {
  host_type: undefined,
  race_level: undefined,
  score_type: undefined,
}
const handleFilter = () => {
  show.value = true
}

function handleRadioChange(e: any, name: string) {
  if (name === '主办方类型') {
    selections.host_type = e.detail.value
  }
  if (name === '比赛级别') {
    selections.race_level = e.detail.value
  }
  if (name.slice(2, 4) === '类型') {
    selections.score_type = e.detail.value
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
          return item[key as keyof typeof map] === value * 1
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
    font-size: 24rpx;
    width: 188.5rpx;
    height: 74rpx;
  }
}

.publish {
  position: fixed;
  background-color: #f5f5f5;
  bottom: 428rpx;
  right: 66rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 2rpx solid #e5e5e5;
  box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.25);
}
</style>
