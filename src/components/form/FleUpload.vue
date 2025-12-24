<!-- <script setup lang="ts">
import { ref, computed, watch } from "vue"
import { Button } from "@/components/ui/button"
import { File, Upload, X, Loader2 } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import { useGlobal } from "@/composables/useGlobal"
import { DocumentFileService } from "@/stores/file.srvice"
import { useErrorToast } from "@/composables/helpers/useErrorToast"

const props = defineProps<{
  label?: string
  required?: boolean
  files: any[]
  columnName?: string
  tableId: number
  documentId?: number
  config: any
  canDelete?: boolean
  multiple?: boolean
  view?: boolean
}>()

const emit = defineEmits(["update:files"])

const { t } = useI18n()
const { forceFileDownload } = useGlobal()
const { setError } = useErrorToast()

const fileRef = ref<HTMLInputElement | null>(null)
const loading = ref(false)

const extension = computed(() => props.config?.tables?.map((t: any) => t.extension).join(","))

const openInput = () => fileRef.value?.click()

const uploadFile = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length) return

  loading.value = true
  const formData = new FormData()
  formData.append("files", files[0])

  try {
    const res = await DocumentFileService.UploadFile(props.tableId, formData)
    const file = res.data[0]

    emit("update:files", [
      ...props.files,
      {
        id: file.fileId,
        fileName: file.fileName,
        columnName: props.columnName,
      },
    ])
  } catch (e) {
    setError(e)
  } finally {
    loading.value = false
    if (fileRef.value) fileRef.value.value = ""
  }
}

const deleteFile = (index: number) => {
  const list = [...props.files]
  list.splice(index, 1)
  emit("update:files", list)
}

const downloadFile = (file: any) => {
  DocumentFileService.DownloadFile(file.id, props.tableId, props.documentId).then((res: any) => {
    forceFileDownload(res, file.fileName)
  })
}
</script>

<template>
  <div class="space-y-2">
    <label class="text-sm font-medium text-gray-700">
      {{ t(label || "") }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div
      class="flex flex-wrap items-center gap-2 rounded-lg border border-dashed p-3"
      :class="required && !files.length ? 'border-red-400' : 'border-gray-300'"
    >
      <template v-for="(file, index) in files" :key="index">
        <Badge
          variant="secondary"
          class="flex items-center gap-2 cursor-pointer"
          @click="downloadFile(file)"
        >
          <File class="h-4 w-4" />
          {{ file.fileName }}

          <Button
            type="button"
            v-if="canDelete && !view"
            @click.stop.prevent="deleteFile(index)"
            class="ml-1 text-red-500 hover:text-red-700"
          >
            <X class="h-4 w-4" />
          </Button>
        </Badge>
      </template>

      <Loader2 v-if="loading" class="h-5 w-5 animate-spin text-gray-500" />

      <Button
        v-if="!view && (!files.length || multiple)"
        size="sm"
        variant="outline"
        @click.prevent="openInput"
      >
        <Upload class="mr-2 h-4 w-4" />
        {{ t("selectFile") }}
      </Button>
    </div>

    <input ref="fileRef" type="file" class="hidden" :accept="extension" @change="uploadFile" />
  </div>
</template>

<style lang="scss" scoped></style> -->

<!-- <script setup lang="ts">
import { computed, ref } from "vue"
import { Upload, FileText, X, Trash2 } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import Progress from "../utils/Progress.vue"

interface UploadedFile {
  id: number
  fileName: string
  columnName?: string
}

interface UploadingFile {
  file: File
  progress: number
}

const props = defineProps<{
  label?: string
  required?: boolean
  files: UploadedFile[]
  columnName?: string
  multiple?: boolean
  view?: boolean
}>()

const emit = defineEmits<{
  (e: "update:files", value: UploadedFile[]): void
}>()

const modelFiles = computed({
  get: () => props.files,
  set: (val) => emit("update:files", val),
})

const inputRef = ref<HTMLInputElement | null>(null)
const uploadingFiles = ref<UploadingFile[]>([])
 
const fakeUpload = (file: File, onProgress: (p: number) => void) => {
  return new Promise<UploadedFile>((resolve) => {
    let progress = 0

    const interval = setInterval(() => {
      progress += 10
      onProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)

        resolve({
          id: Date.now(),
          fileName: file.name,
          columnName: props.columnName,
        })
      }
    }, 200)
  })
}
 
const openInput = () => inputRef.value?.click()

const onSelectFiles = async (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  if (!files.length) return

  for (const file of files) {
    const uploading: UploadingFile = {
      file,
      progress: 0,
    }

    uploadingFiles.value.push(uploading)

    const uploadedFile = await fakeUpload(file, (p) => {
      uploading.progress = p
    })

    modelFiles.value = [...modelFiles.value, uploadedFile]

    uploadingFiles.value = uploadingFiles.value.filter((f) => f !== uploading)
  }

  if (inputRef.value) inputRef.value.value = ""
}

const removeFile = (index: number) => {
  const list = [...props.files]
  list.splice(index, 1)
  emit("update:files", list)
}
</script>

