<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Search, ChevronDown, AlertCircle } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

import { branches as mockBranches, getRecentDocuments, stats as mockStats } from "@/data/mock-data"
import { BranchCard, CardSkeleton, DocumentListItem, DocumentListSkeleton } from "@/views/home"
import { useDocumentStore } from "@/views/admin/document"
import { storeToRefs } from "pinia"
import LoadingSpinner from "@/components/utils/LoadingSpinner.vue"

const documentStore = useDocumentStore()

const { documents } = storeToRefs(documentStore)

/* 🔍 Search form */
const { t } = useI18n()
const searchForm = ref({
  documentNumber: "",
  actName: "",
  date: "",
  actForm: "",
})

const searchLoading = ref(false)
const recentDocsLoading = ref(false)
const branchesLoading = ref(false)

const search = async (params: any) => {
  // Implement search logic here
  console.log("Searching with params:", params)
}
/* 🧠 Fallback */
const branches = ref<Array<any>>(mockBranches)
const stats = ref<{ [key: string]: number | null }>(mockStats)
const recentDocuments = ref<Array<any>>(getRecentDocuments())
const searchResults = ref<{
  total: number
  documents: Array<any>
} | null>(null)

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
    <!-- Search -->
    <section class="bg-gradient-to-b from-blue-700 to-blue-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-center text-2xl font-bold mb-2">
          {{ t("home.title") }}
        </h1>
        <p class="text-center text-blue-100 mb-8">
          {{ t("home.subtitle") }}
        </p>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <FormInput
              v-model="searchForm.documentNumber"
              :placeholder="t('home.documentNumber')"
              inputClass="h-[50px]"
            />

            <FormInput
              v-model="searchForm.actName"
              :placeholder="t('home.actName')"
              inputClass="h-[50px]"
            />

            <FormPicker v-model="searchForm.date" inputClass="h-[50px]" />
            <FormSelect
              :options="[]"
              v-model="searchForm.actForm"
              :placeholder="t('home.actForm')"
              selectTriggerClass="!h-[50px]"
            />
          </div>

          <Button @click="handleSearch" :disabled="searchLoading" class="h-12 !px-6 cursor-pointer">
            <Search class="w-5 h-5" />
            {{ $t("search") }}
          </Button>

          <!-- Results -->
          <div v-if="searchResults" class="mt-4 bg-blue-50 border border-blue-200 rounded p-4">
            <DocumentListItem v-for="doc in documents.slice(0, 5)" :key="doc.id" :document="doc" />
          </div>
        </div>
      </div>
    </section>

    <!-- Branches -->
    <section class="max-w-7xl mx-auto px-4 py-6">
      <h2 class="font-bold mb-6">
        {{ $t("home.legislativeBranches") }}
      </h2>

      <div v-if="branchesLoading"><LoadingSpinner /> {{ $t("Branch") }}</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BranchCard v-for="branch in branches" :key="branch.id" v-bind="branch" />
      </div>
    </section>

    <!-- New docs -->
    <section class="max-w-7xl mx-auto px-4 py-6">
      <h2 class="font-bold mb-6">
        {{ $t("home.newInLegislation") }}
      </h2>

      <DocumentListSkeleton v-if="recentDocsLoading" />

      <div class="space-y-3" v-else>
        <DocumentListItem v-for="doc in documents.slice(0, 5)" :key="doc.id" :document="doc" />
        <div class="mt-5 text-center">
          <Button as-child class="">
            <RouterLink :to="{ name: 'Document' }" class="inline-flex items-center gap-1">
              {{ $t("home.viewAllNewDocuments") }}
            </RouterLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <CardSkeleton v-if="false" />

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4" v-else>
        <div
          v-for="(value, key) in stats"
          :key="key"
          class="bg-white border rounded-[8px] p-6 text-center"
        >
          <div class="text-2xl font-bold text-blue-700">
            {{ value?.toLocaleString() || 0 }}
          </div>
          <div class="text-sm text-gray-600">
            {{ $t(`home.${key}`) }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
