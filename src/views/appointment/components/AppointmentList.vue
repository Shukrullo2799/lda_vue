<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAppointmentStore } from "../stores/appointmentStore"
import AppointmentCard from "./AppointmentCard.vue"

const router = useRouter()
const appointmentStore = useAppointmentStore()

onMounted(() => {
  appointmentStore.fetchAppointments()
})

const handleCreate = () => {
  router.push("/appointments/create")
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">{{ $t("appointments") }}</h1>
      <Button @click="handleCreate">{{ $t("create") }}</Button>
    </div>

    <div v-if="appointmentStore.loading" class="text-center py-8">
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full" />
    </div>

    <div v-else-if="appointmentStore.error" class="empty-state">
      {{ appointmentStore.error }}
    </div>

    <div v-else-if="appointmentStore.appointments.length === 0" class="empty-state">
      No appointments found
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AppointmentCard
        v-for="appointment in appointmentStore.appointments"
        :key="appointment.id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
