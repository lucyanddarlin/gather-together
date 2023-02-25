/* eslint-disable no-restricted-syntax */
import { getCurrentInstance, ref } from 'vue'

type Icon = UniNamespace.ShowToastOptions['icon']
export const showMsg = (
  title: string,
  icon: Icon = 'none',
  duration = 1500
) => {
  uni.showToast({
    title,
    duration,
    icon,
    mask: true,
  })
}

export const showLoading = (tips = '加载中...'): (() => null) => {
  uni.showLoading({
    title: tips,
    mask: true,
  })
  uni.showNavigationBarLoading()
  return () => {
    uni.hideLoading()
    uni.hideNavigationBarLoading()
    return null
  }
}
export const isNull = (obj: any): boolean => {
  if (!obj) return true
  if (['{}', '[]'].includes(JSON.stringify(obj))) return true
  return false
}

export const deepClone = (obj: any = {}, map = new WeakMap()) => {
  if (typeof obj !== 'object') return obj
  if (map.get(obj)) return map.get(obj)
  let cloneTarget: any = {}
  if (
    Array.isArray(obj) ||
    Object.prototype.toString.call(obj) === '[object Array]'
  ) {
    cloneTarget = []
  }
  map.set(obj, cloneTarget)
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneTarget[key] = deepClone(obj[key], map)
    }
  }

  return cloneTarget
}

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (c): string => {
      const r = Math.trunc(Math.random() * 16),
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    }
  )
}

export const useScrollHeight = (el: string): any => {
  const scrollHeight = ref<number>(0) // scroll组件高度
  const currentInstance = getCurrentInstance() // vue3绑定this
  const topEl = uni.createSelectorQuery().in(currentInstance).select(el) // 获取#top元素
  topEl
    .boundingClientRect((data) => {
      // 获取顶部高度
      scrollHeight.value = (data as any).height
    })
    .exec()
  return scrollHeight
}

const maxImageSize = 10485760
export const chooseImages = (count: number): Promise<string[]> => {
  const images: string[] = []
  return new Promise((resolve) =>
    uni.chooseMedia({
      count,
      mediaType: ['image'],
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        // const reg = /\.(heic)$/
        if (!result.tempFiles) return
        result.tempFiles.forEach((file) => {
          console.log('file', file)
          if (file.size > maxImageSize) return showMsg('图片大小不能超过 10 MB')
          if (count === 0) return
          count--
          images.push(file.tempFilePath)
        })
        resolve(images)
      },
    })
  )
}
