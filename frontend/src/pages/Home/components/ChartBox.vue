<script setup lang="ts">
import { useLocale } from 'vuetify'
import LineChart from './charts/LineChart.vue'

const { t } = useLocale()

defineProps<{
  title: string
  chartData: any[]
  chartLabels: any[]
}>()
</script>

<template>
  <v-card rounded="lg" class="ma-0" :title="title" style="min-height: 250px">
    <template #append>
      <v-btn class="pa-0" variant="plain" to="/report" target="_blank">{{ t('more') }}</v-btn>
    </template>
    <v-card-text>
      <LineChart :data="chartData" :labels="chartLabels"></LineChart>
    </v-card-text>
  </v-card>
</template>
