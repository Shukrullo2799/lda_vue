import { defineStore } from "pinia"

export const useDocumentStore = defineStore("document", {
  state: () => ({
    documents: [] as Array<any>,
    currentDocument: null as any,
    loading: false,
  }),
  actions: {
    async fetchDocuments() {
      this.loading = true
      // Simulate an API call
      setTimeout(() => {
        this.documents = [
          { id: 1, title: "Document 1" },
          { id: 2, title: "Document 2" },
        ]
        this.loading = false
      }, 1000)
    },
    async getDocumentById(id: number) {
      this.loading = true
      // Simulate an API call
      setTimeout(() => {
        this.currentDocument = { id, title: `Document ${id}` }
        this.loading = false
      }, 1000)
    },
  },
})
