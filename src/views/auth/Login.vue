<script setup lang="ts">
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import type { LoginRequest } from "./types/auth"
import { Form } from "vee-validate"
import { DownloadIcon, LogIn } from "lucide-vue-next"

import { useAuthStore } from "@/views/auth"

const router = useRouter()
const authStore = useAuthStore()

// Form data
const form = reactive<LoginRequest>({
  username: "",
  password: "",
})

// Form state
const isLoading = ref(false)
const error = ref("")
const showPassword = ref(false)

// Handle login
const handleLogin = async () => {
  isLoading.value = true
  error.value = ""

  try {
    await authStore.login(form)

    await router.push("/")
  } catch (err: any) {
    error.value = err.message || "Kirishda xatolik yuz berdi"
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-700 to-blue-800 flex items-center justify-center px-4 py-12"
  >
    <div class="max-w-md w-full">
      <div class="bg-white rounded-lg shadow-xl p-8">
        <!-- Logo / Title -->
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
          >
            <LogIn class="w-8 h-8 text-blue-700" />
          </div>

          <h1 class="text-gray-900 mb-2 text-xl font-semibold">
            {{ $t("loginTitle") }}
          </h1>
          <p class="text-gray-600">
            {{ $t("loginSubtitle") }}
          </p>
        </div>

        <!-- Login Form -->
        <Form @submit="handleLogin" class="space-y-6">
          <!-- Error -->
          <div
            v-if="error"
            class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
          >
            <p class="text-sm text-red-800">
              {{ error }}
            </p>
          </div>

          <!-- Username -->
          <div>
            <label class="block text-sm text-gray-700 mb-2">
              {{ $t("login") }}
            </label>

            <FormInput
              v-model="form.username"
              name="username"
              :placeholder="$t('login')"
              inputClass="h-[50px]"
              class="w-full"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm text-gray-700 mb-2">
              {{ $t("password") }}
            </label>

            <FormInput
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              :placeholder="$t('password')"
              class="w-full"
              inputClass="h-[50px]"
              required
            />
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading"> {{ $t("loading") }}... </span>
            <span v-else>
              {{ $t("login") }}
            </span>
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
