<script setup lang="ts">
import { usePosStore } from '../store/pos'
import StatusDialog from './StatusDialog.vue'
import ReceiptTable from '../../Receipt/components/ReceiptSlip.vue'

const store = usePosStore()
</script>

<template>
  <StatusDialog></StatusDialog>
  <v-dialog v-model="store.dialogReceipt" persistent max-width="512">
    <v-card class="py-2">
      <v-card-title class="text-h5 text-center mt-5">
        Confirm Payment
        <v-divider class="mt-5" thickness="3"></v-divider>
      </v-card-title>
      <v-card-text>
        <ReceiptTable :receipt="store.receipt"></ReceiptTable>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red-darken-1" variant="text" @click="store.closeDialogReceipt">
          <p class="font-weight-bold">close</p>
        </v-btn>
        <v-btn color="green-darken-1" variant="text" @click="store.proceedOrder">
          <p class="font-weight-bold">Confirm</p>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
