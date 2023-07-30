import { message } from "ant-design-vue";
import * as Cesium from "cesium";
const destoryMap = {
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
