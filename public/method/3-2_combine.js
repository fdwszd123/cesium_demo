import * as Cesium from "cesium";
const viewer = window.viewer;
const geoJsonLoader = new Cesium.GeoJsonDataSource();
geoJsonLoader.load("/json/chuzhong.geojson").then((dataSource) => {
  dataSource.id = "mark_combine";
  viewer.dataSources.add(dataSource);
  //设置聚合参数

  //启用聚合
  dataSource.clustering.enabled = true;

  dataSource.clustering.pixelRange = 60;
  //启用聚合的最小数量
  dataSource.clustering.minimumClusterSize = 2;
  dataSource.entities.values.forEach((entity) => {
    // 将点拉伸一定高度，防止被地形压盖
    entity.position._value.z += 50;
    entity._id = `mark-${entity.id}`;
    entity.billboard = {
      image: "/images/mark-icon.png",
      width: 32,
      height: 32,
    };
  });
  dataSource.clustering.clusterEvent.addEventListener(
    (clusteredEntities, cluster) => {
      // 关闭自带的显示聚合数量的标签
      cluster.label.show = false;
      cluster.billboard.show = true;
      cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
      cluster.billboard.image = combineIconAndLabel(
        "/images/mark-icon.png",
        clusteredEntities.length,
        64
      );
      cluster.billboard.width = 40;
      cluster.billboard.height = 40;
      // }
    }
  );
});

function combineIconAndLabel(url, label, size) {
  // 创建画布对象
  let canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  let ctx = canvas.getContext("2d");

  let promise = new Cesium.Resource.fetchImage(url).then((image) => {
    // 异常判断
    try {
      ctx.drawImage(image, 0, 0);
    } catch (e) {
      console.log(e);
    }

    // 渲染字体
    // font属性设置顺序：font-style, font-variant, font-weight, font-size, line-height, font-family
    ctx.fillStyle = Cesium.Color.BLACK.toCssColorString();
    ctx.font = "bold 20px Microsoft YaHei";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, size / 2, size / 2);

    return canvas;
  });
  return promise;
}