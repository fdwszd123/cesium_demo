<template>
  <a-collapse :ghost="true" :bordered="false">
    <a-collapse-panel key="1" header="设置">
      <a-button class="next" type="primary" @click="nextSkyBox"
        >查看下一个场景<right-circle-outlined
      /></a-button>
    </a-collapse-panel>
  </a-collapse>
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

:deep(.ant-collapse-item .ant-collapse-header) {
  color: #fff; /* 修改标题的字体颜色为红色 */
  font-size: 16px;
}
</style>
