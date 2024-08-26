<script setup lang="ts">
import { ref } from 'vue'
import { useBranchStore } from '@/stores/branch'
import { requiredRule } from '@/utils/rules'
import DefaultDialog from '@/components/DefaultDialog.vue'

const store = useBranchStore()
const formComplete = ref<boolean>()
</script>
<template>
  <DefaultDialog
    v-model="store.isDialogOpen"
    :title="store.getTitleDialog"
    :callback-save="store.save"
    v-model:state-form="formComplete"
  >
    <template #content>
      <v-form v-model="formComplete">
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
    </template>
  </DefaultDialog>
</template>
