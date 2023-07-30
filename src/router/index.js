import { createRouter, createWebHashHistory } from "vue-router";

const particle_snow = () => import("/@/pages/particle/snow.vue");
const other_skyBox = () => import("/@/pages/other/skyBox.vue");
const other_terrain = () => import("/@/pages/other/terrain.vue");
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
    path: "/other",
    name: "other",
    redirect: "/other/skyBox",
    children: [
      {
        path: "skyBox",
        name: "other_skyBox",
        component: other_skyBox,
      },{
        path: "terrain",
        name: "other_terrain",
        component: other_terrain,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
