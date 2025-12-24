import ApiService from "@/services/api.service"
import type { AxiosRequestConfig } from "axios"

export const DocumentFileService = {
  UploadFile(data: any, config?: AxiosRequestConfig) {
    return ApiService.post(`/DocumentFile/UploadFile`, data, config)
  },
  DownloadFile(
    fileId: string | number | undefined,
    tableId: number | undefined,
    documentId?: number | string,
  ) {
    return ApiService.print(
      `/DocumentFile/DownloadFile/${fileId}/${tableId}/${documentId ? documentId : 0}`,
    )
  },
  DeleteFile(fileId: string | undefined, tableId: number | undefined) {
    return ApiService.post(`/DocumentFile/DeleteFile/${fileId}/${tableId}`)
  },
}
