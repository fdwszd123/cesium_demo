import { message } from "ant-design-vue";
import { DEFAULT_VIEW_RECTANGLE } from "/@/common/config/cesium.js";
import { reoveEntityByName } from "./cesium";
import * as Cesium from "cesium";
const destoryMap = {
  "10-1": {
    name: "3D_Models",
    method: () => {
      reoveEntityByName("3D_MODEL");
      window.viewer.camera.flyHome(3);
      return 1;
    },
  },
  "2-1": {
    name: "飞行",
    method: () => {
      window.viewer.camera.flyHome(3);
      return 1;
    },
  },
  "5-1": {
    name: "道路闪烁",
    method: () => {
      window.viewer.dataSources.removeAll();
      window.viewer.camera.flyHome(3);

      return 1;
    },
  },
  "9-1": {
    name: "天空盒",
    method: () => {
      window.viewer.scene.skyBox = undefined;
      return 1;
    },
  },
  "9-2": {
    name: "地形数据",
    method: () => {
      window.viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider(
        {}
      );
      return 1;
    },
  },
};
class DestoryEffect {
  constructor() {
    this.viewer = window.viewer;
    this.destoryMap = destoryMap;
  }
  destory(id) {
    let res = this.destoryMap[id].method();
    res ? message.success("删除成功") : message.error("删除失败");
  }
}
export default new DestoryEffect();
