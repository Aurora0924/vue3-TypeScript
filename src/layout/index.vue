<template>
  <div class="layout_container">
    <!-- 左侧菜单栏 -->
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <!-- 组件菜单 :router="true"可以进行路由跳转 -->
        <el-menu
          background-color="#001529"
          text-color="white"
          :default-active="$route.path"
        >
          <!-- 封装动态组件 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航栏 -->
    <div class="layout_tabbar">
      <Tabbar></Tabbar>
    </div>
    <!-- 右侧内容区 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import useUserStore from "@/store/modules/user";
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Main from "./main/index.vue";
import Tabbar from "./tabbar/index.vue";
let userStore = useUserStore();
let $route = useRoute();
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-aside-logo-height);
      color: white;
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - #{$base-menu-width});
    height: $base-top-nav-height;
    top: 0;
    left: $base-menu-width;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - #{$base-menu-width});
    height: calc(100% - #{$base-top-nav-height});
    left: $base-menu-width;
    top: $base-top-nav-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>
