<template>
  <view>
    <view v-if="description" relative>
      <u-icon absolute right-24rpx size="40rpx" name="more-dot-fill"></u-icon>
      <view mt-4rpx ml-36rpx mr-60rpx text-56rpx fw-600 select-text>
        {{ description.title }}
      </view>
      <view>
        <!-- 分割线上部 -->
        <view ml-36rpx>
          <!-- 活动类型 -->
          <PublishTag
            filter
            inline
            :title="TYPE_NAMES[description.post_type][description.score_type]"
            color="#FFAF50"
          ></PublishTag>
          <!-- 主办方类型 -->
          <PublishTag
            filter
            inline
            :title="HOST[description.host_type]"
            color="#FFAF50"
          ></PublishTag>
          <!-- 比赛级别（比赛特有） -->
          <PublishTag
            v-if="description.post_type === Type.比赛"
            filter
            inline
            :title="
              description.race_level !== undefined
                ? LEVEL[description.race_level]
                : '未分级'
            "
            color="#FFAF50"
          ></PublishTag>
          <!-- 进行状态 -->
          <PublishTag
            :title="TIME_STATE[description.time_state!].value"
            :color="TIME_STATE[description.time_state!].color"
            font-size="32rpx"
          ></PublishTag>
          <!-- 时间 -->
          <view class="title" text-36rpx mt-32rpx>报名时间：</view>
          <PublishTag
            :date="{ start: description.start_time, end: description.end_time }"
            color="#598DF9"
          ></PublishTag>
          <!-- 地点 -->
          <view class="title" text-36rpx mt-32rpx>{{ post_type }}地点：</view>
          <PublishTag
            color="#598DF9"
            :title="description.location"
          ></PublishTag>
          <!-- 主办方 -->
          <view class="title" text-36rpx mt-32rpx>主办方：</view>
          <PublishTag color="#598DF9" :title="description.host"></PublishTag>
        </view>
        <!-- 分割线 -->
        <view class="line" mt-26rpx></view>
        <view ml-36rpx>
          <!-- 详情标题 -->
          <view mt-24rpx
            ><view text-36rpx fw-600>
              {{ post_type }}详情
              <view
                float-right
                mr-40rpx
                class="side-button collapse-button"
                @tap="isOmitted = !isOmitted"
              >
                <span>{{ isOmitted ? '查看全部' : '收起' }}</span>
              </view>
            </view>
          </view>
          <!-- TODO: 插入图片 -->
          <view grid grid-cols-3 gap-x-20rpx color="#A4A4A4" pl-36rpx mt-36rpx>
            <view v-for="img in description.imgs" :key="hash(img)">
              <img
                :src="img"
                rounded-10rpx
                w-162rpx
                h-162rpx
                @tap="previewImg(img)"
              />
            </view>
          </view>
          <!-- 详情描述 -->
          <view pl-4rpx pr-36rpx mt-36rpx>
            <view
              id="view_detail"
              whitespace-pre-wrap
              color="#A4A4A4"
              text-32rpx
              :class="{ detail: true, ellipsis: isOmitted }"
            >
              {{ description.detail }}
            </view>
          </view>
        </view>
        <!-- 分割线 -->
        <view class="line" mt-26rpx></view>
        <view ml-36rpx>
          <!-- 报名方式 -->
          <view relative>
            <view color="#4D4D4D" text-36rpx mt-52rpx fw-600>
              报名方式
              <view
                class="side-button copy-button"
                float-right
                mr-40rpx
                @tap="copyAccess"
              >
                <span>复制</span>
              </view>
            </view>
            <view color="#A4A4A4" text-32rpx pr-36rpx mt-36rpx select-text>
              {{ description.access }}
            </view>
          </view>
        </view>
        <!-- 分割线 -->
        <view class="line" mt-26rpx></view>
      </view>
      <!-- 占位，以便用户能够在fixed遮挡的情况划下去 -->
      <view h-160rpx></view>
    </view>
  </view>
  <view v-if="isManagerMode" fixed bottom-26rpx left-40rpx>
    <view grid grid-cols-2 gap-x-22rpx>
      <PublishButton
        w-324rpx
        height="78rpx"
        text-36rpx
        :title="`编辑${post_type}`"
        color="#fff"
        bg-color="#73B297"
        rounded="12rpx"
        @tap="handlePublish"
      ></PublishButton>
      <PublishButton
        w-324rpx
        height="78rpx"
        text-36rpx
        title="分享"
        color="#fff"
        bg-color="#FF6969"
        rounded="12rpx"
        icon="icon-fenxiang"
        share
      ></PublishButton>
    </view>
  </view>
  <!-- 非管理员 -->
  <view v-else fixed bottom-26rpx left-40rpx>
    <view grid grid-cols-2 gap-x-22rpx>
      <PublishButton
        w-324rpx
        height="78rpx"
        font-size="36rpx"
        :title="`收藏`"
        color="#fff"
        bg-color="#598DF9"
        rounded="12rpx"
        icon="icon-shoucang"
        @tap="handleFav()"
      ></PublishButton>
      <PublishButton
        w-324rpx
        height="78rpx"
        text-36rpx
        title="分享"
        color="#fff"
        bg-color="#FF6969"
        rounded="12rpx"
        icon="icon-fenxiang"
        share
      ></PublishButton>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { usePublisherStore } from '@/store/modules/publisher'
