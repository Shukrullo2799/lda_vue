<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useDoctorStore } from "@/views/doctors"
import type { CreateDoctorRequest } from "../types/doctor"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import { AxiosError } from "axios"
import { toast } from "vue-sonner"

const route = useRoute()
const router = useRouter()
const doctorStore = useDoctorStore()
const { setError } = useErrorToast()
const isEdit = ref(false)
const doctorId = ref("")

const form = ref<CreateDoctorRequest>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  specialization: "",
  licenseNumber: "",
  experience: 0,
  education: [],
  certifications: [],
  availability: {
    monday: { start: "09:00", end: "17:00" },
    tuesday: { start: "09:00", end: "17:00" },
    wednesday: { start: "09:00", end: "17:00" },
    thursday: { start: "09:00", end: "17:00" },
    friday: { start: "09:00", end: "17:00" },
    saturday: { start: "00:00", end: "00:00" },
    sunday: { start: "00:00", end: "00:00" },
  },
  bio: "",
  photo: "",
})

const loading = ref(false)

onMounted(() => {
  const id = route.params.id as string | undefined
  if (id) {
    isEdit.value = true
    doctorId.value = id
    loadDoctor()
  }
})

const loadDoctor = () => {
  const d = doctorStore.getDoctorById(doctorId.value)
  if (d) {
    form.value = {
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
      phone: d.phone,
      specialization: d.specialization,
      licenseNumber: d.licenseNumber,
      experience: d.experience,
      education: d.education,
      certifications: d.certifications,
      availability: d.availability,
      bio: d.bio || "",
      photo: d.photo || "",
    }
  }
}

const handleSubmit = async () => {
  loading.value = true

  try {
    if (isEdit.value) {
      await doctorStore.updateDoctor({ id: doctorId.value, ...form.value } as any)
    } else {
      await doctorStore.createDoctor(form.value as any)
    }
    router.push("/doctors")
  } catch (error) {
    setError(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-6">
      <h1 class="page-title">{{ isEdit ? "Edit Doctor" : "Add Doctor" }}</h1>
    </div>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="form-grid">
        <div>
          <label for="firstName" class="form-label">First Name</label>
          <FormInput id="firstName" v-model="form.firstName" required />
        </div>
        <div>
          <label for="lastName" class="form-label">Last Name</label>
          <FormInput id="lastName" v-model="form.lastName" required />
        </div>
        <div>
          <label for="email" class="form-label">Email</label>
          <FormInput id="email" v-model="form.email" type="email" />
        </div>
        <div>
          <label for="phone" class="form-label">Phone</label>
          <FormInput id="phone" v-model="form.phone" />
        </div>
        <div>
          <label for="specialization" class="form-label">Specialization</label>
          <FormInput id="specialization" v-model="form.specialization" />
        </div>
        <div>
          <label for="licenseNumber" class="form-label">License Number</label>
          <FormInput id="licenseNumber" v-model="form.licenseNumber" />
        </div>
        <div>
          <label for="experience" class="form-label">Experience (years)</label>
          <FormInput id="experience" v-model.number="form.experience" type="number" min="0" />
        </div>
        <div class="md:col-span-2">
          <label class="form-label">Availability (Mon-Sun)</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="(day, name) in form.availability" :key="name">
              <div class="text-xs font-medium mb-1 capitalize">{{ name }}</div>
              <div class="flex gap-2">
                <FormInput v-model="day.start" type="time" class="" />
                <FormInput v-model="day.end" type="time" class="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label for="bio" class="form-label">Bio</label>
        <textarea id="bio" v-model="form.bio" rows="3" class="form-textarea" />
      </div>

      <div class="page-actions">
        <Button type="submit" :disabled="loading">{{ isEdit ? "Update" : "Create" }}</Button>
        <Button type="button" variant="outline" @click="router.back()">Cancel</Button>
      </div>
    </form>
  </div>
</template>
