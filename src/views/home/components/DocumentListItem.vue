<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { RouterLink } from "vue-router"
import { type IDocument } from "@/views/admin/document"

interface Props {
  document: IDocument
}

const props = defineProps<Props>()
const { t } = useI18n()

const statusColors: Record<string, string> = {
  1: "bg-green-100 text-green-800",
  2: "bg-red-100 text-red-800",
  3: "bg-yellow-100 text-yellow-800",
}
</script>

<template>
  <RouterLink
    :to="`/document/${document.id}`"
    class="block bg-white border border-gray-200 rounded-[8px] p-4 hover:border-blue-500 hover:shadow-sm transition-all"
  >
    <div class="flex items-start justify-between gap-4">
      <!-- Left -->
      <div class="flex-1">
        <!-- Number + badges -->
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm text-gray-600">
            {{ document.docNumber }}
          </span>

          <!-- <span
            v-if="document.isNew"
            class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-[8px]"
          >
            {{ t("status.new") }}
          </span>

          <span
            v-if="document.isUpdated"
            class="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded-[8px]"
          >
            {{ t("status.updated") }}
          </span> -->
        </div>

        <!-- Title -->
        <h3 class="text-gray-900 mb-2 line-clamp-1">
          {{ document.documentName }}
        </h3>

        <!-- Meta -->
        <div class="flex flex-wrap gap-4 text-sm text-gray-600">
          <span> {{ t("character") }}: {{ document.character }} </span>
          <span> {{ t("document.adopted") }}: {{ document.docOn }} </span>
          <span>
            {{ document.receiverOrgan }}
          </span>
        </div>
      </div>

      <!-- Status -->
      <div>
        <span class="px-3 py-1 rounded-[8px] text-xs" :class="statusColors[document.stateId]">
          {{ document.state }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>
