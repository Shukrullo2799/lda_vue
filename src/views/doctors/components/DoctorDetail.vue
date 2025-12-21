<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDoctorStore } from '../stores/doctorStore'
import type { Doctor } from '../types/doctor'

const route = useRoute()
const router = useRouter()
const doctorStore = useDoctorStore()

const doctor = ref<Doctor | null>(null)
const loading = ref(false)

onMounted(() => {
  const id = route.params.id as string
  if (id) load(id)
})

const load = async (id: string) => {
  loading.value = true
  try {
    const d = doctorStore.getDoctorById(id)
    if (d) doctor.value = d
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  if (!doctor.value) return
  if (confirm('Delete this doctor?')) {
    await doctorStore.deleteDoctor(doctor.value.id)
    router.push('/doctors')
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="page-header">
      <h1 class="page-title">Doctor Details</h1>
      <div class="page-actions">
        <Button variant="outline" @click="router.push(`/doctors/${doctor?.id}/edit`)">Edit</Button>
        <Button variant="destructive" @click="handleDelete">Delete</Button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full" />
    </div>

    <div v-else-if="!doctor" class="empty-state">Doctor not found</div>

    <div v-else class="page-card">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">General</h3>
          <div class="space-y-3">
            <div>
              <span class="font-medium">Name:</span> Dr. {{ doctor.firstName }}
              {{ doctor.lastName }}
            </div>
            <div><span class="font-medium">Email:</span> {{ doctor.email }}</div>
            <div><span class="font-medium">Phone:</span> {{ doctor.phone }}</div>
            <div><span class="font-medium">Specialization:</span> {{ doctor.specialization }}</div>
            <div><span class="font-medium">Experience:</span> {{ doctor.experience }} years</div>
            <div><span class="font-medium">License:</span> {{ doctor.licenseNumber }}</div>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Bio</h3>
          <p class="text-gray-700">{{ doctor.bio }}</p>
        </div>
      </div>

      <div v-if="doctor.education && doctor.education.length" class="mt-6">
        <h3 class="text-lg font-semibold mb-3">Education</h3>
        <ul class="list-disc pl-5 text-gray-700">
          <li v-for="(e, i) in doctor.education" :key="i">{{ e }}</li>
        </ul>
      </div>

      <div v-if="doctor.certifications && doctor.certifications.length" class="mt-6">
        <h3 class="text-lg font-semibold mb-3">Certifications</h3>
        <ul class="list-disc pl-5 text-gray-700">
          <li v-for="(c, i) in doctor.certifications" :key="i">{{ c }}</li>
        </ul>
      </div>

      <div class="mt-6 pt-6 border-t">
        <Button variant="outline" @click="router.push('/doctors')">Back to Doctors</Button>
      </div>
    </div>
  </div>
</template>
