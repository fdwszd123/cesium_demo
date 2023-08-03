<template>
  <div></div>
</template>

<script setup>
import RainEffect from "../../utils/rain";
import { removeStageById } from "/@/utils/cesium";
removeStageById("rain_stage");
const rain = new RainEffect(window.viewer);
</script>

<style scoped></style>
