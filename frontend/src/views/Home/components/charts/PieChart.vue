<template>
  <!-- <canvas id="sales" class="ma-0"> </canvas> -->
  <Pie :data="chartData" :options="chartOptions"> </Pie>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import { Pie } from 'vue-chartjs'
// import { onMounted } from 'vue'
import { computed } from 'vue'
Chart.register()

const props = defineProps<{
  labels: string[]
  data: Array<any>
}>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      backgroundColor: ['#38220f', '#634832', '#967259', '#dbc1ac', '	#ece0d1'],
      label: 'Sales',
      data: props.data
    }
  ]
}))

const chartOptions = computed(() => ({
  layout: {
    autoPadding: true
  },
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: '#fff',
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    title: {
      color: '#fff',
      display: false,
      text: 'Top 5 Most Product Sold',
      font: {
        size: 16
      }
    }
  }
}))

// onMounted(() => {
//   new Chart(document.getElementById('sales') as HTMLCanvasElement, {
//     type: 'pie',
//     data: {
//       labels: props.labels,
//       datasets: [
//         {
//           backgroundColor: ['#38220f', '#634832', '#967259', '#dbc1ac', '	#ece0d1'],
//           label: 'Sales',
//           data: props.data
//         }
//       ]
//     },
//     options: {
//       layout: {
//         autoPadding: true
//       },
//       responsive: true,
//       maintainAspectRatio: true,
//       plugins: {
//         tooltip: {
//           enabled: true,
//           callbacks: {
//             label: (context) => {
//               const value = context.dataset.data[context.dataIndex]
//               const percentage = (value / context.dataset.data.reduce((a, b) => a + b)) * 100

//               return ` ${value} (${percentage.toFixed(2)}%)`
//             }
//           },
//           position: 'average'
//         },
//         legend: {
//           labels: {
//             color: '#fff',
//             usePointStyle: true,
//             pointStyle: 'circle'
//           }
//         },
//         title: {
//           color: '#fff',
//           display: false,
//           text: 'Top 5 Most Product Sold',
//           font: {
//             size: 16
//           }
//         }
//       }
//     }
//   })
// })
</script>
