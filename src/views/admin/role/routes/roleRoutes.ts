import type { RouteRecordRaw } from "vue-router"

export const RoleRoutes: RouteRecordRaw[] = [
  {
    path: "roles",
    name: "AdminRole",
    component: () => import("@/views/admin/role/index.vue"),
    meta: {
      title: "Role",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Role",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
]
