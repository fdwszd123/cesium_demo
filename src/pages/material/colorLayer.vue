<template></template>

<script setup>
import * as Cesium from "cesium";
import { getMethodContent } from "/@/utils/requestMethodContent.js";
import { removePrimitiveById } from "/@/utils/cesium";

const { features } = await getMethodContent("/json/qingdaoArea.geojson");
const pointRes = await getMethodContent("/json/areaPoint.geojson");
const viewer = window.viewer;
const instances = [];
//中心点的位置-
const areaPointCenter = [];
//标签集合
const labelCollection = viewer.scene.primitives.add(
  new Cesium.LabelCollection()
);
removePrimitiveById("label_center");
labelCollection.id = "label_center";
for (let i = 0; i < features.length; i++) {
  const feature = features[i];
  for (let j = 0; j < feature.geometry.coordinates.length; j++) {
    //面的位置
    const positions = feature.geometry.coordinates[j].flat(Infinity);
    const polygon = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray(positions)
      ),
      vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      // 设置面的拉伸高度
      extrudedHeight: 100,
      // height: 100, // 多边形和椭球表面之间的距离（以米为单位）。
    });
    const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
    instances.push(
      new Cesium.GeometryInstance({
        id: `polygon-${j}`,
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.fromAlpha(Cesium.Color.fromRandom(), 0.6)
          ),
          show: new Cesium.ShowGeometryInstanceAttribute(true),
        },
      })
    );
  }
  const center = pointRes.features.find(
    (item) => item.properties["ID"] == feature["properties"]["id"]
  );

  const carter3Position = Cesium.Cartesian3.fromDegrees(
    ...center["geometry"]["coordinates"]
  );

  areaPointCenter.push(center["geometry"]["coordinates"]);
  labelCollection.add({
    text: feature["properties"]["name"],
    font: "bold 15px Microsoft YaHei",
    blendOption: Cesium.BlendOption.TRANSLUCENT, // 半透明，提高性能2倍
    position: carter3Position,
    // 竖直对齐方式
    verticalOrigin: Cesium.VerticalOrigin.CENTER,
    // 水平对齐方式
    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
  });
}
const primitive = new Cesium.Primitive({
  releaseGeometryInstances: false,
  geometryInstances: instances,
  appearance: new Cesium.PerInstanceColorAppearance({
    translucent: true, // 当 true 时，几何体应该是半透明的，因此 PerInstanceColorAppearance#renderState 启用了 alpha 混合。
    closed: false, // 当 true 时，几何体应该是关闭的，因此 PerInstanceColorAppearance#renderState 启用了背面剔除。
  }),
  asynchronous: false,
});
removePrimitiveById("color_layer");

primitive.id = "color_layer";
viewer.scene.primitives.add(primitive);
viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});
</script>

<style scoped></style>
