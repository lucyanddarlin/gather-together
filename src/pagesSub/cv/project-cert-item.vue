<template>
  <view
    class="project-certs-item"
    h-114rpx
    bg-white
    px-24rpx
    rounded-8rpx
    mt-20rpx
    @click="handleClick"
  >
    <template v-if="isProject">
      <view w-full h-full flex items-center>
        <view
          class="iconfont icon-cancel text-#FF6969 !text-40rpx"
          @click.stop="handleRemove"
        ></view>
        <view flex-1 flex-center text-32rpx font-bold>
          {{ item.project_name }}
        </view>
        <view class="iconfont icon-qianwang text-main !text-40rpx"></view>
      </view>
    </template>
    <template v-if="isCert">
      <view w-full h-full flex items-center justify-between>
        <view text-32rpx font-bold>
          {{ item.cert_name }}
        </view>
        <view
          v-if="isCert"
          class="iconfont icon-cancel text-#FF6969 !text-40rpx"
          @click.stop="handleRemove"
        />
        <view v-else class="iconfont icon-sousuo text-main"></view>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ADD } from '@/utils/constant'
import { reqRemoveCVCert, reqRemoveCVProject } from '@/api/user'
import { isNull, showMsg } from '@/utils/common'
interface CVProject {
  user_id?: string
  project_id?: string
  project_name: string
  project_exp: string
}
interface CVCert {
  user_id?: string
  cert_id?: string
  cert_name: string
  date: Date
}
const props = defineProps<{ item: Partial<CVProject & CVCert>; type: number }>()
const isProject = computed(() => props.type === ADD.PROJECTS)
const isCert = computed(() => props.type === ADD.CERTS)

const handleClick = () => {
  console.log(props.item)
  if (isProject.value) {
    uni.navigateTo({
      url: `/pagesSub/cv/add-page?addType=${props.type}&id=${props.item.project_id}`,
    })
  } else if (isCert.value) {
    uni.navigateTo({
      url: `/pagesSub/cv/add-page?addType=${props.type}&id=${props.item.cert_id}`,
    })
  }
}

const handleRemove = async () => {
  let confirm = false
  await new Promise<boolean>((resolve) => {
    uni.showModal({
      title: '是否删除',
      success: (res) => {
        if (res && res.confirm) {
          confirm = true
          resolve(true)
        } else {
          confirm = false
        }
      },
    })
  })
  if (confirm) {
    let data
    if (isProject.value) {
      data = (await reqRemoveCVProject(props.item.project_id!)).data
    } else if (isCert.value) {
      data = (await reqRemoveCVCert(props.item.cert_id!)).data
    }
    if (!isNull(data)) {
      showMsg('删除成功')
      uni.$emit('refreshCV')
    }
  }
}
</script>

<style scoped></style>
