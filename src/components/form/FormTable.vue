<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch, watchEffect, type Ref } from "vue"
import axios from "axios"
import type { IFields } from "@/models"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import { useGlobal } from "@/composables/useGlobal"
import FormSelect from "./FormSelect.vue"
import { ArrowLeftIcon, ArrowRightIcon, MoveDownIcon, MoveUpIcon } from "lucide-vue-next"

export interface ITable {
  fields: IFields[]
  filter?: any
  service?: any
  hasPagination?: boolean
  apiName?: string
  tableHeight?: string
  resData?: string
  fixedHeader?: boolean
  fixedFooter?: boolean
  removeKeys?: string[]
  tableRef?: Ref
  params?: any
  identifier?: boolean
  appendAction?: boolean
  prependAction?: boolean
}
const props = withDefaults(defineProps<ITable>(), {
  hasPagination: true,
  apiName: "GetList",
  tableHeight: "600",
  resData: "items",
  fixedHeader: true,
  identifier: true,
  removeKeys: () => [],
  params: {},
})

const emits = defineEmits([
  "createRouteQuery",
  "rowClick",
  "rowDblClick",
  "update:fields",
  "update:filter",
])

const { fields, filter, service, apiName } = toRefs(props)
const { setError } = useErrorToast()
const { parseNumber } = useGlobal()

const data = ref<any[]>([])
const loading = ref<boolean>(true)

const itemFilter = computed({
  get: () => filter.value,
  set: (newValue) => emits("update:filter", newValue),
})

/* Pagination */

const firstNumber = computed(() =>
  itemFilter.value ? (itemFilter.value.page - 1) * itemFilter.value.pageSize + 1 : 0,
)

const lastNumber = computed(() =>
  itemFilter.value
    ? Math.min(itemFilter.value.page * itemFilter.value.pageSize, itemFilter.value.totalRows)
    : 0,
)
/* END Pagination */

const mapFields = (arr: IFields[]) => {
  return arr.map((el) => {
    if (typeof el.visible == "undefined") {
      return { ...el, visible: true }
    }
    return el
  })
}

const checkFields = computed(() => mapFields(fields.value).filter((el) => el.visible))
const sort = (field: IFields) => {
  if (!itemFilter.value) return
  itemFilter.value.sortBy = field.key
  itemFilter.value.orderType = itemFilter.value.orderType === "asc" ? "desc" : "asc"
  refresh()
}

/* Data */
const loadData = async (reset = false) => {
  loading.value = true

  emits("createRouteQuery", {
    filter: itemFilter.value,
    params: props.params,
    removeKeys: props.removeKeys,
  })

  if (reset) data.value = []

  try {
    const res = await service.value[apiName.value](itemFilter.value)
    console.log("res", res)
    const responseData = props.resData ? res.data[props.resData] : res.data
    data.value = responseData
    itemFilter.value.totalRows = res.data?.total ?? res.data?.totalCount ?? 0
  } catch (error) {
    if (!axios.isCancel(error)) setError(error)
  } finally {
    loading.value = false
  }
}

const getData = () => loadData()
const refresh = () => loadData(true)
/* END DATA */
const totalPages = computed(() => Math.ceil(props.filter.totalRows / props.filter.pageSize))

function goTo(page: number) {
  if (page < 1 || page > totalPages.value) return
  props.filter.page = page
  getData()
}

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const current = props.filter.page
  const total = totalPages.value

  if (total <= 5) {
    // Juda kichik bo‘lsa — hammasini chiqaramiz
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    // Doim 1 chiqsin
    pages.push(1)

    // Ellipsis oldi
    if (current > 3) {
      pages.push("...")
    }

    // O‘rtadagi 3 ta (current-1, current, current+1)
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Ellipsis keyin
    if (current < total - 2) {
      pages.push("...")
    }

    // Doim oxirgi chiqsin
    pages.push(total)
  }

  return pages
})

defineExpose({
  refresh,
  sort,
  getData,
})

watchEffect(() => {
  if (props.identifier) refresh()
  else loading.value = false
})
</script>

