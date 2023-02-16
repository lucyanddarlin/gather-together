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
