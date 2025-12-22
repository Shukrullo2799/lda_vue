<script setup lang="ts"></script>

<template>
  <div class="space-y-3">
    <div
      v-for="i in 5"
      :key="i"
      class="bg-white border border-gray-200 rounded-[8px] p-4 animate-pulse"
    >
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div class="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div class="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
</template>
