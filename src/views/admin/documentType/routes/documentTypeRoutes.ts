import type { RouteRecordRaw } from "vue-router"

export const documntTypeRoutes: RouteRecordRaw[] = [
  {
    path: "documntTypes",
    name: "AdminDocumentType",
    component: () => import("@/views/admin/documentType/index.vue"),
    meta: {
      title: "DocumentType",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "DocumentType",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
]
