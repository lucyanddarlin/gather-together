import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { isNull } from '@/utils/common'
import { reqGetUserProfile, reqUserLogin } from '@/api/user'
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
  user_id: '',
  name: '',
  sex: GENDER.unknown,
  school: '',
  college_id: 0,
  college: '',
  profession: '',
  grade: 0,
  good_at: '',
  profile: '',
  contact: '',
  skills: [],
  races: [],
  certs: [],
  head_url: '',
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(uni.getStorageSync(TOKEN_KEY) || '')
  const userProfile = ref<UserProfile>(
    JSON.parse(uni.getStorageSync(PROFILE_KEY) || '{}')
  )
  const isLogin = computed(() => !isNull(token.value))
  const userCV = ref<RawUserCv>(blankCV)
  const ttt = ref('3243')

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
  const test = () => {
    userCV.value.name = 'hhdsfhks'
    ttt.value = 'jfshfskdfhksfjhskfh'
  }
  return {
    isLogin,
    userProfile,
    userCV,
    ttt,
    test,
    getUserProfile,
    userLogin,
  }
})
