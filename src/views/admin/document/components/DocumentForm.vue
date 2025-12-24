<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { Form } from "vee-validate"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import { DocumentContentEditor, useDocumentStore, type IDocument } from "@/views/admin/document"
import { LANGUAGE_SELECT_LIST } from "@/utils/constants"
import { useClassifierStore } from "@/stores/classifier"

import FileUpload from "@/components/form/FleUpload.vue"

const emits = defineEmits<{
  (e: "refresh"): void
}>()

const route = useRoute()
const router = useRouter()
const documentStore = useDocumentStore()
const classifierStore = useClassifierStore()

const { currentDocument, loading, saveLoading, characterIdList, receiverOrgList } =
  storeToRefs(documentStore)
const { stateList } = storeToRefs(classifierStore)

const { setError } = useErrorToast()

const documentId = route.params.id as string

const loadDocument = async () => {
  documentStore.getDocumentById(+documentId)
}

const files = ref<any>([])

const handleSubmit = async () => {
  saveLoading.value = true

  try {
    await documentStore.updateDocument(currentDocument.value as IDocument)

    router.back()
  } catch (error) {
    setError(error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await documentStore.fetchCharacterList()
  await documentStore.fetchEeceiverOrgList()
  await classifierStore.fetchState()
  await loadDocument()
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 my-6">
    <template v-if="!loading && currentDocument">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">
          {{ currentDocument.id ? $t("editDocument") : $t("createDocument") }}
        </h2>
      </div>

      <Form @submit="handleSubmit" class="space-y-6" v-if="currentDocument">
        <div class="form-grid">
          <div>
            <FormPicker
              name="docOn"
              v-model="currentDocument.docOn"
              required
              :label="$t('docOn')"
              :placeholder="$t('docOn')"
            />
          </div>
          <div>
            <FormInput
              name="docNumber"
              v-model="currentDocument.docNumber"
              required
              :label="$t('docNumber')"
              :placeholder="$t('docNumber')"
            />
          </div>
        </div>
        <div>
          <FormInput
            name="documentName"
            v-model="currentDocument.documentName"
            required
            :label="$t('documentName')"
            :placeholder="$t('documentName')"
          />
        </div>
        <div class="form-grid">
          <div>
            <FormSelect
              name="languageId"
              v-model="currentDocument.languageId"
              :options="LANGUAGE_SELECT_LIST"
              :label="$t('language')"
              :placeholder="$t('language')"
            />
          </div>
          <div>
            <FormSelect
              name="characterId"
              v-model="currentDocument.characterId"
              :options="characterIdList"
              :label="$t('character')"
              :placeholder="$t('character')"
            />
          </div>
          <div>
            <FormSelect
              name="receiverOrgId"
              v-model="currentDocument.receiverOrgId"
              :options="receiverOrgList"
              :label="$t('receiverOrg')"
              :placeholder="$t('receiverOrg')"
            />
          </div>
          <div>
            <FormSelect
              name="stateId"
              v-model="currentDocument.stateId"
              :options="stateList"
              :label="$t('state')"
              :placeholder="$t('state')"
            />
          </div>
        </div>
        <div>
          <FormInput
            name="tags"
            v-model="currentDocument.tags"
            required
            :label="$t('tags')"
            :placeholder="$t('tags')"
          />
        </div>

        <div>
          <FileUpload v-model:files="files" :table-id="111" :config="{}" label="lorem" required />
          <pre class="mt-4 text-xs">{{ files }}</pre>
        </div>

        <DocumentContentEditor v-model:content="currentDocument.content" />

        <div class="page-actions">
          <Button type="submit" :loading="saveLoading">
            {{ currentDocument?.id ? $t("Update") : $t("Create") }}
          </Button>
          <Button type="button" variant="outline" @click="router.back()"
            >{{ $t("Cancel") }}
          </Button>
        </div>
      </Form>
    </template>
  </div>
</template>
