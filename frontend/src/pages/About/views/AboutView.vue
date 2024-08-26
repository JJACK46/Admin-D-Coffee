<template>
  <v-container width="1024" style="line-height: 1.7">
    <v-btn
      variant="tonal"
      @click="
        () => {
          router.back()
        }
      "
      >back</v-btn
    >
    <v-img src="front of coffee store.jpeg" width="500" class="mx-auto" rounded></v-img>
    <v-card-title> D-Coffee Enterprise Web App ( ver. SOLO ) </v-card-title>
    <v-card-text>
      <p>
        Developing an application for managing a coffee store, which includes inventory management,
        point of sale (POS) system, and various other features related to company benefits.
      </p>
    </v-card-text>
    <div class="pa-3">
      <q>
        This application was initially developed by SimpleDev team for classroom assignments.
        Subsequently, I undertook its continued development until the application reached
        completion.
      </q>
      <br />
      <div class="text-right mx-2">
        <i> Aphidech Mahakoat </i>
      </div>
    </div>
    <h5 class="text-center">{{ textFooter }}</h5>
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router'
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
