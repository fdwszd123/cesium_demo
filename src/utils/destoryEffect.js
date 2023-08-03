import { message } from "ant-design-vue";
import { DEFAULT_VIEW_RECTANGLE } from "/@/common/config/cesium.js";
import {
  removeEntityByName,
  removePrimitiveById,
  removeStageById,
} from "./cesium";
import * as Cesium from "cesium";
const destroyMap = {
  "1-1": {
    name: "snow",
    method: () => {
      removeStageById("snow_stage");
      return 1;
    },
  },
  "1-2": {
    name: "rain",
    method: () => {
      removeStageById("rain_stage");
      return 1;
    },
  },
  "1-3": {
    name: "fog",
    method: () => {
      removeStageById("fog_stage");
      return 1;
    },
  },
  "10-3": {
    name: "feature_pick",
    method: () => {
      removePrimitiveById("feature_pick");
      //取消监听事件
      let handler = window.viewer.screenSpaceEventHandler;
      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      //删除添加的后处理阶段

      removeStageById("feature_pick");
      window.viewer.camera.flyHome(3);

      return 1;
    },
  },
  "10-2": {
    name: "3D_Tiles",
    method: () => {
      removePrimitiveById("3D_TILE");
      window.viewer.camera.flyHome(3);
      return 1;
    },
  },
  "10-1": {
    name: "3D_Models",
    method: () => {
      removeEntityByName("3D_MODEL");
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
    this.destroyMap = destroyMap;
  }
  destory(id) {
    let res = this.destroyMap[id].method();
    res ? message.success("删除成功") : message.error("删除失败");
  }
}
export default new DestoryEffect();
