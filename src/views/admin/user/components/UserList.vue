<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { UserCard, useUserStore } from "@/views/admin/user/"

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">{{ $t("appointments") }}</h1>
      <Button>{{ $t("create") }}</Button>
    </div>

    <div v-if="userStore.loading" class="text-center py-8">
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full mb-4" />
      <Skeleton class="h-8 w-full" />
    </div>

    <div v-else-if="userStore.error" class="empty-state">
      {{ userStore.error }}
    </div>

    <div v-else-if="userStore.users.length === 0" class="empty-state">No appointments found</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UserCard
        v-for="appointment in userStore.users"
        :key="appointment.id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
