<template>
  <a-menu
    v-model:selectedKeys="defaultSelect"
    theme="dark"
    mode="inline"
    v-model:openKeys="openKeys"
  >
    <a-sub-menu v-for="menu in MENU_CONFIG" :key="menu.id">
      <template #title>{{ menu.title }}</template>
      <a-menu-item
        @click="linkTo(subItem.path)"
        v-for="subItem in menu.children"
        :key="subItem.id"
        >{{ subItem.title }}</a-menu-item
      >
    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { MENU_CONFIG } from "/@/common/config/menuConfig";
import { getMenuItemByPath } from "/@/utils/menu";

const openKeys = MENU_CONFIG.map((menu) => {
  return menu.id;
});
const defaultSelect = ref();
const router = useRouter();
const route = useRoute();
const linkTo = (path) => {
  router.push(path || "/particle/snow");
};
watch(
  () => route.path,
  (path, prevPath) => {
    if (path && path != "/") {
      const selectItemId = getMenuItemByPath(path).id;
      if (selectItemId) {
        defaultSelect.value = [selectItemId];
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
