<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { UserForm, UserService, useUserStore, type IUser } from "@/views/admin/user/"
import type { IFields, IFilter } from "@/models"

const fields = ref<IFields[]>([
  { key: "id", label: "ID", visible: true },
  { key: "name", label: "name", visible: true },
  { key: "userName", label: "userName", visible: true },
  { key: "phoneNumber", label: "phoneNumber", visible: true },
  { key: "email", label: "email", visible: true },
])
const permission = "User"

const DefaultFilter = reactive<IFilter>({
  search: "",
  page: 1,
  pageSize: 20,
  orderType: "asc",
  totalRows: 0,
})

const filter = reactive<IFilter>({ ...DefaultFilter })

const userId = ref<number | null>(null)

const edit = (item: number | IUser) => {
  console.log("Edit", item)
  userId.value = typeof item === "number" ? item : item.id
}
</script>

<template>
  <div>
    <FormTable :service="UserService" :fields="fields" :filter="filter" appendAction>
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
            <UserForm v-model:user-id="userId" v-if="userId == 0 || userId" />
          </template>
        </FormTableHeader>
      </template>
      <template #append-actions="{ item }">
        <FormTableAction :service="UserService" :item :permission @edit="edit"></FormTableAction>
      </template>
      <template #name="{ item }">
        {{ item.person?.fullName }}
      </template>
    </FormTable>
  </div>
</template>
