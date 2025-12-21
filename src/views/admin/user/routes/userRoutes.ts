import type { RouteRecordRaw } from "vue-router"

export const userRoutes: RouteRecordRaw[] = [
  {
    path: "user",
    name: "User",
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
