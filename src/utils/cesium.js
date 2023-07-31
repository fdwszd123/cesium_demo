import * as Cesium from "cesium";

export const reoveEntityByName = (name) => {
  const viewer = window.viewer;
  const entities = viewer.entities.values;
  for (var i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (entity.name === name) {
      viewer.entities.remove(entity);
      break;
    }
  }
};
