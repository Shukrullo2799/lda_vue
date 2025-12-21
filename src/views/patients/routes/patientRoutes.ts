import type { RouteRecordRaw } from "vue-router"

export const patientRoutes: RouteRecordRaw[] = [
  {
    path: "/patients",
    name: "patients",
    component: () => import("../components/PatientList.vue"),
    meta: {
      title: "Patients",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Patients",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/patients/create",
    name: "patient-create",
    component: () => import("../components/PatientForm.vue"),
    meta: {
      title: "addPatient",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Patients",
          disabled: false,
          href: "/patients",
        },
        {
          title: "PatientsCreate",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/patients/:id",
    name: "patient-detail",
    component: () => import("../components/PatientDetail.vue"),
    meta: {
      title: "Patient Details",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Patients",
          disabled: false,
          href: "/patients",
        },
        {
          title: "patientDetails",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
  {
    path: "/patients/:id/edit",
    name: "patient-edit",
    component: () => import("../components/PatientForm.vue"),
    meta: {
      title: "Edit Patient",
      requiresAuth: true,
      breadcrumbs: [
        {
          title: "Patients",
          disabled: false,
          href: "/patients",
        },
        {
          title: "Edit Patient",
          disabled: true,
          href: "#",
        },
      ],
    },
  },
]
