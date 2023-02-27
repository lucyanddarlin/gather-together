<template>
  <view class="add-item-page">
    <FormItem
      v-if="dataMap[currentKey[currentType!]]?.mainTitle"
      v-model="name"
      :title="dataMap[currentKey[currentType!]]?.mainTitle"
      input
      :placeholder="dataMap[currentKey[currentType!]].mainPlaceholder"
    />
    <formItem
      v-if="dataMap[currentKey[currentType!]]?.title"
      v-model="desc"
      :title="dataMap[currentKey[currentType!]].title"
      :placeholder="dataMap[currentKey[currentType!]].placeholder"
      textarea
      intro
    />
    <view
      h-100rpx
      rounded-24rpx
      flex-center
      text-white
      text-32rpx
      font-bold
      transition
      class="bg-#DFDFDF"
      :class="{ '!bg-main': checkFlag }"
      @click="handleClickConfirm"
    >
      保存
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ADD } from '@/utils/constant'
import {
  reqAddCVCert,
  reqAddCVProject,
  reqModifyCVCert,
  reqModifyCVProject,
} from '@/api/user'
import { isNull, showMsg } from '@/utils/common'
import { useUserStore } from '@/store/modules/user'
interface DataMap {
  [key: string]: {
    navTitle: string
    mainTitle: string
    mainPlaceholder: string
    title?: string
    placeholder?: string
  }
}

onLoad((options) => {
  if (!options) return
  currentType.value = options.addType
  uni.setNavigationBarTitle({
    title: dataMap[currentKey[currentType.value!]].navTitle,
  })
  id.value = options.id
  if (!isNull(id.value)) {
    if (isProject.value) {
      const result = userCV.value.projects!.find(
        (item) => item.project_id === id.value
      )
      name.value = result!.project_name
      desc.value = result!.project_exp
    } else if (isCert.value) {
      const result = userCV.value.certs!.find(
        (item) => item.cert_id === id.value
      )
      name.value = result!.cert_name
    }
  }
})

const { userCV, hasCV } = storeToRefs(useUserStore())
const { createUserCV } = useUserStore()
const id = ref<string>('')
const name = ref<string>('')
const desc = ref<string>('')
const isProject = computed(() => Number(currentType.value) === ADD.PROJECTS)
const isCert = computed(() => Number(currentType.value) === ADD.CERTS)
const isUpdate = computed(() => !isNull(id.value))
const checkFlag = computed(() => {
  if (isProject.value) {
    if (name.value && desc.value) return true
    else return false
  } else if (isCert.value) {
    if (name.value) return true
    else return false
  }
  return false
})
const currentType = ref<number>()
const currentKey = ['projects', 'certs']
const dataMap = reactive<DataMap>({
  projects: {
    navTitle: '项目/实践',
    mainTitle: '项目/实践 名称',
    mainPlaceholder: '请输入 项目/实践 名称',
    title: '项目/实践 经历',
    placeholder: '请输入 项目/实践 经历',
  },
  certs: {
    navTitle: '证书/荣誉',
    mainTitle: '证书/荣誉 名称',
    mainPlaceholder: '请输入 证书/荣誉 名称',
  },
})
const handleClickConfirm = async () => {
  if (!checkFlag.value) return
  if (isUpdate.value) {
    await handleUpdate()
  } else {
    await handleAdd()
  }
}
const handleAdd = async () => {
  console.log(hasCV.value)
  if (!hasCV.value) {
    await createUserCV()
  }
  let data
  if (isProject.value) {
    const query = [
      {
        project_exp: desc.value,
        project_name: name.value,
      },
    ]
    data = (await reqAddCVProject(query)).data
  } else if (isCert.value) {
    const query = [
      {
        cert_name: name.value,
        date: Date.now(),
      },
    ]
    data = (await reqAddCVCert(query)).data
  }
  if (!isNull(data)) {
    uni.$emit('refreshCV')
    showMsg('创建成功')
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  }
}
const handleUpdate = async () => {
  let data
  if (isProject.value) {
    const query = {
      project_name: name.value,
      project_exp: desc.value,
      project_id: id.value,
    }
    data = (await reqModifyCVProject(query)).data
  } else if (isCert.value) {
    const query = {
      cert_name: name.value,
      date: Date.now(),
      cert_id: id.value,
    }
    data = (await reqModifyCVCert(query)).data
  }
  if (!isNull(data)) {
    uni.$emit('refreshCV')
    showMsg('修改成功')
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  }
}
</script>

<style lang="scss">
.add-item-page {
  padding: 30rpx;
  min-height: 100vh;
  background-color: #f7f8fa;
}
</style>
