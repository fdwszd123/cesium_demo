import * as Cesium from "cesium";
const viewer = window.viewer;
viewer.scene.skyBox = new Cesium.SkyBox({
  sources: {
    positiveX: "/images/Standard-Cube-Map/px1.png",
    negativeX: "/images/Standard-Cube-Map/nx1.png",
    positiveY: "/images/Standard-Cube-Map/pz.png",
    negativeY: "/images/Standard-Cube-Map/nz1.png",
    positiveZ: "/images/Standard-Cube-Map/py.png",
    negativeZ: "/images/Standard-Cube-Map/ny1.png",
  },
});
