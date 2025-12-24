<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Search } from "lucide-vue-next"
import { DocumentListItem } from "@/views/home/index"
import { useDocumentStore } from "@/views/admin/document"
import { storeToRefs } from "pinia"
import VPagination from "@/components/utils/VPagination.vue"
import LoadingSpinner from "@/components/utils/LoadingSpinner.vue"
import type { IFilter } from "@/models"

const route = useRoute()
const router = useRouter()

const searchLoading = ref(false)

const filter = ref<IFilter>({
  orderType: "asc",
  page: 1,
  pageSize: 20,
  search: "",
})

const searchForm = ref({
  documentNumber: "",
  actName: "",
  date: "",
  actForm: "",
})

const documentStore = useDocumentStore()

const { documents, loading } = storeToRefs(documentStore)

const search = async (params: any) => {
  console.log("Searching with params:", params)
}

const handleSearch = async () => {
  await search({
    ...searchForm.value,
    page: 1,
    limit: 20,
  })
}

onMounted(async () => {
  await documentStore.fetchDocuments()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <FormInput
            v-model="searchForm.documentNumber"
            :placeholder="$t('home.documentNumber')"
            inputClass="h-[50px]"
          />

          <FormInput
            v-model="searchForm.actName"
            :placeholder="$t('home.actName')"
            inputClass="h-[50px]"
          />

          <FormPicker v-model="searchForm.date" inputClass="h-[50px]" />
          <FormSelect
            :options="[]"
            v-model="searchForm.actForm"
            :placeholder="$t('home.actForm')"
            selectTriggerClass="!h-[50px]"
          />
        </div>

        <Button @click="handleSearch" :disabled="searchLoading" class="h-12 !px-6 cursor-pointer">
          <Search class="w-5 h-5" />
          {{ $t("search") }}
        </Button>
      </div>

      <div v-if="loading" class="flex justify-center items-center mt-6">
        <LoadingSpinner />
      </div>
      <div v-else-if="!loading && documents.length">
        <div class="space-y-3">
          <DocumentListItem v-for="doc in documents" :key="doc.id" :document="doc" />
        </div>
        <VPagination :filter="filter" @get-data="documentStore.fetchDocuments" />
      </div>

      <Card v-else class="p-12 text-center">
        <p class="text-gray-600">
          {{ $t("documentNotFound") }}
        </p>
      </Card>
    </div>
  </div>
</template>
