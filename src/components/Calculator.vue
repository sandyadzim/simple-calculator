<template>
  <div class="h-screen w-full flex flex-col justify-center items-center">
    <h1 class="my-3 text-3xl font-bold text-gray-700">Simple Calculator</h1>
    <div class="shadow-2xl rounded-2xl flex flex-col dark:bg-slate-800">
      <div class="relative h-52 p-4 flex flex-col items-end justify-between">
        <Toggle />
        <div
          class="text-gray-500 dark:text-slate-50 text-lg text-right font-bold"
        >
          <div v-for="junk in calcStore.filteredHistory" :key="junk">
            {{ junk }}
          </div>
          {{ prevValue === '0' ? '' : prevValue }}
        </div>
        <div>
          <h5 class="text-gray-700 dark:text-slate-200 text-3xl font-bold">
            {{ answerValue }}{{ displayValue }}
          </h5>
        </div>
      </div>

      <div
        class="bg-gray-100 dark:bg-slate-600 rounded-t-3xl rounded-b-2xl p-4"
      >
        <div class="grid gap-6 grid-cols-4">
          <div
            v-for="item in calcStore.getListKey"
            :key="item.key"
            class="flex justify-center"
            :class="{ 'col-span-2': item.key === '0' }"
          >
            <button
              class="btn-calc flex items-center justify-center"
              :class="[
                item.key === 'AC'
                  ? 'text-emerald-400'
                  : 'text-gray-700 dark:text-slate-200',
                item.key === '0' ? '!w-full' : '',
              ]"
              @click="_actionClick(item.key)"
            >
              <img
                v-if="item.img"
                :src="item.img"
                :alt="item.key"
                :class="[item.isOp ? 'filtered-op-orange' : 'filtered-op']"
              />
              <span v-else>
                {{ item.key }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useCalcStore } from '../stores/calc'

import { Toggle } from './index'

// Declare Store
const calcStore = useCalcStore()

const currentValue = computed(() => {
  return calcStore.currentValue
})

const prevValue = computed(() => {
  return calcStore.prevValue
})

const answerValue = computed(() => {
  return calcStore.answerValue
})

const displayValue = computed(() => {
  if (answerValue.value) {
    if (currentValue.value !== '') {
      return currentValue.value
    } else {
      return ''
    }
  }
  return currentValue.value
})

const _actionClick = (key: string) => {
  if (key === 'AC') {
    clearValue()
  }

  if (key === '+/-') {
    addPlusMinus()
  }

  if (key === '%') {
    addPercentage()
  }

  if (key === '.') {
    addDot()
  }

  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
    addValue(key)
  }

  if (['+', '-', 'x', '/'].includes(key)) {
    operation(key)
  }

  if (key === '=') {
    calculate()
  }
}

const clearValue = () => {
  calcStore.clearAll()
}

const addPlusMinus = () => {
  calcStore.setPlusMinus()
}

const addPercentage = () => {
  calcStore.getPercentage()
}

const addDot = () => {
  calcStore.setDot()
}

const addValue = (key: string) => {
  calcStore.setValue(key)
}

const operation = (key: string) => {
  calcStore.operationFunc(key)
}

const calculate = () => {
  calcStore.doCalculate()
}

const mountLocalStorage = () => {
  calcStore.setFromMount()
}

const checkCommit = () => {
  console.log('check commit')
}

onMounted(() => {
  mountLocalStorage()
  console.log('test commit')
})
</script>
