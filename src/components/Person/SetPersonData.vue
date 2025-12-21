<script setup lang="ts">
import { reactive, watch } from "vue"
import { Form } from "vee-validate"
import type { ISelectList } from "@/models"
import type { ISetPassportData } from "./PersonDataTypes"

interface IProps {
  documentTypeList?: ISelectList[]
  searchLoading: boolean
  clear?: boolean | number
  isDocumentType?: boolean
  excludeDocumentTypes?: number[]
}

const props = withDefaults(defineProps<IProps>(), {
  isDocumentType: true,
})
const options = reactive<any>({
  mask: "AA", // 2 ta harf
  tokens: {
    A: {
      pattern: /[A-Z]/, // faqat katta harf
      transform: (chr: string) => chr.toUpperCase(), // avtomatik katta harf
    },
  },
  eager: true,
})

const emits = defineEmits<{
  (e: "setPerson", value: ISetPassportData): void
}>()

const filterPerson = reactive<ISetPassportData>({
  documentTypeId: null,
  seria: "",
  number: null,
  dateOfBirth: "",
  pinfl: "",
})

const clearData = () => {
  filterPerson.documentTypeId = null
  filterPerson.seria = ""
  filterPerson.number = null
  filterPerson.dateOfBirth = ""
  filterPerson.pinfl = ""
}

const searchPerson = async () => {
  emits("setPerson", { ...filterPerson })
}

watch(
  () => [props.clear, props.isDocumentType],
  ([clear, isDocumentType]) => {
    if (clear) clearData()

    if (!isDocumentType) {
      delete (filterPerson as Partial<ISetPassportData>).documentTypeId
    }
  },
  { immediate: true },
)
</script>

<template>
  <Form @submit="searchPerson" class="space-y-4">
    <div class="grid grid-cols-12 gap-4 items-end">
      <!-- Series -->
      <div class="col-span-12 sm:col-span-6 lg:col-span-3">
        <FormInput
          v-model="filterPerson.seria"
          :label="$t('passportParams.docSeries')"
          v-maska="options"
          :disabled="searchLoading"
          required
        />
      </div>

      <!-- Document number -->
      <div class="col-span-12 sm:col-span-6 lg:col-span-3">
        <FormInput
          v-model="filterPerson.number"
          :label="$t('passportParams.documentNumber')"
          v-maska="'#######'"
          :disabled="searchLoading"
          required
        />
      </div>

      <!-- Date of birth -->
      <div class="col-span-12 sm:col-span-6 lg:col-span-3">
        <FormPicker
          v-model="filterPerson.dateOfBirth"
          :label="$t('passportParams.birthOn')"
          :disabled="searchLoading"
          required
        />
      </div>

      <!-- Submit -->
      <div class="col-span-12 sm:col-span-6 lg:col-span-3">
        <Button type="submit" class="w-full" size="lg" :loading="searchLoading">
          {{ $t("passportParams.Search") }}
        </Button>
      </div>
    </div>
  </Form>
</template>

<style lang="scss" scoped></style>
