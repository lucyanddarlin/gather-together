function toast(title, duration = 1500) {
  uni.showToast({
    title,
    icon: 'none',
    duration,
  })
}

export default toast
