<template>
  <div class="logo">
    <img :src="setting.logo" alt="" v-if="setting.logoHidden" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>
<script lang="ts">
export default {
  name: 'Logo'
}
</script>
<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-aside-logo-height;
  color: white;
  display: flex;
  align-content: center;
  padding: 5px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-aside-logo-font-size;
    margin-left: 10px;
    margin-top: 6px;
    white-space: nowrap;
  }
}
</style>
