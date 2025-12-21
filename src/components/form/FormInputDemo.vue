<script setup lang="ts">
import { ref } from "vue"
import { Form } from "vee-validate"
import { useI18n } from "vue-i18n"
import { Mail, Lock, Search, Eye, EyeOff } from "lucide-vue-next"
import FormInput from "./FormInput.vue"
import FormSelect from "./FormSelect.vue"
import FormPicker from "./FormPicker.vue"
import FormTable from "./FormTable.vue"
import { userService } from "./test.service"
import FormTableHeader from "./FormTableHeader.vue"
import type { IFields } from "@/models"
import FormTableAction from "./FormTableAction.vue"

const { t } = useI18n()
const model = ref({
  name: "",
  email: "",
  password: "",
  search: "",
  amount: "",
  country: "uk",
  date: "",
})
const filter = ref({
  search: "",
  page: 1,
  pageSize: 20,
})
const showPassword = ref(false)

const countries = [
  { label: t("countries.usa"), value: "usa" },
  { label: t("countries.canada"), value: "canada" },
  { label: t("countries.uk"), value: "uk" },
]
const fields = ref<IFields[]>([
  { key: "id", label: "ID", visible: true },
  { key: "name", label: "Name", visible: true },
  { key: "email", label: "Email", visible: true },
  { key: "role", label: "Role", visible: true },
])
const onSubmit = () => {}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-2">FormInput Auto Rules Demo</h1>
      <p class="text-muted-foreground">{{ $t("demo.subtitle") }}</p>
    </div>
    <!-- 
    <Form @submit.prevent="onSubmit" class="space-y-6">
      <FormInput
        v-model="model.name"
        name="name"
        :label="t('fields.name')"
        :placeholder="t('placeholders.name')"
        required
      />

      <FormInput
        v-model="model.email"
        name="email"
        type="email"
        required
        :label="t('fields.email')"
        :placeholder="t('placeholders.email')"
      >
        <template #prefix>
          <Mail class="h-4 w-4" />
        </template>
      </FormInput>

      <FormInput
        v-model="model.password"
        name="password"
        required
        :label="t('fields.password')"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="t('placeholders.password')"
      >
        <template #prefix>
          <Lock class="h-4 w-4" />
        </template>
        <template #suffix>
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="hover:text-foreground transition-colors"
          >
            <Eye v-if="!showPassword" class="h-4 w-4" />
            <EyeOff v-else class="h-4 w-4" />
          </button>
        </template>
      </FormInput>

      <FormInput
        v-model="model.search"
        name="search"
        :label="t('fields.search')"
        :placeholder="t('placeholders.search')"
      >
        <template #prefix>
          <Search class="h-4 w-4" />
        </template>
      </FormInput>

      <FormInput
        v-model="model.amount"
        name="amount"
        type="number"
        :label="t('fields.amount')"
        :placeholder="t('placeholders.amount')"
      >
        <template #suffix>
          <span class="text-sm">₽</span>
        </template>
      </FormInput>
      <FormSelect
        v-model="model.country"
        :options="countries"
        :label="t('fields.country')"
        :placeholder="t('placeholders.country')"
        required
        name="country"
      />
      <FormPicker
        v-model="model.date"
        :label="t('fields.date')"
        :placeholder="t('placeholders')"
        name="date"
        required
        clearable
      />

      <div class="flex gap-4">
        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {{ t("actions.submit") }}
        </button>

        <button
          type="button"
          @click="
            model = {
              name: '',
              email: '',
              password: '',
              search: '',
              amount: '',
              country: '',
              date: '',
            }
          "
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          {{ t("actions.clear") }}
        </button>
      </div>
    </Form> -->

    <FormTable
      :service="userService"
      :fields="fields"
      apiName="getUsers"
      :filter="filter"
      prependAction
    >
      <template #header="{ refresh, getData }">
        <FormTableHeader
          v-model="fields"
          :filter="filter"
          @getData="getData"
          v-model:fields="fields"
          @refresh="refresh"
        ></FormTableHeader>
      </template>
      <template #prepend-action="{ item }">
        <FormTableAction :service="userService" :item></FormTableAction>
      </template>
    </FormTable>
  </div>
</template>
