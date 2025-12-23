import ApiService from "@/services/api.service"
import { type IOrganization } from "@/views/admin/organization"

const OrganizationService = {
  GetList(data: any) {
    return ApiService.post("ReceivingOrgan/GetList", data)
  },

  Get(id?: number) {
    if (id) return ApiService.get(`ReceivingOrgan/Get/${id}`)
    return ApiService.get("ReceivingOrgan/Get")
  },
  Update(data: IOrganization) {
    if ("id" in data && data.id) return ApiService.post("ReceivingOrgan/Update", data)
    return ApiService.post("ReceivingOrgan/Create", data)
  },
}
export { OrganizationService }
