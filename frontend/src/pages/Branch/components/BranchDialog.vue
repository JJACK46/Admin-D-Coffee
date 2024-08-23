<script setup lang="ts">
import { ref } from 'vue'
import { useBranchStore } from '@/stores/branch'
import { requiredRule } from '@/utils/rules'

const store = useBranchStore()
const formComplete = ref<boolean>()
</script>
<template>
  <v-dialog v-model="store.isDialogOpen" width="312" persistent>
    <v-card rounded="lg">
      <h2 class="text-center pt-3">
        {{ store.getTitleDialog }}
      </h2>
      <v-divider class="mt-2"></v-divider>
      <v-form v-model="formComplete" class="px-3">
        <v-row class="pa-5">
          <v-col cols="12">
            <v-text-field
              :rules="[requiredRule]"
              variant="outlined"
              v-model="store.tempItem.name"
              label="Name"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :rules="[requiredRule]"
              variant="outlined"
              v-model="store.tempItem.location"
              label="Location"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="justify-end px-5 pb-5">
        <v-btn variant="outlined" text="close" @click="store.closeDialog()"> </v-btn>
        <v-btn
          :disabled="!formComplete"
          color="primary"
          variant="flat"
          @click="store.save()"
          text="save"
        >
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
