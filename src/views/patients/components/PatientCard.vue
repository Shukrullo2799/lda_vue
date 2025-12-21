<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Patient } from '../types/patient'

interface Props {
  patient: Patient
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
})

const router = useRouter()

const fullName = computed(() => `${props.patient.firstName} ${props.patient.lastName}`)

const age = computed(() => {
  const today = new Date()
  const birthDate = new Date(props.patient.dateOfBirth)
  let a = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) a--
  return a
})

const handleEdit = () => router.push(`/patients/${props.patient.id}/edit`)
const handleView = () => router.push(`/patients/${props.patient.id}`)
</script>

<template>
  <div class="page-card hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start mb-3">
      <div>
        <h3 class="font-medium text-card-foreground">{{ fullName }}</h3>
        <p class="text-sm text-muted-foreground">{{ patient.email }}</p>
      </div>
      <span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {{ age }} years
      </span>
    </div>

    <div class="space-y-2 mb-4">
      <div class="flex items-center text-sm">
        <span class="font-medium text-muted-foreground w-16">Phone:</span>
        <span class="text-card-foreground">{{ patient.phone }}</span>
      </div>
      <div class="flex items-center text-sm">
        <span class="font-medium text-muted-foreground w-16">Gender:</span>
        <span class="text-card-foreground capitalize">{{ patient.gender }}</span>
      </div>
      <div class="text-sm">
        <span class="font-medium text-muted-foreground">Address:</span>
        <p class="text-card-foreground mt-1 line-clamp-2">{{ patient.address }}</p>
      </div>
      <div v-if="patient.allergies && patient.allergies.length > 0" class="text-sm">
        <span class="font-medium text-muted-foreground">Allergies:</span>
        <div class="flex flex-wrap gap-1 mt-1">
          <span
            v-for="allergy in patient.allergies"
            :key="allergy"
            class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
          >
            {{ allergy }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="showActions" class="page-actions">
      <Button variant="outline" size="sm" @click="handleView">View</Button>
      <Button variant="outline" size="sm" @click="handleEdit">Edit</Button>
    </div>
  </div>
</template>
