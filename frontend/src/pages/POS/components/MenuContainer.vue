<script setup lang="ts">
import type { Product } from '@/types/product'
import MenuCard from './MenuCard.vue'

defineProps<{
  tab: string
  products: Product[]
}>()
</script>

<template>
  <v-window-item :value="$props.tab">
    <v-row no-gutters>
      <v-col cols="3" v-for="item in $props.products" :key="item.id">
        <MenuCard :item="item" />
      </v-col>
    </v-row>
  </v-window-item>
</template>
