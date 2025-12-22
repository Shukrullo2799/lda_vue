import ApiService from "@/services/api.service"
import type { IDocument } from "../types/document"

const DocumentService = {
  GetList(data: any) {
    return ApiService.post("Document/GetList", data)
  },

  Get(id?: number) {
    if (id) return ApiService.get(`Document/Get/${id}`)
    return ApiService.get("Document/Get")
  },
  Update(data: IDocument) {
    if ("id" in data && data.id) return ApiService.post("Document/Update", data)
    return ApiService.post("Document/Create", data)
  },
}
export { DocumentService }
