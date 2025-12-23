<script setup lang="ts">
import { ref, computed } from "vue"
import { Globe, XIcon } from "lucide-vue-next"
import { LANGUAGE_SELECT_LIST } from "@/utils/constants"

interface ITranslatedItems {
  languageId: number
  language?: string
  columnName: string
  translateText: string
}

interface IProps {
  value: string
  columnName: string
  translates: ITranslatedItems[]
  required?: boolean
  label?: string
  placeholder?: string
  isView?: boolean
  isEditor?: boolean
}

const props = defineProps<IProps>()
const emits = defineEmits(["update:translates", "update:value"])

const model = computed({
  get: () => props.value,
  set: (v) => emits("update:value", v),
})

const translateItems = ref<ITranslatedItems[]>([])
const translateModal = ref(false)

const anotherTranslates = computed(() =>
  props.translates.filter((e) => e.columnName !== props.columnName),
)

const getTranslateItem = () => {
  const list = props.translates.filter((e) => e.columnName === props.columnName)

  LANGUAGE_SELECT_LIST.forEach((lang) => {
    const found = list.find((e) => e.languageId === lang.value)

    if (!found) {
      list.push({
        languageId: lang.value,
        language: lang.text,
        columnName: props.columnName,
        translateText: "",
      })
    } else {
      found.language = lang.text
    }
  })

  translateItems.value = list.sort((a, b) => a.languageId - b.languageId)
}

const openTranslateModal = () => {
  getTranslateItem()
  translateModal.value = true
}

const saveTranslate = () => {
  const merged = [
    ...anotherTranslates.value,
    ...translateItems.value.filter((e) => e.translateText),
  ]

  emits("update:translates", merged)
  translateModal.value = false
}
</script>
<template>
  <div class="w-full space-y-2">
    <div v-if="!isView">
      <div class="relative">
        <FormInput v-model="model" :placeholder="placeholder || label" :label="label">
          <template #suffix>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              class="absolute -right-2 top-1/2 -translate-y-1/2"
              @click.prevent="openTranslateModal"
            >
              <Globe class="w-4 h-4 text-muted-foreground" />
            </Button>
          </template>
        </FormInput>
      </div>
    </div>

    <div
      v-else
      class="flex items-center justify-between cursor-pointer"
      @click="openTranslateModal"
    >
      <span>{{ model }}</span>
      <Globe class="w-4 h-4 text-muted-foreground" />
    </div>

    <Dialog v-model:open="translateModal">
      <DialogContent class="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{{ $t("Translates") }}</DialogTitle>
        </DialogHeader>

        <!-- TABLE -->
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{{ $t("Language") }}</TableHead>
              <TableHead>{{ $t("Translate") }}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow v-for="item in translateItems" :key="item.languageId">
              <TableCell class="font-medium">
                {{ item.language }}
              </TableCell>

              <TableCell>
                <span v-if="isView">
                  {{ item.translateText || "-" }}
                </span>
                <Input v-else v-model="item.translateText" :placeholder="$t('translateText')" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div v-if="!isView" class="flex justify-end mt-4">
          <Button variant="default" @click="saveTranslate">
            {{ $t("Save") }}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
