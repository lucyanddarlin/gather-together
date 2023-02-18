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
