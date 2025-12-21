<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAppointmentStore } from "../stores/appointmentStore"
import type { CreateAppointmentRequest } from "../types/appointment"

const route = useRoute()
const router = useRouter()
const appointmentStore = useAppointmentStore()

const isEdit = ref(false)
const appointmentId = ref("")

// Для корректной работы с полями формы используем строки для date/time
const form = ref<
  Pick<CreateAppointmentRequest, "patientId" | "doctorId" | "notes"> & {
    date: string
    time: string
  }
>({
  patientId: "",
  doctorId: "",
  date: "",
  time: "",
  notes: "",
})

const loading = ref(false)

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true
    appointmentId.value = route.params.id as string
    await loadAppointment()
  }
})

const loadAppointment = async () => {
  const appointment = appointmentStore.getAppointmentById(appointmentId.value)
  if (appointment) {
    form.value = {
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      // Преобразуем дату к YYYY-MM-DD
      date: new Date(appointment.date).toISOString().slice(0, 10),
      time: appointment.time,
      notes: appointment.notes || "",
    }
  }
}

const handleSubmit = async () => {
  loading.value = true

  try {
    if (isEdit.value) {
      await appointmentStore.updateAppointment({
        id: appointmentId.value,
        patientId: form.value.patientId,
        doctorId: form.value.doctorId,
        date: new Date(form.value.date),
        time: form.value.time,
        notes: form.value.notes,
      } as any)
    } else {
      await appointmentStore.createAppointment({
        patientId: form.value.patientId,
        doctorId: form.value.doctorId,
        date: new Date(form.value.date),
        time: form.value.time,
        notes: form.value.notes,
      } as any)
    }

    router.push("/appointments")
  } catch (error) {
    console.error("Error saving appointment:", error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <h1 class="page-title">
        {{ isEdit ? "Edit Appointment" : "Create Appointment" }}
      </h1>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="form-grid">
        <div>
          <label for="patientId" class="form-label">Patient ID</label>
          <Input
            id="patientId"
            v-model="form.patientId"
            type="text"
            required
            placeholder="Enter patient ID"
          />
        </div>

        <div>
          <label for="doctorId" class="form-label">Doctor ID</label>
          <Input
            id="doctorId"
            v-model="form.doctorId"
            type="text"
            required
            placeholder="Enter doctor ID"
          />
        </div>

        <div>
          <label for="date" class="form-label">Date</label>
          <Input id="date" v-model="form.date" type="date" required />
        </div>

        <div>
          <label for="time" class="form-label">Time</label>
          <Input id="time" v-model="form.time" type="time" required />
        </div>
      </div>

      <div>
        <label for="notes" class="form-label">Notes</label>
        <textarea
          id="notes"
          v-model="form.notes"
          rows="4"
          class="form-textarea"
          placeholder="Enter appointment notes..."
        />
      </div>

      <div class="page-actions">
        <Button type="submit" :disabled="loading">
          {{ loading ? "Saving..." : isEdit ? "Update" : "Create" }}
        </Button>
        <Button type="button" variant="outline" @click="router.back()"> Cancel </Button>
      </div>
    </form>
  </div>
</template>
