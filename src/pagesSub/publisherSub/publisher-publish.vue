<template>
  <view v-if="publish" relative class="bg">
    <view v-for="[key, value] in publish.entries" :key="hash(key)" pl-38rpx>
      <view v-if="value instanceof Object && value.type">
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
          <view v-if="key === 'host'" float-right mr-46rpx>
            <view
              relative
              flex
              justify-center
              items-center
              class="text-option"
              w-210rpx
              h-54rpx
              fw-500
              :style="{
                backgroundColor: '#598DF9',
                color: '#fff',
                fontSize: '28rpx',
                borderRadius: '9rpx',
              }"
              @tap="options['host_type'].isShow = true"
            >
              <view pr-10rpx> {{ options['host_type'].value }} </view>
              <view absolute right-10rpx class="iconfont icon-qianwang" />
            </view>
            <u-picker
              v-model="options['host_type'].isShow"
              mode="selector"
              :range="options['host_type'].range"
              @confirm="setOptions($event, 'host_type')"
              @cancel="options['host_type'].isShow = false"
              @close="options['host_type'].isShow = false"
            ></u-picker>
          </view>
        </view>

        <view v-if="value.type === 'text'" mt-36rpx>
          <input
            :value="(value.value as string)"
            type="text"
            :placeholder="value.placeholder"
            placeholder-style="font-weight: 500;font-size: 32rpx;color: #bdbdbd"
            class="input-text"
            :maxlength="value.limit"
            @input="change($event, key, value)"
          />
        </view>

        <view v-if="value.type === 'text_elastic'" relative>
          <textarea
            :value="(value.value as string)"
            :placeholder="value.placeholder"
            placeholder-style="font-weight: 400;font-size: 32rpx;color: #bdbdbd"
            class="input-elastic"
            auto-height
            :maxlength="value.limit"
            @input="change($event, key, value)"
          ></textarea>
        </view>

        <view v-if="value.type === 'text_no_enter'" relative>
          <textarea
            :value="(value.value as string)"
            :placeholder="value.placeholder"
            placeholder-style="font-weight: 400;font-size: 32rpx;color: #bdbdbd"
            auto-height
            rows="1"
            class="input-elastic"
            :maxlength="value.limit"
            @input="change($event, key, value)"
          ></textarea>
        </view>

        <view v-if="value.type === 'textarea'" relative>
          <textarea
            :value="(value.value as string)"
            :placeholder="value.placeholder"
            placeholder-style="font-weight: 400;font-size: 32rpx;color: #bdbdbd"
            class="input-textarea"
            :maxlength="value.limit"
            @input="change($event, key, value)"
          ></textarea>
          <PublishTextCounter
            absolute
            right-54rpx
            bottom-12rpx
            :cur="(value.value as string).length"
            :max="2000"
          />
        </view>
        <!-- 时间选择器 -->
        <view v-if="value.type === 'time'">
          <u-picker
            v-model="picker[key as keyof Picker].isShow"
            :params="params"
            @confirm="setDate($event, key)"
            @cancel="picker[key as keyof Picker].isShow = false"
            @close="picker[key as keyof Picker].isShow = false"
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
            @cancel="options[key as keyof Options].isShow = false"
            @close="options[key as keyof Options].isShow = false"
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
            :file-list="getList(value.value as string[] || [])"
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
          :bg-color="publish.getWhatToFill(post_type) ? '#DFDFDF' : '#578DF7'"
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
import { computed, onBeforeMount, ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { addMonths, format } from 'date-fns'
import { usePublisherStore } from '@/store/modules/publisher'
import {
  type IDescription,
  type IField,
  Level,
  Publish,
  State,
  type Type,
} from '@/typings/publisher'
import { HOST, LEVEL, TYPE_LIST, TYPE_NAMES } from '@/utils/publishConstant'
import { hash, showMsg } from '@/utils/common'
import PublishButton from './components/publish-button.vue'
import PublishItem from './components/publish-item.vue'
import PublishTextCounter from './components/publish-text-counter.vue'

const id = ref('')
const publisherStore = usePublisherStore()

const type: Type = publisherStore.cur_type
const post_type: string = TYPE_LIST[type]
const description = ref<IDescription | undefined>()
const publish = ref<Publish>()
// 判断是发布还是修改，以此确定标题
const isPublish = ref<boolean>(false)
const params = {
  year: true,
  month: true,
  day: true,
  hour: true,
  minute: true,
  second: false,
}

if (!publish.value) {
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
}

// 显示加载
watch(
  () => publish.value,
  (newVal: Publish | undefined) => {
    if (newVal) {
      uni.hideLoading()
    }
  }
)

onLoad((options) => {
  if (!options) {
    console.log('options 为空，请检查url参数')
    return
  }
  console.log('options', options)

  id.value = options.id
  description.value = publisherStore.descriptions[type]?.find(
    (item) => `${item.post_id}` === id.value
  )
  // 若未曾在列表中，则是新帖
  // 更准确的方法可能是请求一下后端，再确定是否存在，但是需要发送网络请求
  if (!description.value) isPublish.value = true
  publish.value = Publish.DescToPub(description.value, post_type)
  // 设置标题
  uni.setNavigationBarTitle({
    title: (isPublish.value ? '发布' : '编辑') + post_type,
  })
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
      if (!publish.value?.end_time) return `请选择${post_type}结束时间`

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
      return HOST[publish.value.host_type.value as number]
    }),
    range: HOST,
  },
  score_type: {
    isShow: false,
    value: computed(() => {
      if (publish.value?.score_type.value === undefined)
        return `请选择${post_type}类型`
      return TYPE_NAMES[type][publish.value.score_type.value as number]
    }),
    range: TYPE_NAMES[type],
  },
  race_level: {
    isShow: false,
    value: computed(() => {
      const race_level = publish.value?.race_level
      if (!race_level || (race_level && race_level.value === undefined))
        return `请选择${post_type}级别`
      return Level[race_level.value as Level]
    }),
    range: LEVEL,
  },
}
type Options = typeof optionsObj
const options = ref(optionsObj)

