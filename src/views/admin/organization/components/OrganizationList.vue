<script setup lang="ts">
import { reactive, ref } from "vue"
import type { IFields, IFilter } from "@/models"
import {
  OrganizationForm,
  OrganizationService,
  type IOrganization,
} from "@/views/admin/organization"

const fields = ref<IFields[]>([
  { key: "id", label: "ID", visible: true },
  { key: "organizationName", label: "name", visible: true },
  { key: "state", label: "state", visible: true },
])
const permission = "ReceivingOrgan"

const DefaultFilter = reactive<IFilter>({
  search: "",
  page: 1,
  pageSize: 20,
  orderType: "asc",
  totalRows: 0,
})

const filter = reactive<IFilter>({ ...DefaultFilter })

const organizationId = ref<number | null>(null)

const edit = (item: number | IOrganization) => {
  organizationId.value = typeof item === "number" ? item : item.id
}
</script>

<template>
  <div>
    <FormTable :service="OrganizationService" :fields="fields" :filter="filter" appendAction>
      <template #header="{ refresh, getData }">
        <FormTableHeader
          v-model="fields"
          :filter="filter"
          @getData="getData"
          v-model:fields="fields"
          @refresh="refresh"
          :permission
          @edit="edit"
          :has-menu="false"
          :canClear="false"
        >
          <template #header-bottom>
            <OrganizationForm
              @refresh="refresh"
              v-model:organization-id="organizationId"
              v-if="organizationId == 0 || organizationId"
            />
          </template>
        </FormTableHeader>
      </template>
      <template #append-actions="{ item }">
        <FormTableAction
          :service="OrganizationService"
          :item
          :permission
          @edit="edit"
        ></FormTableAction>
      </template>
      <template #name="{ item }">
        {{ item.person?.fullName }}
      </template>
    </FormTable>
  </div>
</template>
