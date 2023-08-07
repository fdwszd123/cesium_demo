<template>
  <div>
    <div id="place_info">
      <div class="place_name"></div>
      <div class="place_address"></div>
    </div>
  </div>
</template>

<script setup>
import * as Cesium from "cesium";
import { getMethodContent } from "/@/utils/requestMethodContent.js";
import { onMounted } from "vue";
const viewer = window.viewer;
//创建广告牌集合添加到场景中
const billboardsCollection = viewer.scene.primitives.add(
  new Cesium.BillboardCollection()
);

let addressCardEl;
let placeNameEl;
let placeAddressEl;
onMounted(() => {
  addressCardEl = document.getElementById("place_info");
  placeNameEl = addressCardEl.children[0];
  placeAddressEl = addressCardEl.children[1];
  viewer.container.appendChild(addressCardEl);
});
billboardsCollection.id = "mark_primitive";

const handleFeatures = (features) => {
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const coordinates = feature.geometry.coordinates;
    const position = Cesium.Cartesian3.fromDegrees(
      coordinates[0],
      coordinates[1]
    );
    //地址的名称和位置信息
    const placeInfo = {
      name: feature.properties.name,
      address: feature.properties.address,
    };
    const billboard = billboardsCollection.add({
      position: position,
      image: "/images/mark-icon.png",
      with: 24,
      height: 24,
    });
    billboard.placeInfo = placeInfo;
  }
};
const { features } = await getMethodContent("/json/chuzhong.geojson");
handleFeatures(features);
viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});

const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
//添加左键点击事件
handler.setInputAction((e) => {
  const feature = viewer.scene.pick(e.position);
  console.log(e);
  if (
    Cesium.defined(feature) &&
    feature.collection &&
    feature.collection.id === "mark_primitive"
  ) {
    //当前点击feature的placeInfo
    const currentPlaceInfo = feature.primitive.placeInfo;
    placeNameEl.textContent = currentPlaceInfo.name;
    placeAddressEl.textContent = `地址： ${currentPlaceInfo.address}`;
    addressCardEl.style.display = "block";
    addressCardEl.style.bottom = `${
      viewer.canvas.clientHeight - e.position.y
    }px`;
    addressCardEl.style.left = `${e.position.x}px`;
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
</script>

<style scoped>
#place_info {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  font-size: 18px;
  line-height: 30px;
  display: none;
  position: absolute;
}
</style>
