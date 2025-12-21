import { useAppUrl } from "@/composables/useAppUrl"
import axios from "axios"
const { API_URL } = useAppUrl()
const axiosServices = axios.create()

axios.defaults.baseURL = API_URL.value

export default axiosServices
