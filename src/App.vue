<script setup lang="ts">
import { RouterView } from "vue-router"
import ApiService from "./services/api.service"

ApiService.setHeader()
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
