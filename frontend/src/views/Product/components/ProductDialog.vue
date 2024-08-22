<script setup lang="ts">
import { requiredRule, ruleFiles, rulePositiveNumberOnly } from '@/utils/rules'
import { useProductStore } from '../store/product'
import { typesOfProducts } from '../types/product'
import { ref } from 'vue'

const store = useProductStore()
const formComplete = ref<boolean>()
</script>

<template>
  <v-dialog v-model="store.dialogState" persistent width="712">
    <v-card rounded="lg">
      <h2 class="text-center pt-3">
        {{ store.titleDialog }}
      </h2>
      <v-divider class="mt-3"></v-divider>
      <v-form v-model="formComplete" class="pa-5">
        <v-row>
          <v-col cols="12">
            <v-img
              :style="{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                objectFit: 'cover',
                background: 'rgba(0,0,0,0.5)'
              }"
              class="mx-auto"
              :src="store.imageUrl"
            >
            </v-img>
          </v-col>
          <v-col>
            <v-file-input
              accept="image/png,image/jpeg"
              v-model="store.tempItem.files"
              hide-details
              variant="outlined"
              show-size
              @update:model-value="store.handleFileImageChange"
              :rules="[ruleFiles]"
              clearable
            >
            </v-file-input>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              v-model:model-value="store.tempItem.name"
              label="Name"
              :rules="[requiredRule]"
              clearable
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="outlined"
              v-model.number="store.tempItem.price"
              label="Price"
              min="0"
              type="number"
              :rules="[requiredRule, rulePositiveNumberOnly]"
              clearable
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              variant="outlined"
              label="Type"
              :rules="[requiredRule]"
              v-model="store.tempItem.type"
              :items="typesOfProducts"
              clearable
            >
            </v-select>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="outlined" @click="store.closeDialog"> close </v-btn>
          <v-btn :disabled="!formComplete" color="primary" variant="flat" @click="store.save()">
            save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
