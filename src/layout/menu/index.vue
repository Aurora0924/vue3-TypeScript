<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <el-menu-item v-if="!item.children">
      <template #title>
        <span>标&nbsp;</span>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item v-if="item.children && item.children.length == 1">
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
defineProps(["menuList"]);
</script>

<style lang="scss" scoped></style>
