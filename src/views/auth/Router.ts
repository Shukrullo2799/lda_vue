import type { RouteRecordRaw } from "vue-router"

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("./Login.vue"),
    meta: {
      title: "Login",
      requiresAuth: false,
      hideForAuth: true,
    },
  },
]
