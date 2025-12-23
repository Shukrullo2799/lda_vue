import { defineStore } from "pinia"
import { useErrorToast } from "@/composables/helpers/useErrorToast"

import { DocumentTypeService, type IDocumentType } from "@/views/admin/documentType"

const { setError } = useErrorToast()

export const useDocumentTypeStore = defineStore("DocumentType", {
  state: () => ({
    editingDocumentType: null as IDocumentType | null,
    loading: false,
    saveLoading: false,
    error: null as string | null,
  }),

  getters: {},

  actions: {
    async getDocumentTypeById(id: string | number) {
      this.loading = true
      this.error = null
      try {
        const response = await DocumentTypeService.Get(+id)
        this.editingDocumentType = response.data as IDocumentType
        return response.data
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.loading = false
      }
    },

    async updateDocumentType(userData: IDocumentType) {
      this.saveLoading = true
      this.error = null
      try {
        await DocumentTypeService.Update(userData)
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.saveLoading = false
      }
    },
  },
})
