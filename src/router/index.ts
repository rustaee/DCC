import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search-activity",
    name: "Search",
    component: () =>
      import("../views/SearchActivity.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () =>
      import("../views/FavoriteActivities.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
