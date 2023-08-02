import * as Cesium from "cesium";

export const removeEntityByName = (name) => {
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

export const removePrimitiveById = (id) => {
  const viewer = window.viewer;
  const primitives = viewer.scene.primitives._primitives;
  for (let i = 0; i < primitives.length; i++) {
    const primitive = primitives[i];
    if (primitive.id === id) {
      viewer.scene.primitives.remove(primitive);
    }
  }
};
