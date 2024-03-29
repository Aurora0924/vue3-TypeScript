<template>
  <div class="layout_container">
    <!-- 左侧菜单栏 -->
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <!-- 组件菜单 -->
        <el-menu background-color="#001529" text-color="white">
          <!-- 封装动态组件 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航栏 -->
    <div class="layout_tabbar">顶部导航栏</div>
    <!-- 右侧内容区 -->
    <div class="layout_main">
      <p style="height: 10000px;">段落</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '../layout/logo/index.vue'; 
import Menu from '../layout/menu/index.vue';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();

</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: #e3e3e3;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-aside-logo-height);
    }
  }
  .layout_tabbar {
    position:fixed;
    width: calc(100% - #{$base-menu-width});
    height: $base-top-nav-height;
    top: 0;
    left:$base-menu-width;
    background: cyan;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - #{$base-menu-width});
    height: calc(100% - #{$base-top-nav-height});
    background: chocolate;
    left: $base-menu-width;
    top: $base-top-nav-height;
    padding: 20px;
    overflow:auto;
  }
}
</style>