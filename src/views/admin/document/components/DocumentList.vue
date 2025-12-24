<script setup lang="ts">
import { reactive, ref } from "vue"
import type { IFields, IFilter } from "@/models"
import { type IDocument, DocumentService } from "@/views/admin/document"
import { useRouter } from "vue-router"

const router = useRouter()

const fields = ref<IFields[]>([
  { key: "id", label: "ID", visible: true },
  { key: "docNumber", label: "docNumber", visible: true },
  { key: "docOn", label: "docOn", visible: true },
  { key: "documentName", label: "documentName", visible: true },
  { key: "language", label: "language", visible: false },
  { key: "receiverOrgan", label: "receiverOrgan", visible: false },
  { key: "character", label: "character", visible: false },
  { key: "state", label: "state", visible: true },
])
const permission = "Document"
const routerName = "AdminDocument"

const DefaultFilter = reactive<IFilter>({
  search: "",
  page: 1,
  pageSize: 20,
  orderType: "asc",
  totalRows: 0,
})

const filter = reactive<IFilter>({ ...DefaultFilter })

const userId = ref<number | null>(null)

const edit = (item: number | IDocument) => {
  router.push({
    name: `Edit${routerName}`,
    params: {
      id: typeof item === "number" ? item : item.id ? item.id : 0,
    },
  })
}
</script>

<template>
  <div>
    <FormTable :service="DocumentService" :fields="fields" :filter="filter" appendAction>
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
        <FormTableAction
          :service="DocumentService"
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
