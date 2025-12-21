<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child class="mt-[8px] mr-3">
      <Button
        variant="outline"
        @click="mode = mode === 'dark' ? 'light' : 'dark'"
        class="relative h-8 w-8"
      >
        <Icon
          v-if="mode === 'light'"
          icon="radix-icons:moon"
          class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Icon
          v-else
          icon="radix-icons:sun"
          class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
      </Button>
    </DropdownMenuTrigger>
  </DropdownMenu>
</template>