function change(event: any, key: string, field: IField, removeEnter = false) {
  if (removeEnter) {
    event.target.value = event.target.value.replace(/\n/g, '')
  }
  if (field.limit && event.target.value.length === field.limit) {
    showMsg(`最多输入${field.limit}个字符`)
  }
  publish.value &&
    ((publish.value[key as keyof Publish] as IField).value =
      event.target.value.trim())
}

function setDate(result: any, key: string) {
  const newDate: Date = addMonths(
    new Date(result.year, result.month, result.day, result.hour, result.minute),
    -1
  )
  if (key === 'start_time') {
    const end_time: Date = publish.value?.end_time.value as Date
    if (end_time && end_time < newDate) {
      showMsg('晚于结束时间', 'error', 2000)
      return
    }
  } else if (key === 'end_time') {
    const start_time: Date = publish.value?.start_time.value as Date
    if (start_time && start_time > newDate) {
      showMsg('早于开始时间', 'error', 2000)
      return
    }
  }
  publish.value &&
    ((publish.value[key as keyof Publish] as IField).value = newDate)
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
  if (!publish.value) return
  const not_filled: string | undefined =
    publish.value && publish.value.getWhatToFill(post_type)
  // 有未填写的字段（即返回值不为''）
  if (not_filled) {
    uni.showToast({
      title: `请填写${not_filled}`,
      icon: 'none',
    })
    return
  }
  publisherStore.update(publish.value)
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
  padding-bottom: 48rpx;
}

.input-elastic {
  width: 626rpx;
  height: auto;
  border-radius: 12rpx;
  margin-top: 30rpx;
  font-size: 32rpx;
  font-weight: 500;
  background-color: white;
  line-height: 28rpx;
  padding: 24rpx;
}
</style>
