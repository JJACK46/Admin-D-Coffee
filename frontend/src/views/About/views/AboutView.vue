<template>
  <v-img src="src/views/About/assets/bg-coffee-beans-2.png" class="bg-img" cover> </v-img>
  <v-container fluid class="h-100">
    <v-col>
      <v-card class="pa-4">
        <h2>D-Coffee Enterprise Web App ( ver. SOLO )</h2>
        <h3>
          Developing an application for managing a coffee store, which includes inventory
          management, point of sale (POS) system, and various other features related to company
          benefits.
        </h3>
      </v-card>
    </v-col>
    <v-col class="text-center">
      <v-card class="pa-3 text-left" rounded elevation="0">
        <q>
          This application was initially developed by SimpleDev team for classroom assignments.
          Subsequently, I undertook its continued development until the application reached
          completion.
        </q>
        <br />
        <div class="text-right mx-2">
          <i> Aphidech Mahakoat </i>
        </div>
      </v-card>
    </v-col>
    <v-footer class="text-center mt-8 bg-transparent">
      <v-col>
        <h5>{{ textFooter }}</h5>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script setup lang="ts">
import { textFooter } from '@/utils/info'
</script>

<style scoped>
.custom-bg {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
}

.custom-bg-header {
  border-radius: 5px;
  background: rgba(72, 44, 2, 0.8);
}
</style>
