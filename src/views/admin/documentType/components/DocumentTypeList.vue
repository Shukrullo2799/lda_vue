<script setup lang="ts">
import { reactive, ref } from "vue"
import type { IFields, IFilter } from "@/models"
import {
  DocumentTypeForm,
  DocumentTypeService,
  type IDocumentType,
} from "@/views/admin/documentType"

const fields = ref<IFields[]>([
  { key: "id", label: "ID", visible: true },
  { key: "fullName", label: "fullName", visible: true },
  { key: "shortName", label: "shortName", visible: true },
  { key: "state", label: "state", visible: true },
])
const permission = "DocumentType"

const DefaultFilter = reactive<IFilter>({
  search: "",
  page: 1,
  pageSize: 20,
  orderType: "asc",
  totalRows: 0,
})

const filter = reactive<IFilter>({ ...DefaultFilter })

const documentTypeId = ref<number | null>(null)

const edit = (item: number | IDocumentType) => {
  documentTypeId.value = typeof item === "number" ? item : item.id
}
</script>

<template>
  <div>
    <FormTable :service="DocumentTypeService" :fields="fields" :filter="filter" appendAction>
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
            <DocumentTypeForm
              @refresh="refresh"
              v-model:document-type-id="documentTypeId"
              v-if="documentTypeId == 0 || documentTypeId"
            />
          </template>
        </FormTableHeader>
      </template>
      <template #append-actions="{ item }">
        <FormTableAction
          :service="DocumentTypeService"
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
