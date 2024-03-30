<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar_right">
      <Set></Set>
    </div>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import Breadcrumb from './breadcrumb/index.vue'
import Set from './set/index.vue';
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, #ababab, #e3e3e3, #dedede);
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>