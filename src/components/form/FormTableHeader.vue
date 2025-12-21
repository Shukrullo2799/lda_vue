<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/ui/button"
import { X, Filter, Plus, HistoryIcon, RefreshCcwIcon, Check, Settings2 } from "lucide-vue-next"
import type { IFields } from "@/models"
import { useAuthStore } from "@/views/auth"

interface IProps {
  filter?: Record<string, any>
  hasMenu?: boolean
  canCreate?: boolean
  canClear?: boolean
  canRefresh?: boolean
  canSearch?: boolean
  permission?: string
  canManageColumns?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  canCreate: true,
  hasMenu: true,
  canSearch: true,
  canClear: true,
  canRefresh: true,
  canManageColumns: true,
})

const emits = defineEmits<{
  (e: "refresh"): void
  (e: "getData"): void
  (e: "clearFilter"): void
  (e: "edit", value: number): void
  (e: "update:fields", value: IFields[]): void
}>()
const fields = defineModel<IFields[]>("fields", { default: [] })

const auth = useAuthStore()
const menu = ref<boolean>(false)
const columnMenu = ref<boolean>(false)

const refresh = () => emits("refresh")
const getData = () => emits("getData")
const clearFilter = () => emits("clearFilter")
const edit = (id: number) => emits("edit", id)
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Header top -->
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <!-- Search -->
        <slot name="search" :ability="auth">
          <div v-if="filter && canSearch" class="w-72">
            <Input v-model="filter.search" :placeholder="$t('enterText')" @keyup.enter="refresh" />
          </div>
        </slot>
        <!-- Extra filters -->
        <slot name="filters" :ability="auth"></slot>
      </div>

      <!-- Right actions -->
      <div class="flex items-center flex-wrap gap-2">
        <slot name="right-prepend" :ability="auth"></slot>

        <!-- Refresh -->
        <slot name="refresh">
          <Button
            v-if="canRefresh"
            size="sm"
            variant="outline"
            class="flex items-center gap-2 text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400"
            @click="getData"
          >
            <HistoryIcon class="w-4 h-4" />
            {{ $t("refresh") }}
          </Button>
        </slot>

        <!-- Clear -->
        <slot name="clear">
          <Button
            v-if="canClear"
            size="sm"
            variant="destructive"
            class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white shadow-sm"
            @click="
              () => {
                clearFilter()
                refresh()
              }
            "
          >
            <RefreshCcwIcon class="w-4 h-4" />
            {{ $t("Clear") }}
          </Button>
        </slot>

        <!-- Menu (filters popup) -->
        <slot name="menu" :ability="auth">
          <Popover v-if="hasMenu" v-model:open="menu">
            <PopoverTrigger as-child>
              <Button
                size="sm"
                class="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium px-3 py-1.5 shadow-sm transition-colors"
              >
                <Filter class="w-4 h-4 mr-1" />
                {{ $t("filter") }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[20rem] max-w-full p-4 space-y-4">
              <div class="flex justify-between items-center">
                <span class="font-medium">{{ $t("filter") }}</span>
                <X class="cursor-pointer" @click="menu = false" />
              </div>

              <slot name="menu-items"></slot>

              <div class="flex justify-end gap-2 pt-2">
                <Button variant="destructive" size="sm" @click="menu = false">
                  {{ $t("close") }}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  @click="
                    () => {
                      clearFilter()
                      refresh()
                    }
                  "
                >
                  {{ $t("Clear") }}
                </Button>
                <Button
                  size="sm"
                  @click="
                    () => {
                      refresh()
                      menu = false
                    }
                  "
                >
                  {{ $t("filter") }}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </slot>
        <slot name="create" :ability="auth">
          <div v-if="canCreate && auth.can(`${permission}Create`)">
            <Button size="sm" variant="info" @click="edit(0)">
              <Plus class="w-4 h-4 mr-1" /> {{ $t("Create") }}
            </Button>
          </div>
        </slot>

        <slot name="right-append" :ability="auth"></slot>
        <Popover v-if="canManageColumns" v-model:open="columnMenu">
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm" class="flex items-center gap-2 ml-auto">
              <Settings2 class="h-4 w-4 opacity-70" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            class="w-56 space-y-2 shadow-lg rounded-xl bg-white"
            :side="'bottom'"
            :align="'end'"
            @pointerdown-outside.stop
            @focusout.stop
          >
            <div class="flex flex-col max-h-64 overflow-y-auto">
              <div
                v-for="column in fields"
                :key="column.key"
                class="flex items-center justify-between px-2 py-1.5 cursor-pointer rounded-md hover:bg-gray-100"
                @click="column.visible = !column.visible"
              >
                <span class="capitalize select-none">
                  {{ $t(column.label) }}
                </span>

                <Check v-if="column.visible" class="h-4 w-4 text-green-600" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>

    <!-- Header bottom -->
    <div>
      <slot name="header-bottom" :ability="auth"></slot>
    </div>
  </div>
</template>
