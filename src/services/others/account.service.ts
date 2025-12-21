import ApiService from "../api.service"

const AccountService = {
  Login(data: any, Headers: any) {
    return ApiService.post("Account/Login", data, Headers)
  },
  ChangeLanguage(data: { languageId: number }) {
    return ApiService.post("Account/ChangeLanguage", data)
  },
  GetUserInfo() {
    return ApiService.get("Account/GetUserInfo")
  },
}
export default AccountService
