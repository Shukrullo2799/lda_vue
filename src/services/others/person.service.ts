import ApiService from "../api.service"

export const PersonService = {
  GetByPassportData(data: any) {
    return ApiService.post("Person/GetByPassportData", data)
  },
  GetPhoto(personId: number) {
    return ApiService.get(`Person/GetPhoto/${personId}`)
  },
}
