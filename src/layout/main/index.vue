<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useGlobalComponent from "@/store/modules/layout";
import { watch, ref, nextTick } from "vue";
let flag = ref(true);
let LayoutStore = useGlobalComponent();
watch(
  () => LayoutStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>
<script lang="ts">
export default {
  name: "Main",
};
</script>
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
