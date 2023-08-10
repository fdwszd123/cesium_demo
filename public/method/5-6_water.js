import * as Cesium from "cesium";
import { removePrimitiveById } from "/@/utils/cesium";

const viewer = window.viewer;
const geometry = new Cesium.RectangleGeometry({
  rectangle: Cesium.Rectangle.fromDegrees(120.34, 36.06, 120.42, 36.13),
  vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
});
const instance = new Cesium.GeometryInstance({ geometry });
const appearance = new Cesium.EllipsoidSurfaceAppearance({
  material: new Cesium.Material({
    fabric: {
      type: "Water",
      uniforms: {
        baseWaterColor: new Cesium.Color(
          64 / 255.0,
          157 / 255.0,
          253 / 255.0,
          0.5
        ),
        normalMap: "/images/waterNormals.jpg",
        frequency: 1000.0,
        animationSpeed: 0.1,
        amplitude: 10,
        specularIntensity: 10,
      },
    },
  }),
});
const primitive = new Cesium.Primitive({
  geometryInstances: instance,
  appearance,
});
removePrimitiveById("water");
primitive.id = "water";
viewer.scene.primitives.add(primitive);
viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});
