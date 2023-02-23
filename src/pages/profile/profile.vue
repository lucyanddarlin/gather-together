<template>
  <view class="profile">
    <ProfileHeader />
    <ProfileCard />
  </view>
</template>

<script setup lang="ts">
import ProfileHeader from './profile-header.vue'
import ProfileCard from './profile-card.vue'
</script>

<style lang="scss">
.profile {
  min-height: 100vh;
  background-color: #f6f7f9;
}
</style>
