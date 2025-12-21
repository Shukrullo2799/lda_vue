import type { RouteRecordRaw } from "vue-router"

export const doctorRoutes: RouteRecordRaw[] = [
  {
    path: "/doctors",
    name: "doctors",
    component: () => import("../components/DoctorList.vue"),
    meta: {
      title: "Doctors",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Doctors",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/doctors/create",
    name: "CreateDoctor",
    component: () => import("../components/DoctorForm.vue"),
    meta: {
      title: "addDoctor",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Doctors",
          disabled: false,
          href: "/doctors",
        },
        {
          title: "createDoctor",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/doctors/:id",
    name: "ViewDoctor",
    component: () => import("../components/DoctorDetail.vue"),
    meta: {
      title: "doctorDetails",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Doctors",
          disabled: false,
          href: "/doctors",
        },
        {
          title: "doctorDetails",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/doctors/:id/edit",
    name: "EditDoctor",
    component: () => import("../components/DoctorForm.vue"),
    meta: {
      title: "editDoctor",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Doctors",
          disabled: false,
          href: "/doctors",
        },
        {
          title: "editDoctor",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
]
