import ApiService from "../api.service"

export const ClassifierService = {
  GetLanguageSelectList() {
    return ApiService.get("Classifier/GetLanguageSelectList")
  },
  GetStateSelectList() {
    return ApiService.get("Classifier/GetStateSelectList")
  },
  GetDocumentClassSelectList() {
    return ApiService.get("Classifier/GetDocumentClassSelectList")
  },
}
