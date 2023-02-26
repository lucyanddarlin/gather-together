<template>
  <u-navbar :title="'编辑' + publisherStore.cur_type" />
  <view v-if="!publish">该{{ post_type }}不存在</view>
  <view v-else relative>
    <view
      v-for="[key, value] in Object.entries(publish)"
      :key="key + value.title"
      ml-32rpx
      mt-44rpx
    >
      <view
        v-if="
          value.type !== 'text_option' &&
          (key !== 'race_level' || post_type === '比赛')
        "
        fw-600
        text-28rpx
        text-dark
      >
        {{ value.title }}
      </view>
      <view
        v-else-if="key !== 'race_level'"
        relative
        flex-center
        class="text-option"
        left-500rpx
        bottom-200rpx
        w-210rpx
        h-54rpx
        fw-500
        :style="{
          backgroundColor: '#598DF9',
          color: '#fff',
          fontSize: '24rpx',
          borderRadius: '9rpx',
        }"
        @tap="options[key as keyof Options].isShow = true"
      >
        <view>
          {{ options[key as keyof Options].value }} >
          <u-picker
            v-model="options[key as keyof Options].isShow"
            mode="selector"
            :range="options[key as keyof Options].range"
            @confirm="setOptions($event, key)"
          ></u-picker>
        </view>
      </view>
      <view v-if="value.type === 'text'">
        <input
          :value="((publish[key as keyof Publish] as IField).value as string)"
          type="text"
          :placeholder="value.placeholder"
          w-698rpx
          h-86rpx
          mt-30rpx
          text-28rpx
          fw-500
          pl-26rpx
          :maxlength="value.limit"
          @input="change($event, key)"
        />
      </view>
      <view v-if="value.type === 'textarea'">
        <textarea
          :value="((publish[key as keyof Publish] as IField).value as string)"
          :placeholder="value.placeholder"
          w-698rpx
          rows="5"
          mt-30rpx
          text-28rpx
          fw-500
          px-26rpx
          :maxlength="value.limit"
          @input="change($event, key)"
        ></textarea>
        <!-- TODO: 字数显示 -->
      </view>
      <!-- 时间选择器 -->
      <view v-if="value.type === 'time'">
        <u-cell-group>
          <u-picker
            v-model="picker[key as keyof Picker].isShow"
            :params="params"
            @confirm="setDate($event, key)"
          ></u-picker>
          <u-cell-item
            fw-500
            :title="picker[key as keyof Picker].value"
            @click="picker[key as keyof Picker].isShow = true"
          ></u-cell-item>
        </u-cell-group>
      </view>
      <!-- 选项 -->
      <view
        v-if="
          value.type === 'option' &&
          (key != 'race_level' || post_type == '比赛')
        "
      >
        <u-cell-group>
          <u-picker
            v-model="options[key as keyof Options].isShow"
            mode="selector"
            :range="options[key as keyof Options].range"
            @confirm="setOptions($event, key)"
          ></u-picker>
          <u-cell-item
            fw-500
            :title="options[key as keyof Options].value"
            @click="options[key as keyof Options].isShow = true"
          ></u-cell-item>
        </u-cell-group>
      </view>
      <!-- 图片 -->
      <view v-if="value.type === 'img'">
        <u-upload
          :file-list="getList((publish[key as keyof Publish] as IField).value as string[]) || []"
          width="162rpx"
          height="162rpx"
          max-count="9"
          @on-choose-complete="chooseImage($event, key)"
        ></u-upload>
      </view>
    </view>
    <view ml-10rpx pb-30rpx>
      <view v-if="isPublish">
        <PublishButton
          title="发布"
          width="694rpx"
          height="96rpx"
          text-32rpx
          :bg-color="isAllFilled ? '#578DF7' : '#DFDFDF'"
          color="#fff"
          rounded="24rpx"
          @tap="save"
        ></PublishButton>
      </view>
      <view v-else>
        <view mt-60rpx>
          <PublishButton
            title="保存"
            width="694rpx"
            height="96rpx"
            text-32rpx
            bg-color="#578DF7"
            color="#fff"
            rounded="24rpx"
            @tap="save"
          ></PublishButton>
        </view>
        <view mt-24rpx>
          <PublishButton
            title="删除"
            width="694rpx"
            height="96rpx"
            text-32rpx
            bg-color="#FF6969"
            color="#fff"
            rounded="24rpx"
          ></PublishButton>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { addMonths, format } from 'date-fns'
