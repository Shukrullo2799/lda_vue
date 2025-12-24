import { defineStore } from "pinia"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import { DocumentService, type IDocument } from "@/views/admin/document"
import type { IFilter, ISelectList } from "@/models"
import { ClassifierService } from "@/services/others/classifier.service"
import { OrganizationService } from "../../organization"

const { setError } = useErrorToast()

export const useDocumentStore = defineStore("document", {
  state: () => ({
    documents: [] as Array<any>,
    currentDocument: null as IDocument | null,
    loading: false,
    saveLoading: false,
    receiverOrgList: [] as ISelectList[],
    characterIdList: [] as ISelectList[],
    filter: {
      orderType: "asc",
      page: 1,
      pageSize: 20,
      search: "",
    } as IFilter,
  }),
  actions: {
    async fetchDocuments() {
      this.loading = true
      try {
        const response = await DocumentService.GetList(this.filter)
        this.documents = response.data.items
        this.filter.totalRows = response.data.total
      } catch (error) {
        setError(error)
      } finally {
        this.loading = false
      }
    },
    async getDocumentById(id: number) {
      this.loading = true
      try {
        const response = await DocumentService.Get(+id)
        this.currentDocument = response.data as IDocument
        this.currentDocument.content = []
        return response.data
      } catch (error) {
        setError(error)
      } finally {
        this.loading = false
      }
    },
    async updateDocument(documentData: IDocument) {
      this.saveLoading = true
      try {
        await DocumentService.Update(documentData)
      } catch (error) {
        setError(error)
      } finally {
        this.saveLoading = false
      }
    },
    async fetchCharacterList() {
      try {
        const response = await ClassifierService.GetDocumentClassSelectList()
        this.characterIdList = response.data
      } catch (error) {
        setError(error)
      } finally {
        this.loading = false
      }
    },
    async fetchEeceiverOrgList() {
      try {
        const response = await OrganizationService.GetAsSelectList()
        this.receiverOrgList = response.data
      } catch (error) {
        setError(error)
      } finally {
        this.loading = false
      }
    },
  },
})
