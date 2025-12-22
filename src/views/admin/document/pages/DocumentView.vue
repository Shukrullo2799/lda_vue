<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue"
import { useRoute } from "vue-router"
import { ArrowLeft, Download } from "lucide-vue-next"

import { getDocumentById } from "@/data/mock-data"

const route = useRoute()

const id = route.params.id as string
const document = computed(() => getDocumentById(id))

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  repealed: "bg-red-100 text-red-800",
  draft: "bg-yellow-100 text-yellow-800",
}
</script>

<template>
  <div v-if="!document" class="max-w-7xl mx-auto px-4 py-8">{{ $t("documentNotFound") }}</div>

  <div v-else class="min-h-screen bg-gray-50">
    <!-- Info Bar -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <!-- Header -->
        <div class="flex items-start justify-between gap-4 mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <Button @click="$router.back()" variant="ghost" class="text-gray-600">
                <ArrowLeft className="w-4 h-4" :size="16" />
                <span>{{ $t("back") }}</span>
              </Button>
              <span class="text-blue-700">{{ document.number }}</span>
              <span class="px-3 py-1 rounded text-xs" :class="statusColors[document.status]">
                {{ $t(`status.${document.status}`) }}
              </span>
            </div>
            <h1 class="text-gray-900 mb-4">
              {{ document.title }}
            </h1>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
          <div>
            <span class="text-gray-600">{{ $t("document.adopted") }}:</span>
            <span class="ml-2 text-gray-900">
              {{ document.adoptionDate }}
            </span>
          </div>
          <div>
            <span class="text-gray-600">{{ $t("document.effective") }}:</span>
            <span class="ml-2 text-gray-900">
              {{ document.effectiveDate }}
            </span>
          </div>
          <div>
            <span class="text-gray-600">{{ $t("document.type") }}:</span>
            <span class="ml-2 text-gray-900">{{ document.type }}</span>
          </div>
        </div>

        <div class="text-sm text-gray-600 mb-4">
          <span>{{ $t("document.issuingAuthority") }}:</span>
          <span class="ml-2 text-gray-900">
            {{ document.issuingAuthority }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <Button variant="outline" class="rounded" size="lg">
            <Download class="w-4 h-4" /> {{ $t("downloadPdf") }}</Button
          >
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Main -->
      <main>
        <div class="bg-white border border-gray-200 rounded">
          <div class="p-8">
            <section v-for="section in document.sections" :key="section.id" class="mb-8 last:mb-0">
              <div v-if="section.article" class="text-sm text-blue-700 mb-2">
                {{ section.article }}
              </div>
              <h2 class="text-gray-900 mb-4">
                {{ section.title }}
              </h2>
              <div class="text-gray-700 leading-relaxed">
                {{ section.content }}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
