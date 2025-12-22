<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { type ICreateUserRequest, type IUpdateUserRequest, useUserStore } from "@/views/admin/user/"
import { X } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { Form } from "vee-validate"
import SetPersonData from "@/components/Person/SetPersonData.vue"
import UserInfo from "@/components/Person/UserInfo.vue"
import type { ISetPassportData } from "@/components/Person/PersonDataTypes"
import { PersonService } from "@/services/others/person.service"
import { useErrorToast } from "@/composables/helpers/useErrorToast"

const userId = defineModel<number | null>("userId")
const emits = defineEmits<{
  (e: "refresh"): void
}>()

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { editingUser, loading, saveLoading, roleList, searchLoading } = storeToRefs(userStore)
const { setError } = useErrorToast()

const isEdit = ref(false)

const loadUser = async () => {
  userStore.getUserById(userId.value as number)
}

const handleSubmit = async () => {
  saveLoading.value = true

  try {
    await userStore.updateUser(editingUser.value as ICreateUserRequest | IUpdateUserRequest)
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
  editingUser.value = null
}

const setPerson = (filterPerson: ISetPassportData) => {
  if (editingUser.value) {
    PersonService.GetByPassportData(filterPerson).then((res) => {
      editingUser.value!.person = res.data
      editingUser.value!.personId = res.data.id
    })
  }
}

onMounted(async () => {
  if (userId.value != null) {
    isEdit.value = Boolean(userId.value)
    await loadUser()
  }
  await userStore.fetchRoleList()
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

      <Form @submit="handleSubmit" class="space-y-6" v-if="editingUser">
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
              v-model="editingUser.password"
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
              :placeholder="$t('phoneNumber')"
            />
          </div>
          <div>
            <FormInput
              name="email"
              v-model="editingUser.email"
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
              :label="$t('roles')"
              multiple
              :placeholder="$t('roles')"
            />
          </div>
        </div>
        <div>
          <SetPersonData
            :searchLoading
            v-model="editingUser.person"
            :documentTypeList="[]"
            @setPerson="setPerson"
            class="mb-4"
          />
          <UserInfo :person="editingUser.person" v-if="editingUser.person" :title="$t('person')" />
        </div>

        <div class="page-actions">
          <Button type="submit" :loading="saveLoading">
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
