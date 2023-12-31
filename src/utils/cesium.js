import * as Cesium from "cesium";
//根据名称移除entity
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

//根据id移除Primitive
export const removePrimitiveById = (id) => {
  const viewer = window.viewer;
  const primitives = viewer.scene.primitives._primitives;
  for (let i = 0; i < primitives.length; i++) {
    const primitive = primitives[i];
    if (primitive.id === id) {
      viewer.scene.primitives.remove(primitive);
      break;
    }
  }
};

export const removeStageById = (id) => {
  const viewer = window.viewer;
  let stages = viewer.scene.postProcessStages;
  for (let i = 0; i < stages.length; i++) {
    let stage = stages.get(i);
    if (stage.id === id) {
      stages.remove(stage);
      const isDestroy = stage.isDestroyed();
      if (!isDestroy) {
        stage.destroy();
      }
      break;
    }
  }
};

//根据id移除dataSource

export const removeDataSourceById = (id) => {
  const viewer = window.viewer;
  const dataSources = viewer.dataSources;
  for (let i = 0; i < dataSources.length; i++) {
    const dataSource = dataSources.get(i);
    if (dataSource.id === id) {
      dataSources.remove(dataSource);
      break;
    }
  }
};
