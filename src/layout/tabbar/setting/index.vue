<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    alt=""
    style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出</el-dropdown-item>
        <el-dropdown-item>登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useGlobalComponent from "@/store/modules/layout";
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
console.log(userStore.avatar);
console.log(userStore.username);

let LayoutStore = useGlobalComponent();
const updateRefresh = () => {
  LayoutStore.refresh = !LayoutStore.refresh;
};
// 全屏按钮点击回调
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>

<style lang="scss" scoped></style>
