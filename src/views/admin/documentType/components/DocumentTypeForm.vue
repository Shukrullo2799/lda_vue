<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useDocumentTypeStore, type IDocumentType } from "@/views/admin/documentType"
import { X } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { Form } from "vee-validate"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import TranslateItems from "@/components/utils/TranslateItems.vue"

const documentTypeId = defineModel<number | null>("documentTypeId")
const emits = defineEmits<{
  (e: "refresh"): void
}>()

const documentTypeStore = useDocumentTypeStore()
const { editingDocumentType, loading, saveLoading } = storeToRefs(documentTypeStore)
const { setError } = useErrorToast()

const isEdit = ref(false)

const loadDocumentType = async () => {
  documentTypeStore.getDocumentTypeById(documentTypeId.value as number)
}

const handleSubmit = async () => {
  saveLoading.value = true

  try {
    await documentTypeStore.updateDocumentType(editingDocumentType.value as IDocumentType)
    handleCancelDocumentType()
    emits("refresh")
  } catch (error) {
    setError(error)
  } finally {
    loading.value = false
  }
}
const handleCancelDocumentType = () => {
  documentTypeId.value = null
  editingDocumentType.value = null
}

onMounted(async () => {
  if (documentTypeId.value != null) {
    isEdit.value = Boolean(documentTypeId.value)
    await loadDocumentType()
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 my-6">
    <template v-if="!loading && editingDocumentType">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">
          {{ isEdit ? $t("editDocumentType") : $t("createDocumentType") }}
        </h2>
        <Button
          @click="handleCancelDocumentType"
          variant="ghost"
          size="icon"
          class="rounded-full text-gray-400 hover:text-gray-600"
        >
          <X />
        </Button>
      </div>

      <Form @submit="handleSubmit" class="space-y-6" v-if="editingDocumentType">
        <div class="form-grid">
          <div>
            <TranslateItems
              v-model:translates="editingDocumentType.translations"
              v-model:value="editingDocumentType.fullName"
              column-name="full_name"
              required
              :label="$t('fullName')"
            />
          </div>
          <div>
            <TranslateItems
              v-model:translates="editingDocumentType.translations"
              v-model:value="editingDocumentType.shortName"
              column-name="short_name"
              required
              :label="$t('shortName')"
            />
          </div>
        </div>
        <div>
          <FormInput
            v-model:translates="editingDocumentType.translations"
            v-model="editingDocumentType.description"
            :label="$t('description')"
            type="textaera"
          />
        </div>

        <div class="page-actions">
          <Button type="submit" :loading="saveLoading">
            {{ isEdit ? $t("Update") : $t("Create") }}
          </Button>
          <Button type="button" variant="outline" @click="handleCancelDocumentType">
            {{ $t("Cancel") }}
          </Button>
        </div>
      </Form>
    </template>
  </div>
</template>
