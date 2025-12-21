<template>
  <div class="space-y-1 flex justify-between items-center text-sm gap-2">
    <span class="text-muted-foreground mb-0">
      <slot name="label" />
    </span>
    <div class="flex items-center gap-2">
      <slot name="value" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
