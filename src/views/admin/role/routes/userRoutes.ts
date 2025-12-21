import type { RouteRecordRaw } from "vue-router"

export const userRoutes: RouteRecordRaw[] = [
  {
    path: "users",
    name: "AdminUser",
    component: () => import("@/views/admin/user/index.vue"),
    meta: {
      title: "User",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "User",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
]
