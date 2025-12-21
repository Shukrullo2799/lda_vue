<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from "@/views/admin/user"

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const appointment = ref<any | null>(null)
const loading = ref(false)

onMounted(async () => {
  const id = route.params.id as string
  if (id) {
    await loadAppointment(id)
  }
})

const loadAppointment = async (id: string) => {
  loading.value = true
  try {
    const foundAppointment = userStore.getUserById(id)
    if (foundAppointment) {
      appointment.value = foundAppointment
    }
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  if (!appointment.value) return
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="page-header">
      <h1 class="page-title">Appointment Details</h1>
      <div class="page-actions">
        <Button variant="outline" @click="router.push(`/appointments/${appointment?.id}/edit`)"
          >Edit</Button
        >
        <Button variant="destructive" @click="handleDelete">Delete</Button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full" />
    </div>

    <div v-else-if="!appointment" class="empty-state">Appointment not found</div>

    <div v-else class="page-card">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Appointment Information</h3>
          <div class="space-y-3">
            <div>
              <span class="font-medium text-gray-700">ID:</span>
              <span class="ml-2">{{ appointment.id }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-700">Status:</span>
              <span class="px-2 py-1 rounded-full text-xs font-medium bg-muted text-foreground">{{
                appointment.status
              }}</span>
            </div>
            <div>
              <span class="font-medium text-gray-700">Date:</span>
              <span class="ml-2">{{ new Date(appointment.date).toLocaleDateString() }}</span>
            </div>
            <div>
              <span class="font-medium text-gray-700">Time:</span>
              <span class="ml-2">{{ appointment.time }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Participants</h3>
          <div class="space-y-3">
            <div>
              <span class="font-medium text-gray-700">Patient ID:</span>
              <span class="ml-2">{{ appointment.patientId }}</span>
            </div>
            <div>
              <span class="font-medium text-gray-700">Doctor ID:</span>
              <span class="ml-2">{{ appointment.doctorId }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="appointment.notes" class="mt-6">
        <h3 class="text-lg font-semibold mb-3">Notes</h3>
        <div class="bg-muted p-4 rounded-md text-foreground">{{ appointment.notes }}</div>
      </div>

      <div class="mt-6 pt-6 border-t">
        <Button variant="outline" @click="router.push('/appointments')"
          >Back to Appointments</Button
        >
      </div>
    </div>
  </div>
</template>
