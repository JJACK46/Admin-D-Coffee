<script setup lang="ts">
import { ref } from 'vue'
import { useReceiptStore } from '../stores/receipt'
import ReceiptTable from './ReceiptSlip.vue'

const store = useReceiptStore()

const pdfRef = ref()
</script>

<template>
  <v-dialog v-model="store.dialogPreview" persistent max-width="512">
    <v-card class="py-2" theme="light" elevation="0">
      <v-card-text>
        <span ref="pdfRef">
          <ReceiptTable :receipt="store.tempItem" light-mode></ReceiptTable>
        </span>
      </v-card-text>
      <v-card-actions>
        <v-row class="justify-center">
          <v-col cols="auto">
            <v-btn class="mx-auto" variant="outlined" @click="store.closeDialog">
              <p class="font-weight-bold">OK</p>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              @click="store.exportOnePdf(pdfRef)"
              prepend-icon="mdi-export"
              variant="flat"
              color="secondary"
              rounded="lg"
              >PDF</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
