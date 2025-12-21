// Экспорт типов
export type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  AuthState,
} from "./types/auth"

// Экспорт store
export { useAuthStore } from "./stores/authStore"

// Экспорт сервиса
export { authService } from "./services/authApi"

// Экспорт роутера
export { authRoutes } from "./Router"

// Экспорт компонентов
export { default as Login } from "./Login.vue"
