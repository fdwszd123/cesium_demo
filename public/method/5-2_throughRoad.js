import * as Cesium from "cesium";
import { getMethodContent } from "/@/utils/requestMethodContent.js";
import { removePrimitiveById } from "/@/utils/cesium";
const viewer = window.viewer;
const { features } = await getMethodContent("/json/qingdaoRoad.geojson");
const instances = []; //创建的几何体实例
removePrimitiveById("through_road");
for (let i = 0; i < features.length; i++) {
  const feature = features[i];
  const coordinates = feature.geometry.coordinates;
  for (let j = 0; j < coordinates.length; j++) {
    const coordinate = coordinates[j];
    //二位数组一维化
    let positions = coordinate.flat();

    //创建折线几何图形
    const polyline = new Cesium.PolylineGeometry({
      positions: Cesium.Cartesian3.fromDegreesArray(positions),
      width: 1.7,
      vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
    });
    // 创建物体
    const geometry = Cesium.PolylineGeometry.createGeometry(polyline);

    // 创建物体的实例
    instances.push(
      new Cesium.GeometryInstance({
        geometry,
      })
    );
  }
}

const source = `czm_material czm_getMaterial(czm_materialInput materialInput)
                          {
                             czm_material material = czm_getDefaultMaterial(materialInput);
                             vec2 st = materialInput.st;
                             vec4 colorImage = texture(image, vec2(fract((st.s - speed * czm_frameNumber * 0.001)), st.t));
                             material.alpha = colorImage.a * color.a;
                             material.diffuse = colorImage.rgb * 1.5 ;
                             return material;
                          }`;
// 创建基础材质
const material = new Cesium.Material({
  fabric: {
    uniforms: {
      color: Cesium.Color.fromCssColorString("#7ffeff"),
      image: "/images/spriteline.png",
      speed: 10,
    },
    source,
  },
  translucent: function () {
    return true;
  },
});
//创建折线材质
const polylineMaterial = new Cesium.PolylineMaterialAppearance({
  material,
});

const primitive = new Cesium.Primitive({
  appearance: polylineMaterial, //图元的外观
  geometryInstances: instances, //要创建的几何实例
  asynchronous: false, //是否异步创建
});
primitive.id = "through_road";
viewer.scene.primitives.add(primitive);
viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
});