<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePatientStore } from '../stores/patientStore'
import type { Patient } from '../types/patient'

const route = useRoute()
const router = useRouter()
const patientStore = usePatientStore()

const patient = ref<Patient | null>(null)
const loading = ref(false)

onMounted(() => {
  const id = route.params.id as string
  if (id) load(id)
})

const age = computed(() => {
  if (!patient.value) return 0
  const today = new Date()
  const dob = new Date(patient.value.dateOfBirth)
  let a = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) a--
  return a
})

const load = async (id: string) => {
  loading.value = true
  try {
    const p = patientStore.getPatientById(id)
    if (p) patient.value = p
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  if (!patient.value) return
  if (confirm('Delete this patient?')) {
    await patientStore.deletePatient(patient.value.id)
    router.push('/patients')
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="page-header">
      <h1 class="page-title">Patient Details</h1>
      <div class="page-actions">
        <Button variant="outline" @click="router.push(`/patients/${patient?.id}/edit`)"
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

    <div v-else-if="!patient" class="empty-state">Patient not found</div>

    <div v-else class="page-card">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">General</h3>
          <div class="space-y-3">
            <div>
              <span class="font-medium">Name:</span> {{ patient.firstName }} {{ patient.lastName }}
            </div>
            <div><span class="font-medium">Email:</span> {{ patient.email }}</div>
            <div><span class="font-medium">Phone:</span> {{ patient.phone }}</div>
            <div><span class="font-medium">Age:</span> {{ age }}</div>
            <div><span class="font-medium">Gender:</span> {{ patient.gender }}</div>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Address</h3>
          <p class="text-gray-700">{{ patient.address }}</p>
        </div>
      </div>

      <div v-if="patient.medicalHistory" class="mt-6">
        <h3 class="text-lg font-semibold mb-3">Medical History</h3>
        <div class="bg-muted p-4 rounded-md">{{ patient.medicalHistory }}</div>
      </div>

      <div v-if="patient.allergies && patient.allergies.length" class="mt-6">
        <h3 class="text-lg font-semibold mb-3">Allergies</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="a in patient.allergies"
            :key="a"
            class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
            >{{ a }}</span
          >
        </div>
      </div>

      <div v-if="patient.emergencyContact" class="mt-6">
        <h3 class="text-lg font-semibold mb-3">Emergency Contact</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><span class="font-medium">Name:</span> {{ patient.emergencyContact.name }}</div>
          <div><span class="font-medium">Phone:</span> {{ patient.emergencyContact.phone }}</div>
          <div>
            <span class="font-medium">Relation:</span> {{ patient.emergencyContact.relationship }}
          </div>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t">
        <Button variant="outline" @click="router.push('/patients')">Back to Patients</Button>
      </div>
    </div>
  </div>
</template>
