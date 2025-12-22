<template>
  <div class="fixed inset-0 pointer-events-none z-50">
    <div
      v-for="(flake, idx) in snowflakes"
      :key="idx"
      class="absolute"
      :style="{
        width: flake.size + 'px',
        height: flake.size + 'px',
        transform: `translate(${flake.x}px, ${flake.y}px)`,
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 24 24"
        fill="#CFE3F8"
        stroke="#CFE3F8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-snowflake"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 4l2 1l2 -1" />
        <path d="M12 2v6.5l3 1.72" />
        <path d="M17.928 6.268l.134 2.232l1.866 1.232" />
        <path d="M20.66 7l-5.629 3.25l.01 3.458" />
        <path d="M19.928 14.268l-1.866 1.232l-.134 2.232" />
        <path d="M20.66 17l-5.629 -3.25l-2.99 1.738" />
        <path d="M14 20l-2 -1l-2 1" />
        <path d="M12 22v-6.5l-3 -1.72" />
        <path d="M6.072 17.732l-.134 -2.232l-1.866 -1.232" />
        <path d="M3.34 17l5.629 -3.25l-.01 -3.458" />
        <path d="M4.072 9.732l1.866 -1.232l.134 -2.232" />
        <path d="M3.34 7l5.629 3.25l2.99 -1.738" />
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue"

const snowflakes = ref<{ x: number; y: number; size: number; speed: number }[]>([])

const createSnowflakes = (count = 80) => {
  const flakes = []
  for (let i = 0; i < count; i++) {
    flakes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 1 + Math.random() * 4,
      speed: 0.2 + Math.random() * 0.8,
    })
  }
  snowflakes.value = flakes
}

const animateSnow = () => {
  for (const flake of snowflakes.value) {
    flake.y += flake.speed
    if (flake.y > window.innerHeight) {
      flake.y = -flake.size
      flake.x = Math.random() * window.innerWidth
    }
  }
  requestAnimationFrame(animateSnow)
}

onMounted(() => {
  createSnowflakes(80) // qancha ko‘p bo‘lsa qor ko‘p
  animateSnow()
})
</script>
