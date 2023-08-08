<template>
  <div></div>
</template>

<script setup>
import * as Cesium from "cesium";
import { AimOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { h } from "vue";
import { removePrimitiveById, removeStageById } from "/@/utils/cesium";

const viewer = window.viewer;
const createNameCard = () => {
  nameCard = document.createElement("div");
  viewer.container.appendChild(nameCard);
  nameCard.className = "backdrop";
  nameCard.style.display = "none";
  nameCard.style.position = "absolute";
  nameCard.style.bottom = "0";
  nameCard.style.left = "0";
  nameCard.style.color = "#fff";
  nameCard.style["pointer-events"] = "none";
  nameCard.style.padding = "4px";
  nameCard.style.backgroundColor = "black";
};
//显示名称的卡片dom元素
let nameCard;
createNameCard();
//添加地形
const terrain = new Cesium.Terrain(
  Cesium.CesiumTerrainProvider.fromUrl("http://data.marsgis.cn/terrain")
);
viewer.scene.setTerrain(terrain);
//启用深度测试
viewer.scene.globe.depthTestAgainstTerrain = true;
const selectedEntity = new Cesium.Entity();

const initialPosition = Cesium.Cartesian3.fromDegrees(
  -74.01881302800248,
  40.69114333714821,
  753
);
const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(
  21.27879878293835,
  -21.34390550872461,
  0.0716951918898415
);
viewer.scene.camera.flyTo({
  destination: initialPosition,
  orientation: initialOrientation,
  endTransform: Cesium.Matrix4.IDENTITY,
});
//添加模型
try {
  removePrimitiveById("feature_pick");
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(75343);

  tileset.id = "feature_pick";
  viewer.scene.primitives.add(tileset);
} catch (error) {
  console.log(`Error loading tileset: ${error}`);
}

//默认的左键点击事件
const clickHandler = viewer.screenSpaceEventHandler.getInputAction(
  Cesium.ScreenSpaceEventType.LEFT_CLICK
);
//判断当前场景是否支持剪影效果
const isSilhouetteSupported =
  Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene);

const selected = {
  feature: undefined,
  originalColor: new Cesium.Color(),
};
if (isSilhouetteSupported) {
  //边缘检测效果的后处理阶段
  const silhouetteBlue =
    Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
  silhouetteBlue.uniforms.color = Cesium.Color.BLUE;
  silhouetteBlue.uniforms.length = 0.01;
  silhouetteBlue.selected = [];

  const silhouetteGreen =
    Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
  silhouetteGreen.uniforms.color = Cesium.Color.LIME;
  silhouetteGreen.uniforms.length = 0.01;
  silhouetteGreen.selected = [];
  //添加到场景的后处理阶段
  let stage = Cesium.PostProcessStageLibrary.createSilhouetteStage([
    silhouetteBlue,
    silhouetteGreen,
  ]);
  stage.id = "feature_pick";
  removeStageById("feature_pick");

  viewer.scene.postProcessStages.add(stage);
  viewer.screenSpaceEventHandler.setInputAction((move) => {
    //当前选中的特征
    const pickFeature = viewer.scene.pick(move.endPosition);

    //更新名称牌
    updateNameCard(pickFeature, move.endPosition);
    if (!Cesium.defined(pickFeature)) {
      return;
    }
    //拾取到的feature添加蓝色
    silhouetteBlue.selected = [pickFeature];
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  //鼠标左键点击事件
  viewer.screenSpaceEventHandler.setInputAction((movement) => {
    silhouetteBlue.selected = [];
    //当前选中的特征
    const pickFeature = viewer.scene.pick(movement.position);
    //如果没有获取到feature交给默认的左键点击事件去处理
    if (!Cesium.defined(pickFeature)) {
      clickHandler(movement);
      return;
    }
    if (silhouetteGreen.selected[0] === pickFeature) {
      return;
    }

    const highlightedFeature = silhouetteBlue.selected[0];
    if (pickFeature === highlightedFeature) {
      silhouetteBlue.selected = [];
    }
    silhouetteGreen.selected = [pickFeature];
    viewer.selectedEntity = selectedEntity;
    const featureInfo = {
      id: pickFeature.getProperty("DOITT_ID"),
      lng: pickFeature.getProperty("Longitude"),
      lat: pickFeature.getProperty("Latitude"),
      height: pickFeature.getProperty("Height"),
      terrainHeight: pickFeature.getProperty("TerrainHeight"),
    };
    openNotification(featureInfo);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

const updateNameCard = (feature, position) => {
  if (!Cesium.defined(feature)) {
    nameCard.style.display = "none";
    return;
  }
  nameCard.style.display = "block";
  nameCard.style.bottom = `${viewer.canvas.clientHeight - position.y}px`;
  nameCard.style.left = `${position.x}px`;
  const name = feature.getProperty("BIN");
  nameCard.textContent = name;
};
//位置气泡框
const openNotification = (info) => {
  notification.open({
    message: "位置",
    description: `DOITT_ID为${info.id}\n,经度为${info.lng}\n,纬度为${info.lat}\n,高度为${info.height}\n,地形高度为${info.terrainHeight},`,
    icon: () => h(AimOutlined, { style: "color: #108ee9" }),
  });
};
</script>

<style scoped></style>
