import { getCurrentInstance, ref } from 'vue'

type Icon = UniNamespace.ShowToastOptions['icon']
export const showMsg = (title: string, duration: number, icon: Icon) => {
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
