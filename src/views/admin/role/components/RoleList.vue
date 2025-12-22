<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { RoleForm, RoleService, type IRole } from "@/views/admin/role"
import type { IFields, IFilter } from "@/models"

const fields = ref<IFields[]>([
  {
    key: "id",
    label: "ID",
    visible: true,
    tdClass: "w-16",
  },
  { key: "name", label: "name", visible: true },
])
const permission = "Role"

const DefaultFilter = reactive<IFilter>({
  search: "",
  page: 1,
  pageSize: 20,
  orderType: "asc",
  totalRows: 0,
})

const filter = reactive<IFilter>({ ...DefaultFilter })

const roleId = ref<number | null>(null)

const edit = (item: number | IRole) => {
  roleId.value = typeof item === "number" ? item : item.id
}
</script>

<template>
  <div>
    <FormTable :service="RoleService" :fields="fields" :filter="filter" appendAction>
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
            <RoleForm v-model:role-id="roleId" v-if="roleId == 0 || roleId" @refresh="refresh" />
          </template>
        </FormTableHeader>
      </template>
      <template #append-actions="{ item }">
        <FormTableAction :service="RoleService" :item :permission @edit="edit"></FormTableAction>
      </template>
    </FormTable>
  </div>
</template>
