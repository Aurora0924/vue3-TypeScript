<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all 1s ease-out;
}
.fade-enter-from {
  opacity: 0;
  transform: scale3d(0.5, 0.5, 0.5);
}
.fade-enter-to {
  opacity: 1;
  transform: scale3d(1, 1, 1);
}
</style>
