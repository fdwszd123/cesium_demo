<template>
  <div></div>
</template>

<script setup>
import * as Cesium from "cesium";
import LineFlickerMaterialProperty from "/@/utils/lineMaterial.js";

const viewer = window.viewer;
Cesium.GeoJsonDataSource.load("/json/qingdaoRoad.geojson")
  .then((road) => {
    viewer.dataSources.add(road);
    //实体的集合
    const entities = road.entities.values;
    //异步设置相机以查看提供的实体、实体或数据源
    viewer.zoomTo(entities);
    for (let i = 0; i < entities.length; i++) {
      const entitie = entities[i];
      entitie.polyline.width = 3.0;
      //设置线的材质
      entitie.polyline.material = new LineFlickerMaterialProperty({
        color: Cesium.Color.BLUE,
        // 设置随机变化速度
        speed: 20 * Math.random(),
      });
    }
  })
  .catch((err) => {
    console.log(`加载geojson数据失败:${err}`);
  });
</script>

<style scoped></style>
