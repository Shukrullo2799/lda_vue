<script setup lang="ts">
import { ref } from "vue"
import { QuillEditor } from "@vueup/vue-quill"
import { Edit2, Trash2, Plus } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import "@vueup/vue-quill/dist/vue-quill.snow.css"

interface Section {
  id: number
  title: string
  tag?: string
  content: string
}

const sections = defineModel<Section[]>("content")

const { t } = useI18n()

const paragraphTitle = ref("")
const paragraphTag = ref("")
const documentContent = ref("")
const editingIndex = ref<number | null>(null)
const editorKey = ref(0)

/* Quill config */
const quillModules = {
  debug: "info",
  modules: {
    toolbar: ["bold", "italic", "underline"],
  },
  placeholder: "Compose an epic...",
  readOnly: true,
  theme: "snow",
}

/* Actions */
const addOrUpdate = () => {
  if (!paragraphTitle.value || !documentContent.value || !sections.value) return

  if (editingIndex.value !== null) {
    sections.value[editingIndex.value] = {
      ...sections.value[editingIndex.value],
      title: paragraphTitle.value,
      tag: paragraphTag.value,
      content: documentContent.value,
    }
  } else {
    sections.value.push({
      id: Date.now(),
      title: paragraphTitle.value,
      tag: paragraphTag.value,
      content: documentContent.value,
    })
  }

  resetForm()
}

const editSection = (index: number) => {
  if (!sections.value) return
  const s = sections.value[index]
  editingIndex.value = index
  paragraphTitle.value = s.title
  paragraphTag.value = s.tag || ""
  documentContent.value = s.content
}

const deleteSection = (index: number) => {
  sections.value!.splice(index, 1)
}

const resetForm = () => {
  paragraphTitle.value = ""
  paragraphTag.value = ""
  documentContent.value = ""
  editingIndex.value = null
  editorKey.value++
}
</script>

<template>
  <div class="border-t pt-6">
    <h4 class="text-gray-900 mb-4">
      {{ t("admin.documentContent") }}
    </h4>

    <!-- Form -->
    <div class="mb-4">
      <FormInput
        v-model="paragraphTitle"
        :placeholder="t('admin.paragraphTitlePlaceholder')"
        :label="t('admin.paragraphTitle')"
      />
    </div>
    <div class="mb-4">
      <FormInput
        v-model="paragraphTag"
        :label="t('admin.paragraphTag')"
        :placeholder="t('admin.paragraphTagPlaceholder')"
      />
    </div>

    <div class="mb-6">
      <label class="block text-sm text-gray-700 mb-2">
        {{ t("admin.paragraphContent") }}
      </label>

      <QuillEditor
        v-model:content="documentContent"
        content-type="html"
        :toolbar="quillModules"
        theme="snow"
        class="bg-white"
        style="height: 300px"
        :key="editorKey"
      />
    </div>

    <div class="flex gap-3">
      <Button
        type="button"
        class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
        @click.prevent="addOrUpdate"
      >
        <Plus class="w-5 h-5" />
        {{ editingIndex !== null ? t("admin.updateParagraph") : t("admin.addParagraph") }}
      </Button>

      <Button
        type="button"
        v-if="editingIndex !== null"
        class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        @click.prevent="resetForm"
      >
        {{ t("admin.cancelEdit") }}
      </Button>
    </div>

    <!-- Sections list -->
    <div v-if="sections && sections.length" class="mt-6">
      <h5 class="text-gray-900 mb-3">{{ t("admin.addedParagraphs") }} ({{ sections.length }})</h5>

      <div class="space-y-3">
        <div
          v-for="(section, index) in sections"
          :key="section.id"
          class="bg-gray-50 border border-gray-200 rounded-lg p-4"
        >
          <div class="flex justify-between gap-4">
            <div class="flex-1">
              <h6 class="text-gray-900 mb-2">
                {{ index + 1 }}. {{ section.title }}
                <span
                  v-if="section.tag"
                  class="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {{ section.tag }}
                </span>
              </h6>

              <div
                class="text-sm text-gray-600 prose prose-sm max-w-none"
                v-html="section.content"
              />
            </div>

            <div class="flex gap-2">
              <Button
                class="p-2 bg-transparent text-blue-600 hover:bg-blue-50 rounded"
                @click="editSection(index)"
                :title="t('admin.edit')"
              >
                <Edit2 class="w-4 h-4" />
              </Button>
              <Button
                class="p-2 bg-transparent text-red-600 hover:bg-red-50 rounded"
                @click="deleteSection(index)"
                :title="t('admin.delete')"
              >
                <Trash2 class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
