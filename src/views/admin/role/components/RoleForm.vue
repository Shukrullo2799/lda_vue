<script setup lang="ts">
import { ref, onMounted } from "vue"
import { ChevronDown, X } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { Form } from "vee-validate"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import { useRoleStore, type IPermissionGroupItem, type IRole } from "@/views/admin/role"
import { AccordionContent, AccordionItem, AccordionTrigger } from "reka-ui"
import Checkbox from "@/components/ui/checkbox/Checkbox.vue"

const userId = defineModel<number | null>("roleId")
const emits = defineEmits<{
  (e: "refresh"): void
}>()

const roleStore = useRoleStore()
const { editingRole, loading, saveLoading, permissionList } = storeToRefs(roleStore)
const { setError } = useErrorToast()

const isEdit = ref(false)

const loadUser = async () => {
  roleStore.getRoleById(userId.value as number)
}

const handleSubmit = async () => {
  saveLoading.value = true

  try {
    await roleStore.updateRole(editingRole.value as IRole)
    handleCancelUser()
    emits("refresh")
  } catch (error) {
    setError(error)
  } finally {
    loading.value = false
  }
}
const handleCancelUser = () => {
  userId.value = null
  editingRole.value = null
}

onMounted(async () => {
  if (userId.value != null) {
    isEdit.value = Boolean(userId.value)
    await loadUser()
  }
  await roleStore.fetchPermissionList()
})

const togglePermission = (value: string, checked: boolean) => {
  if (!editingRole.value) return
  if (checked) {
    if (editingRole.value && !editingRole.value.permissions.includes(value)) {
      editingRole.value.permissions.push(value)
    }
  } else {
    editingRole.value.permissions = editingRole.value.permissions.filter((p) => p !== value)
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 my-6">
    <template v-if="!loading && editingRole">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">
          {{ isEdit ? $t("editRole") : $t("createRole") }}
        </h2>
        <Button
          @click="handleCancelUser"
          variant="ghost"
          size="icon"
          class="rounded-full text-gray-400 hover:text-gray-600"
        >
          <X />
        </Button>
      </div>

      <Form @submit="handleSubmit" class="space-y-6" v-if="editingRole">
        <div class="form-grid">
          <div>
            <FormInput
              name="name"
              v-model="editingRole.name"
              required
              :label="$t('userName')"
              :placeholder="$t('userName')"
            />
          </div>
        </div>
        <div>
          <div class="bg-white dark:bg-neutral-900 rounded-xl border p-6">
            <Collapsible
              v-for="item in permissionList"
              :key="item.name"
              class="border rounded-lg mb-2 overflow-hidden"
            >
              <!-- HEADER -->
              <CollapsibleTrigger
                class="flex w-full items-center justify-between px-4 py-3 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                {{ item.name }}
                <ChevronDown class="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
              </CollapsibleTrigger>

              <!-- CONTENT -->
              <CollapsibleContent class="px-4 pb-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-3">
                  <label
                    v-for="child in item.items"
                    :key="child.value"
                    class="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      @update:model-value="(val: any) => togglePermission(child.value, val)"
                      :default-value="editingRole!.permissions.includes(child.value) ? true : false"
                    />

                    {{ child.text }}
                  </label>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        <div class="page-actions">
          <Button type="submit" :disabled="saveLoading">
            {{ isEdit ? $t("Update") : $t("Create") }}
          </Button>
          <Button type="button" variant="outline" @click="handleCancelUser"
            >{{ $t("Cancel") }}
          </Button>
        </div>
      </Form>
    </template>
  </div>
</template>
