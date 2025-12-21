<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { usePatientStore } from "../stores/patientStore"
import type { CreatePatientRequest } from "../types/patient"

const route = useRoute()
const router = useRouter()
const patientStore = usePatientStore()

const isEdit = ref(false)
const patientId = ref("")

const form = ref<
  Pick<
    CreatePatientRequest,
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "gender"
    | "address"
    | "medicalHistory"
    | "allergies"
    | "emergencyContact"
  > & { dateOfBirth: string }
>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "male",
  address: "",
  medicalHistory: "",
  allergies: [],
  emergencyContact: { name: "", phone: "", relationship: "" },
})

const loading = ref(false)

onMounted(() => {
  const id = route.params.id as string | undefined
  if (id) {
    isEdit.value = true
    patientId.value = id
    loadPatient()
  }
})

const loadPatient = () => {
  const p = patientStore.getPatientById(patientId.value)
  if (p) {
    form.value = {
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      phone: p.phone,
      dateOfBirth: new Date(p.dateOfBirth).toISOString().slice(0, 10),
      gender: p.gender,
      address: p.address,
      medicalHistory: p.medicalHistory || "",
      allergies: p.allergies || [],
      emergencyContact: p.emergencyContact || { name: "", phone: "", relationship: "" },
    }
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    if (isEdit.value) {
      await patientStore.updatePatient({
        id: patientId.value,
        ...form.value,
        dateOfBirth: new Date(form.value.dateOfBirth),
      } as any)
    } else {
      await patientStore.createPatient({
        ...form.value,
        dateOfBirth: new Date(form.value.dateOfBirth),
      } as any)
    }
    router.push("/patients")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-6">
      <h1 class="page-title">{{ isEdit ? "Edit Patient" : "Add Patient" }}</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="form-grid">
        <div>
          <label for="firstName" class="form-label">First Name</label>
          <Input id="firstName" v-model="form.firstName" required />
        </div>
        <div>
          <label for="lastName" class="form-label">Last Name</label>
          <Input id="lastName" v-model="form.lastName" required />
        </div>
        <div>
          <label for="email" class="form-label">Email</label>
          <Input id="email" v-model="form.email" type="email" required />
        </div>
        <div>
          <label for="phone" class="form-label">Phone</label>
          <Input id="phone" v-model="form.phone" />
        </div>
        <div>
          <label for="dateOfBirth" class="form-label">Date of Birth</label>
          <Input id="dateOfBirth" v-model="form.dateOfBirth" type="date" required />
        </div>
        <div>
          <label for="gender" class="form-label">Gender</label>
          <Select v-model="form.gender">
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="md:col-span-2">
          <label for="address" class="form-label">Address</label>
          <Input id="address" v-model="form.address" />
        </div>
      </div>

      <div>
        <label for="medicalHistory" class="form-label">Medical History</label>
        <textarea
          id="medicalHistory"
          v-model="form.medicalHistory"
          rows="3"
          class="form-textarea"
        />
      </div>

      <div>
        <label class="form-label">Emergency Contact</label>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4" v-if="form?.emergencyContact">
          <Input placeholder="Name" v-model="form.emergencyContact.name" />
          <Input placeholder="Phone" v-model="form.emergencyContact.phone" />
          <Input placeholder="Relationship" v-model="form.emergencyContact.relationship" />
        </div>
      </div>

      <div class="page-actions">
        <Button type="submit" :disabled="loading">{{ isEdit ? "Update" : "Create" }}</Button>
        <Button type="button" variant="outline" @click="router.back()">Cancel</Button>
      </div>
    </form>
  </div>
</template>
