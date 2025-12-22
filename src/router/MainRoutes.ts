import type { RouteRecordRaw } from "vue-router"
import { authRoutes } from "@/views/auth"
import { adminRoutes } from "@/views/admin/adminRouter"
import { homeRoutes } from "@/views/home/router/homeRouter"
import { documentRoutes } from "@/views/admin/document/router/documentRouter"

const MainRoutes: RouteRecordRaw = {
  path: "/",
  name: "main",
  redirect: "/home",
  component: () => import("@/app/layout/MainLayout.vue"),
  children: [...authRoutes, ...adminRoutes, ...homeRoutes, ...documentRoutes],
}

export default MainRoutes
