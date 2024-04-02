<template>
  <div>
    <h1>首页路由{{ userStore.username }}</h1>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
