/* eslint-disable no-restricted-syntax */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { isNull, showMsg } from '@/utils/common'
import {
  reqCreateUserCV,
  reqGetUserCV,
  reqGetUserProfile,
  reqRemoveUserCV,
  reqUserLogin,
} from '@/api/user'
import { GENDER, PROFILE_KEY, TOKEN_KEY } from '@/utils/constant'
import type { RawUserCv, UserProfile } from '@/typings/user'

const getUserCode = () => {
  return new Promise((resolve) => {
    uni.login({
      success: (res) => {
        resolve(res.code)
      },
      fail: () => {
        resolve(null)
      },
    })
  })
}
const popupDialog = () => {
  return new Promise((resolve) => {
    uni.showModal({
      title: '请求登录',
      content: '确定后，进入下一步',
      confirmColor: '#4F89BE',
      success: (result) => {
        resolve(result.confirm || false)
      },
      fail: () => {
        resolve(false)
      },
    })
  })
}
const getProfile = (): Promise<UniApp.GetUserProfileRes> => {
  return new Promise((resolve, reject) => {
    uni.getUserProfile({
      desc: '你的授权信息',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        console.log(err)
        reject(null)
      },
    })
  })
}

const blankCV: RawUserCv = {
  name: '',
  sex: String(GENDER.unknown),
  school: '',
  profession: '',
  profile: '',
  contact: '',
  direction: undefined,
  skill_id: undefined,
  skill_des: undefined,
  year: undefined,
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(uni.getStorageSync(TOKEN_KEY) || '')
  const userProfile = ref<UserProfile>(
    JSON.parse(uni.getStorageSync(PROFILE_KEY) || '{}')
  )
  const isLogin = computed(() => !isNull(token.value))
  const userCV = ref<RawUserCv>(blankCV)
  const hasCV = ref<boolean>(false)

  const userLogin = async () => {
    const code = (await getUserCode()) as string
    const isConfirm = await popupDialog()
    if (code && isConfirm) {
      const { iv, encryptedData } = await getProfile()
      const query = { code, iv, encryptedData }
      console.log(JSON.stringify(query))
      if (!isNull(iv)) {
        const { data } = await reqUserLogin(query)
        if (!isNull(data)) {
          updateToken(data.body.accessToken)
          const isDone = await getUserProfile()
          if (isDone) return
        }
      }
    }
  }
  const updateToken = (value: string) => {
    token.value = value
    if (isNull(value)) {
      uni.removeStorageSync(TOKEN_KEY)
      uni.removeStorageSync(PROFILE_KEY)
    } else {
      uni.setStorageSync(TOKEN_KEY, token.value)
    }
  }
  const getUserProfile = async () => {
    const { data } = await reqGetUserProfile()
    if (!isNull(data)) {
      uni.setStorageSync(PROFILE_KEY, JSON.stringify(data.body))
      userProfile.value = data.body
      return true
    }
    return false
  }
  const getUserCV = async () => {
    const { data } = await reqGetUserCV()
    if (!isNull(data)) {
      userCV.value = data.body
      hasCV.value = true
      return
    }
    return
  }
  const removeUserCV = async () => {
    const { data } = await reqRemoveUserCV()
    if (!isNull(data)) {
      userCV.value = blankCV
      hasCV.value = false
      showMsg('清除成功')
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    }
    return false
  }
  const createUserCV = async () => {
    const { data } = await reqCreateUserCV(userCV.value)
    if (!isNull(data)) {
      showMsg('创建成功')
      hasCV.value = true
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    }
  }
  return {
    isLogin,
    userProfile,
    userCV,
    hasCV,
    getUserProfile,
    userLogin,
    getUserCV,
    removeUserCV,
    createUserCV,
  }
})
