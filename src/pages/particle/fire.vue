<template></template>

<script setup>
import FireEffect from "../../utils/fire";
import * as Cesium from "cesium";
import {removePrimitiveById,removeEntityByName} from "/@/utils/cesium"
removePrimitiveById("fire");
removeEntityByName("fire");

window.viewer.camera.flyTo({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.361, 36.0885, 80),
  orientation: {
    direction: new Cesium.Cartesian3(
      0.7458181136018,
      -0.4270255968894706,
      0.5112773034515067
    ),
    up: new Cesium.Cartesian3(
      -0.19274344830978868,
      0.5963500021825172,
      0.7792410654159365
    ),
  },
  duration: 3, // 飞行时间（s）
});
const fire = new FireEffect(window.viewer);
</script>

<style scoped></style>
