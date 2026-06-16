<template>
  <view class="app">
    <router-view />
  </view>
</template>

<script setup>
import { onLaunch } from '@dcloudio/uni-app';

onLaunch(() => {
  console.log('App Launch');
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
}

.app {
  width: 100%;
  height: 100%;
}
</style>
