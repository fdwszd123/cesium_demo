<template>
  <a-menu theme="dark" mode="inline" v-model:openKeys="openKeys">
    <a-sub-menu v-for="menu in MENU_CONFIG" :key="menu.id">
      <template #title>{{ menu.title }}</template>
      <a-menu-item v-for="subItem in menu.children" :key="subItem.id">{{
        subItem.title
      }}</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { MENU_CONFIG } from "/@/common/config/menuConfig";
const openKeys = MENU_CONFIG.map((menu) => {
  return menu.id;
});
</script>

<style scoped></style>
