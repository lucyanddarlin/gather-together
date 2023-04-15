<template>
  <!-- 头部的tab bar -->
  <view>
    <view flex justify-evenly items-center h-76rpx class="header">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        :class="tab.key == selected ? 'tab-bar-active' : 'tab-bar'"
        @tap="handleSwitch(tab.key)"
      >
        {{ tab.value }}
      </view>
    </view>
    <!-- 背景 -->
    <scroll-view
      class="bg"
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
        <!-- 占位 -->
        <view h-6rpx></view>
        <view v-for="item in data" :key="item.report_id" class="card-item">
          <!-- 卡片 -->
          <view flex justify-between h-64rpx pl-60rpx pr-28rpx pt-20rpx>
            <!-- 头像 -->
            <view flex justify-start w-300rpx>
              <image :src="item.head_url" mode="scaleToFill" class="image" />
              <view pl-12rpx
                ><view text-28rpx fw-400 color-black>{{
                  item.creator_name
                }}</view
                ><view text-20rpx fw-400 class="text-#979797">{{
                  item.creator_time
                }}</view></view
              >
            </view>
            <!-- 查看来源 -->
            <view
              v-if="ReportSrc[`${item.type}`]"
              h-60rpx
              flex
              items-center
              class="text-#1C69FF"
              @tap="handleSrc(item.business_id)"
              ><view>{{ cur_module.title }}>></view>
            </view>
          </view>
          <!-- 举报内容（暂时缺失，需要API返回或者） -->
          <view pl-60rpx pt-38rpx>{{ item.report_content }}</view>
          <!-- 分割线 -->
          <view class="divider"></view>
          <AdminInfo :info="item" />
          <!-- 分割线 -->
          <view class="divider"></view>
          <!-- 驳回、通过 -->
          <view
            v-if="item.state === ReportState.PENDING"
            flex
            justify-evenly
            class="text-28rpx text-#1C69FF"
          >
            <view
              py-28rpx
              @tap="handleAdmin(`${item.report_id}`, ReportState.DENY)"
            >
              驳回举报
            </view>
            <view
              py-28rpx
              @tap="handleAdmin(`${item.report_id}`, ReportState.PASS)"
            >
              删除{{ managerStore.cur_title }}
            </view>
          </view>
          <!-- 撤回操作 -->
          <view
            v-if="item.state === ReportState.PASS"
            flex
            justify-center
            class="text-28rpx text-#1C69FF"
          >
            <view
              py-28rpx
              @tap="handleUndo(`${item.report_id}`, ReportState.PASS)"
            >
              恢复{{ managerStore.cur_title }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <Float
      :is-show-popup="isShowPopup"
      :type="-1"
      :scroll-value="oldScrollTop"
      @back-to-top="handleBackToTop"
    >
    </Float>
  </view>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { useManagerStore } from '@/store/modules/admin'
import { reqGetReportList, reqReportHandle } from '@/api/admin'
import { ReportSrc, ReportState, ReportType } from '@/utils/adminConstant'
import { reqGetHomeTopicInfo } from '@/api'
import { reqGatherPersonSingle, reqGatherProjectSingle } from '@/api/gather'
import { useUserStore } from '@/store/modules/user'
import AdminInfo from './components/admin-info.vue'
import type { ReportItem } from '@/typings/admin'

const isTriggered = ref<boolean>(false)
const isShowPopup = ref<boolean>(false)
const isReqAllowed = ref<boolean>(true)
const scrollTop = ref<number>(0)
const oldScrollTop = ref<number>(0)

const cur_page = ref(0)

const managerStore = useManagerStore()
const cur_module = managerStore.cur_module
const data: Array<ReportItem> = reactive([])
const selected = ref(0)
const tabs = [
  {
    value: '未处理',
    key: ReportState.PENDING,
  },
  { value: '已处理', key: ReportState.PASS },
]
const reqList = (page = 0, size = 5) => {
  // 请求当前选中
  reqGetReportList(page, size, {
    type: `${cur_module.type}`,
    state: `${selected.value}`,
  })
    .then((res) => {
      if (res.data.code === '200') {
        if (res.data.body.length === 0) {
          // 防止反复刷请求
          isReqAllowed.value = false
          return
        } else isReqAllowed.value = true
        data.push(...res.data.body)
      } else {
        console.log(`请求失败，${res.data.message}`)
      }
    })
    .then(() => {
      // 请求头像、被举报的项目名、被举报的发起者和项目的创建时间
      reqMisc()
    })
}

const reqMisc = async () => {
  if (data.length === 0) return
  // 分类型
  for (const item of data) {
    if (item.type === ReportType.FORUM_COMMENT) {
      item.head_url = 'https://img.yzcdn.cn/vant/cat.jpeg' // 默认头像，后续需要修改
      item.creator_name = '微信用户'
      item.creator_time = '2023-04-07 18:00:00'
      item.report_content = '（待补充）'
      continue // 接口缺少头像字段，内容暂时替代
    }
    // 帖子
    if (item.type === ReportType.FORUM_POST) {
      await reqGetHomeTopicInfo(item.business_id).then((res) => {
        if (res.data.code === '200') {
          const d = res.data.body
          item.head_url = d.creator_head_url
          item.creator_name = d.creator_name
          item.creator_time = `${item.date.split('T')[0]}
        ${item.date.split('T')[1].slice(0, 8)}`
          item.report_content = d.title
        }
      })
    }
    // 项目
    if (item.type === ReportType.PROJECT) {
      await reqGatherProjectSingle(item.business_id).then((res) => {
        if (res.data.code === 200) {
          const d = res.data.body
          // 项目暂不显示头像
          item.head_url = 'https://img.yzcdn.cn/vant/cat.jpeg'
          item.creator_name = d.creator_id
          item.creator_time = d.create_at.formatDate('yyyy-MM-dd HH:mm:ss')
          item.report_content = d.project_name
        }
      })
    }
    // 简历
    if (item.type === ReportType.RESUME) {
      await reqGatherPersonSingle(item.business_id).then((res) => {
        if (res.data.code === 200) {
          const d = res.data.body
          item.head_url = d.creator_head_url
          item.creator_name = d.creator_name
          item.creator_time = d.created_at
          item.report_content = d.title
        }
      })
    }
  }
  console.log('数据:', data)
}

onLoad(() => {
  // 判断是否管理员
  const { userProfile } = storeToRefs(useUserStore())
  if (!userProfile.value.is_admin)
    uni.redirectTo({ url: '/pagesSub/profileSetting/index/' })
  uni.setNavigationBarTitle({
    title: `${managerStore.cur_title}管理`,
  })
})

onReady(() => {
  // 请求当前类型的列表
  reqList()
})

function handleScroll(options: any) {
  oldScrollTop.value = options.target.scrollTop as number
}

function handleScrollToLower() {
  console.log('handleScrollToLower, forbidden?', !isReqAllowed.value)
  if (!isReqAllowed.value) return
  if (data.length < 3) return
  reqList(++cur_page.value)
}

function handleRefresh() {
  console.log('handleRefresh')
  isTriggered.value = true
  cur_page.value = 0
  data.splice(0, data.length)
  reqList()
  // 注意vue优化了重复赋值
  nextTick(() => {
    isTriggered.value = false
  })
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

const handleAdmin = (report_id: string, type: ReportState) => {
  uni.showModal({
    title: '提示',
    content: ['', '确认删除该条信息吗？', '确认驳回举报吗？'][type],
    showCancel: true,
    success: ({ confirm }) => {
      if (confirm) {
        reqReportHandle(report_id, type).then((res) => {
          if (res.data.code === '200') {
            uni.showToast({
              title: '处理成功',
              icon: 'none',
            })
            handleRefresh()
          } else {
            uni.showToast({
              title: '处理失败',
              icon: 'none',
            })
          }
        })
      }
    },
  })
}

const handleUndo = (report_id: string, type: ReportState) => {
  uni.showModal({
    title: '提示',
    content: `确认恢复该${managerStore.cur_title}吗？`,
    showCancel: true,
    success: ({ confirm }) => {
      if (confirm) {
        reqReportHandle(report_id, type).then((res) => {
          if (res.data.code === '200') {
            uni.showToast({
              title: '处理成功',
              icon: 'none',
            })
            reqList()
          } else {
            uni.showToast({
              title: '处理失败',
              icon: 'none',
            })
          }
        })
      }
    },
  })
}

const handleSwitch = (key: number) => {
  console.log('handleSwitch', key, selected.value)
  if (key === selected.value) return
  // 切换tab，清空数据
  data.splice(0, data.length)
  selected.value = key
  reqList()
}
const handleSrc = (business_id: number) => {
  // 获取该类型的路径
  if (!cur_module.path) return
  uni.navigateTo({
    url: `${cur_module.path}${business_id}`,
  })
}
</script>

<style scoped>
.bg {
  background-color: #f7f7f7;
  position: absolute;
  top: 96rpx;
  bottom: 0;
}
.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #fff;
}
.tab-bar {
  text-align: center;
  width: 84rpx;
  font-weight: 600;
  font-size: 28rpx;
  color: #979797;
  padding-bottom: 6rpx;
  border-bottom: 2rpx solid #979797;
}
.tab-bar-active {
  color: black;
  padding-bottom: 6rpx;
  border-bottom: 2rpx solid black;
}

.image {
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
}
.divider {
  margin-top: 24rpx;
  height: 0.2rpx;
  opacity: 0.12;
  border: 0.2rpx solid #979797;
}
.card-item {
  margin-top: 22rpx;
  background-color: #fff;
}
</style>
