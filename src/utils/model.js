import { modelFiles } from "/@/common/3D_models/files";
import * as Cesium from "cesium";
import { reoveEntityByName } from "./cesium";

export const getModeItemById = (id) => {
  for (let i = 0; i < modelFiles.length; i++) {
    const model = modelFiles[i];
    if (model.id === id) {
      return model;
    }
  }
  return null;
};

export const createModel = (path, height = 1000) => {
  const viewer = window.viewer;
  reoveEntityByName("3D_MODEL");
  const position = Cesium.Cartesian3.fromDegrees(
    -123.0744619,
    44.0503706,
    height
  );
  const heading = Cesium.Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  );

  const entity = viewer.entities.add({
    name: "3D_MODEL",
    position: position,
    orientation: orientation,
    model: {
      uri: path,
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });
  viewer.trackedEntity = entity;
};
