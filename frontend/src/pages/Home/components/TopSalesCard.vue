<script setup lang="ts">
import PieChart from './charts/PieChart.vue'

function generateRandomProductSold(): number[] {
  const sold: number[] = []
  for (let i = 0; i < 5; i++) {
    const revenue = Math.floor(Math.random() * (1000 - 100 + 1)) + 100
    sold.push(revenue)
  }
  return sold
}
</script>

<template>
  <v-card rounded="xl" class="h-100">
    <template #title> Top 5 the most product sold </template>
    <template #append>
      <v-btn class="pa-0" variant="plain"> More info </v-btn>
    </template>
    <v-card-text>
      <PieChart
        :data="generateRandomProductSold()"
        :labels="['Espresso', 'Cappuccino', 'Latte', 'Americano', 'Macchiato']"
      >
      </PieChart>
    </v-card-text>
  </v-card>
</template>
