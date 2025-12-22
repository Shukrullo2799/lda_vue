<script setup lang="ts">
interface IProps {
  size?: number
  color?: string
}

const props = withDefaults(defineProps<IProps>(), {
  size: 8,
  color: "blue-700",
})
</script>

<template>
  <div
    :class="`animate-spin rounded-full border-t-2 border-b-2 border-${props.color} w-${props.size} h-${props.size}`"
    role="status"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>
