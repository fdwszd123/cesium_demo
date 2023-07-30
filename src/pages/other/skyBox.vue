<template>
  <a-button class="next" type="primary" @click="nextSkyBox"
    >查看下一个场景<right-circle-outlined
  /></a-button>
</template>

<script setup>
import { RightCircleOutlined } from "@ant-design/icons-vue";
import * as Cesium from "cesium";
const viewer = window.viewer;
import { skyBoxList } from "/@/common/skyBox";
import { getRandomInt } from "/@/utils/math";

let randomIdx = getRandomInt(0, skyBoxList.length - 1);
viewer.scene.skyBox = skyBoxList[randomIdx];
const nextSkyBox = () => {
  if (++randomIdx > skyBoxList.length - 1) {
    randomIdx = 0;
  }
  viewer.scene.skyBox = skyBoxList[randomIdx];
};
</script>

<style scoped>
.next {
  background-color: rgba(22, 119, 255, 0.5);
}
</style>
