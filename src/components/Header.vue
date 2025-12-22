<script setup lang="ts">
import { computed } from "vue"
import { RouterLink } from "vue-router"
import { User, LogOut } from "lucide-vue-next"
import { useAuthStore } from "@/views/auth"

const language = computed({
  get: () => localStorage.getItem("language") || "en",
  set: (value: string) => {
    localStorage.setItem("language", value)
    location.reload()
  },
})

const authStore = useAuthStore()
</script>
<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3">
          <div class="h-8">
            <div class="relative size-full">logo</div>
          </div>
        </RouterLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink to="/" class="text-gray-700 hover:text-blue-700 transition-colors">
            {{ $t("header.officialActs") }}
          </RouterLink>
          <!-- 
          <RouterLink to="/" class="text-gray-700 hover:text-blue-700 transition-colors">
            {{ $t("header.aboutSystem") }}
          </RouterLink>
          <RouterLink to="/" class="text-gray-700 hover:text-blue-700 transition-colors">
            {{ $t("header.publications") }}
          </RouterLink>
          <RouterLink to="/" class="text-gray-700 hover:text-blue-700 transition-colors">
            {{ $t("header.directories") }}
          </RouterLink>
          <RouterLink to="/" class="text-gray-700 hover:text-blue-700 transition-colors">
            {{ $t("header.legalExplanations") }}
          </RouterLink> -->
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-4">
          <!-- Language -->
          <select
            class="px-3 py-1 border border-gray-300 rounded text-sm bg-white"
            v-model="language"
          >
            <option value="en">EN</option>
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
          </select>

          <!-- Auth -->
          <template v-if="authStore.isLoggedIn">
            <RouterLink
              to="/admin"
              class="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-700"
            >
              <User class="w-4 h-4 min-w-4" />
              <span class="text-sm">{{ authStore.userFullName }}</span>
            </RouterLink>

            <Button
              @click="authStore.logout"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center gap-2 cursor-pointer"
            >
              <LogOut class="w-4 h-4" />
              {{ $t("logout") }}
            </Button>
          </template>

          <RouterLink
            v-else
            to="/login"
            class="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            {{ $t("header.enter") }}
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
