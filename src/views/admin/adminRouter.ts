import type { RouteRecordRaw } from "vue-router"
import { userRoutes } from "./user"
import { RoleRoutes } from "./role"
import { documentRoutes } from "./document"
import { orgnizationRoutes } from "./organization"

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
      ...documentRoutes,
      ...orgnizationRoutes,
    ],
  },
]
