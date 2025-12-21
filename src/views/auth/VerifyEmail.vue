<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <!-- Main Verify Email Card -->
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
      <!-- Logo and Header -->
      <div class="text-center mb-8">
        <!-- Logo -->
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

        <!-- Agency Name -->
        <p class="text-sm text-gray-500 mb-2">OʻZBEKISTON RESPUBLIKASI PREZIDENTI HUZURIDAGI</p>
        <h1 class="text-xl font-bold text-gray-900 mb-2">IJTIMOIY HIMOYA MILLIY AGENTLIGI</h1>
        <p class="text-lg text-gray-600">EMAIL TASDIQLASH</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center">
        <div
          class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="animate-spin w-8 h-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Email tasdiqlanmoqda...</h2>
        <p class="text-gray-600">Iltimos, kuting...</p>
      </div>

      <!-- Success State -->
      <div v-else-if="isSuccess" class="text-center">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Email muvaffaqiyatli tasdiqlandi</h2>
        <p class="text-gray-600 mb-6">
          Sizning email manzilingiz tasdiqlandi. Endi tizimga kirishingiz mumkin.
        </p>
        <router-link
          to="/login"
          class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors inline-block text-center"
        >
          Tizimga kirish
        </router-link>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center">
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Xatolik yuz berdi</h2>
        <p class="text-gray-600 mb-6">
          {{ error }}
        </p>
        <div class="space-y-3">
          <button
            @click="resendVerification"
            :disabled="isResending"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <span v-if="isResending" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Yuborish...
            </span>
            <span v-else>Qayta yuborish</span>
          </button>
          <router-link
            to="/login"
            class="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors inline-block text-center"
          >
            Tizimga kirish
          </router-link>
        </div>
      </div>

      <!-- Resend Success -->
      <div v-if="resendSuccess" class="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
        <p class="text-sm text-green-600">
          Tasdiqlash havolasi qayta yuborildi. Email qutingizni tekshiring.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAuthStore } from "./stores/authStore"

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// State
const isLoading = ref(true)
const isSuccess = ref(false)
const error = ref("")
const isResending = ref(false)
const resendSuccess = ref(false)

// Verify email on mount
onMounted(async () => {
  const token = route.params.token as string
  if (!token) {
    error.value = "Tasdiqlash havolasi noto'g'ri"
    isLoading.value = false
    return
  }

  try {
    await authStore.verifyEmail(token)
    isSuccess.value = true
  } catch (err: any) {
    error.value = err.message || "Email tasdiqlashda xatolik yuz berdi"
  } finally {
    isLoading.value = false
  }
})

// Resend verification email
const resendVerification = async () => {
  isResending.value = true
  resendSuccess.value = false

  try {
    await authStore.resendVerificationEmail()
    resendSuccess.value = true
  } catch (err: any) {
    error.value = err.message || "Qayta yuborishda xatolik yuz berdi"
  } finally {
    isResending.value = false
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
