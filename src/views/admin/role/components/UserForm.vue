<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { type ICreateUserRequest, type IUpdateUserRequest, useUserStore } from "@/views/admin/user/"
import { X } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { Form } from "vee-validate"
import FormSelect from "@/components/form/FormSelect.vue"

const userId = defineModel<number | null>("userId")

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { editingUser, loading, saveLoading } = storeToRefs(userStore)
const isEdit = ref(false)

const loadUser = async () => {
  userStore.getUserById(userId.value as number)
}

const handleSubmit = async () => {
  console.log("Submitting user:")
  saveLoading.value = true

  try {
    await userStore.updateUser(editingUser.value as ICreateUserRequest | IUpdateUserRequest)

    router.push("/appointments")
  } catch (error) {
    console.error("Error saving appointment:", error)
  } finally {
    loading.value = false
  }
}
const handleCancelUser = () => {
  userId.value = null
  editingUser.value = null
}

onMounted(async () => {
  if (userId.value != null) {
    isEdit.value = Boolean(userId.value)
    await loadUser()
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 my-6">
    <template v-if="!loading && editingUser">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">
          {{ isEdit ? $t("editUser") : $t("createUser") }}
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

      <Form @submit.prevent="handleSubmit" class="space-y-6" v-if="editingUser">
        <div class="form-grid">
          <div>
            <FormInput
              name="userName"
              v-model="editingUser.userName"
              required
              :label="$t('userName')"
              :placeholder="$t('userName')"
            />
          </div>
          <div>
            <FormInput
              name="password"
              v-model="editingUser.userName"
              type="password"
              required
              :label="$t('password')"
              :placeholder="$t('password')"
            />
          </div>
          <div>
            <FormInput
              name="phoneNumber"
              v-model="editingUser.phoneNumber"
              required
              :label="$t('phoneNumber')"
              :placeholder="$t('email')"
            />
          </div>
          <div>
            <FormInput
              name="email"
              v-model="editingUser.userName"
              type="email"
              :label="$t('email')"
              :placeholder="$t('email')"
            />
          </div>
          <div>
            <FormSelect
              name="roles"
              v-model="editingUser.roles"
              :options="roleList"
              type="email"
              :label="$t('email')"
              :placeholder="$t('email')"
            />
          </div>
        </div>

        <div class="page-actions">
          <Button type="submit" :loading="saveLoading">
            {{ isEdit ? "Update" : "Create" }}
          </Button>
          <Button type="button" variant="outline" @click="handleCancelUser"> Cancel </Button>
        </div>
      </Form>
    </template>
  </div>
</template>
