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
          <Suspense><router-view></router-view></Suspense>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { onMounted, Suspense } from "vue";
import Menu from "/@/components/menu.vue";
import StepControl from "/@/components/stepControl.vue";
import * as Cesium from "cesium";
import { DEFAULT_VIEW_RECTANGLE } from "/@/common/config/cesium.js";
// 默认到中国上空
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = DEFAULT_VIEW_RECTANGLE;
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
  //显示帧率信息
  viewer.scene.debugShowFramesPerSecond = true;
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

*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-thumb {
  background: #000c17;
  border-radius: 5px;
}

* {
  scrollbar-width: 10px;
  scrollbar-base-color: green;
  scrollbar-track-color: red;
  scrollbar-arrow-color: blue;
}
</style>
