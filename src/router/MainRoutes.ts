import type { RouteRecordRaw } from "vue-router"
import { authRoutes } from "@/views/auth"
import { adminRoutes } from "@/views/admin/adminRouter"

const MainRoutes: RouteRecordRaw = {
  path: "/",
  name: "home",
  component: () => import("@/app/layout/MainLayout.vue"),
  children: [...authRoutes, ...adminRoutes],
}

export default MainRoutes
