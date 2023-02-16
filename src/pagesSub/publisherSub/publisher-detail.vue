<template>
  <div>
    <u-navbar :title="publisherStore.cur_type + '管理'" />
    <div v-if="!description">该{{ post_type }}不存在</div>
    <div v-else relative>
      <u-icon absolute top-20rpx right-24rpx name="more-dot-fill"></u-icon>
      <div mt-4rpx ml-36rpx text-52rpx>
        {{ description.title }}
      </div>
      <div ml-36rpx>
        <!-- 活动类型 -->
        <PublishTag
          filter
          inline
          :title="ScoreTypeMap[description.score_type]"
          color="#FFAF50"
        ></PublishTag>
        <!-- 主办方类型 -->
        <PublishTag
          filter
          inline
          :title="HostTypeMap[description.host_type]"
          color="#FFAF50"
        ></PublishTag>
        <!-- 比赛级别（比赛特有） -->
        <PublishTag
          v-if="description.post_type === Type.比赛"
          filter
          inline
          :title="
            description.race_level ? LevelMap[description.race_level] : '未分级'
          "
          color="#FFAF50"
        ></PublishTag>
        <!-- 进行状态 -->
        <PublishTag
          :title="StateMap[description.state]"
          color="#56C28E"
          font-size="32rpx"
        ></PublishTag>
        <!-- 时间 -->
        <div color="#598DF9" text-32rpx mt-32rpx>报名时间：</div>
        <PublishTag
          :date="{ start: description.start_time, end: description.end_time }"
          color="#598DF9"
        ></PublishTag>
        <!-- 地点 -->
        <div color="#598DF9" text-32rpx mt-32rpx>{{ post_type }}地点：</div>
        <PublishTag color="#598DF9" :title="description.location"></PublishTag>
        <!-- 主办方 -->
        <div color="#598DF9" text-32rpx mt-32rpx>主办方：</div>
        <PublishTag color="#598DF9" :title="description.host"></PublishTag>
        <!-- 详情描述 -->
        <div color="#4D4D4D" text-32rpx mt-52rpx fw-600>
          {{ post_type }}详情
        </div>
        <!-- TODO: 插入图片 -->
        <div grid grid-cols-3 gap-x-20rpx color="#A4A4A4" pl-36rpx mt-36rpx>
          <div v-for="img in description.imgs" :key="img">
            <img
              :src="img"
              rounded-10rpx
              w-162rpx
              h-162rpx
              @tap="previewImg(img)"
            />
          </div>
        </div>
        <div
          color="#A4A4A4"
          px-36rpx
          mt-36rpx
          :class="isOmitted ? 'ellipsis' : 'normal'"
        >
          {{ description.description }}
        </div>
        <div ml-18rpx>
          <PublishTag
            text-24rpx
            color="#598DF9"
            bg-color="#F5F5F5"
            :title="isOmitted ? '查看全部' : '收起'"
            @tap="isOmitted = !isOmitted"
          ></PublishTag>
        </div>

        <!-- 报名方式 -->
        <div relative>
          <div color="#4D4D4D" text-32rpx mt-52rpx fw-600>报名方式</div>
          <div color="#A4A4A4" px-36rpx mt-36rpx>{{ description.access }}</div>
          <PublishTag
            absolute
            top-0
            right-32rpx
            title="复制"
            color="#598DF9"
            text-24rpx
            bg-color="#F5F5F5"
            @tap="copyAccess"
          ></PublishTag>
        </div>
      </div>
      <!-- 占位，以便用户能够在fixed遮挡的情况划下去 -->
      <div h-160rpx></div>
    </div>
  </div>
  <div fixed bottom-26rpx left-40rpx>
    <div grid grid-cols-2 gap-x-22rpx>
      <PublishButton
        w-324rpx
        height="78rpx"
        text-32rpx
        :title="`编辑${post_type}`"
        color="#fff"
        bg-color="#73B297"
        rounded="12rpx"
        box-shadow="4rpx"
        @tap="handlePublish(id)"
      ></PublishButton>
      <PublishButton
        w-324rpx
        height="78rpx"
        text-32rpx
        title="分享"
        color="#fff"
        bg-color="#FF6969"
        rounded="12rpx"
        box-shadow="4rpx"
        icon="share-o"
      ></PublishButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// import { useRoute, useRouter } from 'vue-router'
import { usePublisherStore } from '@/store/modules/publisher'
import {
  HostTypeMap,
  type IDescription,
  LevelMap,
  ScoreTypeMap,
  StateMap,
  Type,
  TypeMap,
} from '@/typings/publisher'
import PublishButton from './components/publish-button.vue'
import PublishTag from './components/publish-tag.vue'
let id = ref('')
let description = ref<IDescription | undefined>()
onLoad((options) => {
  if (!options) {
    console.log('options 为空，请检查url参数')
    return
  }
  id.value = options.id
  description.value = publisherStore.descriptions[TypeMap[post_type]]?.find(
    (item) => item.post_id === id.value
  )
})
onBeforeMount(() => {
  if (!id.value || !post_type) {
    console.log('错误：缺少id或分类错误', id.value, post_type)
    // 处理方式是跳转到类型选择页面
    uni.redirectTo({ url: './publisher-type' })
  }
})
const isOmitted = ref(true)
const publisherStore = usePublisherStore()
type PostType = keyof typeof Type
const post_type: PostType = publisherStore.cur_type as PostType

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

function handlePublish(id: string) {
  uni.redirectTo({ url: `./publisher-publish?id=${id}` })
}

function previewImg(url: string) {
  uni.previewImage({
    urls: description.value?.imgs || [],
    current: url,
  })
}
</script>

<style scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.normal {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 100;
  -webkit-box-orient: vertical;
}
</style>
