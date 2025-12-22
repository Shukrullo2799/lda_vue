import type { RouteRecordRaw } from "vue-router"

export const publicDocumentRouter: RouteRecordRaw[] = [
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
