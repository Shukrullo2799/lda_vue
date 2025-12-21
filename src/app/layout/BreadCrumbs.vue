<script setup lang="ts">
export interface BreadcrumbItemProps {
  title: string
  href?: string
  disabled?: boolean
}

defineProps<{
  title?: string
  breadcrumbs?: BreadcrumbItemProps[]
  icon?: string
}>()
</script>
<template>
  <Breadcrumb class="w-full self-center">
    <BreadcrumbList>
      <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <BreadcrumbItem v-if="!breadcrumb.disabled">
          <BreadcrumbLink :href="breadcrumb.href" :disabled="breadcrumb.disabled">
            {{ $t(breadcrumb.title) }}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator
          v-if="index != Number(breadcrumbs?.length) - 1"
          class="hidden md:block"
        />
        <BreadcrumbItem v-if="breadcrumb.disabled">
          <BreadcrumbPage :disabled="breadcrumb.disabled">
            {{ $t(breadcrumb.title) }}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
