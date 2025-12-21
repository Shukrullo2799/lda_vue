<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import NavMain from './NavMenu.vue'
import TeamSwitcher from './LogoSwitcher.vue'
import permissions from '@/app/permissions/index'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="permissions" />
    </SidebarContent>

    <SidebarRail />
  </Sidebar>
</template>