<template>
  <div class="space-y-3">
     <label class="text-sm font-medium">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

         <div class="rounded-lg border border-dashed p-4 space-y-3">
       <div class="flex flex-wrap gap-2">
        <div
          v-for="(file, index) in files"
          :key="file.id"
          class="flex items-center gap-2 rounded-md border px-3 py-1 text-sm"
        >
          <FileText class="h-4 w-4 text-muted-foreground" />

          <span class="truncate max-w-[200px]">
            {{ file.fileName }}
          </span>

          <Button
            v-if="!view"
            @click="removeFile(index)"
            class="hover:text-destructive border"
            variant="ghost"
          >
            <Trash2 class="h-4 w-4" />
          </Button>
        </div>
      </div>

       <div v-for="(item, i) in uploadingFiles" :key="i" class="space-y-1">
        <div class="flex justify-between text-xs">
          <span>{{ item.file.name }}</span>
          <span>{{ item.progress }}%</span>
        </div>
        <Progress :value="item.progress" />
      </div>

       <Button
        v-if="!view && (!files.length || multiple)"
        variant="outline"
        size="sm"
        @click="openInput"
      >
        <Upload class="mr-2 h-4 w-4" />
        {{ $t("selectFile") }}
      </Button>
    </div>

     <input ref="inputRef" type="file" class="hidden" :multiple="multiple" @change="onSelectFiles" />
  </div>
</template>  -->

<script setup lang="ts">
import { ref, computed } from "vue"
import { Upload, FileText, Trash2 } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import Progress from "../utils/Progress.vue"
import { DocumentFileService } from "@/stores/file.srvice"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import type { AxiosProgressEvent } from "axios"

interface UploadedFile {
  id: number
  fileName: string
  columnName?: string
}

interface UploadingFile {
  file: File
  progress: number
}

const props = defineProps<{
  label?: string
  required?: boolean
  files: UploadedFile[]
  columnName?: string
  tableId: number
  multiple?: boolean
  view?: boolean
}>()

const emit = defineEmits<{
  (e: "update:files", value: UploadedFile[]): void
}>()

const { setError } = useErrorToast()

const modelFiles = computed({
  get: () => props.files,
  set: (val) => emit("update:files", val),
})

const inputRef = ref<HTMLInputElement | null>(null)
const uploadingFiles = ref<UploadingFile[]>([])

const openInput = () => inputRef.value?.click()

const onSelectFiles = async (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  if (!files.length) return

  for (const file of files) {
    const uploading: UploadingFile = {
      file,
      progress: 0,
    }

    uploadingFiles.value.push(uploading)

    const formData = new FormData()
    formData.append("files", file)

    try {
      const res = await DocumentFileService.UploadFile(formData, {
        onUploadProgress: (event: AxiosProgressEvent) => {
          if (!event.total) return
          uploading.progress = Math.round((event.loaded * 100) / event.total)
        },
      })

      const uploaded = res.data[0]

      modelFiles.value = [
        ...modelFiles.value,
        {
          id: uploaded.fileId,
          fileName: uploaded.fileName,
          columnName: props.columnName,
        },
      ]
    } catch (err) {
      setError(err)
    } finally {
      uploadingFiles.value = uploadingFiles.value.filter((f) => f !== uploading)
    }
  }

  if (inputRef.value) inputRef.value.value = ""
}

const removeFile = (index: number) => {
  const list = [...modelFiles.value]
  list.splice(index, 1)
  modelFiles.value = list
}
</script>

<template>
  <div class="space-y-3">
    <!-- Label -->
    <label class="text-sm font-medium">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Upload container -->
    <div class="rounded-lg border border-dashed p-4 space-y-3">
      <!-- Uploaded files -->
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(file, index) in files"
          :key="file.id"
          class="flex items-center gap-2 rounded-md border px-3 py-1 text-sm"
        >
          <FileText class="h-4 w-4 text-muted-foreground" />
          <span class="truncate max-w-[200px]">
            {{ file.fileName }}
          </span>

          <Button
            v-if="!view"
            variant="ghost"
            class="hover:text-destructive"
            @click.stop.prevent="removeFile(index)"
          >
            <Trash2 class="h-4 w-4" />
          </Button>
        </div>
      </div>

      <!-- Uploading progress -->
      <div v-for="(item, i) in uploadingFiles" :key="i" class="space-y-1">
        <div class="flex justify-between text-xs">
          <span>{{ item.file.name }}</span>
          <span>{{ item.progress }}%</span>
        </div>
        <Progress :value="item.progress" />
      </div>

      <!-- Upload button -->
      <Button
        v-if="!view && (!files.length || multiple)"
        variant="outline"
        size="sm"
        @click.prevent="openInput"
      >
        <Upload class="mr-2 h-4 w-4" />
        {{ $t("selectFile") }}
      </Button>
    </div>

    <!-- Hidden input -->
    <input ref="inputRef" type="file" class="hidden" :multiple="multiple" @change="onSelectFiles" />
  </div>
</template>
