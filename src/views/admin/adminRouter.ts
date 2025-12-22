import type { RouteRecordRaw } from "vue-router"
import { userRoutes } from "./user"
import { RoleRoutes } from "./role"

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    component: () => import("@/views/admin/index.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/admin/users",
      },
      ...userRoutes,
      ...RoleRoutes,
    ],
  },
]
