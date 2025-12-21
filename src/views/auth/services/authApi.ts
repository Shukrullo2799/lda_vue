import apiService from "@/services/api.service"
import type { LoginRequest, LoginResponse, User } from "../types/auth"

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiService.post("/Account/Login", credentials)
    return response.data
  },
  async GetAuth(): Promise<User> {
    const response = await apiService.get("/Account/GetAuth")
    return response.data
  },

  async logout(): Promise<void> {
    await apiService.post("/auth/logout")
  },
}
