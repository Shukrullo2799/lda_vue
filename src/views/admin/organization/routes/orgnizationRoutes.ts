import type { RouteRecordRaw } from "vue-router"

export const orgnizationRoutes: RouteRecordRaw[] = [
  {
    path: "organizations",
    name: "AdminOrganization",
    component: () => import("@/views/admin/organization/index.vue"),
    meta: {
      title: "Organization",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Organization",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
]
