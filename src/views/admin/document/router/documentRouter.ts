import type { RouteRecordRaw } from "vue-router"

export const documentRoutes: RouteRecordRaw[] = [
  {
    path: "documents",
    name: "AdminDocument",
    component: () => import("@/views/admin/document/index.vue"),
    meta: {
      title: "Document",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Document",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "documents/edit/:id",
    name: "EditAdminDocument",
    component: () => import("@/views/admin/document/index.vue"),
    meta: {
      title: "Document",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Document",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/document",
    name: "Document",
    component: () => import("@/views/admin/document/pages/DocumentList.vue"),
    meta: { requireAuth: false },
  },

  {
    path: "/document/:id",
    name: "ViewDocument",
    component: () => import("@/views/admin/document/pages/DocumentView.vue"),
    meta: { requireAuth: false },
  },
]
