import type { RouteRecordRaw } from "vue-router"

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "homePage",
    component: () => import("@/views/home/index.vue"),
    children: [],
  },
]
