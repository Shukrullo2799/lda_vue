<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { computed } from "vue"
import { LANGUAGE_SELECT_LIST } from "@/utils/constants"
import type { ILanguageList } from "@/models"

const { locale } = useI18n({ locale: "ru" })

const ChangeLanguage = (item: ILanguageList) => {
  locale.value = item.code
  localStorage.setItem("lang", item.code)
  window.location.reload()
}

const activeLang = computed({
  get: () => localStorage.getItem("lang") || "uz-Latn",
  set: (value: string) => {
    localStorage.setItem("lang", value)
    location.reload()
  },
})
</script>
<template>
  <div>
    <FormSelect
      :options="LANGUAGE_SELECT_LIST"
      optionValue="code"
      optionLabel="shortName"
      @update:modelValue="ChangeLanguage"
      v-model="activeLang"
      selectTriggerClass="h-8"
    />
  </div>
</template>
