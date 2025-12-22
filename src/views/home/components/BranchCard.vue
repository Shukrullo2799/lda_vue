<script setup lang="ts">
import { computed } from "vue"
import { RouterLink } from "vue-router"

import {
  FileText,
  Shield,
  Building,
  Briefcase,
  Heart,
  Calculator,
  TrendingUp,
  Leaf,
} from "lucide-vue-next"

interface Props {
  id: string
  name?: string
  icon: string
}

const props = defineProps<Props>()

/* 🔹 Icon map */
const iconMap = {
  FileText,
  Shield,
  Building,
  Briefcase,
  Heart,
  Calculator,
  TrendingUp,
  Leaf,
} as const

const IconComponent = computed(() => {
  return iconMap[props.icon as keyof typeof iconMap] || FileText
})
</script>

<template>
  <RouterLink
    :to="`/branch/${id}`"
    class="block bg-white border border-gray-200 rounded-[8px] p-6 hover:border-blue-500 hover:shadow-md transition-all"
  >
    <div class="flex items-start gap-4">
      <div class="p-3 bg-blue-50 rounded">
        <component :is="IconComponent" class="w-6 h-6 text-blue-700" />
      </div>

      <div>
        <h3 class="text-gray-900 text-lg font-medium">
          {{ name || $t(`branch.${id}`) }}
        </h3>
      </div>
    </div>
  </RouterLink>
</template>