import { usePublisherStore } from '@/store/modules/publisher'
import {
  HostType,
  HostTypeMap,
  type IDescription,
  type IField,
  Level,
  LevelMap,
  type Publish,
  type ScoreType,
  State,
  type Type,
  TypeMap,
  getEnum,
  getMap,
  getScoreConstant,
} from '@/typings/publisher'
import PublishButton from './components/publish-button.vue'

const id = ref('')
const publisherStore = usePublisherStore()

type PostType = keyof typeof Type
const post_type = publisherStore.cur_type as PostType
const description = ref<IDescription | undefined>()
const publish = ref<Publish>()
const params = {
  year: true,
  month: true,
  day: true,
  hour: true,
  minute: true,
  second: false,
}

onLoad((options) => {
  if (!options) {
    console.log('options 为空，请检查url参数')
    return
  }
  console.log('options', options)

  id.value = options.id
  description.value = publisherStore.descriptions[TypeMap[post_type]]?.find(
    (item) => `${item.post_id}` === id.value
  )
  publish.value = publisherStore.getPubFromDesc(description.value, post_type)
  console.log('publish.value', publish.value)
  console.log('description.value', description.value)
})
onBeforeMount(() => {
  if (!id.value || !post_type) {
    console.log('错误：缺少id或分类错误', id.value, post_type)
    // 处理方式是跳转到类型选择页面
    uni.redirectTo({ url: './publisher-type' })
  }
})

// 时间选择器的参数
const pickerObj = {
  start_time: {
    isShow: false,
    value: computed(() => {
      if (!publish.value?.start_time) return `请选择${post_type}开始时间`
      return format(publish.value.start_time.value as Date, 'yyyy-MM-dd HH:mm')
    }),
  },
  end_time: {
    isShow: false,
    value: computed(() => {
      if (!publish.value?.start_time) return `请选择${post_type}结束时间`

      return format(publish.value.end_time.value as Date, 'yyyy-MM-dd HH:mm')
    }),
  },
}
type Picker = typeof pickerObj
const picker = ref(pickerObj)

// 其他一般选项的参数
const optionsObj = {
  host_type: {
    isShow: false,
    value: computed(() => {
      if (!publish.value?.host_type) return `主办方类型`
      return HostType[publish.value.host_type.value as HostType]
    }),
    range: Object.values(HostTypeMap),
    enummer: HostTypeMap,
    map: HostType,
  },
  score_type: {
    isShow: false,
    value: computed(() => {
      if (!publish.value?.score_type) return `请选择${post_type}类型`
      return getEnum(post_type)[publish.value.score_type.value as ScoreType]
    }),
    range: Object.values(getScoreConstant(post_type)),
    enummer: getEnum(post_type),
    map: getMap(post_type),
  },
  race_level: {
    isShow: false,
    value: computed(() => {
      if (!publish.value?.race_level) return `请选择${post_type}级别`
      return Level[publish.value.race_level.value as Level]
    }),
    range: Object.values(LevelMap),
    enummer: Level,
    map: LevelMap,
  },
}
type Options = typeof optionsObj
const options = ref(optionsObj)

// 判断是否是新的发布
const isPublish = computed(() => {
  return (
    description.value &&
    description.value.state === State.Create &&
    description.value.post_id === 0
  )
})

const isAllFilled = computed(() => {
  return publish.value?.isAllFilled() || false
})

function change(event: any, key: string) {
  publish.value &&
    ((publish.value[key as keyof Publish] as IField).value =
      event.target.value.trim())
}

function setDate(result: any, key: string) {
  publish.value &&
    ((publish.value[key as keyof Publish] as IField).value = addMonths(
      new Date(
        result.year,
        result.month,
        result.day,
        result.hour,
        result.minute
      ),
      -1
    ))
  // picker.value[key as keyof Picker].value = dateForm
}
function setOptions(result: any, key: string) {
  publish.value &&
    ((publish.value[key as keyof Options] as IField).value = result[0])
  console.log('result', result)
  console.log('key', key)
  publish.value &&
    console.log(
      'publish.value',
      (publish.value[key as keyof Options] as IField).value
    )
}

function chooseImage(lists: Object, key: string) {
  const urlList = new Array<string>()
  for (const item of Object.values(lists)) {
    urlList.push(item.url)
  }
  publish.value &&
    ((publish.value[key as keyof Options] as IField).value = urlList)
}

function save() {
  if (!isAllFilled.value) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none',
    })
    return
  }
  publisherStore.update(publish.value as Publish, post_type)
}

function getList(urls: Array<string> | undefined) {
  if (!urls) return undefined
  const list = new Array<Object>()
  for (const url of urls) {
    list.push({ url })
  }
  return list
}
</script>

<style scoped></style>
