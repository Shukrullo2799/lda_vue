import { AxiosError } from "axios"
import { toast } from "vue-sonner"

export const useErrorToast = () => {
  const setError = async (err: unknown) => {
    if (err instanceof AxiosError) {
      console.log("Error:", err)
      const response = err.response
      const isJsonBlob = (data: any) =>
        data instanceof Blob &&
        (data.type == "application/json" || data.type == "application/problem+json")
      const responseData = isJsonBlob(response?.data)
        ? await response?.data?.text()
        : response?.data || {}
      const responseJson =
        typeof responseData === "string" ? JSON.parse(responseData) : responseData

      if (responseJson) {
        const text = (await responseJson?.text) ? responseJson.text() : responseJson
        const parsed = JSON.parse(JSON.stringify(text))
        if (parsed && parsed?.errors) {
          for (const item in parsed?.errors) {
            toast.error(parsed.errors[item]?.toString())
          }
        }
      }
    }
  }

  return {
    setError,
  }
}
