<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientStore } from '../stores/patientStore'
import PatientCard from './PatientCard.vue'

const router = useRouter()
const patientStore = usePatientStore()

onMounted(() => {
  patientStore.fetchPatients()
})

const handleCreate = () => {
  router.push('/patients/create')
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Patients</h1>
      <Button @click="handleCreate">Add Patient</Button>
    </div>

    <div v-if="patientStore.loading" class="text-center py-8">
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full" />
    </div>

    <div v-else-if="patientStore.error" class="empty-state">
      {{ patientStore.error }}
    </div>

    <div v-else-if="patientStore.patients.length === 0" class="empty-state">No patients found</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <PatientCard v-for="patient in patientStore.patients" :key="patient.id" :patient="patient" />
    </div>
  </div>
</template>
