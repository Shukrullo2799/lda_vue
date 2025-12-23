import ApiService from "@/services/api.service"
import { type IDocumentType } from "@/views/admin/documentType"

const DocumentTypeService = {
  GetList(data: any) {
    return ApiService.post("DocumentType/GetList", data)
  },

  Get(id?: number) {
    if (id) return ApiService.get(`DocumentType/Get/${id}`)
    return ApiService.get("DocumentType/Get")
  },
  Update(data: IDocumentType) {
    if ("id" in data && data.id) return ApiService.post("DocumentType/Update", data)
    return ApiService.post("DocumentType/Create", data)
  },
}
export { DocumentTypeService }
