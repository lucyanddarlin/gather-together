<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { useUserStore } from './store/modules/user'
import { showMsg } from './utils/common'
const { isLogin } = storeToRefs(useUserStore())
const { getUserProfile, getUserCV } = useUserStore()
onLaunch(() => {
  console.log('App Launch')
  checkVersionUpdate()
  if (isLogin.value) {
    getUserProfile()
    getUserCV()
  }
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
const checkVersionUpdate = () => {
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log('新版本请求回调结果', res.hasUpdate)
  })
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      confirmColor: '#4F89BE',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      },
    })
  })
  updateManager.onUpdateFailed((res) => {
    showMsg(`版本更新失败, ${res}`)
  })
}
</script>
<style lang="scss">
@import 'vk-uview-ui/index.scss';
view,
input {
  box-sizing: border-box;
}
uni-modal .uni-modal__bd {
  white-space: pre-wrap;
}
</style>
