<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useDoctorStore } from "../stores/doctorStore"
import DoctorCard from "./DoctorCard.vue"
import { doctorService } from "@/views/doctors"
import type { IFields, IFilter } from "@/models"

const router = useRouter()
const doctorStore = useDoctorStore()

const fields = ref<IFields[]>([
  { key: "id", label: "ID", visible: true },
  { key: "name", label: "Name", visible: true },
  { key: "email", label: "Email", visible: true },
  { key: "role", label: "Role", visible: true },
])
const DefaultFilter = reactive<IFilter>({
  search: "",
  page: 1,
  pageSize: 20,
  orderType: "asc",
  totalRows: 0,
})
const permission = "Doctor"
const routerName = "Doctor"

const filter = reactive<IFilter>({ ...DefaultFilter })

onMounted(() => {
  doctorStore.fetchDoctors()
})

const edit = (item: number) => {
  console.log("Edit", item)
  if (item)
    router.push({
      name: `Edit${routerName}`,
      params: { id: item },
    })
  else router.push({ name: `Create${routerName}` })
}
const view = (item: number) => {
  console.log("Edit", item)
  router.push({
    name: `View${routerName}`,
    params: { id: item },
  })
}
</script>

<template>
  <div>
    <!-- <div class="page-header">
      <h1 class="page-title">Doctors</h1>
      <Button @click="handleCreate">Add Doctor</Button>
    </div>

    <div v-if="doctorStore.loading" class="text-center py-8">
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full" />
    </div>

    <div v-else-if="doctorStore.error" class="empty-state">
      {{ doctorStore.error }}
    </div>

    <div v-else-if="doctorStore.doctors.length === 0" class="empty-state">No doctors found</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DoctorCard v-for="doctor in doctorStore.doctors" :key="doctor.id" :doctor="doctor" />
    </div> -->

    <FormTable
      :service="doctorService"
      :fields="fields"
      apiName="getDoctors"
      :filter="filter"
      prependAction
    >
      <template #header="{ refresh, getData }">
        <FormTableHeader
          v-model="fields"
          :filter="filter"
          @getData="getData"
          v-model:fields="fields"
          @refresh="refresh"
          :permission
          @edit="edit"
        ></FormTableHeader>
      </template>
      <template #prepend-action="{ item }">
        <FormTableAction
          :service="doctorService"
          :item
          :permission
          @view="view"
          @edit="edit"
        ></FormTableAction>
      </template>
    </FormTable>
  </div>
</template>
