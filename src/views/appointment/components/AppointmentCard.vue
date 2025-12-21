<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Appointment } from '../types/appointment'

interface Props {
  appointment: Appointment
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
})

const router = useRouter()

const getStatusColor = computed(() => {
  switch (props.appointment.status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'scheduled':
      return 'bg-yellow-100 text-yellow-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const handleEdit = () => {
  router.push(`/appointments/${props.appointment.id}/edit`)
}

const handleView = () => {
  router.push(`/appointments/${props.appointment.id}`)
}
</script>

<template>
  <div class="page-card hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start mb-3">
      <div>
        <h3 class="font-medium text-card-foreground">Appointment #{{ appointment.id }}</h3>
        <p class="text-sm text-muted-foreground">
          {{ new Date(appointment.date).toLocaleDateString() }} at {{ appointment.time }}
        </p>
      </div>
      <span :class="getStatusColor" class="px-2 py-1 rounded-full text-xs font-medium">
        {{ appointment.status }}
      </span>
    </div>

    <div class="space-y-2 mb-4">
      <div class="flex items-center text-sm">
        <span class="font-medium text-muted-foreground w-16">Patient:</span>
        <span class="text-card-foreground">{{ appointment.patientId }}</span>
      </div>
      <div class="flex items-center text-sm">
        <span class="font-medium text-muted-foreground w-16">Doctor:</span>
        <span class="text-card-foreground">{{ appointment.doctorId }}</span>
      </div>
      <div v-if="appointment.notes" class="text-sm">
        <span class="font-medium text-muted-foreground">Notes:</span>
        <p class="text-card-foreground mt-1 line-clamp-2">{{ appointment.notes }}</p>
      </div>
    </div>

    <div v-if="showActions" class="page-actions">
      <Button variant="outline" size="sm" @click="handleView">View</Button>
      <Button variant="outline" size="sm" @click="handleEdit">Edit</Button>
    </div>
  </div>
</template>
