<template>
  <button
    @click="toggleTheme"
    class="p-2 bg-gray-200 mb-2 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label="Toggle dark mode"
  >
    <span v-if="isDarkMode" aria-hidden="true"><IconMoon/></span>
    <span v-else aria-hidden="true"><IconSun/> </span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IconSun, IconMoon } from '@tabler/icons-vue';
const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDarkMode.value =
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})
</script>
