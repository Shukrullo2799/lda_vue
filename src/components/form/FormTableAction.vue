<script setup lang="ts">
import { computed, ref } from "vue"
import {
  Pencil,
  Eye,
  Trash2,
  FilePlus,
  CheckSquare,
  CheckCheck,
  X,
  XCircle,
  Send,
  MoreVertical,
} from "lucide-vue-next"

import { useAuth } from "@/stores/auth"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import { toast } from "vue-sonner"
import type { IModalProps, ITableActions } from "@/models"
import { useI18n } from "vue-i18n"
import { isShow } from "@/composables/helpers/helpers"

interface IProps {
  permission?: string
  item: any
  service?: any
  actions?: ITableActions
  showStatusActions?: boolean
  customFilter?: any
}

const props = withDefaults(defineProps<IProps>(), {
  actions: () => ({
    isView: true,
    isEdit: true,
  }),
})
const emits = defineEmits<{
  (e: "refresh"): void
  (e: "edit", item: any, options?: any): void
  (e: "clone", item: any): void
  (e: "view", item: any): void
}>()

const auth = useAuth()
const { setError } = useErrorToast()
const { t } = useI18n()

const deleteModal = ref(false)
const isModal = ref(false)
const deleteItemId = ref<number>(0)
const statusLoading = ref(false)

const isModalProps = ref<IModalProps>({
  cb: "",
  id: null,
  title: "",
})

const openDeleteModal = (item: any) => {
  deleteItemId.value = item.id
  deleteModal.value = true
}

const edit = (item: any) => emits("edit", item)
const clone = (item: any) => {
  emits("edit", item, { query: { clone: "true" } })
  emits("clone", item)
}
const view = (item: any) => emits("view", item)

const actionItems = computed(() => [
  {
    key: "edit",
    show: isShow({ action: props.actions?.isEdit, itemAction: props.item.canEdit }),
    icon: Pencil,
    color: "text-blue-500",
    label: "edit",
    onClick: () => edit(props.item),
  },
  {
    key: "view",
    show: auth.can(`${props.permission}View`) && props.actions?.isView,
    icon: Eye,
    label: "view",
    onClick: () => view(props.item),
  },
  {
    key: "delete",
    show: isShow({ action: props.actions?.isDelete, itemAction: props.item.canDelete }),
    icon: Trash2,
    color: "text-red-600",
    label: "delete",
    onClick: () => openDeleteModal(props.item),
  },
  {
    key: "clone",
    show: props.actions?.isClone,
    icon: FilePlus,
    label: "clone",
    onClick: () => clone(props.item),
  },
  {
    key: "approve",
    show:
      isShow({ action: props.actions?.canApprove, itemAction: props.item.canApprove }) &&
      props.showStatusActions,
    icon: CheckSquare,
    color: "text-green-500",
    label: "approve",
    onClick: () =>
      openModal({ title: "approve", id: props.item.id, cb: "Approve", item: props.item }),
  },
  {
    key: "accept",
    show:
      isShow({ action: props.actions?.canAccept, itemAction: props.item.canAccept }) &&
      props.showStatusActions,
    icon: CheckCheck,
    color: "text-green-500",
    label: "accept",
    onClick: () =>
      openModal({ title: "accept", id: props.item.id, cb: "Accept", item: props.item }),
  },
  {
    key: "cancel",
    show:
      (isShow({ action: props.actions?.canCancel, itemAction: props.item.canCancel }) &&
        props.showStatusActions) ||
      true,
    icon: X,
    color: "text-red-500",
    label: "cancel",
    onClick: () =>
      openModal({ title: "cancel", id: props.item.id, cb: "Cancel", item: props.item }),
  },
  {
    key: "reject",
    show:
      (isShow({ action: props.actions?.canReject, itemAction: props.item.canReject }) &&
        props.showStatusActions) ||
      true,
    icon: XCircle,
    color: "text-red-500",
    label: "reject",
    onClick: () =>
      openModal({ title: "reject", id: props.item.id, cb: "Reject", item: props.item }),
  },
  {
    key: "sent",
    show:
      (isShow({ action: props.actions?.canSent, itemAction: props.item.canSent }) &&
        props.showStatusActions) ||
      true,
    icon: Send,
    color: "text-blue-500",
    label: "sent",
    onClick: () => openModal({ title: "sent", id: props.item.id, cb: "Sent", item: props.item }),
  },
])
const openModal = ({
  title,
  id,
  cb,
  item,
}: {
  title: string
  id: number
  cb: string
  item: any
}) => {
  isModalProps.value.title = title
  isModalProps.value.id = id
  isModalProps.value.cb = cb
  isModalProps.value.item = item
  isModal.value = true
}

const closeModal = () => {
  isModal.value = false
  isModalProps.value = { cb: "", id: null, title: "" }
  deleteModal.value = false
}

const sentRequest = async (cb: string) => {
  if (!isModalProps.value.id) return
  try {
    statusLoading.value = true
    await props.service[cb]({ id: isModalProps.value.id, ...props.customFilter })

    toast.success(t("messages.success"))
    emits("refresh")
    closeModal()
  } catch (error) {
    setError(error)
  } finally {
    statusLoading.value = false
  }
}

const deleteItem = async () => {
  if (!deleteItemId.value) return

  try {
    statusLoading.value = true
    await props.service.Delete(deleteItemId.value)
    toast.success(t("messages.deleted"))
    emits("refresh")
  } catch (error) {
    setError(error)
  } finally {
    closeModal()
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <!-- ACTIONS POPOVER -->
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="ghost" size="icon">
          <MoreVertical class="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-52 p-1">
        <template v-for="(action, idx) in actionItems" :key="action.key">
          <!-- Action item -->
          <div
            v-if="action.show"
            class="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-sm font-medium select-none transition-colors"
            :class="[action.color, 'hover:bg-muted focus:bg-muted active:bg-muted']"
            @click="action.onClick"
          >
            <component :is="action.icon" class="h-4 w-4 shrink-0 opacity-80" />
            <span>{{ $t(action.label) }}</span>
          </div>
          <div
            v-if="idx < actionItems.length - 1 && actionItems[idx + 1].show"
            class="my-1 border-t border-gray-200"
          />
        </template>
      </PopoverContent>
    </Popover>

    <!-- DELETE MODAL -->
    <Dialog v-model:open="deleteModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ $t("confirmation.title") }}</DialogTitle>
        </DialogHeader>
        <p>{{ $t("confirmation.message") }}</p>
        <DialogFooter>
          <Button variant="destructive" @click="deleteModal = false">
            {{ $t("no") }}
          </Button>
          <Button :disabled="statusLoading" @click="deleteItem">
            {{ $t("yes") }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- CONFIRM MODAL -->
    <Dialog v-model:open="isModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ isModalProps.title }}</DialogTitle>
        </DialogHeader>
        <p>ID: {{ isModalProps.id }}</p>
        <DialogFooter>
          <Button variant="destructive" @click="isModal = false">
            {{ $t("no") }}
          </Button>
          <Button :disabled="statusLoading" @click="sentRequest(isModalProps.cb)">
            {{ $t("yes") }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
