<template>
  <v-col
    cols="auto"
    v-for="(card, index) in store.cards.value"
    :key="card.id"
    class="mx-6"
    xl="3"
    lg="3"
  >
    <a :href="store.cards.value[index].urlLink" target="_blank">
      <v-card
        class="mx-auto custom-bg"
        max-width="344"
        :title="store.cards.value[index].name"
        :subtitle="store.cards.value[index].id + ' · ' + store.cards.value[index].role"
        :prepend-avatar="store.cards.value[index].urlImg"
      >
        <v-card-text>
          {{ store.cards.value[index].describe }}
        </v-card-text>
      </v-card>
    </a>
  </v-col>
</template>

<script setup lang="ts">
import { useAboutStore } from '../../../stores/about'

const store = useAboutStore()
</script>

<style scoped>
.v-card {
  transition: 0.2s;
}

.v-card:hover {
  transform: scale(1.05);
}

.custom-bg {
  background: rgba(0, 0, 0, 0.7);
}
</style>
