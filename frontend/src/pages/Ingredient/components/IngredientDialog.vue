<script setup lang="ts">
import { ref } from 'vue'
import { useIngredientStore } from '@/stores/ingredient'
import { defaultUnitTypes } from '@/types/ingredient'
import DefaultDialog from '@/components/DefaultDialog.vue'

const store = useIngredientStore()
const form = ref<boolean>()
</script>
<template>
  <DefaultDialog
    v-model="store.isDialogOpen"
    :title="store.getTitleDialog"
    :callback-save="store.save"
    v-model:state-form="form"
  >
    <template #content>
      <v-form v-model="form" class="pa-5">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="store.tempItem.name" label="Name" variant="outlined">
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="store.tempItem.unit"
              :items="defaultUnitTypes"
              label="Unit"
              variant="outlined"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </DefaultDialog>
</template>
