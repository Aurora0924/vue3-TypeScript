<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayoutStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
    <!-- 动态展示路由对象 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="margin: 2px 4px; vertical-align: middle">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import useGlobalComponent from "@/store/modules/layout";
let $route = useRoute();

let LayoutStore = useGlobalComponent();
const changeIcon = () => {
  LayoutStore.fold = !LayoutStore.fold;
};
</script>
<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>
<style lang="scss" scoped></style>
