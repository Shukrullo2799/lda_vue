export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: "admin" | "doctor" | "nurse" | "receptionist"
  avatar?: string
  isActive: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
  doctorId: null | number
  languageId: number
  permissions: string[]
}

export interface LoginRequest {
  username: string
  password: string
  rememberDevice?: boolean
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone?: string
  role?: User["role"]
}

export interface RegisterResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  permissions: string[]
}
