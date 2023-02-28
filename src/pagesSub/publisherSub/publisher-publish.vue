<template>
  <u-navbar :back-text="'编辑' + publisherStore.cur_type">
    <template #left>
      <div>GG</div>
    </template>
  </u-navbar>
  <view v-if="!publish">该{{ post_type }}不存在</view>
  <view v-else relative class="bg">
    <view
      v-for="[key, value] in Object.entries(publish)"
      :key="key + value.title"
      pl-38rpx
    >
      <view v-if="value.type">
        <view v-if="key === 'start_time'" pt-48rpx pb-32rpx class="title"
          >报名日期</view
        >
        <view
          v-if="
            value.type !== 'text_option' &&
            (key !== 'race_level' || post_type === '比赛') &&
            value.type !== 'time'
          "
          pt-48rpx
          class="title"
        >
          {{ value.title }}
        </view>
        <!-- 不渲染标题，且伴随文字的选项（主办方类型）-->
        <view
          v-else-if="
            key !== 'race_level' && key !== 'start_time' && key !== 'end_time'
          "
          absolute
          flex
          justify-center
          items-center
          class="text-option"
          w-210rpx
          h-54rpx
          right-46rpx
          top-790rpx
          fw-500
          :style="{
            backgroundColor: '#598DF9',
            color: '#fff',
            fontSize: '28rpx',
            borderRadius: '9rpx',
          }"
          @tap="options[key as keyof Options].isShow = true"
        >
          <view pr-10rpx> {{ options[key as keyof Options].value }} </view>
          <view absolute right-10rpx class="iconfont icon-qianwang" />
          <u-picker
            v-model="options[key as keyof Options].isShow"
            mode="selector"
            :range="options[key as keyof Options].range"
            @confirm="setOptions($event, key)"
          ></u-picker>
        </view>
        <view v-if="value.type === 'text'" mt-36rpx>
          <input
            :value="((publish[key as keyof Publish] as IField).value as string)"
            type="text"
            :placeholder="value.placeholder"
            placeholder-style="font-weight: 500;font-size: 32rpx;color: #bdbdbd"
            class="input-text"
            :maxlength="value.limit"
            @input="change($event, key)"
          />
        </view>
        <view v-if="value.type === 'textarea'" relative>
          <textarea
            :value="((publish[key as keyof Publish] as IField).value as string)"
            :placeholder="value.placeholder"
            placeholder-style="font-weight: 400;font-size: 32rpx;color: #bdbdbd"
            class="input-textarea"
            :maxlength="value.limit"
            @input="change($event, key)"
          ></textarea>
          <PublishTextCounter
            absolute
            right-54rpx
            bottom-12rpx
            :cur="((publish[key as keyof Publish] as IField).value as string).length"
            :max="2000"
          />
        </view>
        <!-- 时间选择器 -->
        <view v-if="value.type === 'time'">
          <u-picker
            v-model="picker[key as keyof Picker].isShow"
            :params="params"
            @confirm="setDate($event, key)"
          ></u-picker>
          <view>
            <PublishItem
              font-weight="500"
              width="674rpx"
              height="112rpx"
              font-size="32rpx"
              color="#4C89FF"
              bg-color="#ffffff"
              border-radius="12rpx"
              class="picker-date"
              :title="picker[key as keyof Picker].value"
              @tap="picker[key as keyof Picker].isShow = true"
            ></PublishItem>
          </view>
        </view>
        <!-- 选项 -->
        <view
          v-if="
            value.type === 'option' &&
            (key != 'race_level' || post_type == '比赛')
          "
        >
          <u-picker
            v-model="options[key as keyof Options].isShow"
            mode="selector"
            :range="options[key as keyof Options].range"
            @confirm="setOptions($event, key)"
          ></u-picker>
          <view mt-32rpx>
            <PublishItem
              font-weight="500"
              width="674rpx"
              height="88rpx"
              font-size="32rpx"
              :color="value.value !== undefined ? '#FEA651' : '#C8C9CC'"
              bg-color="#ffffff"
              border-radius="12rpx"
              :title="options[key as keyof Options].value"
              @tap="options[key as keyof Options].isShow = true"
            ></PublishItem>
          </view>
        </view>
        <!-- 图片 -->
        <view v-if="value.type === 'imgs'">
          <u-upload
            :file-list="getList((publish[key as keyof Publish] as IField).value as string[]) || []"
            width="162rpx"
            height="162rpx"
            max-count="9"
            upload-text=""
            @on-choose-complete="chooseImage($event, key)"
          >
          </u-upload>
        </view>
      </view>
    </view>
    <view ml-10rpx pb-30rpx>
      <view v-if="isPublish">
        <PublishButton
          title="发布"
          width="694rpx"
          height="96rpx"
          text-36rpx
          :bg-color="publish.isAllFilled() ? '#578DF7' : '#DFDFDF'"
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
            text-36rpx
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
            text-36rpx
            :bg-color="
              description && description.state !== State.Delete
                ? '#FF6969'
                : '#DFDFDF'
            "
            color="#fff"
            rounded="24rpx"
            @tap="
              description &&
                description.state !== State.Delete &&
                publisherStore.deletePost(description)
            "
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
  HostTypeList,
  HostTypeMap,
  type IDescription,
  type IField,
  Level,
  LevelMap,
  PubToDesc,
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
import PublishItem from './components/publish-item.vue'
import PublishTextCounter from './components/publish-text-counter.vue'

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
  if (description.value === undefined) {
    description.value = PubToDesc(publish.value, post_type)
  }
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
      if (publish.value?.host_type.value === undefined) return `主办方类型`
      const host_type: HostType = publish.value.host_type.value as HostType
      return HostTypeList[host_type]
    }),
    range: Object.values(HostTypeMap),
    enummer: HostTypeMap,
    map: HostType,
  },
  score_type: {
    isShow: false,
    value: computed(() => {
      if (publish.value?.score_type.value === undefined)
        return `请选择${post_type}类型`
      return getEnum(post_type)[publish.value.score_type.value as ScoreType]
    }),
    range: Object.values(getScoreConstant(post_type)),
    enummer: getEnum(post_type),
    map: getMap(post_type),
  },
  race_level: {
    isShow: false,
    value: computed(() => {
      const race_level = publish.value?.race_level
      if (!race_level || (race_level && race_level.value === undefined))
        return `请选择${post_type}级别`
      return Level[race_level.value as Level]
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

// const isAllFilled = computed(() => {
//   return publish.value?.isAllFilled() || false
// })

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
  if (publish.value && !publish.value.isAllFilled()) {
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

<style scoped>
.bg {
  background-color: #f7f8fa;
}

.title {
  font-weight: 600;
  font-size: 32rpx;
  color: #8c99a0;
}
.input-text {
  font-weight: 500;
  width: 674rpx;
  height: 86rpx;
  font-size: 32rpx;
  color: #000;
  background-color: #ffffff;
  padding-left: 26rpx;
  margin-top: 30rpx;
  border-radius: 12rpx;
}
.input-textarea {
  width: 626rpx;
  height: 170rpx;
  border-radius: 12rpx;
  margin-top: 30rpx;
  font-size: 32rpx;
  font-weight: 500;
  background-color: white;
  line-height: 28rpx;
  padding: 24rpx;
  padding-bottom: 44rpx;
}
</style>
