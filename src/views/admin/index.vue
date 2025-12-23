<script setup lang="ts">
import { computed, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Users, FileText, Shield, Building2 } from "lucide-vue-next"
import { useAuthStore } from "@/views/auth"

type TabType = "users" | "documents" | "roles" | "organizations"

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

/* Active tab based on current route */
const activeTab = computed<TabType>(() => {
  const lastSegment = route.path.split("/").pop()
  if (lastSegment === "documents") return "documents"
  if (lastSegment === "roles") return "roles"
  if (lastSegment === "organizations") return "organizations"
  return "users" // default
})

/* 🔹 Tab navigation */
const goTo = (tab: TabType) => {
  router.push(`/admin/${tab}`)
}
watchEffect(() => {
  if (authStore && !authStore.isLoggedIn) {
    router.replace("/login")
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white border-b border-gray-200 py-6">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-gray-900 mb-2 text-2xl font-bold">
          {{ $t("admin.title") }}
        </h1>
        <p class="text-gray-600 text-center">
          {{
            $t("admin.welcome", {
              name: authStore.userFullName,
            })
          }},
        </p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex gap-8">
          <!-- Users -->
          <button
            @click="goTo('users')"
            class="py-4 border-b-2 transition-colors flex items-center gap-2"
            :class="
              activeTab === 'users'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            "
          >
            <Users class="w-5 h-5" />
            {{ $t("admin.usersTab") }}
          </button>

          <!-- Documents -->
          <button
            @click="goTo('documents')"
            class="py-4 border-b-2 transition-colors flex items-center gap-2"
            :class="
              activeTab === 'documents'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            "
          >
            <FileText class="w-5 h-5" />
            {{ $t("admin.documentsTab") }}
          </button>

          <!-- Roles -->
          <button
            @click="goTo('roles')"
            class="py-4 border-b-2 transition-colors flex items-center gap-2"
            :class="
              activeTab === 'roles'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            "
          >
            <Shield class="w-5 h-5" />
            {{ $t("admin.rolesTab") }}
          </button>

          <!-- Organizations -->
          <button
            @click="goTo('organizations')"
            class="py-4 border-b-2 transition-colors flex items-center gap-2"
            :class="
              activeTab === 'organizations'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            "
          >
            <Building2 class="w-5 h-5" />
            {{ $t("admin.organization") }}
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <RouterView />
    </div>
  </div>
</template>
