<template></template>

<script setup>
import * as Cesium from "cesium";
const terrain = new Cesium.Terrain(
  Cesium.CesiumTerrainProvider.fromUrl("http://data.marsgis.cn/terrain")
);
const viewer = window.viewer;
viewer.scene.setTerrain(terrain);
</script>

<style>
</style>