<template>
  <a-layout>
    <a-layout-sider>
      <Menu></Menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <div id="cesiumContainer"></div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Menu from "./components/menu.vue";
import * as Cesium from "cesium";
onMounted(() => {
  init();
});

const init = async () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
    timeline: false,
    navigationHelpButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    geocoder: false,
    animation: false,
    
  });
  let token = "7662547efd290de36809ce5ca59ac1e1";
  viewer.cesiumWidget.creditContainer.style.display = "none";
  //加载arc地图
  const arcGisMap = await Cesium.ArcGisMapServerImageryProvider.fromUrl(
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
  );
  viewer.imageryLayers.addImageryProvider(arcGisMap);

};
</script>

<style scoped>
.ant-layout-content {
  height: 100vh;
}
.ant-layout-sider {
  height: 100vh;
  overflow-y: auto;
}
#cesiumContainer {
  height: 100%;
}
</style>
