<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { type ICreateUserRequest, type IUpdateUserRequest, useUserStore } from "@/views/admin/user/"

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const isEdit = ref(false)
const appointmentId = ref("")

const form = ref<ICreateUserRequest | null>(null)

const loading = ref(false)

onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true
    appointmentId.value = route.params.id as string
    await loadAppointment()
  }
})

const loadAppointment = async () => {
  const user = userStore.getUserById(appointmentId.value)
}

const handleSubmit = async () => {
  loading.value = true

  try {
    await userStore.updateUser(form.value as ICreateUserRequest | IUpdateUserRequest)

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

    <form @submit.prevent="handleSubmit" class="space-y-6" v-if="form">
      <div class="form-grid">
        <div>
          <label for="patientId" class="form-label">Patient ID</label>
          <Input
            id="patientId"
            v-model="form.userName"
            type="text"
            required
            placeholder="Enter patient ID"
          />
        </div>
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
