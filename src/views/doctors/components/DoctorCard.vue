<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Doctor } from '../types/doctor'

interface Props {
  doctor: Doctor
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
})

const router = useRouter()

const fullName = computed(() => `Dr. ${props.doctor.firstName} ${props.doctor.lastName}`)

const handleEdit = () => router.push(`/doctors/${props.doctor.id}/edit`)
const handleView = () => router.push(`/doctors/${props.doctor.id}`)
</script>

<template>
  <div class="page-card hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start mb-3">
      <div>
        <h3 class="font-medium text-card-foreground">{{ fullName }}</h3>
        <p class="text-sm text-muted-foreground">{{ doctor.specialization }}</p>
      </div>
      <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        {{ doctor.experience }} years
      </span>
    </div>

    <div class="space-y-2 mb-4">
      <div class="flex items-center text-sm">
        <span class="font-medium text-muted-foreground w-16">Email:</span>
        <span class="text-card-foreground">{{ doctor.email }}</span>
      </div>
      <div class="flex items-center text-sm">
        <span class="font-medium text-muted-foreground w-16">Phone:</span>
        <span class="text-card-foreground">{{ doctor.phone }}</span>
      </div>
      <div class="flex items-center text-sm">
        <span class="font-medium text-muted-foreground w-16">License:</span>
        <span class="text-card-foreground">{{ doctor.licenseNumber }}</span>
      </div>
      <div v-if="doctor.education && doctor.education.length > 0" class="text-sm">
        <span class="font-medium text-muted-foreground">Education:</span>
        <div class="mt-1">
          <span
            v-for="(edu, index) in doctor.education.slice(0, 2)"
            :key="index"
            class="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-1 mb-1"
          >
            {{ edu }}
          </span>
          <span v-if="doctor.education.length > 2" class="text-xs text-muted-foreground">
            +{{ doctor.education.length - 2 }} more
          </span>
        </div>
      </div>
      <div v-if="doctor.bio" class="text-sm">
        <span class="font-medium text-muted-foreground">Bio:</span>
        <p class="text-card-foreground mt-1 line-clamp-2">{{ doctor.bio }}</p>
      </div>
    </div>

    <div v-if="showActions" class="page-actions">
      <Button variant="outline" size="sm" @click="handleView">View</Button>
      <Button variant="outline" size="sm" @click="handleEdit">Edit</Button>
    </div>
  </div>
</template>
