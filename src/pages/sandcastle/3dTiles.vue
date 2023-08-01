<template>
  <div></div>
</template>

<script setup>
import * as Cesium from "cesium";
try {
  const viewer = window.viewer;
  //创建3D图块集
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(1240402);
  //添加到场景
  viewer.scene.primitives.add(tileset);
  //移动视角
  viewer.zoomTo(
    tileset,
    new Cesium.HeadingPitchRange(0.5, -0.2, tileset.boundingSphere.radius * 4.0)
  );

  //颜色模式设置为replace替换颜色混合模式来渲染该3D Tileset
  tileset.colorBlendMode = Cesium.Cesium3DTileColorBlendMode.REPLACE;
  //监听瓦片加载完成的事件
  tileset.tileLoad.addEventListener((tile) => {
    processTileFeatures(tile);
  });
} catch (error) {
  console.error(`Error creating tileset: ${error}`);
}

const processTileFeatures = (tile, callback) => {
  const content = tile.content;
  const innerContents = content.innerContents;
  console.log(content, innerContents);
};
</script>

<style scoped></style>
