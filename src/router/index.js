import { createRouter, createWebHashHistory } from "vue-router";

const particle_snow = () => import("/@/pages/particle/snow.vue");
const other_skyBox = () => import("/@/pages/other/skyBox.vue");
const other_terrain = () => import("/@/pages/other/terrain.vue");
const camera_fly = () => import("/@/pages/camera/fly.vue");
const material_highLightRoad = () => import("/@/pages/material/highLightRoad.vue");
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
    ],
  },
  {
    path: "/camera",
    name: "particle",
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
