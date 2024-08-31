<template>
  <!-- <canvas id="the-line"></canvas> -->
  <v-skeleton-loader v-if="loader.isLoading" type="card" height="178"></v-skeleton-loader>
  <Line
    v-else-if="data.length > 0 && labels.length > 0"
    :data="chartData"
    :options="chartOptions"
  ></Line>
  <span v-else class="d-flex align-center justify-center text-grey mt-12"
    ><h3>{{ t('noData') }}</h3></span
  >
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import Chart from 'chart.js/auto'
import { computed } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import { monthShort } from '@/utils/date'
import { useLocale } from 'vuetify'

const loader = useLoadingStore()

const { t } = useLocale()

Chart.register()

const props = defineProps<{
  data: any[]
  labels: (string | number)[]
}>()

const sortedData = computed(() => {
  return [...props.data].sort((a, b) => (a < b ? -1 : 1)) // Concise asc sort
})

const sortedLabels = computed(() => {
  const areStringLabels = Array.isArray(props.labels.join(' '))

  return [...props.labels].sort((a: any, b: any) => {
    if (areStringLabels) {
      const monthIndexA = monthShort.indexOf(a)
      const monthIndexB = monthShort.indexOf(b)
      return monthIndexA - monthIndexB
    } else {
      return a < b ? -1 : 1 // Default numeric sort
    }
  })
})

const chartData = computed(() => ({
  labels: sortedLabels.value,
  datasets: [
    {
      data: sortedData.value
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
}))

// onMounted(() => {
//   new Chart(document.getElementById('theLine') as HTMLCanvasElement, {
//     type: 'line',
//     data: {
//       labels: props.labels,
//       datasets: [
//         {
//           data: props.data
//         }
//       ]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           display: false
//         }
//       },
//       layout: {
//         autoPadding: false,
//         padding: {
//           bottom: 20
//         }
//       }
//     }
//   })
// })
</script>
