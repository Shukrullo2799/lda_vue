import type { RouteRecordRaw } from "vue-router"
import { userRoutes } from "./user"

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "admin",
    name: "Admin",
    component: () => import("@/views/admin/index.vue"),
    children: [...userRoutes],
  },
]
