import ApiService from "@/services/api.service"
import { type IRole } from "@/views/admin/role"

const RoleService = {
  GetList(data: any) {
    return ApiService.post("Role/GetList", data)
  },

  Get(id?: number) {
    if (id) return ApiService.get(`Role/Get/${id}`)
    return ApiService.get("Role/Get")
  },
  Update(data: IRole) {
    if ("id" in data && data.id) return ApiService.post("Role/Update", data)
    return ApiService.post("Role/Create", data)
  },
  GetSelectList() {
    return ApiService.get("Role/GetSelectList")
  },

  GetPermissions() {
    return ApiService.get("Role/GetPermissions")
  },
  GetPermissionGroups() {
    return ApiService.get("Role/GetPermissionGroups")
  },
}
export { RoleService }
