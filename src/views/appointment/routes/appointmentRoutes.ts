import type { RouteRecordRaw } from "vue-router"

export const appointmentRoutes: RouteRecordRaw[] = [
  {
    path: "/appointments",
    name: "appointments",
    component: () => import("../components/AppointmentList.vue"),
    meta: {
      title: "Appointments",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Appointments",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/appointments/create",
    name: "appointment-create",
    component: () => import("../components/AppointmentForm.vue"),
    meta: {
      title: "createAppointment",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Appointments",
          disabled: false,
          href: "/appointments",
        },
        {
          title: "createAppointment",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/appointments/:id",
    name: "appointment-detail",
    component: () => import("../components/AppointmentDetail.vue"),
    meta: {
      title: "appointmentDetail",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Appointments",
          disabled: false,
          href: "/appointments",
        },
        {
          title: "appointmentDetail",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/appointments/:id/edit",
    name: "appointment-edit",
    component: () => import("../components/AppointmentForm.vue"),
    meta: {
      title: "editAppointment",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Appointments",
          disabled: false,
          href: "/appointments",
        },
        {
          title: "editAppointment",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
]
