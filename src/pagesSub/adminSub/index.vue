<template>
  <view v-for="system in data" :key="system.key">
    <view class="admin-title">{{ system.title }}</view>
    <view p-20rpx grid grid-cols-2 gap-x-28rpx gap-y-18rpx>
      <view v-for="card in system.children" :key="card.key">
        <view
          class="card-item"
          :style="{ backgroundColor: card.color }"
          @tap="handleClick(card)"
          >{{ card.title }}</view
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useManagerStore } from '@/store/modules/admin'
import { PublishType, ReportSrc, ReportType } from '@/utils/adminConstant'
import type { Module, Sector } from '@/typings/admin'
const managerStore = useManagerStore()

const tempPath = '/pagesSub/adminSub/manage'

const data: Array<Sector> = [
  {
    title: '举报审核系统',
    key: 0,
    children: [
      {
        title: '帖子管理',
        path: tempPath,
        color: '#59CBFF',
        key: 0,
        type: ReportType.FORUM_POST,
        src: {
          title: '查看原帖',
          path: '/pagesSub/postSub/detail',
        },
      },
      {
        title: '评论管理',
        path: tempPath,
        color: '#52E796',
        key: 1,
        type: ReportType.FORUM_COMMENT,
        src: {
          // 评论不设置跳转
          title: '',
          path: '',
        },
      },
      // {
      //   title: '用户管理',
      //   path: tempPath,
      //   color: '#FEB579',
      //   key: 2,
      // },
      {
        title: '项目管理',
        path: tempPath,
        color: '#FECB72',
        key: 3,
        type: ReportType.PROJECT,
        src: {
          // 评论不设置跳转
          title: '查看项目',
          path: '/pagesSub/projectSub/detail',
        },
      },
      {
        title: '简历管理',
        path: tempPath,
        color: '#EAB7A4',
        key: 4,
        type: ReportType.RESUME,
        src: {
          // 评论不设置跳转
          title: '查看简历',
          path: '/pagesSub/resumeSub/detail',
        },
      },
    ],
  },
  {
    title: '发布系统',
    key: 1,
    children: [
      {
        title: '发布公告',
        path: tempPath,
        color: '#FFAA73',
        key: 0,
        type: PublishType.ANNOUNCEMENT,
        api: () => {
          console.log('发布公告')
        },
      },
    ],
  },
]

const handleClick = (card: Module) => {
  // 查看原帖/原链接的按钮文字（和data的title有不同，比如“原帖”和“帖子”）
  ;(managerStore.cur_module.title = card.src ? card.src.title : ''),
    // 原帖/原链接的跳转路径
    (managerStore.cur_module.path = ReportSrc[card.type]
      ? ReportSrc[card.type]
      : ''),
    // 举报的类型
    (managerStore.cur_module.type = card.type),
    // 请求数据,
    (managerStore.cur_title = card.title.slice(0, -2))
  uni.navigateTo({ url: `./admin` })
}
</script>

<style scoped>
.admin-title {
  padding: 20rpx;
  color: black;
  font-size: 40rpx;
  font-weight: 600;
}
.card-item {
  width: 342rpx;
  height: 200rpx;
  padding-left: 26rpx;
  padding-top: 28rpx;
  color: white;
  font-size: 40rpx;
  font-weight: 600;
  border-radius: 32rpx;
}
</style>