import { useUserStore } from '@/store/modules/user'
import { type IDescription, Type } from '@/typings/publisher'
import { hash, showMsg } from '@/utils/common'

import {
  HOST,
  LEVEL,
  TIME_STATE,
  TYPE_LIST,
  TYPE_NAMES,
} from '@/utils/publishConstant'
import { reqGetDetail } from '@/api/publisher'
import { GetPublishToDesc } from '@/typings/publisher/resolve'
import PublishButton from './components/publish-button.vue'
import PublishTag from './components/publish-tag.vue'

const id = ref('')
const description = ref<IDescription | undefined>()

const isOmitted = ref(true)
const isManagerMode = ref<boolean>(false)
const publisherStore = usePublisherStore()
const { userProfile } = storeToRefs(useUserStore())

const type: Type = publisherStore.cur_type
const post_type: string = TYPE_LIST[type]

// 显示加载
if (!description.value) {
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
}

// 数据加载完成，隐藏加载
watch(
  () => description.value,
  (newVal: IDescription | undefined) => {
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
  id.value = options.id
  // 从路径进入的不一定是管理员，从首页查看的也不一定不是管理员
  // 因此只有从发布者路径进入的管理员，才能编辑发布
  if (options.from === 'publisher_mode' && userProfile.value.is_admin) {
    isManagerMode.value = true
  }
  reqGetDetail(id.value).then((res) => {
    if (res.code !== 200) description.value = undefined
    description.value = GetPublishToDesc(res.data.body)
  })

  // 设置标题
  uni.setNavigationBarTitle({
    title: `${post_type}管理`,
  })
})

onShareTimeline(() => {
  if (!description.value) return {}
  return {
    title: description.value.title,
    path: `/pagesSub/publisherSub/publisher-detail?id=${id.value}`,
  }
})
onShareAppMessage(() => {
  if (!description.value) return {}
  return {
    title: description.value.title,
    path: `/pagesSub/publisherSub/publisher-detail?id=${id.value}`,
  }
})

onBeforeMount(() => {
  if (!id.value || !post_type) {
    console.log('错误：缺少id或分类错误', id.value, post_type)
    // 处理方式是跳转到类型选择页面
    uni.redirectTo({ url: './publisher-type' })
  }
})

function copyAccess() {
  uni.setClipboardData({
    data: description.value?.access || '',
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success',
      })
    },
  })
}

function handlePublish() {
  uni.redirectTo({ url: `./publisher-publish?id=${id.value}` })
}

function handleFav() {
  showMsg('暂未开放，敬请期待', 'none', 2000)
  console.log('收藏', id.value)
}

function previewImg(url: string) {
  uni.previewImage({
    urls: description.value?.imgs || [],
    current: url,
  })
}
</script>

<style scoped>
.detail {
  line-height: 41rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.ellipsis {
  -webkit-line-clamp: 5;
}

.title {
  color: #598df9;
}

.line {
  background-color: #f6f6f6;
  height: 4rpx;
}

.side-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  font-weight: 400;
  height: 46rpx;
  background-color: #f5f5f5;
  color: #598df9;
  border-radius: 8rpx;
}

.copy-button {
  width: 96rpx;
}

.collapse-button {
  width: fit-content;
  padding-left: 20rpx;
  padding-right: 20rpx;
}
</style>
