<script setup lang="ts">
import { useRoute } from "vue-router"
import BreadCrumbs, { type BreadcrumbItemProps } from "./BreadCrumbs.vue"
import "vue-sonner/style.css" // vue-sonner v2 requires this import
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Snowfall from "@/components/utils/Snowfall.vue"

const route = useRoute()
</script>
<template>
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
      <RouterView />
      <Snowfall />
      <!-- Barcha sahifalarda ko‘rinadi -->
    </main>
    <Footer />
  </div>
</template>
