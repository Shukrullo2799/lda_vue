import { defineStore } from "pinia"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import { RoleService, type IRole, type IPermissionGroup } from "@/views/admin/role"

const { setError } = useErrorToast()

export const useRoleStore = defineStore("role", {
  state: () => ({
    editingRole: null as IRole | null,
    loading: false,
    saveLoading: false,
    error: null as string | null,
    permissionList: [] as IPermissionGroup[],
  }),

  getters: {},

  actions: {
    async getRoleById(id: string | number) {
      this.loading = true
      this.error = null
      try {
        const response = await RoleService.Get(+id)
        this.editingRole = response.data as IRole
        return response.data
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.loading = false
      }
    },

    async updateRole(userData: IRole) {
      this.saveLoading = true
      this.error = null

      try {
        const response = await RoleService.Update(userData)
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.saveLoading = false
      }
    },
    async fetchPermissionList() {
      try {
        const response = await RoleService.GetPermissionGroups()
        this.permissionList = response.data
      } catch (error) {
        setError(error)
      }
    },
  },
})
