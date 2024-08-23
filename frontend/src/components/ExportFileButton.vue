<template>
  <v-btn-group class="h-100 d-flex justify-center" rounded="pill" divided color="fourth">
    <v-btn @click="$props.callbackPdf"> quick export </v-btn>
    <v-btn class="ma-0" size="small" icon>
      <v-icon icon="mdi-chevron-down" />
      <v-menu activator="parent">
        <v-card>
          <v-list>
            <v-list-item @click="callbackPdf">.PDF</v-list-item>
            <v-list-item
              v-if="dataCSV"
              @click="exportDataToCSV(dataCSV, `${filenameCSV}-${new Date().toISOString()}.csv`)"
              >.CSV</v-list-item
            >
          </v-list>
        </v-card>
      </v-menu>
    </v-btn>
  </v-btn-group>
</template>

<script setup lang="ts">
import { exportDataToCSV } from '@/utils/csv'

defineProps<{
  callbackPdf: () => void
  dataCSV?: Record<string, any>[]
  filenameCSV?: string
}>()
</script>
