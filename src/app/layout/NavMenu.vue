<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { hasAnyPermission } from '@/composables/hasAnyPermission'
import type { IPermission } from '@/models'
import { useRouter } from 'vue-router'

defineProps<{
  items: IPermission[]
}>()

const router = useRouter()

const isVisible = (visibles: string[]) => hasAnyPermission(['any'], visibles)
const checkIsActive = (item: IPermission) => router.currentRoute.value.path.startsWith(item.to)
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        :as-child="item.isCollapse"
        :default-open="checkIsActive(item)"
        class="group/collapsible"
      >
        <SidebarMenuItem v-if="isVisible(item.visible)">
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.title">
              <component :is="item.icon" v-if="item.icon" />
              <RouterLink :to="item.items?.length ? '' : item.to">{{ item.title }}</RouterLink>
              <ChevronRight
                v-if="item.items && item.items.length"
                class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="item.items && item.items.length">
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubButton as-child v-if="isVisible(subItem.visible)">
                  <RouterLink :to="subItem.to">
                    <span>{{ subItem.title }}</span>
                  </RouterLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
