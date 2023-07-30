<template>
  <a-layout>
    <a-layout-sider>
      <Menu></Menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <div id="cesiumContainer"></div>
        <div class="step">
          <StepControl></StepControl>
        </div>
        <div class="control">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Menu from "/@/components/menu.vue";
import StepControl from "/@/components/stepControl.vue";
import * as Cesium from "cesium";
// 默认到中国上空
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  75.0, // 东
  0.0, // 南
  140.0, // 西
  60.0 // 北
);
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
    baseLayer: false,
  });
  window.viewer = viewer;
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
  position: relative;
  height: 100vh;
}
.ant-layout-sider {
  height: 100vh;
  overflow-y: auto;
}
#cesiumContainer {
  height: 100%;
}
.control {
  position: absolute;
  top: 0;
  left: 50%;
}

.step {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
