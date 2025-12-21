import { defineStore } from "pinia"
import type { User, LoginRequest, LoginResponse, RegisterResponse, AuthState } from "../types/auth"
import { authService } from "@/views/auth"
import ApiService from "@/services/api.service"

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem("user") as string) ?? null,
    permissions: [],
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.accessToken && !!state.user,
    userRole: (state) => state.user?.role,
    userFullName: (state) => {
      if (!state.user) return ""
      return `${state.user.firstName} ${state.user.lastName}`
    },
  },

  actions: {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
      this.isLoading = true
      this.error = null

      try {
        const response = await authService.login(credentials)
        await this.setTokenData(response)
        await this.getAuth()

        return response
      } catch (error: any) {
        this.error = error.message || "Login failed"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async getAuth() {
      try {
        const response = await authService.GetAuth()

        this.setUserData(response)

        return response
      } catch (error: any) {
        this.error = error.message || "Login failed"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async logout(): Promise<void> {
      this.isLoading = true

      try {
        // await authService.logout()

        this.clearAuthData()
      } catch (error: any) {
        console.error("Logout error:", error)
        // Даже если API вызов не удался, очищаем локальные данные
        this.clearAuthData()
      } finally {
        this.isLoading = false
      }
    },

    setTokenData(authData: LoginResponse | RegisterResponse): void {
      this.accessToken = authData.token
      localStorage.setItem("accessToken", authData.token)
      this.isAuthenticated = true
      ApiService.setHeader()
    },
    setUserData(userData: User) {
      this.user = userData
      localStorage.setItem("user", JSON.stringify(userData))
      this.permissions = userData.permissions || []
    },

    clearAuthData(): void {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.isAuthenticated = false
      this.error = null
      this.permissions = []
      ApiService.removeHeader()

      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
    },

    initializeAuth(): void {
      const storedToken = localStorage.getItem("accessToken")
      const storedUser = localStorage.getItem("user")

      if (storedToken && storedUser) {
        try {
          this.accessToken = storedToken
          this.user = JSON.parse(storedUser)
          this.isAuthenticated = true
        } catch (error) {
          this.clearAuthData()
        }
      }
    },

    clearError(): void {
      this.error = null
    },
    can(item: string) {
      if (this.permissions && this.permissions.includes(item)) {
        return true
      }
      return false
    },
  },
})
