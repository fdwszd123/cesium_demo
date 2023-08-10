export const MENU_CONFIG = [
  {
    id: "1",
    title: "粒子效果",
    children: [
      {
        id: "1-1",
        title: "下雪",
        path: "/particle/snow",
        fileName: "1-1_snow.js",
      },
      {
        id: "1-2",
        title: "下雨",
        path: "/particle/rain",
        fileName: "1-2_rain.js",
      },
      {
        id: "1-3",
        title: "大雾",
        path: "/particle/fog",
        fileName: "1-3_fog.js",
      },
      {
        id: "1-4",
        title: "火焰",
        path: "/particle/fire",
        fileName: "1-4_fire.js",
      },
    ],
  },
  {
    id: "2",
    title: "相机",
    children: [
      {
        id: "2-1",
        title: "飞行",
        path: "/camera/fly",
        fileName: "2-1_fly.js",
      },
    ],
  },
  {
    id: "3",
    title: "打点",
    children: [
      {
        id: "3-1",
        title: "底层打点",
        path: "/mark/primitive",
        fileName: "3-1_primitive.js",
      },
      {
        id: "3-2",
        title: "聚合",
        path: "/mark/combine",
        fileName: "3-2_combine.js",
      },
    ],
  },
  // {
  //   id: "4",
  //   title: "服务加载",
  //   children: [
  //     {
  //       id: "4-1",
  //       title: "xyz瓦片",
  //     },
  //     {
  //       id: "4-2",
  //       title: "3D Tiles",
  //     },
  //   ],
  // },
  {
    id: "5",
    title: "材质",
    children: [
      {
        id: "5-1",
        title: "道路闪烁",
        path: "/material/highLightRoad",
        fileName: "5-1_highLightRoad.js",
      },
      {
        id: "5-2",
        title: "道路穿梭",
        path: "/material/throughRoad",
        fileName: "5-2_throughRoad.js",
      },
      // {
      //   id: "5-3",
      //   title: "辐射图",
      // },
      // {
      //   id: "5-4",
      //   title: "圆扩散",
      // },
      {
        id: "5-5",
        title: "四色图",
        path: "/material/colorLayer",
        fileName: "5-5_colorLayer.js",
      },
      {
        id: "5-6",
        title: "流动水面",
        path: "/material/water",
        fileName: "5-6_water.js",
      },
      // {
      //   id: "5-7",
      //   title: "天空盒",
      // },
    ],
  },
  {
    id: "6",
    title: "几何",
    children: [
      {
        id: "6-1",
        title: "量测",
      },
      {
        id: "6-2",
        title: "绘制",
      },
      {
        id: "6-3",
        title: "态势图",
      },
    ],
  },
  {
    id: "7",
    title: "场景",
    children: [
      {
        id: "7-1",
        title: "水淹模拟",
      },
      {
        id: "7-2",
        title: "热力图",
      },
      {
        id: "7-3",
        title: "时间轴",
      },
      {
        id: "7-4",
        title: "遮罩反选",
      },
    ],
  },
  {
    id: "8",
    title: "分析",
    children: [
      {
        id: "8-1",
        title: "天际线分析",
      },
      {
        id: "8-2",
        title: "高程分析",
      },
    ],
  },
  {
    id: "9",
    title: "其他",
    children: [
      {
        id: "9-1",
        title: "天空盒",
        path: "/other/skyBox",
        fileName: "9-1_skyBox.js",
      },
      {
        id: "9-2",
        title: "地形数据",
        path: "/other/terrain",
        fileName: "9-2_terrain.js",
      },
    ],
  },
  {
    id: "10",
    title: "cesium官方沙盒",
    children: [
      {
        id: "10-1",
        title: "3D_Models",
        path: "/sandcastle/3dModel",
        fileName: "10-1_3D_Model.js",
      },
      {
        id: "10-2",
        title: "3D_Tiles",
        path: "/sandcastle/3dTiles",
        fileName: "10-2_3D_Tiles.js",
      },
      {
        id: "10-3",
        title: "feature_pick",
        path: "/sandcastle/feature_pick",
        fileName: "10-3_feature_pick.js",
      },
    ],
  },
];
