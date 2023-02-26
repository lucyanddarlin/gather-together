<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { useUserStore } from './store/modules/user'
const { isLogin } = storeToRefs(useUserStore())
const { getUserProfile, getUserCV } = useUserStore()
onLaunch(() => {
  console.log('App Launch')
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