<template>
  <div class="w-full">
    <slot
      name="header"
      :refresh="refresh"
      :get-data="getData"
      :loading="loading"
      :parse-number="parseNumber"
      :data="data"
    />
    <div
      class="overflow-auto border rounded-lg shadow-sm bg-white dark:bg-neutral-900"
      :style="{ maxHeight: tableHeight + 'px' }"
    >
      <table class="w-full border-collapse">
        <thead
          class="sticky top-0 bg-neutral-100 dark:bg-neutral-800 z-10 text-left text-neutral-600 dark:text-neutral-300 text-xs uppercase"
          :class="{ 'sticky top-0 z-10': fixedHeader }"
        >
          <tr>
            <th
              v-if="prependAction"
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
            >
              {{ $t("actions") }}
            </th>
            <template v-for="field in checkFields" :key="field.key">
              <slot :name="`header-${field.key}`">
                <th
                  scope="col"
                  :class="[
                    field.thClass,
                    'px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none',
                  ]"
                  @click="field.sort ? sort(field) : null"
                  :aria-sort="
                    itemFilter?.sortBy === field.key
                      ? itemFilter?.orderType === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  "
                >
                  <div class="flex items-center gap-1">
                    {{ field.label }}
                    <span v-if="itemFilter?.sortBy === field.key">
                      <MoveUpIcon v-if="itemFilter?.orderType === 'asc'" :size="14" />
                      <MoveDownIcon v-else :size="14" />
                    </span>
                  </div>
                </th>
              </slot>
            </template>
            <th
              v-if="appendAction"
              class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
            >
              {{ $t("actions") }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
          <tr v-if="loading">
            <td :colspan="checkFields.length + 1" class="p-4 text-center">
              <slot name="loading">
                <div class="space-y-2 animate-pulse">
                  <div class="h-4 bg-muted rounded"></div>
                  <div class="h-4 bg-muted rounded"></div>
                </div>
              </slot>
            </td>
          </tr>

          <tr v-if="!loading && (!data || !data.length)">
            <td
              :colspan="checkFields.length + (prependAction ? 1 : 0) + (appendAction ? 1 : 0)"
              class="p-6 text-center text-neutral-400 text-sm"
            >
              <slot name="empty">{{ $t("NotFound") }} </slot>
            </td>
          </tr>

          <tr
            v-for="(item, rowIndex) in data"
            :key="rowIndex"
            class="transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            @click="emits('rowClick', item)"
            @dblclick="emits('rowDblClick', item)"
          >
            <td
              v-if="prependAction"
              class="px-4 py-2 text-center text-sm text-gray-800 dark:text-gray-200"
            >
              <slot name="prepend-action" :item="item" :refresh="refresh" :get-data="getData" />
            </td>

            <template v-for="field in checkFields">
              <td :class="[field.tdClass, 'px-4 py-2 text-sm text-gray-800 dark:text-gray-200 ']">
                <slot
                  :name="`item-${field.key}`"
                  :item="item"
                  :index="rowIndex"
                  :field="field"
                  :rows="data"
                >
                  {{ field.isAmount ? parseNumber(item[field.key]) : item[field.key] }}
                </slot>
              </td>
            </template>

            <td
              v-if="appendAction"
              class="px-4 py-2 text-center text-sm text-gray-800 dark:text-gray-200"
            >
              <slot name="append-actions" :item="item" :refresh="refresh" :get-data="getData" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- </div> -->

    <slot
      name="pagination"
      :last-number="lastNumber"
      :first-number="firstNumber"
      :filter="filter"
      :refresh="refresh"
      :get-data="getData"
    >
      <div
        v-if="itemFilter && hasPagination"
        class="flex flex-col md:flex-row items-center justify-between gap-3 mt-3 text-sm"
      >
        <FormSelect
          v-model="filter.pageSize"
          @update:modelValue="
            () => {
              filter.page = 1
              getData()
            }
          "
          :options="[
            { value: 20, label: '20' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
            { value: 200, label: '200' },
            { value: 500, label: '500' },
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
                <PaginationNext
                  :disabled="filter.page >= totalPages"
                  @click="goTo(filter.page + 1)"
                >
                  <ArrowRightIcon class="size-4" />
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </slot>
  </div>
</template>
