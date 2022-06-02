<template>
  <div>
    <div class="absolute left-4 cursor-pointer" @click="changeMode">
      <svg
        v-if="!isDark"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-slate-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-slate-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </div>
    <div class="absolute left-4 cursor-pointer top-12" @click="removeHistory">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-slate-700 dark:text-slate-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useCalcStore } from '../stores/calc'

// Declare Store
const calcStore = useCalcStore()

const isDark = ref<boolean>(false)

const changeMode = () => {
  isDark.value = !isDark.value
  isDark.value
    ? document.body.classList.add('dark')
    : document.body.classList.remove('dark')
}

const removeHistory = () => {
  calcStore.clearHistory()
}
</script>
