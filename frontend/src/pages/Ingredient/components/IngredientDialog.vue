<script setup lang="ts">
import { ref } from 'vue'
import { useIngredientStore } from '@/stores/ingredient'
import { defaultUnitTypes } from '@/types/ingredient'

const store = useIngredientStore()
const formComplete = ref<boolean>()
</script>
<template>
  <v-dialog v-model="store.isDialogOpen" width="auto" persistent>
    <v-card rounded="lg">
      <h2 class="pt-2 text-center">
        {{ store.getTitleDialog }}
      </h2>
      <v-divider class="my-2"></v-divider>
      <v-form v-model="formComplete" class="pa-5">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="store.tempItem.name" label="Name"> </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select v-model="store.tempItem.unit" :items="defaultUnitTypes" label="Unit">
            </v-select>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="justify-end px-5 mb-3">
        <v-btn variant="outlined" @click="store.closeDialog()" text="close"> </v-btn>
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
