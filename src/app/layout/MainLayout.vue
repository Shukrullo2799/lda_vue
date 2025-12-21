<script setup lang="ts">
import { useRoute } from "vue-router"
import AppSidebar from "./AppSidebar.vue"
import BreadCrumbs, { type BreadcrumbItemProps } from "./BreadCrumbs.vue"
import NavUser from "./NavUser.vue"
import ToggleMode from "../theme/ToggleMode.vue"
import { userDatas } from "../permissions/data"
import "vue-sonner/style.css" // vue-sonner v2 requires this import
import { Toaster } from "vue-sonner"
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

const route = useRoute()
</script>
<template>
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
