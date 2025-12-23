<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useOrganizationStore, type IOrganization } from "@/views/admin/organization"
import { X } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { Form } from "vee-validate"
import SetPersonData from "@/components/Person/SetPersonData.vue"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import TranslateItems from "@/components/utils/TranslateItems.vue"

const organizationId = defineModel<number | null>("organizationId")
const emits = defineEmits<{
  (e: "refresh"): void
}>()

const organizationStore = useOrganizationStore()
const { editingOrganization, loading, saveLoading } = storeToRefs(organizationStore)
const { setError } = useErrorToast()

const isEdit = ref(false)

const loadOrganization = async () => {
  organizationStore.getOrganizationById(organizationId.value as number)
}

const handleSubmit = async () => {
  saveLoading.value = true

  try {
    await organizationStore.updateOrganization(editingOrganization.value as IOrganization)
    handleCancelOrganization()
    emits("refresh")
  } catch (error) {
    setError(error)
  } finally {
    loading.value = false
  }
}
const handleCancelOrganization = () => {
  organizationId.value = null
  editingOrganization.value = null
}

onMounted(async () => {
  if (organizationId.value != null) {
    isEdit.value = Boolean(organizationId.value)
    await loadOrganization()
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 my-6">
    <template v-if="!loading && editingOrganization">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">
          {{ isEdit ? $t("editOrganization") : $t("createOrganization") }}
        </h2>
        <Button
          @click="handleCancelOrganization"
          variant="ghost"
          size="icon"
          class="rounded-full text-gray-400 hover:text-gray-600"
        >
          <X />
        </Button>
      </div>

      <Form @submit="handleSubmit" class="space-y-6" v-if="editingOrganization">
        <div class="form-grid">
          <div>
            <TranslateItems
              v-model:translates="editingOrganization.translations"
              v-model:value="editingOrganization.organizationName"
              column-name="organization_name"
              required
              :label="$t('organizationName')"
            />
          </div>
        </div>

        <div class="page-actions">
          <Button type="submit" :loading="saveLoading">
            {{ isEdit ? $t("Update") : $t("Create") }}
          </Button>
          <Button type="button" variant="outline" @click="handleCancelOrganization">
            {{ $t("Cancel") }}
          </Button>
        </div>
      </Form>
    </template>
  </div>
</template>
