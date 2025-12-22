<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { RouterLink } from "vue-router"
import { type IDocument } from "@/views/home"

interface Props {
  document: IDocument
}

const props = defineProps<Props>()
const { t } = useI18n()

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  repealed: "bg-red-100 text-red-800",
  draft: "bg-yellow-100 text-yellow-800",
}

const formattedDate = computed(() => new Date(props.document.adoptionDate).toLocaleDateString())
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
            {{ document.number }}
          </span>

          <span
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
          </span>
        </div>

        <!-- Title -->
        <h3 class="text-gray-900 mb-2">
          {{ document.title }}
        </h3>

        <!-- Meta -->
        <div class="flex flex-wrap gap-4 text-sm text-gray-600">
          <span> {{ t("document.type") }}: {{ document.type }} </span>
          <span> {{ t("document.adopted") }}: {{ formattedDate }} </span>
          <span>
            {{ document.issuingAuthority }}
          </span>
        </div>
      </div>

      <!-- Status -->
      <div>
        <span class="px-3 py-1 rounded-[8px] text-xs" :class="statusColors[document.status]">
          {{ t(`status.${document.status}`) }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>
