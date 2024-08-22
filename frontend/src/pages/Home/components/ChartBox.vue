<script setup lang="ts">
import LineChart from './charts/LineChart.vue'

defineProps<{
  title: string
  chartData: any[]
  chartLabels: any[]
}>()
</script>

<template>
  <v-card rounded="xl" class="ma-0" :title="title" style="min-height: 250px">
    <template #append>
      <v-btn class="pa-0" variant="plain" to="/report" target="_blank">More Info</v-btn>
    </template>
    <v-card-text>
      <LineChart :data="chartData" :labels="chartLabels"></LineChart>
    </v-card-text>
  </v-card>
</template>
