<template></template>

<script setup>
import SnowEffect from "../../utils/snow";
import { removeStageById } from "/@/utils/cesium";
removeStageById("snow_stage");

const snow = new SnowEffect(window.viewer);
console.log(snow);
</script>

<style></style>
