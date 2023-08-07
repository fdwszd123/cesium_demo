import { createRouter, createWebHashHistory } from "vue-router";
/*粒子*/
// 下雪
const particle_snow = () => import("/@/pages/particle/snow.vue");
//下雨
const particle_rain = () => import("/@/pages/particle/rain.vue");
// 大雾
const particle_fog = () => import("/@/pages/particle/fog.vue");
// 火焰
const particle_fire = () => import("/@/pages/particle/fire.vue");

const other_skyBox = () => import("/@/pages/other/skyBox.vue");
const other_terrain = () => import("/@/pages/other/terrain.vue");
const camera_fly = () => import("/@/pages/camera/fly.vue");
const mark_primitive = () => import("/@/pages/mark/primitive.vue");
const material_highLightRoad = () =>
  import("/@/pages/material/highLightRoad.vue");

const sandcastle_3dModel = () => import("/@/pages/sandcastle/3dModel.vue");
const sandcastle_3dTiles = () => import("/@/pages/sandcastle/3dTiles.vue");
const sandcastle_feature_pick = () =>
  import("/@/pages/sandcastle/feature_pick.vue");

const routes = [
  {
    path: "/particle",
    name: "particle",
    redirect: "/particle/snow",
    children: [
      {
        path: "snow",
        name: "particle_snow",
        component: particle_snow,
      },
      {
        path: "rain",
        name: "particle_rain",
        component: particle_rain,
      },
      {
        path: "fog",
        name: "particle_fog",
        component: particle_fog,
      },
      {
        path: "fire",
        name: "particle_fire",
        component: particle_fire,
      },
    ],
  },
  {
    path: "/camera",
    name: "camera",
    redirect: "/camera/fly",
    children: [
      {
        path: "fly",
        name: "camera_fly",
        component: camera_fly,
      },
    ],
  },
  {
    path: "/mark",
    name: "mark",
    redirect: "/mark/primitive",
    children: [
      {
        path: "primitive",
        name: "mark_primitive",
        component: mark_primitive,
      },
    ],
  },
  {
    path: "/other",
    name: "other",
    redirect: "/other/skyBox",
    children: [
      {
        path: "skyBox",
        name: "other_skyBox",
        component: other_skyBox,
      },
      {
        path: "terrain",
        name: "other_terrain",
        component: other_terrain,
      },
    ],
  },
  {
    path: "/material",
    name: "material",
    redirect: "/material/highLightRoad",
    children: [
      {
        path: "highLightRoad",
        name: "material_highLightRoad",
        component: material_highLightRoad,
      },
    ],
  },
  {
    path: "/sandcastle",
    name: "sandcastle",
    redirect: "/sandcastle/3dModel",
    children: [
      {
        path: "3dModel",
        name: "sandcastle_3dModel",
        component: sandcastle_3dModel,
      },
      {
        path: "3dTiles",
        name: "sandcastle_3dTiles",
        component: sandcastle_3dTiles,
      },
      {
        path: "feature_pick",
        name: "sandcastle_feature_pick",
        component: sandcastle_feature_pick,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
