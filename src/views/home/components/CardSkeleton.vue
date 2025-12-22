<script setup lang="ts">
interface Props {
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 4,
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="i in props.count"
      :key="i"
      class="bg-white border border-gray-200 rounded-[8px] p-6 animate-pulse"
    >
      <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div class="h-8 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
