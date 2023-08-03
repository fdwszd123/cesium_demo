<template>
  <div></div>
</template>

<script setup>
import FogEffect from "../../utils/fog";
import { removeStageById } from "/@/utils/cesium";
removeStageById("fog_stage");
const fog = new FogEffect(window.viewer);
</script>

<style scoped></style>
