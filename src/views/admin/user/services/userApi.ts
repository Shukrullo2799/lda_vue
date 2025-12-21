import ApiService from "@/services/api.service"
import { type ICreateUserRequest, type IUpdateUserRequest } from "@/views/admin/user"

const UserService = {
  GetList(data: any) {
    return ApiService.post("User/GetList", data)
  },

  Get(id?: number) {
    if (id) return ApiService.get(`User/Get/${id}`)
    return ApiService.get("User/Get")
  },
  Update(data: ICreateUserRequest | IUpdateUserRequest) {
    if (data.hasOwnProperty("id")) return ApiService.post("User/Update", data)
    return ApiService.post("User/Create", data)
  },
}
export { UserService }
