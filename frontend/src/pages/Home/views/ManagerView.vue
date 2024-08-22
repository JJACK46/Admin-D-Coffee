<script setup lang="ts">
import CardShort from '../components/CardShort.vue'
import { useHomeStore } from '../store/home'

const store = useHomeStore()
</script>

<template>
  <v-container fluid class="h-100">
    <v-row>
      <v-col xs="12" sm="4">
        <CardShort
          title="Daily Sales"
          subtitle="from yesterday"
          class_subtitle="text-green"
          :old-data="store.getDailySales?.yesterday"
          :new-data="store.getDailySales?.today"
          icon="mdi-heart"
        />
      </v-col>
      <v-col xs="12" sm="4">
        <CardShort
          icon="mdi-cart"
          title="Monthly Sales"
          subtitle="from last month"
          class_subtitle="text-green"
          :old-data="store.getMonthlySales?.lastMonth"
          :new-data="store.getMonthlySales?.thisMonth"
        >
        </CardShort>
      </v-col>
      <v-col xs="12" sm="4">
        <CardShort
          icon="mdi-currency-usd"
          title="Yearly Sales"
          subtitle="from last year"
          class_subtitle="text-red"
          :old-data="store.getYearlySales?.lastYear"
          :new-data="store.getYearlySales?.thisYear"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
