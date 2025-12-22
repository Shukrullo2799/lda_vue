<script setup lang="ts">
import { ref, computed, watch } from "vue"

const props = defineProps<{
  filter: any
}>()

const emits = defineEmits<{
  (e: "getData"): void
}>()

const totalPages = computed(() => Math.ceil(props.filter.totalRows / props.filter.pageSize))

const firstNumber = computed(() => {
  if (props.filter) {
    return (props.filter.page - 1) * props.filter.pageSize + 1
  }
  return 0
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const current = props.filter.page
  const total = totalPages.value

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)

    if (current > 3) {
      pages.push("...")
    }

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 2) {
      pages.push("...")
    }

    pages.push(total)
  }

  return pages
})

function goTo(page: number) {
  if (page < 1 || page > totalPages.value) return
  props.filter.page = page
  emits("getData")
}
</script>

<template>
  <div class="flex flex-col md:flex-row items-center justify-between gap-3 mt-3 text-sm">
    <FormSelect
      v-model="filter.pageSize"
      @update:modelValue="((filter.page = 1), $emit('getData'))"
      :options="[
        { value: 20, text: '20' },
        { value: 50, text: '50' },
        { value: 100, text: '100' },
        { value: 200, text: '200' },
        { value: 500, text: '500' },
      ]"
      :clearable="false"
    >
      >
    </FormSelect>

    <div>
      <Pagination>
        <PaginationContent>
          <!-- Prev -->
          <PaginationItem>
            <PaginationPrevious :disabled="filter.page === 1" @click="goTo(filter.page - 1)">
              <ArrowLeftIcon class="size-4" />
            </PaginationPrevious>
          </PaginationItem>

          <template v-for="(page, idx) in visiblePages" :key="idx">
            <template v-if="page === '...'">
              <PaginationEllipsis />
            </template>
            <PaginationItem
              v-else
              :is-active="filter.page === page"
              @click.prevent="goTo(page as number)"
            >
              {{ page }}
            </PaginationItem>
          </template>
          <PaginationItem>
            <PaginationNext :disabled="filter.page >= totalPages" @click="goTo(filter.page + 1)">
              <ArrowRightIcon class="size-4" />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
