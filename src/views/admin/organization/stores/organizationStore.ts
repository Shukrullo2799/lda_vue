import { defineStore } from "pinia"
import { useErrorToast } from "@/composables/helpers/useErrorToast"

import { OrganizationService, type IOrganization } from "@/views/admin/organization"

const { setError } = useErrorToast()

export const useOrganizationStore = defineStore("organization", {
  state: () => ({
    editingOrganization: null as IOrganization | null,
    loading: false,
    saveLoading: false,
    error: null as string | null,
  }),

  getters: {},

  actions: {
    async getOrganizationById(id: string | number) {
      this.loading = true
      this.error = null
      try {
        const response = await OrganizationService.Get(+id)
        this.editingOrganization = response.data as IOrganization
        return response.data
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.loading = false
      }
    },

    async updateOrganization(userData: IOrganization) {
      this.saveLoading = true
      this.error = null
      try {
        await OrganizationService.Update(userData)
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.saveLoading = false
      }
    },
  },
})
